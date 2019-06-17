const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
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
  category: {
    type: String,
  },
  likeCount:  {
    type: Number,
    default: 0
  },
}, {
  timestamps: true
})

blogSchema.pre('save', function(next) {
  next();
});

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
