/*global alert: false */
/*jslint browser: true */
(function (global) {
	
	var dialog = $("#dialog");
	
	dialog.on("click", "footer button", function (ev) {
		var target = $(ev.target),
			action = target.data("action");
			
		if (action === "cancel") {
			// task-1: trigger custom event 'cancel.myApp'
			// hint: http://api.jquery.com/trigger/
			// [...]
		} else if (action === "save") {
			// task-2: fire a custom event 'save.myApp' and pass an object 
			//         with 'password' and 'email' properties. Get the values
			//         of the properties from the UI (input elements)
			// hint: http://api.jquery.com/trigger/
			// [...]
			// [...]
			// [...]
			// [...]
		}
		
		ev.preventDefault();
		ev.stopPropagation();
	});
	

	// task-1: listen to 'cancel.myApp' event and clear all input fields
	// [...]
	// [...]
	// [...]
	
	// listens the custom 'save.myApp' event
	dialog.on("save.myApp", function (ev, data) {
		alert("custom: " + JSON.stringify(data));
	});
	
	
	/*
	assert in webbrowser:
	=========================
		(task-1) on clicking the cancel-button the dialog form is cleared
		(task-2) on clicking the save-button an alert shows the data of all form inputs
	*/
}(this));
