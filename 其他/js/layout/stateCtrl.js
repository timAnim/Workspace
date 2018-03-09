function stateCtrl(store) {

    function getState(prop) {
        return store.state[prop];
    }

    function commit(mutation) {
        store.actions[mutation]();
        store.state[mutation] = !store.state[mutation]
    }

    store.commit = commit

    return store;
}