(function (global) {
	// task: select the left (class=trigger) and right image (class=target) 
	var trigger = $("REPLACE_ME"),
		target = $("REPLACE_ME");
	
	
	// task-1: register mouseover event to trigger using jquery api
	// ---------------------------------------------
	// hint: trigger.on(...)
	// see: http://api.jquery.com/on/
	// [...] INSERT HERE
		// add class 'animate' to target image: must be called on mouse over
		target.addClass("animate");
	// [...] INSERT HERE
	
	
	
	// task-2: register mouseout event to trigger
	// ---------------------------------------------
	// [...] INSERT HERE
		// add class 'animate' to target image: must be called on mouse out
		target.removeClass("animate");
	// [...] INSERT HERE
	
	
	
	// task-3: stop propagation and default processing on click
	// ---------------------------------------------
	$("img").on("click", function (ev) {
		// INSERT HERE: avoid further propagation of event
		// [...]
		// see: http://api.jquery.com/event.preventDefault/
		// INSERT HERE: avoid processing of default action 
		// [...]
		// see: http://api.jquery.com/event.stopPropagation/
	});
	
	// catch leaking clicks on image at top of the DOM (document)
	$(document).on("click", "img", function (ev) {
		alert("Verhindere das Propagieren der Events");
	});
	
	/*
	assert in webbrowser:
	=========================
		(task-1) hover over the left image lets the right image start to spin
		(task-2) right image stops spinning on mouse out of the left image
		(task-3) clicking the left image does not show an alert bar
	*/
}(this));