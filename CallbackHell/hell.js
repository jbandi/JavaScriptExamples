// Inspired by https://thenewcircle.com/s/post/1495/node_js_the_good_parts_a_skeptics_view_video

// Calculate (x + 5) * 3 with asynchronous functions
// Sequential: A => B => C

function times3(x, callback){
	setTimeout(function() {
		callback(x * 3)}, 500);
}

function plus5(x, callback){
    setTimeout(function(){
        callback(x + 5)}, 500);
}

function displayResult(z){
    console.log("Result:", z);
}

function plus5AndThenTimes3(x, callback){
    plus5(x, function(y){
        times3(y, callback);
    })
}

plus5AndThenTimes3(11, displayResult);


// Calculate x*3 + (x+5) with asynchronous functions
// Fork-Join: A and B => C

function sum(a, b, callback){
    setTimeout(function(){
        callback(a + b);
    }, 500);
}

function plus5PlusTimes3(x, callback){
    var p5, t3;
    function perhapsDone(){
        if (p5 && t3)
            sum(p5, t3, callback);
    };
    plus5(x, function(y){
        p5 = y;
        perhapsDone();
    });
    times3(x, function(y){
        t3 = y;
        perhapsDone();
    });
}

plus5PlusTimes3(10, displayResult);