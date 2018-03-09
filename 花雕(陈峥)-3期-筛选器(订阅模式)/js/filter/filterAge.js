function filterAge(arr) {
  return arr.filter((item) => {
    if (store.getState('age') === 'a') {
      return true
    } else {
      return parseInt(item.age) > parseInt(store.getState('age'))
    }
  })
}