function toggleSetting() {
    if (store.state['setting-panel']) {
        $('#setting-panel').slideUp(200, function() {
            $('#setting-mask').hide();
        })
    } else {
        $('#setting-mask').show();
        $('#setting-panel').slideDown(200);
    }
}