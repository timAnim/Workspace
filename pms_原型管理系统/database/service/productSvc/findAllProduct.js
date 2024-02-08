var Product = require('../../model/product.js')
var Project = require('../../model/project.js')

/**
 * 获取所有项目以及所有的计划
 * @Author   Timothy    CHEN
 * @DateTime 2018-12-25
 * @return   {Promise}
 */
function findAllProduct(sort, skip, limit) {
  /**
   * 查询条件
   * @type {Object}
   */
  var condition = {};

  /**
   * 排序的条件 备选 _id, name, start, end, cname
   * @type {Object}
   */
  sort = getValidSort(sort)

  /**
   * 分页的条件
   * @type {Number}
   */
  skip = getValidSkip(skip);
  limit = getValidLimit(limit);

  /**
   * 页码的总数
   * @type {Number}
   */
  var count;
  return countProductSync(condition)
    .then(result => {
      count = result;
      return queryProductSync(condition, sort, skip, limit)
    })
    .then(data=>{
      var promiseArr=[]
      data.forEach(product=>{
        promiseArr.push(getRelatedProjects(product))
      })
      return Promise.all(promiseArr)
    })
    .then(data => {
      return { code:0, count, data }
    })
}

function getValidSkip(skip) {
  if (typeof skip != 'number') {
    skip = 0;
  } else {
    skip = skip >= 0 ? skip : 0;
  }
  return skip
}

function getValidLimit(limit) {
  if (typeof limit != 'number') {
    limit = 50;
  } else {
    limit = limit <= 0 ? 5 : limit;
    limit = limit >=1000 ? 1000 : limit;
  }
  return limit
}

function getValidSort(sort) {
  var dfSort = { name: 1 };
  if (typeof sort != 'object') return dfSort

  var sortLength = 0
  for (var key in sort) {
    if (checkSort(key)) sortLength++
    else delete sort[key]
  }
  return sortLength ? sort : dfSort
	function checkSort(key) {
	  var valid = ['_id', 'name', 'start', 'end', 'cname'];
	  var res = valid.filter(_v => _v == key).length;
	  return res ? true : false
	}
}

function countProductSync(condition) {
  return Product
    .count(condition)
    .exec()
}

function queryProductSync(condition, sort, skip, limit) {
  return Product
    .find(condition)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .exec()
}

function getRelatedProjects(product) {
  /**
   * 模糊查询
   * @type {RegExp}
   */
  var condition = {
    pid: product._id
  }
  /**
   * 返回简单的字段
   * @type {Array}
   */
  var field = ['code', 'name', 'start', 'end'];

  return Project
    .find(condition, field)
    .sort({
      name: -1
    })
    .exec()
    .then(data=>{
      var res = product.toObject()
      res.projects = data
      return res
    })
}

// 如果是命令行执行则直接运行
if (require.main === module) {
  findAllProduct()
    .then(data => {
      console.log(data)
    })
    .catch(err => {
      console.log(err.message)
    })
}

module.exports = findAllProduct