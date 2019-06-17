const express = require('express')
const router = new express.Router()
const multer = require('multer')
const moment = require('moment')
const sharp = require('sharp')

let filename;

/*
const storage = multer.diskStorage({ 
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    filename = moment().valueOf() + '-' + file.originalname
    cb(null, filename) //File name after saving
  }
})
const upload = multer({ storage })
*/

const upload = multer()

// TODO:: 업로드 권한 설정해야함 
router.post('/static/image', upload.single('img'), async (req, res, next) => {
  filename = moment().valueOf() + '-' + req.file.originalname
  try {
    const data = await sharp(req.file.buffer)
      .jpeg({
        quality: 90,
      })
      .toFile('./public/uploads/' + filename)
    next()
  } catch (e) {
    console.log(e)
  }
  next()
}, async (req, res) => {
  req.get('host')
  res.send(process.env.HOST_URL_DEV + '/uploads/' + filename)
})

router.post('/static/image/banner', upload.single('img'), async (req, res, next) => {
  filename = moment().valueOf() + '-' + req.file.originalname
  try {
    const data = await sharp(req.file.buffer)
      .jpeg({
        quality: 90,
      })
      .toFile('./public/uploads/banners/' + filename)
    next()
  } catch (e) {
    console.log(e)
  }
  next()
}, async (req, res) => {
  req.get('host')
  res.send(process.env.HOST_URL_DEV + '/uploads/banners/' + filename)
})

router.post('/static/image/product', upload.single('img'), async (req, res, next) => {
  // TODO: HOSTURL 배포 컴에 따라 달라져야함
  filename = moment().valueOf() + '-' + req.file.originalname
  try {
    const data = await sharp(req.file.buffer)
      .resize({
        width: 550,
        height: 710
      })
      .jpeg({
        quality: 90,
      })
      .toFile('./public/uploads/products/' + filename)
    next()
  } catch (e) {
    console.log(e)
  }
}, async (req, res) => {
  req.get('host')
  res.send(process.env.HOST_URL_DEV + '/uploads/products/' + filename)
})

module.exports = router
