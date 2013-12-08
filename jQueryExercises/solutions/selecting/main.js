(function () {
	// task 1 ==> select first image by id (id="antonin")
	$("#antonin").addClass("badge");
	
	// task 2 ==> select first image by class (class="diego")
	$(".diego").addClass("badge");
	
	// task 3 ==> select all 'section' elements within element of class 'image-container' 
	//  (<div class="image-container"><section/></div>)
	$(".image-container section").addClass("badge");
	
	// task 4 ==> select the img element inside the 4th .image-container element
	// <div class="image-container"></div>
	// <div class="image-container"></div>
	// <div class="image-container"></div>
	// <div class="image-container"><img></div>   <===== 4th .image-container
	$(".image-container:nth-child(4) > img").addClass("badge");
	
	// task 5 ==> select the 'section' element which is a direct child of the body
	$("body > section").removeClass("badge");
	
	// check resulting browser view: 4 badges with a football player are shown in a grid
}());