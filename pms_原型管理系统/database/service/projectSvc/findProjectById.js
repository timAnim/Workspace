var Project = require('../../model/project.js');

function findProjectById(_id) {
    return queryProjectSync(_id)
        .then(data => {
            data = data.toObject()
            if (data.description) {
                data.description = data.description.replace(/\n/ig, '<br>')
            }
            return {
                code: 0,
                data
            }
        })
}

function queryProjectSync(_id) {
    var condition = {
        _id
    };
    return Project
        .findOne(condition)
        .exec()
}


module.exports = findProjectById