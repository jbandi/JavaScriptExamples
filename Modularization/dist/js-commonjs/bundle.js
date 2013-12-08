require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
    "use strict";

    var DrawingModule = function DrawingModule(paper){
        this._paper = paper;
    };

    // Export the module to make it accessible
    module.exports = DrawingModule;

    DrawingModule.prototype.drawAnimatedCircle = function(color, radius, start, end, delay) {
        var that = this;
        setTimeout(function() {
            that._paper.circle(start.left, start.bottom, radius).attr({
                "stroke": "none",
                "fill": color
            }).animate({cx:end.left, cy: end.bottom , r:radius }, 2000, "bounce" ).toBack();
        }, delay);
    };

}());

},{}],"AL4luf":[function(require,module,exports){
/* global Raphael */

(function() {
    "use strict";

    var DrawingModule = require("./drawing_module.js");

    var moods = ['Rubbish', 'Not Good', 'OK', 'Smily', 'Crazy'];
    var colors = ['#cc0000', '#a97e22', '#9f9136', '#7c9a2d', '#3a9a2d'];

    var LEFT = 30;
    var BOTTOM = 50;
    var RADIUS = 20;

    var RatingWidget = function RatingWidget(domElement){
        this._mood = 1;
        this._paper = new Raphael(domElement, 350, 100);
        this._drawingModule = new DrawingModule(this._paper);
        this.init();
    };

    // Export the module to make it accessible
    module.exports = RatingWidget;

    RatingWidget.prototype.setMood = function (mood) {
        this._mood = mood;
    };

    RatingWidget.prototype.init = function () {
        this._paper.clear();

        this.circ = this._paper.circle(LEFT, BOTTOM, RADIUS).attr({fill: '#000'});
        this.mood_text = this._paper.text(LEFT, BOTTOM, 'My\nRate').attr({fill: '#fff'});

        var that = this;
        this.circ.node.onclick = function(){ that.show();};
        this.mood_text.node.onclick = function(){ that.show();};
    };

    RatingWidget.prototype.show = function () {

        this.init();
        for (var i = 0; i < this._mood; i += 1) {
            var color = colors[this._mood - 1];
            var start = {left: LEFT, bottom: BOTTOM};
            var end = {left: LEFT + 42 * (i + 1), bottom: BOTTOM};
            var delay = i * 50;
            this._drawingModule.drawAnimatedCircle(color, RADIUS, start, end, delay);
        }

        this._paper.text(LEFT, BOTTOM + 30, moods[this._mood - 1]).attr({fill: colors[this._mood - 1]});
    };

}());


},{"./drawing_module.js":1}],"./rating_widget.js":[function(require,module,exports){
module.exports=require('AL4luf');
},{}]},{},[])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVm9sdW1lcy9EYXRhL0Rldi9jaC1vcGVuLzIwMTMvY2gtb3Blbi8wMi1MYW5ndWFnZS8wMi1Nb2R1bGFyaXphdGlvbi9zcmMvanMtY29tbW9uanMvZHJhd2luZ19tb2R1bGUuanMiLCIvVm9sdW1lcy9EYXRhL0Rldi9jaC1vcGVuLzIwMTMvY2gtb3Blbi8wMi1MYW5ndWFnZS8wMi1Nb2R1bGFyaXphdGlvbi9zcmMvanMtY29tbW9uanMvcmF0aW5nX3dpZGdldC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICB2YXIgRHJhd2luZ01vZHVsZSA9IGZ1bmN0aW9uIERyYXdpbmdNb2R1bGUocGFwZXIpe1xuICAgICAgICB0aGlzLl9wYXBlciA9IHBhcGVyO1xuICAgIH07XG5cbiAgICAvLyBFeHBvcnQgdGhlIG1vZHVsZSB0byBtYWtlIGl0IGFjY2Vzc2libGVcbiAgICBtb2R1bGUuZXhwb3J0cyA9IERyYXdpbmdNb2R1bGU7XG5cbiAgICBEcmF3aW5nTW9kdWxlLnByb3RvdHlwZS5kcmF3QW5pbWF0ZWRDaXJjbGUgPSBmdW5jdGlvbihjb2xvciwgcmFkaXVzLCBzdGFydCwgZW5kLCBkZWxheSkge1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGF0Ll9wYXBlci5jaXJjbGUoc3RhcnQubGVmdCwgc3RhcnQuYm90dG9tLCByYWRpdXMpLmF0dHIoe1xuICAgICAgICAgICAgICAgIFwic3Ryb2tlXCI6IFwibm9uZVwiLFxuICAgICAgICAgICAgICAgIFwiZmlsbFwiOiBjb2xvclxuICAgICAgICAgICAgfSkuYW5pbWF0ZSh7Y3g6ZW5kLmxlZnQsIGN5OiBlbmQuYm90dG9tICwgcjpyYWRpdXMgfSwgMjAwMCwgXCJib3VuY2VcIiApLnRvQmFjaygpO1xuICAgICAgICB9LCBkZWxheSk7XG4gICAgfTtcblxufSgpKTtcbiIsIi8qIGdsb2JhbCBSYXBoYWVsICovXG5cbihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIHZhciBEcmF3aW5nTW9kdWxlID0gcmVxdWlyZShcIi4vZHJhd2luZ19tb2R1bGUuanNcIik7XG5cbiAgICB2YXIgbW9vZHMgPSBbJ1J1YmJpc2gnLCAnTm90IEdvb2QnLCAnT0snLCAnU21pbHknLCAnQ3JhenknXTtcbiAgICB2YXIgY29sb3JzID0gWycjY2MwMDAwJywgJyNhOTdlMjInLCAnIzlmOTEzNicsICcjN2M5YTJkJywgJyMzYTlhMmQnXTtcblxuICAgIHZhciBMRUZUID0gMzA7XG4gICAgdmFyIEJPVFRPTSA9IDUwO1xuICAgIHZhciBSQURJVVMgPSAyMDtcblxuICAgIHZhciBSYXRpbmdXaWRnZXQgPSBmdW5jdGlvbiBSYXRpbmdXaWRnZXQoZG9tRWxlbWVudCl7XG4gICAgICAgIHRoaXMuX21vb2QgPSAxO1xuICAgICAgICB0aGlzLl9wYXBlciA9IG5ldyBSYXBoYWVsKGRvbUVsZW1lbnQsIDM1MCwgMTAwKTtcbiAgICAgICAgdGhpcy5fZHJhd2luZ01vZHVsZSA9IG5ldyBEcmF3aW5nTW9kdWxlKHRoaXMuX3BhcGVyKTtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfTtcblxuICAgIC8vIEV4cG9ydCB0aGUgbW9kdWxlIHRvIG1ha2UgaXQgYWNjZXNzaWJsZVxuICAgIG1vZHVsZS5leHBvcnRzID0gUmF0aW5nV2lkZ2V0O1xuXG4gICAgUmF0aW5nV2lkZ2V0LnByb3RvdHlwZS5zZXRNb29kID0gZnVuY3Rpb24gKG1vb2QpIHtcbiAgICAgICAgdGhpcy5fbW9vZCA9IG1vb2Q7XG4gICAgfTtcblxuICAgIFJhdGluZ1dpZGdldC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fcGFwZXIuY2xlYXIoKTtcblxuICAgICAgICB0aGlzLmNpcmMgPSB0aGlzLl9wYXBlci5jaXJjbGUoTEVGVCwgQk9UVE9NLCBSQURJVVMpLmF0dHIoe2ZpbGw6ICcjMDAwJ30pO1xuICAgICAgICB0aGlzLm1vb2RfdGV4dCA9IHRoaXMuX3BhcGVyLnRleHQoTEVGVCwgQk9UVE9NLCAnTXlcXG5SYXRlJykuYXR0cih7ZmlsbDogJyNmZmYnfSk7XG5cbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICB0aGlzLmNpcmMubm9kZS5vbmNsaWNrID0gZnVuY3Rpb24oKXsgdGhhdC5zaG93KCk7fTtcbiAgICAgICAgdGhpcy5tb29kX3RleHQubm9kZS5vbmNsaWNrID0gZnVuY3Rpb24oKXsgdGhhdC5zaG93KCk7fTtcbiAgICB9O1xuXG4gICAgUmF0aW5nV2lkZ2V0LnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX21vb2Q7IGkgKz0gMSkge1xuICAgICAgICAgICAgdmFyIGNvbG9yID0gY29sb3JzW3RoaXMuX21vb2QgLSAxXTtcbiAgICAgICAgICAgIHZhciBzdGFydCA9IHtsZWZ0OiBMRUZULCBib3R0b206IEJPVFRPTX07XG4gICAgICAgICAgICB2YXIgZW5kID0ge2xlZnQ6IExFRlQgKyA0MiAqIChpICsgMSksIGJvdHRvbTogQk9UVE9NfTtcbiAgICAgICAgICAgIHZhciBkZWxheSA9IGkgKiA1MDtcbiAgICAgICAgICAgIHRoaXMuX2RyYXdpbmdNb2R1bGUuZHJhd0FuaW1hdGVkQ2lyY2xlKGNvbG9yLCBSQURJVVMsIHN0YXJ0LCBlbmQsIGRlbGF5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3BhcGVyLnRleHQoTEVGVCwgQk9UVE9NICsgMzAsIG1vb2RzW3RoaXMuX21vb2QgLSAxXSkuYXR0cih7ZmlsbDogY29sb3JzW3RoaXMuX21vb2QgLSAxXX0pO1xuICAgIH07XG5cbn0oKSk7XG5cbiJdfQ==
;