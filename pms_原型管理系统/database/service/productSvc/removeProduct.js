var Product = require('../../model/product.js')
var Project = require('../../model/project.js')

function removeProduct(_id) {
  var data;
  return removeProductOnly(_id)
    .then(res => {
      data = res
      return updateRelated(_id)
    })
    .then(res => {
      return Promise.resolve({
        code: 0,
        data
      })
    })
}

function removeProductOnly(_id) {
  var whereStr = {
    _id
  }

  return Product.remove(whereStr)
    .exec()
}

function updateRelated(pid) {
  var whereStr = {
    pid
  }

  var updateStr = {
    $set: {
      pid: null
    }
  }

  return Project.update(whereStr, updateStr)
    .exec()
}

module.exports = removeProduct