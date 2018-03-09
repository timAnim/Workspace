function stateCtrl(store) {

  var store = store || {},
    actions = [];

  function getState(prop) {
    return store[prop];
  }

  function dispatch(action) {
    store[action.type] = action.value;

    actions.forEach(fn, index) {
      fn(action.type);
    }
  }

  function subscribe(fn) {
    actions.push(fn);
  }

  return store;
}