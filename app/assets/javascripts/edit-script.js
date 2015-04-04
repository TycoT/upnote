

$(document).ready(function () {



	///////////////////////////////
	//	
	//		UPDATING BULLETS
	//
	//////////////////////////////
	var inTxt;
	var outTxt;
	//FOCUS IN LISTENER
	$(document).on("focusin", ".editable", function () {
	  inTxt = $(this).children().first().html().trim();
	  outTxt = "";
	  console.log(inTxt);
	  console.log(outTxt)
	});

	var enterPressed = false;
	//Enter listner for editable
		//moved to sublet keypress listner for enter, 13
	/*$(document).on("keypress", ".editable", function (event) {
	    if (event.keyCode == 13) {
	        event.preventDefault();
	        updateBulletController($(this));
	        enterPressed = true;
	        $(this).blur();
	    }
	});*/

	//FOCUS OUT LISTENER
	$(document).on("focusout", ".editable", function () {
		console.log(enterPressed);
		//if enter was pressed to submit, dont need to call update bullet function
		if(enterPressed == false){
	  		updateBulletController($(this));
	  	}
	  	enterPressed = false;
	  });

	function updateBulletController(target){
		outTxt = target.children().first().html().trim();
	  	console.log(inTxt);
	  	console.log(outTxt.length)
	  	
	  	if(inTxt != outTxt){
	  	 	if(outTxt.length < 65535){
				console.log("I:"+inTxt);
				console.log("O:"+outTxt);
				var bullet_id = target.parent().children().first().text().trim().replace(/[\n\t\r]/g,"");
				var text = target.children().first().html().trim();
				var entry_id = target.parent().parent().parent().children().first().text().trim().replace(/[\n\t\r]/g,"");
				updateBulletDescription(bullet_id, entry_id, text);
				
				//glowing effect to signify update to user
				originalColor = target.css("color");
				target.animate({
			        color: "rgb( 21, 255, 0 )"
			    }, 500);
			    target.animate({
			        color: originalColor
			    }, 300);

			}
			else{
				swal("Save Unsucessful", "Bullet max character of 65535 words. Save some trees!", "error")
			}
	  	}
	}

	//called when bullet form is focus'd out. Passes bullet id and description to access:update_bullet
	function updateBulletDescription(bulletID, entryID, desc){
		console.log("BulletID:"+bulletID);
		console.log("EntryID:"+entryID);
		console.log("Desc:"+desc);
		$.ajax({url: "access/update_bullet", type: "POST", data: {bid: bulletID, eid: entryID, d: desc}});
	}

	///////////////////////////
	//updating checkboxes
	//////////////////////////

	//check box listener
	$(document).on("mousedown", "paper-checkbox", function () {
		var bullet_id = $(this).parent().children().first().text().trim().replace(/[\n\t\r]/g,"");
		var entry_id = $(this).parent().parent().parent().children().first().text().trim().replace(/[\n\t\r]/g,"");
		var checked;
		if($(this).attr("aria-checked") == "true"){
			//flipped because it takes the attr value before tick changes
			checked = 0;
		}
		if($(this).attr("aria-checked") == "false")
		{
			checked = 1;
		}
		
		$.ajax({url: "access/update_bullet_task", type: "POST", data: {bid: bullet_id, eid: entry_id, c: checked}});
	});



	//////////////////////////////////
	//
	//		CREATING BULLETS
	//
	/////////////////////////////////
	//listener for adding new bullet 
	$(document).on("click", ".addNew", function () {
	  //gives menu options a selector method, via using its text
	  console.log($(this));
	  var addType = $(this).text().trim();

	  //method that will execute prepend a div of choosen bullet type
	  createEventBullet($(this), addType);
	});

	function createEventBullet(target, bulletType) {
		//switch statement to definte
		switch(bulletType){
			case "Task":
				var string = "<li class='tasks'><div class='newBullet' style='visibility:hidden; width:0px; height:0px;'><%= bullet.id %></div><paper-checkbox class='handle'></paper-checkbox><div class='task-content editable' contenteditable='false'><span contenteditable='true'> Description Placeholder </span> </div><core-icon-button class='expand-button' icon='expand-more' class='handle'></core-icon-button><core-icon class='delete-button new-delete-button' icon='backspace' class='handle'></core-icon></li>";
				var bullet_type = "task";
			break;
			case "Event":
				var string = "<li class='events'><div class='newBullet' style='visibility:hidden; width:0px; height:0px;'><%= bullet.id %></div><core-icon icon='event' class='handle'></core-icon><div contenteditable='false' class='event-content editable'><span contenteditable='true'> Description of a Event goes here </span></div><core-icon-button class='expand-button' icon='expand-more' class='handle'></core-icon-button><core-icon class='delete-button new-delete-button' icon='backspace' class='handle'></core-icon></li>";
				var bullet_type = "event";
			break;
			case "Note":
				var string = "<li class='notes'><div class='newBullet' style='visibility:hidden; width:0px; height:0px;'><%= bullet.id %></div><core-icon icon='keep' class='handle' id='heart' flex></core-icon><div contenteditable='false' class='note-content editable'><span contenteditable='true'>Description of a note goes here </span></div><core-icon-button class='expand-button' icon='expand-more' class='handle'></core-icon-button><core-icon class='delete-button new-delete-button' icon='backspace' class='handle'></core-icon></li>";
				var bullet_type = "note";
			break;
			case "Idea":
				var string = "<li class='notes'><div class='newBullet' style='visibility:hidden; width:0px; height:0px;'><%= bullet.id %></div><core-icon icon='drive-keep' class='handle' id='heart' flex></core-icon><div contenteditable='false' class='note-content editable'><span contenteditable='true'> Description of a Idea goes here </span> </div><core-icon-button class='expand-button' icon='expand-more' class='handle'></core-icon-button><core-icon class='delete-button new-delete-button' icon='backspace' class='handle'></core-icon></li>";
				var bullet_type = "idea";
			break;
			case "Explore":
				var string = "<li class='notes'><div class='newBullet' style='visibility:hidden; width:0px; height:0px;'><%= bullet.id %></div><core-icon icon='explore' class='handle' id='heart' flex></core-icon><div contenteditable='false' class='note-content editable'><span contenteditable='true'> Description of a explore-note goes here </span></div><core-icon-button class='expand-button' icon='expand-more' class='handle'></core-icon-button><core-icon class='delete-button new-delete-button' icon='backspace' class='handle'></core-icon></li>";
				var bullet_type = "explore";
			break;

			var string = "error";
		}
		//insert the html BEFORE the dropdown add bullet menu
		$(target).parent().parent().before(string);
		//select the text when the bullet is created
		console.log($(target).parent().parent().prev().children().eq(2).children().first().selectText());
		//determine the entry id of the where the bullet was made
		var entry_id = $(target).parent().parent().parent().parent().children().first().text().trim().replace(/[\n\t\r]/g,"");
		//determine the position number of the newly created bullet
		var position = $(target).parent().parent().index();
		//placeholder text
		var placeholder = "Please enter a description"
		//ajax the entry id, bullet type and its position to access controller, action create_bullet which will create a new bullet and append it to its current entry.
		$.ajax({url: "access/create_bullet", type: "POST", data: {bt: bullet_type, p: position, eid: entry_id, d: placeholder}});

		
		//removing addlist, and creating a new one, maybe can figure out a better way of doing this
		var menuString = "<li class='add-list' id='nosort'><core-icon icon='add'></core-icon><paper-dropdown label='click to add new list'><core-icon class='addNew' icon='check'><span style='padding-left:30px'>Task</span></core-icon><br /><core-icon class='addNew' icon='event'><span style='padding-left:30px'>Event</span></core-icon><br /><core-icon class='addNew' icon='keep'><span style='padding-left:30px'>Note</span></core-icon><br /><core-icon class='addNew' icon='drive-keep'><span style='padding-left:30px'>Idea</span></core-icon><br /><core-icon class='addNew'  icon='explore'><span style='padding-left:30px'>Explore</span></core-icon><br /></paper-dropdown></li>";
		$(target).parent().parent().before(menuString);
		$(target).parent().parent().remove();



	}

	////////////////////////////////
	//
	//		SORTING BULLETS
	//
	////////////////////////////////
	//sortable script

	//Jquery Sortable attributes
    $('.sortable').sortable({
    	handle: '.handle',
    	cancel: ':input,button,[contenteditable]',
    	items: 'li[id!=nosort]'
    });

    //BULLET POSITION LISNTER
    var initPosition;
    var finalPosition;
    //listen and store initial position whne MOUSE DOWN
    $(document).on("mousedown", ".handle", function () {
	  initPosition = $(this).parent().index();
	  console.log("IN"+initPosition);
	});
    //listen and store final position when MOUSE UP
	$(document).on("mouseup", ".handle", function () {
		$currentHandle = $(this)
	  	$(document).on("mouseout", $currentHandle, function () {
		  	finalPosition = $currentHandle.parent().index();
			console.log("OUT"+finalPosition)

			//if the initial and final position are different, call update position fucntion
			if(initPosition != finalPosition){
				//checks checkbox for tasks
				var checked;
				if($currentHandle.attr("aria-checked") == "true"){
					//flipped because it takes the attr value before tick changes
					checked = 1;
				}
				if($currentHandle.attr("aria-checked") == "false")
				{
					checked = 0;
				}
				console.log("Update Position from: "+initPosition+" to "+finalPosition);
				var bullet_id = $currentHandle.parent().children().first().text().trim().replace(/[\n\t\r]/g,"");
		  		var entry_id = $currentHandle.parent().parent().parent().children().first().text().trim().replace(/[\n\t\r]/g,"");
				updateBulletPosition(bullet_id, entry_id, initPosition, finalPosition, checked);
			}

			//unbind to exit event loop
			$(this).unbind('mouseout');
		});
	});

	function updateBulletPosition(bulletID, entryID, iPosition, ePosition, checkyo){
		console.log("BulletID:"+bulletID);
		console.log("EntryID:"+entryID);
		console.log("Old Position::"+iPosition);
		console.log("New Position:"+ePosition);
		console.log("Checked:"+checkyo)
		$.ajax({url: "access/update_bullet_position", type: "POST", data: {bid: bulletID, eid: entryID, iP: iPosition, eP:ePosition, c: checkyo}});
	}

	//listener for sorting checkboxes - reverse the tick

	///////////////////////////////
	//
	//		SUB BULLETS
	//
	////////////////////////////////

	//fade in and out when however over bullet
	$(document).on("mouseenter", "li", function () {
		$(this).find(".expand-button").fadeIn(500);
	});
	$(document).on("mouseleave", "li", function () {
		$(this).find(".expand-button").fadeOut(500);
	});

	//create subbullet right at bottom
	$(document).on("click", ".expand-button", function() {
		$sub_bullet = $(this).prev().children().first();
		createSubBullet($sub_bullet);
	});



	function createSubBullet(target){

		var indentString = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
		var breakLineTag = "<br />";
		//implement this check, because backquote is generated with the indent and outdent doc.exe methods, which cause the breaklines to mess up
		var string = target.html();
		var length = string.length;
		var temp = string.substring(length-11, length-1);	//get the last 10 character of the string
		//if subbullet is created after a tabbed previous subblet(contains backqoute), it appends without the break tag to format better.
		if(temp == "blockquote"){
			target.append(indentString+"-&nbsp;");
		}
		else{
			target.append(breakLineTag+indentString+"-&nbsp;");
		}
	}
	
	//keyboard shortcuts: tab to indent, shift-tab to oudent, shift-enter to create new bullet
	$(document).on('keydown', 'span', function(e) { 
	  var keyCode = e.keyCode || e.which; 

		if(e.keyCode == 9) {  
			if(e.shiftKey) {   
				document.execCommand('Outdent'); 
			}
			else {
				document.execCommand('Indent');
			}
			e.preventDefault();
		}

		if(e.keyCode == 13){
			if(e.shiftKey) {
				createSubBullet($(this));
			}
			else{
				updateBulletController($(this).parents('.editable'));
		        enterPressed = true;
		        $(this).parents('.editable').blur();
			}
			e.preventDefault();
		}

	  
	});



	

	////////////////////////////////
	//
	//		DELETING BULLETS
	//
	////////////////////////////////
	//	Involves triggers to delete bullets

	$(document).on("mouseenter", "li", function () {
		$(this).find(".delete-button").fadeIn(500);
	});
	$(document).on("mouseleave", "li", function () {
		$(this).find(".delete-button").fadeOut(500);
	});

	$(document).on("click", ".delete-button", function () {
		console.log("delete");
		var bullet_id = $(this).parent().children().first().text().trim().replace(/[\n\t\r]/g,"");
		var entry_id = $(this).parent().parent().parent().children().first().text().trim().replace(/[\n\t\r]/g,"");
		var $deletedBullet = $(this);
		swal({   
			title: "Are you sure?",   
			text: "Click Comfirm to permantly delete bullet!",   
			type: "warning",   
			showCancelButton: true, 
			},  
			function(){   
				deleteBullet(entry_id, bullet_id); 
				$deletedBullet.parent().remove();
			}
		);

		//Fast deletion, comment out swal above
		//deleteBullet(entry_id, bullet_id); 
		//$deletedBullet.parent().remove();

	});

	function deleteBullet(entryID, bulletID){
		$.ajax({url: "access/destroy_bullet", type: "POST", data: {bid: bulletID, eid: entryID}});
	}

	//selecttext functon for content editable divs
		jQuery.fn.selectText = function(){
		   var doc = document;
		   var element = this[0];
		   console.log(this, element);
		   if (doc.body.createTextRange) {
		       var range = document.body.createTextRange();
		       range.moveToElementText(element);
		       range.select();
		   } else if (window.getSelection) {
		       var selection = window.getSelection();        
		       var range = document.createRange();
		       range.selectNodeContents(element);
		       selection.removeAllRanges();
		       selection.addRange(range);
		   }
		};

	//////////////////////////////
	//
	//		Scrolling
	//
	///////////////////////////////
	$(document).on("click", "#returnUp-button", function () {
		$('core-scaffold::shadow core-header-panel::shadow #mainContainer').animate({ scrollTop: 0 }, "slow");
	});

	////////////////////////////////
	//
	//		Next/back week buttons
	//
	////////////////////////////////
	$(document).on("click", "#next-button", function () {
		//$('core-scaffold::shadow core-header-panel::shadow #mainContainer').animate({ scrollTop: 0 }, "slow");
		//$('.content').css("min-height", $('.content').height());

		var hide_call = false;
		//This function calls the number of times there are customcards. 2 cards, 2 calls.
		$("custom-card").hide("slide", { direction: "left" }, 500, function(
		) { 
			if(hide_call == false){
				$('#returnUp-button').remove();
				$('#next-button').remove();
				$('#back-button').remove();
				$.ajax({url: "access/next_week", type: "POST"});
				hide_call = true;
			}

		});
	});

	//BACK BUTTON
	$(document).on("click", "#back-button", function () {
		//$('core-scaffold::shadow core-header-panel::shadow #mainContainer').animate({ scrollTop: 0 }, "slow");
		//$('.content').css("min-height", $('.content').height());

		var hide_call = false;
		//This function calls the number of times there are customcards. 2 cards, 2 calls.
		$("custom-card").hide("slide", { direction: "right" }, 500, function(
		) { 
			if(hide_call == false){
				$('#returnUp-button').remove();
				$('#next-button').remove();
				$('#back-button').remove();
				$.ajax({url: "access/last_week", type: "POST"});
				hide_call = true;
			}

		});
	});

	$('.month-menu').click(function() {
	  var month_selected = $(this).attr("label");
	  $.ajax({url: "journal/index", type: "POST", data:{month: month_selected}});
	});


	//////////////////
	//
	//	NEXT/BACK MONTH BUTTONS
	//
	//////////////////
		$(document).on("click", "#next-month-button", function () {

		var hide_call = false;
		//This function calls the number of times there are customcards. 2 cards, 2 calls.
		$("#month-container").hide("slide", { direction: "left" }, 500, function(
		) { 
			if(hide_call == false){
				$.ajax({url: "journal/next_month", type: "POST"});
				hide_call = true;
			}

		});
	});

	//BACK BUTTON
	$(document).on("click", "#back-month-button", function () {
		//$('core-scaffold::shadow core-header-panel::shadow #mainContainer').animate({ scrollTop: 0 }, "slow");
		//$('.content').css("min-height", $('.content').height());

		var hide_call = false;
		//This function calls the number of times there are customcards. 2 cards, 2 calls.
		$("#month-container").hide("slide", { direction: "right" }, 500, function(
		) { 
			if(hide_call == false){
				$.ajax({url: "journal/last_month", type: "POST"});
				hide_call = true;
			}

		});
	});

	///////////////////
	//
	//	About Script
	//
	//////////////////
	$("#about").click(function(){
		console.log("toggled");
		document.querySelector('core-overlay').open();
		$("#about-tab").attr("core-selected", 0);
	});

	$("#about-paper-tabs").click(function(){
		if($("#about-tab").is(".core-selected")){
			$("#updates-overlay").slideUp();
			$("#contact-overlay").slideUp();
			$("#about-overlay").slideDown();
		}

		if($("#updates-tab").is(".core-selected")){
			$("#about-overlay").slideUp();
			$("#contact-overlay").slideUp();
			$("#updates-overlay").slideDown();
		}
		if($("#contact-tab").is(".core-selected")){
			$("#about-overlay").slideUp();
			$("#updates-overlay").slideUp();
			$("#contact-overlay").slideDown();
		}
	});

	////////////////////////////////////
	//			VIEW TAB
	//////////////////////////////////
	var title_name;
	$("#view-tab").click(function(){
		//store the title so when u go back to week view from month view, we can reload the title from where we left off
		
		if($("#week-tab").is(".core-selected")){
			console.log(title_name);
			$("#title").text(title_name);
			$("#month-container").fadeOut();
			$("#week-container").fadeIn();
			$('#month-container').remove();
			$('.content').after('<div layout="" vertical="" center="" id="month-container" style="display:none;"> <table id="month-container-table"> <tbody><tr> <td class="calender-day-names">SUN</td> <td class="calender-day-names">MON</td> <td class="calender-day-names">TUES</td> <td class="calender-day-names">WED</td> <td class="calender-day-names">THUR</td> <td class="calender-day-names">FRI</td> <td class="calender-day-names">SAT</td> </tr> <tr> <td class="calender-day"> <h1 flex="" class="day-date">__</h1> <div class="tiny-bullets"> <table> <tbody><tr class="calender-first-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> <tr class="calender-second-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> </tbody></table> </div> </td> <td class="calender-day"> <h1 flex="" class="day-date">__</h1> <div class="tiny-bullets"> <table> <tbody><tr class="calender-first-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> <tr class="calender-second-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> </tbody></table> </div> </td> <td class="calender-day"> <h1 flex="" class="day-date">__</h1> <div class="tiny-bullets"> <table> <tbody><tr class="calender-first-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> <tr class="calender-second-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> </tbody></table> </div> </td> <td class="calender-day"> <h1 flex="" class="day-date">__</h1> <div class="tiny-bullets"> <table> <tbody><tr class="calender-first-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> <tr class="calender-second-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> </tbody></table> </div> </td> <td class="calender-day"> <h1 flex="" class="day-date">__</h1> <div class="tiny-bullets"> <table> <tbody><tr class="calender-first-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> <tr class="calender-second-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> </tbody></table> </div> </td> <td class="calender-day"> <h1 flex="" class="day-date">__</h1> <div class="tiny-bullets"> <table> <tbody><tr class="calender-first-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> <tr class="calender-second-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> </tbody></table> </div> </td> <td class="calender-day"> <h1 flex="" class="day-date">__</h1> <div class="tiny-bullets"> <table> <tbody><tr class="calender-first-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> <tr class="calender-second-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> </tbody></table> </div> </td> </tr> <tr> <td class="calender-day"> <h1 flex="" class="day-date">__</h1> <div class="tiny-bullets"> <table> <tbody><tr class="calender-first-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> <tr class="calender-second-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> </tbody></table> </div> </td> <td class="calender-day"> <h1 flex="" class="day-date">__</h1> <div class="tiny-bullets"> <table> <tbody><tr class="calender-first-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> <tr class="calender-second-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> </tbody></table> </div> </td> <td class="calender-day"> <h1 flex="" class="day-date">__</h1> <div class="tiny-bullets"> <table> <tbody><tr class="calender-first-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> <tr class="calender-second-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> </tbody></table> </div> </td> <td class="calender-day"> <h1 flex="" class="day-date">__</h1> <div class="tiny-bullets"> <table> <tbody><tr class="calender-first-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> <tr class="calender-second-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> </tbody></table> </div> </td> <td class="calender-day"> <h1 flex="" class="day-date">__</h1> <div class="tiny-bullets"> <table> <tbody><tr class="calender-first-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> <tr class="calender-second-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> </tbody></table> </div> </td> <td class="calender-day"> <h1 flex="" class="day-date">__</h1> <div class="tiny-bullets"> <table> <tbody><tr class="calender-first-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> <tr class="calender-second-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> </tbody></table> </div> </td> <td class="calender-day"> <h1 flex="" class="day-date">__</h1> <div class="tiny-bullets"> <table> <tbody><tr class="calender-first-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> <tr class="calender-second-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> </tbody></table> </div> </td> </tr> <tr> <td class="calender-day"> <h1 flex="" class="day-date">__</h1> <div class="tiny-bullets"> <table> <tbody><tr class="calender-first-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> <tr class="calender-second-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> </tbody></table> </div> </td> <td class="calender-day"> <h1 flex="" class="day-date">__</h1> <div class="tiny-bullets"> <table> <tbody><tr class="calender-first-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> <tr class="calender-second-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> </tbody></table> </div> </td> <td class="calender-day"> <h1 flex="" class="day-date">__</h1> <div class="tiny-bullets"> <table> <tbody><tr class="calender-first-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> <tr class="calender-second-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> </tbody></table> </div> </td> <td class="calender-day"> <h1 flex="" class="day-date">__</h1> <div class="tiny-bullets"> <table> <tbody><tr class="calender-first-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> <tr class="calender-second-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> </tbody></table> </div> </td> <td class="calender-day"> <h1 flex="" class="day-date">__</h1> <div class="tiny-bullets"> <table> <tbody><tr class="calender-first-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> <tr class="calender-second-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> </tbody></table> </div> </td> <td class="calender-day"> <h1 flex="" class="day-date">__</h1> <div class="tiny-bullets"> <table> <tbody><tr class="calender-first-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> <tr class="calender-second-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> </tbody></table> </div> </td> <td class="calender-day"> <h1 flex="" class="day-date">__</h1> <div class="tiny-bullets"> <table> <tbody><tr class="calender-first-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> <tr class="calender-second-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> </tbody></table> </div> </td> </tr> <tr> <td class="calender-day"> <h1 flex="" class="day-date">__</h1> <div class="tiny-bullets"> <table> <tbody><tr class="calender-first-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> <tr class="calender-second-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> </tbody></table> </div> </td> <td class="calender-day"> <h1 flex="" class="day-date">__</h1> <div class="tiny-bullets"> <table> <tbody><tr class="calender-first-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> <tr class="calender-second-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> </tbody></table> </div> </td> <td class="calender-day"> <h1 flex="" class="day-date">__</h1> <div class="tiny-bullets"> <table> <tbody><tr class="calender-first-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> <tr class="calender-second-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> </tbody></table> </div> </td> <td class="calender-day"> <h1 flex="" class="day-date">__</h1> <div class="tiny-bullets"> <table> <tbody><tr class="calender-first-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> <tr class="calender-second-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> </tbody></table> </div> </td> <td class="calender-day"> <h1 flex="" class="day-date">__</h1> <div class="tiny-bullets"> <table> <tbody><tr class="calender-first-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> <tr class="calender-second-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> </tbody></table> </div> </td> <td class="calender-day"> <h1 flex="" class="day-date">__</h1> <div class="tiny-bullets"> <table> <tbody><tr class="calender-first-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> <tr class="calender-second-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> </tbody></table> </div> </td> <td class="calender-day"> <h1 flex="" class="day-date">__</h1> <div class="tiny-bullets"> <table> <tbody><tr class="calender-first-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> <tr class="calender-second-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> </tbody></table> </div> </td> </tr> <tr> <td class="calender-day"> <h1 flex="" class="day-date">__</h1> <div class="tiny-bullets"> <table> <tbody><tr class="calender-first-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> <tr class="calender-second-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> </tbody></table> </div> </td> <td class="calender-day"> <h1 flex="" class="day-date">__</h1> <div class="tiny-bullets"> <table> <tbody><tr class="calender-first-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> <tr class="calender-second-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> </tbody></table> </div> </td> <td class="calender-day"> <h1 flex="" class="day-date">__</h1> <div class="tiny-bullets"> <table> <tbody><tr class="calender-first-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> <tr class="calender-second-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> </tbody></table> </div> </td> <td class="calender-day"> <h1 flex="" class="day-date">__</h1> <div class="tiny-bullets"> <table> <tbody><tr class="calender-first-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> <tr class="calender-second-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> </tbody></table> </div> </td> <td class="calender-day"> <h1 flex="" class="day-date">__</h1> <div class="tiny-bullets"> <table> <tbody><tr class="calender-first-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> <tr class="calender-second-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> </tbody></table> </div> </td> <td class="calender-day"> <h1 flex="" class="day-date">__</h1> <div class="tiny-bullets"> <table> <tbody><tr class="calender-first-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> <tr class="calender-second-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> </tbody></table> </div> </td> <td class="calender-day"> <h1 flex="" class="day-date">__</h1> <div class="tiny-bullets"> <table> <tbody><tr class="calender-first-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> <tr class="calender-second-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> </tbody></table> </div> </td> </tr> <tr> <td class="calender-day"> <h1 flex="" class="day-date">__</h1> <div class="tiny-bullets"> <table> <tbody><tr class="calender-first-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> <tr class="calender-second-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> </tbody></table> </div> </td> <td class="calender-day"> <h1 flex="" class="day-date">__</h1> <div class="tiny-bullets"> <table> <tbody><tr class="calender-first-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> <tr class="calender-second-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> </tbody></table> </div> </td> <td class="calender-day"> <h1 flex="" class="day-date">__</h1> <div class="tiny-bullets"> <table> <tbody><tr class="calender-first-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> <tr class="calender-second-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> </tbody></table> </div> </td> <td class="calender-day"> <h1 flex="" class="day-date">__</h1> <div class="tiny-bullets"> <table> <tbody><tr class="calender-first-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> <tr class="calender-second-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> </tbody></table> </div> </td> <td class="calender-day"> <h1 flex="" class="day-date">__</h1> <div class="tiny-bullets"> <table> <tbody><tr class="calender-first-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> <tr class="calender-second-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> </tbody></table> </div> </td> <td class="calender-day"> <h1 flex="" class="day-date">__</h1> <div class="tiny-bullets"> <table> <tbody><tr class="calender-first-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> <tr class="calender-second-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> </tbody></table> </div> </td> <td class="calender-day"> <h1 flex="" class="day-date">__</h1> <div class="tiny-bullets"> <table> <tbody><tr class="calender-first-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> <tr class="calender-second-row"> <td></td> <td></td> <td></td> <td></td> <td></td> </tr> </tbody></table> </div> </td> </tr> </tbody></table> <!-- next and prev month buttons--> <div id="bottom-buttons"> <paper-icon-button id="back-month-button" icon="chevron-left" role="button" tabindex="0" aria-label="chevron-left"></paper-icon-button> <paper-icon-button id="next-month-button" icon="chevron-right" role="button" tabindex="0" aria-label="chevron-right"></paper-icon-button> </div> </div>');

		}

		if($("#month-tab").is(".core-selected")){
			title_name = $("#title").text();
			$("#week-container").fadeOut();
			$("#month-container").fadeIn();
			var year_selected = $(".custom-card:first").children().eq(2).text().split(" ")[5];
			var month_selected = $(".custom-card:first").children().eq(2).text().split(" ")[2];
			$.ajax({url: "journal/month_calender", type: "POST", data:{month: month_selected, year: year_selected}});

		}
	});


	//////////////////
	//		login
	////////////////

	$("#login-paper-tabs").click(function(){
		if($("#login-tab").is(".core-selected")){
			$("#signup-form").hide();
			$("#login-form").slideDown();
		}

		if($("#signup-tab").is(".core-selected")){
			$("#login-form").hide();
			$("#signup-form").slideDown();
		}

	});


	///////////////
	//	add month
	//////////////

	$("#add-month").click(function(){
		console.log("add month")
		$.ajax({url: "access/create_new_month", type: "POST"});
	});

	///////////////////
	//	login buttons
	/////////////////
	$(document).on("click", "#form-button", function () {
		console.log($(this).parent());
		$(this).parent().parent().submit();
	});


	///////////////////
	// SCALING 
	///////////////////

	$( window ).resize(function() {
		//View tabs
	  if($("#week-tab").is(".core-selected")){
	  	$("#view-tab").width($(".custom-card:first").outerWidth());
	  }
	  if($("#month-tab").is(".core-selected")){
	  	$("#view-tab").width($("#month-container table").outerWidth());
	  }
	  //drawer when height > width
	  if(($(window).height()) > ($(window).width())){
	  	//document.querySelector('core-scaffold').closeDrawer();
	  	console.log("Pull drawer");
	  }

	});




});

$( window ).load(function() {
  $('core-scaffold::shadow core-header-panel::shadow #mainContainer').animate({ scrollTop: $('.today').offset().top-123}, "slow");
  $("#view-tab").width($(".custom-card:first").outerWidth());
});


