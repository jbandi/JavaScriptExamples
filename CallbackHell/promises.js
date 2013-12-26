// Inspired by https://thenewcircle.com/s/post/1495/node_js_the_good_parts_a_skeptics_view_video

var when = require('when');

function displayResult(z){
    console.log("Result:", z);
}

function times3(x){
    var deferred = when.defer();
    setTimeout(function(){
        deferred.resolve(x * 3)
    }, 500);
    return deferred.promise;
}

function plus5(x){
    var deferred = when.defer();
    setTimeout(function(){
        deferred.resolve(x + 5)
    }, 500);
    return deferred.promise;
}

function plus5AndThenTimes3(x){
    return plus5(x).then(times3);
}

plus5AndThenTimes3(11).then(displayResult);


function sum(a, b){
    var deferred = when.defer();
    setTimeout(function(){
        deferred.resolve(a + b);
    }, 500);
    return deferred.promise;
}

function plus5PlusTimes3(x){
    var p5 = plus5(x),
        t3 = times3(x);

    return when.join(p5, t3).spread(sum);
}

plus5PlusTimes3(10).then(displayResult);