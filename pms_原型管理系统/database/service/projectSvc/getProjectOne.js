var Project = require('../../model/project.js');
var Product = require('../../model/product.js');
var _project;
/**
 * 获取所有项目以及所有的计划
 * @Author   Timothy    CHEN
 * @DateTime 2018-12-25
 * @return   {Promise}
 */
function getProjectOne(code) {
    return queryProjectSync(code)
        .then(data => {
            _project = data.toObject();
            if (_project.description) {
                _project.description = _project.description.replace(/\n/ig, '<br>')
            }
            return getBelongTo(_project)
        })
        .then(related => {
            if (related) {
                _project.pName = related.name
            } else {
                _project.pName = ''
            }
            return {
                code: 0,
                data: _project,
            }
        })
}

function queryProjectSync(code) {
    var condition = {
        code
    };
    return Project
        .findOne(condition)
        .exec()
}

function getBelongTo(proj) {

    return Product
        .findById(proj.pid)
        .exec()
}


module.exports = getProjectOne