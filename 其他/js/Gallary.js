(function(window) {
    function Gallary(opt) {
        this.imgs = opt.imgs;
        this.outer = opt.outer;
        this.init();
    }

    Gallary.prototype = {
        template: '<li id="$url$" href="$href$" th="$title$"><img src="$url$"></li>',
    }

    Gallary.prototype.init = function() {
        this.outer.innerHTML = (util.render(this.imgs, this.template));
    }

    window.Gallary = Gallary;
}(window))