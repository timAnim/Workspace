function toggleOrth() {
    if (!store.state['orth-view']) {
        for (var item in store.state) {
            if (item !== 'orth-view') {
                store.state[item] = false
                store.commit(item)
            }
        }
    }
    $('#frame').toggleClass('orth')
}