function filterSex(arr) {
  return arr.filter(function(item) {
    if (store.getState('sex') === 'a') {
      return true
    } else {
      return item.sex === store.getState('sex')
    }
  })
}