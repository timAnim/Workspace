// 状态管理器
function statemanager(state) {
  var store = state || {}
  var mutations = []; // 改变因子

  function getState(prop) {
    return store[prop];
  }

  // 状态分发 通知管理器 状态已改变

  function dispatch(action) {
    store[action.type] = action.value;
    // 改变因子 触发变更
    mutations.forEach((item, index) => {
      item()
    })
  }

  // 订阅 注册到变化因子里
  function subscribe(mutation) {
    mutations.push(mutation)
  }

  return {
    getState: getState,
    dispatch: dispatch,
    subscribe: subscribe,
  }
}