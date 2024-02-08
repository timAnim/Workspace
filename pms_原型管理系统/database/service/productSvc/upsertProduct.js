var Product = require('../../model/product.js')
var mongoose = require('mongoose');


function upsertProduct(product) {
	var _id = product._id || new mongoose.Types.ObjectId()

  var whereStr = {
    _id
  }

  var updateStr = {
    $set: product,
  }

  var option = {
    upsert: true,
  }

  return Product.update(whereStr, updateStr , option)
  .exec()
  .then(data=>{
    return Promise.resolve({
      code: 0,
      data
    })
  })
}

if(require.main == module){
	upsertProduct({
		name:'安睿通小程序',
	})
	.then(res=>{
		console.log(res)
	})
}

module.exports = upsertProduct