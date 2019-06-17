const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}, (e) => {
  if (!e) console.log(`DB connected with ${process.env.MONGODB_URL}`)
})
