const handleProduct = require('../controls/product.controls')
const express = require('express')

const routes = express.Router()
routes.post('/form',handleProduct)

module.exports = routes