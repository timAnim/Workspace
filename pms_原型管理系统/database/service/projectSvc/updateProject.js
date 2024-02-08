var Project = require('../../model/project.js')
// var Log = require('../../model/log.js')

function updateProject(proj) {
  return updateAndFind(proj)
    // .then(res => {
    //   return insertLog(res.code, res.name)
    // })
    .then(res => {
      return Promise.resolve({
        code: 0,
        data: res
      })
    })
}

function updateAndFind(proj) {
  var whereStr = {
    _id: proj._id
  }

  return Project.findOneAndUpdate(whereStr, {
      $set: proj
    })
    .exec()
}

// function insertLog(code, name) {
// 	var log = new Log({
//     proj_name: name,
//     proj_code: code,
//     item: '添加项目',
//   })
//   return log.save()
// }
module.exports = updateProject