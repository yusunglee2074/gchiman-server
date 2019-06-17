const express = require('express')
const moment = require('moment')
const Blog = require('../models/blog')
const router = new express.Router()

router.post('/blogs', async (req, res) => {
  const blog = new Blog(req.body)

  try {
    await blog.save()
    res.status(201).send({ blog })
  } catch (e) {
    res.status(400).send(e)
  }
})

router.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find({}) 
    res.status(200).send(blogs)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.get('/blog/:title', async (req, res) => {
  const title = req.params.title
  try {
    const blog = await Blog.findOne({ title }) 
    blog.viewCount = blog.viewCount + 1
    await blog.save()
    res.send(blog)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.patch('/blog/:id', async (req, res) => {
  const _id = req.params.id
  const updates = Object.keys(req.body)

  try {
    const blog = await Blog.findOne({ _id }) 

    updates.forEach((key) => blog[key] = req.body[key])
    await blog.save()
    res.send(blog)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.delete('/blog/:id', async (req, res) => {
  try {
    const blog = await Blog.findOneAndDelete({ _id: req.params.id })

    if (!blog) {
      res.status(404).send()
    }
    res.send(blog)
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router
