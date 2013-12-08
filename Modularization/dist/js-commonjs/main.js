/* global $ */

$(function () {
    "use strict";

    var RatingWidget  = require("./rating_widget.js");
    var ratingWidget = new RatingWidget($('#canvas_container')[0]);

    $('#moodNumber').change(function() {
        ratingWidget.setMood($("input#moodNumber").val());
    });

    $("#runCode").click(function() {
        ratingWidget.show();
    });
});

