/* global $ */

$(function () {
    "use strict";

    var RatingWidget  = window.rating.RatingWidget;
    var ratingWidget = new RatingWidget($('#canvas_container')[0]);

    $('#moodNumber').change(function() {
        ratingWidget.setMood($("input#moodNumber").val());
    });

    $("#runCode").click(function() {
        ratingWidget.show();
    });
});