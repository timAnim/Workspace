var Project = require('../../model/project.js')

function publicProject(_id, isPublic) {
  if(!isPublic){
    return updatePublicState(_id, false)
      .then(data=>{
        return { code:0, data }
      })
  }else{
    var promiseArr = []
    return findProjectById(_id)
      .then(result => {
        return updateSiblingsPublicStateByPid(result.pid)
      })
      .then(arr=>{
        arr.forEach(proj=>{
          promiseArr.push(updatePublicState(proj._id, false))
        })
        return Promise.all(promiseArr)
      })
      .then(data => {
        return updatePublicState(_id, true)
      })
      .then(data=>{
        return {
          code: 0,
          data
        }
      })
  }
}

/**
 * 找到这个proj
 * @DateTime 2019-01-14
 */
function findProjectById(_id) {
  var condition = {
    _id
  };
  return Project
    .findOne(condition)
    .exec()
}

/**
 * 更新所有兄弟节点改为未上架
 */
function updateSiblingsPublicStateByPid(pid) {
  var condition = {
    pid
  };
  return Project
    .find(condition)
    .exec()
}

/**
 * 将发布状态改为下架
 * @DateTime 2019-01-14
 */
function updatePublicState(_id, isPublic) {

  var whereStr = {
    _id
  }

  var updateStr = {
    $set: {
      isPublic
    },
  }

  return Project.update(whereStr, updateStr)
  .exec()
  .then(data=>{
    return Promise.resolve({
      code: 0,
      data
    })
  })
}

// 如果是命令行执行则直接运行
// if (require.main === module) {
//   publicProject('5ae0372d81f81b28c4b82d26', false)
//     .then(data => {
//       console.log(data)
//     })
//     .catch(err => {
//       console.log(err.message)
//     })
// }

module.exports = publicProject