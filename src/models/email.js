const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },
  isSub: {
    type: Boolean,
    default: true,
  },
  likeProducts: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Product', default: [] }
  ],
}, {
  timestamps: true
})

emailSchema.pre('save', function(next) {
  next();
});

const Email = mongoose.model('Email', emailSchema)

module.exports = Email
