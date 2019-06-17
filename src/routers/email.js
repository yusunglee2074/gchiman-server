const express = require('express')
const moment = require('moment')
const Email = require('../models/email')
const Product = require('../models/product')
const router = new express.Router()

router.post('/emails', async (req, res) => {
  const email = new Email(req.body)
  const isAlreadyExist = await Email.findOne({ email: req.body.email })
  if (isAlreadyExist) return res.status(200).send({ isAlreadyExist })

  try {
    await email.save()
    res.status(201).send({ email })
  } catch (e) {
    res.status(400).send(e)
  }
})

router.get('/emails', async (req, res) => {
  try {
    const emails = await Email.find({}) 
    res.status(200).send(emails)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.get('/email/:email', async (req, res) => {
  const emailAddress = req.params.email
  try {
    const email = await Email.findOne({ email: emailAddress })
    res.send(email)
  } catch (e) {
    console.log(e)
    res.status(500).send(e)
  }
})
router.get('/email/:email/p', async (req, res) => {
  const emailAddress = req.params.email
  try {
    const email = await Email.findOne({ email: emailAddress }).populate('likeProducts')
    res.send(email)
  } catch (e) {
    console.log(e)
    res.status(500).send(e)
  }
})

router.patch('/email/:originalEmail/:productId', async (req, res) => {
  const { originalEmail, productId } = req.params

  try {
    const email = await Email.findOne({ email: originalEmail}) 

    let isExist = false
    email.likeProducts = email.likeProducts.filter(id => {
      if (id.toString() === productId) {
        isExist = true
        return false
      }
      return true
    })
    const product = await Product.findById(productId)
    if (!isExist) {
      email.likeProducts.push(productId)
      product.like()
      await email.save()
      res.status(201).send(email)
    } else {
      product.unlike()
      await email.save()
      res.status(200).send(email)
    }
  } catch (e) {
    console.log(e)
    res.status(500).send(e)
  }
})

router.patch('/email/:originalEmail', async (req, res) => {
  const originalEmail = req.params.originalEmail
  const updates = Object.keys(req.body)

  try {
    const email = await Email.findOne({ email: originalEmail}) 

    updates.forEach((key) => email[key] = req.body[key])
    await email.save()
    res.send(email)
  } catch (e) {
    console.log(e)
    res.status(500).send(e)
  }
})

router.delete('/email/:email', async (req, res) => {
  try {
    const email = await Email.findOneAndDelete({ email: req.params.email })

    if (!email) {
      res.status(404).send()
    }
    res.send(email)
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router
