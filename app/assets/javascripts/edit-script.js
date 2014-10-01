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
			case "Task":
				var string = "<li class='tasks'> <paper-checkbox class='handle'></paper-checkbox><span class='task-content editable' contenteditable='true'> Description of a task goes here </span></li>";
				var bullet_type = "task";
			break;
			case "Event":
				var string = "<li class='events'><core-icon icon='event' class='handle'></core-icon><span contenteditable='true' class='event-content' editable> Description of a Event goes here </span></li>";
				//find and embed target's position/bullet id?
				//embed entry id into entry div
				//find entry date (maybe add the entry number somewhere into the entry div)
				//figure out how to interpolation of javascript into ajax.
				var bullet_type = "event";
			break;
			case "Note":
				var string = "<li class='notes'><core-icon icon='keep' class='handle' id='heart' flex></core-icon><span contenteditable='true'class='note-content' editable> Description of a note goes here </span></li>";
				var bullet_type = "note";
			break;
			case "Idea":
				var string = "<li class='notes'><core-icon icon='drive-keep' class='handle' id='heart' flex></core-icon><span contenteditable='true'class='note-content' editable> Description of a Idea goes here </span></li>";
				var bullet_type = "idea";
			break;
			case "Explore":
				var string = "<li class='notes'><core-icon icon='explore' class='handle' id='heart' flex></core-icon><span contenteditable='true'class='note-content' editable> Description of a explore-note goes here </span></li>";
				var bullet_type = "explore";
			break;

			var string = "error";
		}
		//insert the html BEFORE the dropdown add bullet menu
		$(target).parent().parent().before(string);
		//determine the entry id of the where the bullet was made
		var entry_id = $(target).parent().parent().parent().parent().children().first().text().trim().replace(/[\n\t\r]/g,"");
		//determine the position number of the newly created bullet
		var position = $(target).parent().parent().index();
		//ajax the entry id, bullet type and its position to access controller, action create_bullet which will create a new bullet and append it to its current entry.
		$.ajax({url: "access/create_bullet", type: "POST", data: {bt: bullet_type, p: position, eid: entry_id}});

		
		//removing addlist, and creating a new one, maybe can figure out a better way of doing this
		var menuString = "<li class='add-list'><core-icon icon='add'></core-icon><paper-dropdown label='click to add new list'><core-icon class='addNew' icon='check'><span style='padding-left:30px'>Task</span></core-icon><br /><core-icon class='addNew' icon='event'><span style='padding-left:30px'>Event</span></core-icon><br /><core-icon class='addNew' icon='keep'><span style='padding-left:30px'>Note</span></core-icon><br /><core-icon class='addNew' icon='drive-keep'><span style='padding-left:30px'>Idea</span></core-icon><br /><core-icon class='addNew'  icon='explore'><span style='padding-left:30px'>Explore</span></core-icon><br /></paper-dropdown></li>";
		$(target).parent().parent().before(menuString);
		$(target).parent().parent().remove();

		//forget why we are calling this again... must investigate later.
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