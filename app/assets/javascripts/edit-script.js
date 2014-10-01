$(document).ready(function () {
	$( ".editable" ).focusin(function() {
	  console.log($(this).text());
	});

	$( ".editable" ).focusout(function() {
	  console.log("out");
	});

	$( ".addNew" ).click(function() {

	  //gives menu options a selector method, via using its text
	  var addType = $(this).text().trim();

	  //method that will execute prepend a div of choosen bullet type
	  createEventBullet($(this), addType);

	});

	function createEventBullet(target, bulletType) {
		//switch statement to definte
		switch(bulletType){
			case "Event":
				var string = "<div class='events'><core-icon icon='event'></core-icon><span contenteditable='true' class='event-content'> Description of a Event goes here </span></div>";
				//find and embed target's position/bullet id?
				//embed entry id into entry div
				//find entry date (maybe add the entry number somewhere into the entry div)
				//figure out how to interpolation of javascript into ajax.
				$.ajax({url: "access/create_bullet", type: "POST", data: {bullet_type: 'event', position: '7'}});
			break;
			case "Task":
				var string = "<div class='tasks' contenteditable='false'> <paper-checkbox></paper-checkbox><span contenteditable='true' class='task-content editable' contenteditable='true'> Description of a Task goes here </span></div>";
			break;
			case "Note":
				var string = "<div class='notes'><core-icon icon='keep' id='heart' flex></core-icon><span contenteditable='true' class='note-content'> Description of a Note goes here </span></div>";
			break;
			case "Idea":
				var string = "";
			break;
			case "Explore":
				var string = "";
			break;

			var string = "error";
		}
		$(target).parent().parent().before(string);

		
		//removing addlist, and creating a new one because cannot figure out how to work it
		
		var menuString = "<div class='add-list'><core-icon icon='add'></core-icon><paper-dropdown label='click to add new list'><core-icon class='addNew' icon='event'><span style='padding-left:30px'>Event</span></core-icon><br /><core-icon class='addNew' icon='check'><span style='padding-left:30px'>Task</span></core-icon><br /><core-icon class='addNew' icon='keep'><span style='padding-left:30px'>Note</span></core-icon><br /><core-icon class='addNew' icon='drive-keep'><span style='padding-left:30px'>Idea</span></core-icon><br /><core-icon class='addNew' icon='explore'><span style='padding-left:30px'>Explore</span></core-icon><br /></paper-dropdown></div>";
		$(target).parent().parent().before(menuString);
		$(target).parent().parent().remove();

		$( ".addNew" ).click(function() {

		  //gives menu options a selector method, via using its text
		  var addType = $(this).text().trim();

		  //method that will execute prepend a div of choosen bullet type
		  createEventBullet($(this), addType);

		});

	}




	//sortable script

    $('.sortable').sortable({
    	handle: '.handle',
    	cancel: ':input,button,[contenteditable]'
    });



});