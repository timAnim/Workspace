function toggleNotify() {
    if (store.state['notify-panel']) {
        $('#notify-panel')
            .animate({
                right: '-20rem'
            }, 200, () => {
                $('#notify-panel').hide()
            });
    } else {
        $('#notify-panel')
            .show()
            .animate({
                right: '0'
            }, 200);
    }
    $('#notify-btn').toggleClass('checked')
}