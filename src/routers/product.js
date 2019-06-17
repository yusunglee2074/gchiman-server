const express = require('express')
const moment = require('moment')
const Product = require('../models/product')
const router = new express.Router()

router.post('/products', async (req, res) => {
  const product = new Product(req.body)

  try {
    await product.save()
    res.status(201).send({ product })
  } catch (e) {
    res.status(400).send(e)
  }
})

router.get('/products', async (req, res) => {
  try {
    const products = await Product.find({}) 
    res.status(200).send(products)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.get('/products/:cate1/:cate2', async (req, res) => {
  try {
    const products = await Product.find({
      category1: req.params.cate1,
      category2: req.params.cate2
    }) 
    res.status(200).send(products)
  } catch (e) {
    res.status(400).send(e)
  }
})
router.get('/products/:cate1', async (req, res) => {
  // TODO: 전체카테고리, best, sale 각각 로직처리해야함
  const param = req.params.cate1
  try {
    let products
    if (!['new', 'best', 'sale'].includes(param)) {
      products = await Product.find({
        category1: param
      }) 
    } else if (param === 'new') {
      products = await Product.find({
        createdAt: {
          $gte: moment().subtract(7, 'days')
        }
      }) 
    } else if (param === 'best') {
      products = await Product.find({
        createdAt: {
          $gte: moment().subtract(7, 'days')
        }
      })
    } else if (param === 'sale') {
      products = await Product.find({
        discount: {
          $gt: 0 
        }
      })
    }
    res.status(200).send(products)
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
})

router.get('/product/:id', async (req, res) => {
  const _id = req.params.id
  try {
    const products = await Product.findOne({ _id }) 
    products.viewCount = products.viewCount + 1
    await products.save()
    res.send(products)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.patch('/products/:id', async (req, res) => {
  const _id = req.params.id
  const updates = Object.keys(req.body)

  try {
    const product = await Product.findOne({ _id }) 

    updates.forEach((key) => product[key] = req.body[key])
    await product.save()
    res.send(product)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ _id: req.params.id })

    if (!product) {
      res.status(404).send()
    }
    res.send(product)
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router
