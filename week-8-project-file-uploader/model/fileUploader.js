const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  full_name: {
    type: String,
  }
})

const FileUpload = mongoose.model('User', fileSchema)

module.exports = FileUpload
