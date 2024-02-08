!(function(window) {
    var el = document.createElement("div")
    el.innerHTML = '<%= svgstr %>'
    document.body.appendChild(el.children[0])
})(window)