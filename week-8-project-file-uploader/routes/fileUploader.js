// @ts-nocheck
const express = require('express')
const multer = require('multer')
const storage = require("../cloudinary/index.js")
const FileUpload = require('../model/fileUploader')

const upload = multer({ storage })

const uploadRoutes = express.Router()

uploadRoutes.get('/', async (req, res) => {
  try {
    const fileUpload = await FileUpload.find()
    res.json(fileUpload)
  } catch (e) {
    console.log(e)
  }
})

uploadRoutes.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const { full_name } = req.body
    // const image = req.file.path
    const { path } = req.file

    const fileUpload = await new FileUpload({
      image: path,
      full_name: full_name
    })
    await fileUpload.save()

    res.json({
      message: "image uploaded successfully"
    })
  } catch (e) {
    console.log(e)
  }
})

module.exports = uploadRoutes
