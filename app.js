const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const res = require('express/lib/response')
const authJwt = require('./helpers/jwt')
const errorHandler = require('./helpers/error-handler')

require('dotenv/config')

const api = process.env.API_URL
const app = express()

app.use(cors())
app.options('*', cors())

// middleware
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(authJwt())

// Routers
const categoriesRouter = require('./routers/categories')
const ordersRouter = require('./routers/orders')
const productsRouter = require('./routers/products')
const usersRouter = require('./routers/users')

app.use(`${api}/categories`, categoriesRouter)
app.use(`${api}/orders`, ordersRouter)
app.use(`${api}/products`, productsRouter)
app.use(`${api}/users`, usersRouter)
app.use(errorHandler)

const Category = require('./models/category')
const Order = require('./models/order')
const Product = require('./models/product')
const User = require('./models/user')

mongoose
    .connect('mongodb://localhost/eShop', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('✅ Connected database from mongodb.'))
    .catch((error) =>
        console.error(
            `❌ Connect database is failed with error which is ${error}`
        )
    )

// http://localhost/api/v1/products

app.listen(3000, () => {
    console.log('Server is running http://localhost:3000')
})
