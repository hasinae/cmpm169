// sketch.js - Experiment 4: Images, Video, & Sound Art
// Author: Hasina Esteqlal
// Date: 12/30/2025

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

/*
What I am going for: I am trying to involve a glitch aesthetic where I apply distortions, 
to an image to create a glitch-inspired artwork but I will be using a live camera that uses the camera as the image. 

http://www.generative-gestaltung.de/2/sketches/?01_P/P_4_3_3_01
https://openprocessing.org/sketch/2246263 
https://openprocessing.org/sketch/1619397
*/

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;

class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }

    myMethod() {
    }
}

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

// constants 
const GLITCH_INTENSITY = 20;
const COLOR_SHIFT_SPEED = 0.02;
const WAVE_DISTORTION_AMPLITUDE = 50;
const WAVE_DISTORTION_FREQUENCY = 0.02;

// Globals 
let video;
let colorShift = 0;

function resizeScreen() {
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
}


// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");

  // create an instance of the class
  myInstance = new MyClass("VALUE1", "VALUE2");

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();

  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
	// background(100);
  background(0);

  video.loadPixels();
  let pixels = video.pixels;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let index = (x + y * width) * 4;

      let waveOffset = sin(frameCount * WAVE_DISTORTION_FREQUENCY + y * 0.1) * WAVE_DISTORTION_AMPLITUDE;
      let newX = x + waveOffset;

      if (newX >= 0 && newX < width) {
        let newIndex = (floor(newX) + y * width) * 4;

        let r = pixels[newIndex];
        let g = pixels[newIndex + 1];
        let b = pixels[newIndex + 2];

        let colorOffset = sin(colorShift + x * 0.01) * 127 + 128;
        pixels[index] = (r + colorOffset) % 256;
        pixels[index + 1] = (g + colorOffset) % 256;
        pixels[index + 2] = (b + colorOffset) % 256;
      }
    }
  }

  video.updatePixels();
  image(video, 0, 0, width, height);

  colorShift += COLOR_SHIFT_SPEED;

}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}