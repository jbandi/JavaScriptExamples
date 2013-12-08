(function(global) {
    "use strict";

    global.rating = global.rating || {};

    var DrawingModule =  function DrawingModule(paper){
        this._paper = paper;
    };

    // Export the module to make it accessible
    global.rating.DrawingModule = DrawingModule;

    DrawingModule.prototype.drawAnimatedCircle = function(color, radius, start, end, delay) {
        var that = this;
        setTimeout(function() {
            that._paper.circle(start.left, start.bottom, radius).attr({
                "stroke": "none",
                "fill": color
            }).animate({cx:end.left, cy: end.bottom , r:radius }, 2000, "bounce" ).toBack();
        }, delay);
    };

}(window));
