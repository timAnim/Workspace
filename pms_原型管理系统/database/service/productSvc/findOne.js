var Product = require('../../model/product.js')
var Project = require('../../model/project.js')

function findOne(_id) {
  return queryProductSync(_id)
    .then(data => {
      return getRelatedProjects(data)
    })
    .then(data => {
      return { code: 0, data }
    })
}

function queryProductSync(_id) {
  return Product
    .findById(_id)
    .exec()
}

function getRelatedProjects(product) {
  var condition = {
    pid: product._id
  }

  return Project
    .find(condition)
    .sort({
      name: 1
    })
    .exec()
    .then(data => {
      var res = product.toObject()
      res.projects = data
      return res
    })
}


module.exports = findOne