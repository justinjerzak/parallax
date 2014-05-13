/************************************************************************************************
Parts derived and inspired from http://blog.sklambert.com/html5-canvas-game-panning-a-background/
************************************************************************************************/

// set up parallax
var parallax = new Parallax();
//set auto scroll option
var auto = true;
//auto scroll controls
function autoOn(){
	auto = true;	
}
function autoOff(){
	auto = false;	
}

//initiate parallax
function init() {
	if(parallax.init())
		parallax.start();
}

//get images for paralaxx
var imageRepository = new function() {
	
	this.layer1 = new Image();
	this.layer2 = new Image();
	this.layer3 = new Image();
	this.layer4 = new Image();
	
    //total images you want to upload
	var numImages = 4;
    //variable to make sure all images load
	var numLoaded = 0;
    //loop function that will initiate the window once the number of images uploaded equals the number of images wanted
	function imageLoaded() {
		numLoaded++;
		if(numLoaded === numImages) {
			window.init();
		}
	}
	this.layer1.onload = function(){
		imageLoaded();
	}
	this.layer2.onload = function(){
		imageLoaded();
	}
	this.layer3.onload = function(){
		imageLoaded();
	}
	this.layer4.onload = function(){
		imageLoaded();
	}
	
	
	// define image src
	this.layer1.src = "assets/Layer_1.png";
	this.layer2.src = "Assets/Layer_2.png";
	this.layer3.src = "Assets/Layer_3.png";
	this.layer4.src = "Assets/Layer_4.png";
	
	}
	//make the canvas active for drawing
	function Drawable() {
	this.init = function(x, y, width, height) {
		// Default variables
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}
	this.speed = 0;
	this.canvasWidth = 0;
	this.canvasHeight = 0;
	// function will be used in child objects
	this.draw = function() {
	};
}



//check key presses for key scrolling
document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '37' && auto==false) {
        // left arrow
		parallax.layer1.x -= parallax.layer1.speed * 5;
		parallax.layer2.x -= parallax.layer2.speed * 5;
		parallax.layer3.x -= parallax.layer3.speed * 5;
		parallax.layer4.x -= parallax.layer4.speed * 5;
		
    }
    else if (e.keyCode == '39' && auto==false) {
        // right arrow
		parallax.layer1.x += parallax.layer1.speed * 5;
		parallax.layer2.x += parallax.layer2.speed * 5;
		parallax.layer3.x += parallax.layer3.speed * 5;
		parallax.layer4.x += parallax.layer4.speed * 5;
		
    }
}


//start adding layers to the canvas element for scrolling
function Layer_1() {
    // panning speed
	this.speed = 1; 
	// add draw function
	this.draw = function() {
		// start panning the image if auto is true
	if(auto==true){
	this.x -= this.speed;
	}
		this.context.drawImage(imageRepository.layer1, this.x, this.y, this.canvasWidth, this.canvasHeight);
		// "draw" a duplicate image the right of the original image
		this.context.drawImage(imageRepository.layer1, this.x + this.canvasWidth, this.y, this.canvasWidth, this.canvasHeight);
        // "draw" a duplicate image the left of the original image
		this.context.drawImage(imageRepository.layer1, this.x - this.canvasWidth, this.y, this.canvasWidth, this.canvasHeight);
		// if the image is scrolled off the screen it will be reset in its original position
		if (this.x <= 0 - this.canvasWidth)
			this.x = 0;
			else if (this.x >= this.canvasWidth )
			this.x = 0;
	};
}

