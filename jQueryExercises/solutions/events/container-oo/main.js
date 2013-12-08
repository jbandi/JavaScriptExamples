/*global alert: false */
/*jslint browser: true */
(function (global) {
	
	var Dialog = function (spec) {
		this.spec = spec;
		// task-1: select container with by id from 'spec.id'
		this.container = $("#" + spec.id);
		// delegate button clicks
		this.container.on("click", $.proxy(this.delegate, this));
	};
	
	Dialog.prototype.delegate = function (ev) {
		var target = $(ev.target),
			action = target.data("action");
		
		if (action === "save") {
			// task-2: fire customer event 'save.myApp' and pass a data object 
			//         with 'password' and 'email' properties
			this.container.trigger("save.myApp", {
				password: this.container.find("[name=password]").val(),
				email: this.container.find("[name=email]").val(),
			});
		} else if (action === "cancel") {
			// task-3: find all input elements in the conainer and 
			//         set it value to an empty string
			// [...]
			this.container.find("input").val("");
			// task-4: add class 'away' to the container of the dialog 
			//         to animate the dialog off the screen
			// [...]
			this.container.addClass("away");
		}
		ev.preventDefault();
		ev.stopPropagation();
	};

	// task-5: expose Dialog to global.Dialog to be accessible in the global space
	global.Dialog = Dialog;
}(this));


var dialog = new Dialog({
	id: "dialog"
});


// here the custom event is catched 
// and the data argument shown as an alert
dialog.container.on("save.myApp", function (ev, data) {
	alert("form data: " + JSON.stringify(data));
});
