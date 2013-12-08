/*global alert: false */
/*jslint browser: true */
(function (global) {
	
	// task-1: select container element (id=dialog)
	var dialog = $("REPLACE_ME");
	console.log("dialog found?", !!dialog.length);
	
	// task-2: catch all clicks on buttons in the footer of the dialog
	// see: http://api.jquery.com/on/
	dialog.on("REPLACE_ME", "REPLACE_ME", function (ev) {
		
		console.log("node clicked: " , ev.target.nodeName);
		
		var target = $(ev.target),
			action = REPLACE_ME; // task-3: [...] get value of attribute 
								 //    'data-action' of the target element
		
		if (action === "save") {
			alert(dialog.serialize());
		} else if (action === "cancel") {
			dialog.find("[name=password]").val("");
			dialog.find("[name=email]").val("");
		}
		
		ev.preventDefault();
		ev.stopPropagation();
	});
	/*
	assert in webbrowser:
	=========================
		(task-1) "dialog found? true" 	appears in console log of firebug/webtools
		(task-2) "node clicked: BUTTON" appears in console log of firebug/webtools
		(task-3) - click on "cancel" clears all fields of dialog
				 - click on "save" shows alert with form values
	*/
}(this));