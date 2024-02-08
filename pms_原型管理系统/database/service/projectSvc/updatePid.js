var Project = require('../../model/project.js')

function updatePid(projArr, pid) {
  return clearChildren(pid)
    .then(res => {
      return findAndUpdate(projArr, pid)
    })
}

function clearChildren(pid) {
  var whereStr = {
    pid
  }
  return Project.updateMany(whereStr, {
      $set: {
        pid: ''
      }
    })
    .exec()
}

function findAndUpdate(projs, pid) {
  var conditions = []
  projs.forEach(proj => {
    conditions.push(proj._id)
  })
  return Project.updateMany({
      _id: {
        $in: conditions
      }
    }, {
      $set: {
        pid
      }
    })
    .exec()
}

module.exports = updatePid