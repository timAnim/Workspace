var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = require('../model/product.js')

const {
  findOne,
  findAllProduct,
  removeProduct,
  upsertProduct
} = require('../service/productSvc')

router.post('/findAll', (req, res, next) => {
  findAllProduct()
    .then(data => res.send(data))
    .catch(err => next(err))
})

router.post('/findOne', (req, res, next) => {
  findOne(req.body.id)
    .then(data => res.send(data))
    .catch(err => next(err))
})

router.post('/upsert', (req, res, next) => {
  upsertProduct(req.body.data)
    .then(data => res.send(data))
    .catch(err => next(err))
})

router.post('/remove', (req, res, next) => {
  removeProduct(req.body.id)
    .then(data => res.send(data))
    .catch(err => next(err))
})

module.exports = router
