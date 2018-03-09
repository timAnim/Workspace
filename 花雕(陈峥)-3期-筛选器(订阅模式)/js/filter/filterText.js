function filterText(arr) {
  return arr.filter(item => {
    return item.name.indexOf(store.getState('text')) !== -1
  })
}