function Layer_2() {
	this.speed = 2; 
	
	this.draw = function() {
	
		if(auto==true){
	this.x -= this.speed;
	}
		this.context.drawImage(imageRepository.layer2, this.x, this.y , this.canvasWidth , this.canvasHeight );
		this.context.drawImage(imageRepository.layer2, this.x + this.canvasWidth, this.y , this.canvasWidth, this.canvasHeight );
		this.context.drawImage(imageRepository.layer2, this.x - this.canvasWidth, this.y, this.canvasWidth, this.canvasHeight);
	
		if (this.x <= 0 - this.canvasWidth)
			this.x = 0;
			else if (this.x >= this.canvasWidth)
			this.x = 0;
	};
}
function Layer_3() {
	this.speed = 4; 
	this.draw = function() {
		
	if(auto==true){
	this.x -= this.speed;
	}
		this.context.drawImage(imageRepository.layer3, this.x , this.y, this.canvasWidth, this.canvasHeight);
		this.context.drawImage(imageRepository.layer3, this.x + this.canvasWidth, this.y, this.canvasWidth, this.canvasHeight);
		this.context.drawImage(imageRepository.layer3, this.x - this.canvasWidth, this.y, this.canvasWidth, this.canvasHeight);
	
		if (this.x <= 0 - this.canvasWidth)
			this.x = 0;
			else if (this.x >= this.canvasWidth )
			this.x = 0;
	};
}
function Layer_4() {
	this.speed = 8;
	this.draw = function() {
		
		if(auto==true){
	this.x -= this.speed;
	}
		this.context.drawImage(imageRepository.layer4, this.x , this.y, this.canvasWidth, this.canvasHeight );
		this.context.drawImage(imageRepository.layer4, this.x + this.canvasWidth, this.y , this.canvasWidth, this.canvasHeight );
		this.context.drawImage(imageRepository.layer4, this.x - this.canvasWidth, this.y, this.canvasWidth, this.canvasHeight);

		if (this.x <= 0 - this.canvasWidth)
			this.x = 0;
			else if (this.x >= this.canvasWidth )
			this.x = 0;
	};
};

// Set the images to inherit properties from Drawable
Layer_1.prototype = new Drawable();
Layer_2.prototype = new Drawable();
Layer_3.prototype = new Drawable();
Layer_4.prototype = new Drawable()


//create the parallax funtion which will control the parallax scroll
function Parallax() {
	//get canvas info and context and check if its supported
	this.init = function() {
		// Get the canvas element
		this.Canvas = document.getElementById("parallaxScroll");
		
		// Test to see if it is supported
		if (this.Canvas.getContext) {
			this.Context = this.Canvas.getContext("2d");
			
			// Initialize objects 
			Layer_1.prototype.context = this.Context;
			Layer_1.prototype.canvasWidth = this.Canvas.width;
			Layer_1.prototype.canvasHeight = this.Canvas.height;
		
			// Initialize image object
			this.layer1 = new Layer_1();
			this.layer1.init(0,0); // draw at (0,0)
			
			Layer_2.prototype.context = this.Context;
			Layer_2.prototype.canvasWidth = this.Canvas.width;
			Layer_2.prototype.canvasHeight = this.Canvas.height ;
			
			this.layer2 = new Layer_2();
			this.layer2.init(0,0); 
            
			Layer_3.prototype.context = this.Context;
			Layer_3.prototype.canvasWidth = this.Canvas.width;
			Layer_3.prototype.canvasHeight = this.Canvas.height ;
			
			this.layer3 = new Layer_3();
			this.layer3.init(0,0); 
            
			Layer_4.prototype.context = this.Context;
			Layer_4.prototype.canvasWidth = this.Canvas.width;
			Layer_4.prototype.canvasHeight = this.Canvas.height ;
		
			this.layer4 = new Layer_4();
			this.layer4.init(0,0); 
			
			return true;
		} else {
			return false;
		}
	};
		this.start = function() {
		
		animate();
	};
}
	
	
//global function which call the requestAnimFrame to start the scroll and draw the objects
function animate() {
	requestAnimFrame( animate );
	
	parallax.layer1.draw();
	parallax.layer2.draw();
	parallax.layer3.draw();
	parallax.layer4.draw();
}
/**
 * requestAnim shim layer by Paul Irish
 * Finds the first API that works to optimize the animation loop,
 * otherwise defaults to setTimeout().
 */
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame   ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame      ||
			window.msRequestAnimationFrame     ||
			
			function(/* function */ callback, /* DOMElement */ element){
				window.setTimeout(callback, 1000 / 60);
			};
})();