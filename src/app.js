const express = require('express')
const cors = require('cors')
require('./db/mongoose')
const port = process.env.PORT

const productRouter = require('./routers/product')
const blogRouter = require('./routers/blog')
const emailRouter = require('./routers/email')
const staticRouter = require('./routers/static')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use(productRouter)
app.use(blogRouter)
app.use(emailRouter)
app.use(staticRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
