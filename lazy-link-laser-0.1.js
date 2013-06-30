//http://css-tricks.com/examples/AnythingZoomer/use.php

//Draw a mark somewhere for tracking anchor hit boxes
function drawMark(x, y){

}

//Get minimum distance between an anchor and the cursor
function getDistance(cursorX, cursorY, element){
	return getDistanceHypotenuse(
		cursorX, 
		cursorY, 
		getCenterX(element), 
		getCenterY(element)
	);
}

function getDistanceHypotenuse(x1, y1, x2, y2){
	return Math.sqrt(
		((x1 - x2) * (x1 - x2))
		+
		((y1 - y2) * (y1 - y2))
	);
}


function getCenterX(element){
	return getMinX(element) + ($(element).width() / 2);
}

function getCenterY(element){
	return getMinY(element) + ($(element).height() / 2);
}

function getMinX(element){
	return element.offsetLeft;
}

function getMaxX(element){
	return getMinY(element) + $(element).width();
}

function getMinY(element){
	return element.offsetTop;
}

function getMaxY(element){
	return getMinY(element) + $(element).height();
}

function handleMouse(event){
	if(!event.ctrlKey){
		return;
	}
	
//			console.log(event);
//			console.log("Which: " + event.which);

	var minDistance = null;			
	var minElement = null;
	
	$('a').each(function(){
		$(this).css('color', 'black');
		var distance = getDistance(event.pageX, event.pageY, this);
		if(minDistance === null || distance < minDistance){
			minDistance = distance;
			minElement = this;
		}
	});
	
//			console.log("Closest element is: ");
//			console.log(minElement);
	
	var destination = $(minElement).attr('href');
	
	if(event.which == 1){
		if(destination !== undefined && destination.length){
			window.location = destination;
		}
	}
	else if(event.which == 0){
		//Turn the nearest one red and all others nothing
		$(minElement).css('color', 'red');
	}
}

function getTextNodeHeight(textNode) {
	var height = 0;
	if (document.createRange) {
		var range = document.createRange();
		range.selectNodeContents(textNode);
		if (range.getBoundingClientRect) {
			var rect = range.getBoundingClientRect();
			if (rect) {
				height = rect.bottom - rect.top;
			}
		}
	}
	return height;
}

$(document).ready(function(){
	console.log("loading lazy link laser");
	$(document).mousemove(function(e){		
		handleMouse(e);
	});

	$(document).click(function(e){		
		handleMouse(e);
	});
	$('<p>Press and hold the ctrl-key while moving the mouse to activate the lazy link laser</p>').prependTo('body');
	console.log("done loading lazy link laser");
});