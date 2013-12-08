var myModule = angular.module('CourseRater', []);

myModule.factory('courseRaterHelper', function($rootScope) {
    var buildIndex = function(source, property) {
        var tempArray = [];

        for(var i = 0, len = source.length; i < len; ++i) {
            tempArray[source[i][property]] = source[i];
        }

        return tempArray;
    };

    return {
        buildIndex: buildIndex
    };
});

myModule.factory('courseRaterModel', function($rootScope) {
    var getRatingChoice = function() {
        var tempArray = [
            {name:'Rubbish'},
            {name:'Not Good'},
            {name:'Ok'},
            {name:'Smily'},
            {name:'Great!'}
        ];
        return tempArray;
    };

    var getStories = function() {
        var tempArray = [
            {date:'2013-08-05', comment:'Description pending.', rating:'Rubbish', reporter:'Will Hunting'},
            {date:'2013-08-06', comment:'Description pending.', rating:'Ok', reporter:'Tyler Durden'}
        ];

        return tempArray;
    };

    return {
        getRatingChoice: getRatingChoice,
        getRatings: getStories   };
});

myModule.controller('MainCtrl', function($scope, courseRaterModel, courseRaterHelper) {
    $scope.currentRating;

    $scope.ratingChoices = courseRaterModel.getRatingChoice();
    $scope.ratings = courseRaterModel.getRatings();
    $scope.statusesIndex = courseRaterHelper.buildIndex($scope.ratingChoices, 'name');

    $scope.setCurrentRating = function(story) {
        $scope.currentRating = story;

        $scope.currentStatus = $scope.statusesIndex[story.rating];
    };

    $scope.createRating = function() {
        $scope.ratings.push({date: moment().format('YYYY-MM-DD'), comment:'Description pending.', rating:'Ok'});
    };

    $scope.setCurrentStatus = function(status) {
        if(typeof $scope.currentRating !== 'undefined') {
            $scope.currentRating.rating = status.name;
        }
    };
});

myModule.directive('ratingElement', function(){

    var render = function (scope, elem, attrs) {

        var DrawingModule =  function DrawingModule(paper){
            this._paper = paper;
        };

        DrawingModule.prototype.drawAnimatedCircle = function(color, radius, start, end, delay) {
            var that = this;
            setTimeout(function() {
                that._paper.circle(start.left, start.bottom, radius).attr({
                    "stroke": "none",
                    "fill": color
                }).animate({cx:end.left, cy: end.bottom , r:radius }, 2000, "bounce" ).toBack();
            }, delay);
        };

        var moods = ['Rubbish', 'Not Good', 'Ok', 'Smily', 'Great!'];
        var colors = ['#cc0000', '#a97e22', '#9f9136', '#7c9a2d', '#3a9a2d'];

        var LEFT = 30;
        var BOTTOM = 50;
        var RADIUS = 20;

        var RatingWidget = function RatingWidget(domElement, rating){
            this._mood = rating;
            this._paper = new Raphael(domElement, 350, 100);
            this._drawingModule = new DrawingModule(this._paper);
            this.init();
        };

        RatingWidget.prototype.setMood = function (mood) {
            this._mood = mood;
        };

        RatingWidget.prototype.init = function () {
            this._paper.clear();

            var circ = this._paper.circle(LEFT, BOTTOM, RADIUS).attr({fill: '#000'});
            var mood_text = this._paper.text(LEFT, BOTTOM, 'My\nRate').attr({fill: '#fff'});

            var that = this;
            circ.node.onclick = function(){ that.show();};
            mood_text.node.onclick = function(){ that.show();};
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


        var node = elem.children('div');
        if (node.length > 0){
            node.empty();
        }
            node=document.createElement("div");
            elem.append(node);

        var ratingWidget = new RatingWidget(node, moods.indexOf(scope.rating.rating)+1);
        ratingWidget.show();
    };

    return {
        restrict: 'A',
//        replace: true,
        templateUrl: "ratingElement.html",
        link: function(scope, elem, attrs){
            scope.$watch('rating', function () {
                console.log("******** directive usage");
                render(scope, elem, attrs);
            }, true);
        }
    }
});

angular.bootstrap($('#CourseRater'),['CourseRater']);

