var Project = require('../../model/project.js')
var Product = require('../../model/product.js')

/**
 * 获取所有项目以及所有的计划
 * @Author   Timothy    CHEN
 * @DateTime 2018-12-25
 * @return   {Promise}
 */
function getProjectList(sort, skip, limit) {
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
    return countProjectSync(condition)
        .then(result => {
            count = result;
            return queryProjectSync(condition, sort, skip, limit)
        })
        .then(data => {
            var promiseArr = []
            data.forEach(proj => {
                promiseArr.push(getCover(proj))
            })
            return Promise.all(promiseArr)
        })
        .then(data => {
            return { code: 0, count, data }
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
        limit = limit >= 1000 ? 1000 : limit;
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

function countProjectSync(condition) {
    return Project
        .count(condition)
        .exec()
}

function queryProjectSync(condition, sort, skip, limit) {
    return Project
        .find(condition)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .exec()
}

function getCover(proj) {
    // if (!proj.pid) {
    if (!proj.pid || 1) {
        proj = proj.toObject()
        proj.cover = 'api/files/image/yxt-logo.png'
        return Promise.resolve(proj)
    }
    return Product
        .findById(proj.pid)
        .exec()
        .then(res => {
            proj = proj.toObject()
            proj.cover = res.cover
            return Promise.resolve(proj)
        })
}

module.exports = getProjectList