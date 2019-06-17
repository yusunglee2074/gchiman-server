const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  text: {
    type: String,
  },
  image: {
    type: String,
  },
  url: {
    type: String,
  },
  category1: {
    type: String,
  },
  category2: {
    type: String,
  },
  likeCount:  {
    type: Number,
    default: 0
  },
}, {
  timestamps: true
})

productSchema.methods.like = function() {
  this.likeCount = this.likeCount + 1
  return this.save()
};
productSchema.methods.unlike = function() {
  this.likeCount = this.likeCount - 1
  return this.save()
};

const Product = mongoose.model('Product', productSchema)


module.exports = Product
