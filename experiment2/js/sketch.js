// sketch.js - purpose and description here
// Author: Hasina Esteqlal
// Date: 12/16/2025

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

/*
spiral rectangle but colorfull like psychedlics 
https://editor.p5js.org/generative-design/sketches/P_2_1_1_04
https://editor.p5js.org/generative-design/sketches/P_2_1_2_03 
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
        // code to run when method is called
    }
}

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
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

  rectMode(CENTER);
  colorMode(HSB, 360, 100, 100);
  noFill();
  frameRate(60);
}


let a = 0;
let direction = 1; // 1 for growing, -1 for shrinking
const maxSize = 300; // maximum size of the rectangle
const minSize = 50; // minimum size of the rectangle


// draw() function is called repeatedly, it's the main animation loop
function draw() {
  background(0);    
  // call a method on the instance
  myInstance.myMethod();

  // // random ellipses
  // let sc = random(20, 100);
  // for (let i = 1; i <  10; i++)
  // {
  //   ellipse(random(width), random(height), sc, sc);
  // }


  // spiral square
  // for (let i = 0; i < -10; i ++)
  // {
  //   translate(width / 2, height / 2);
  //   rotate(radians(a));
  // }


  // fill
  // for (let i = 0; i < 10; i++)
  // {
  //   stroke(random(255), random(255), random(255));
  //   strokeWeight(0.5);
  // }

  translate(width / 2, height / 2);

  // rotate rectangles
  rotate(radians(a));

  for (let i = 0; i < 10; i++) {
    let size = a - i * 10;
    if (size > 0) 
    {
        stroke(random(360), 100, 100); 
        strokeWeight(1);
        rect(0, 0, size, size);
    }
}

  // update the size based on the direction
  a += direction * 0.5;

  if (a >= maxSize) 
  {
      direction = -1; // shrinking
  } 
  else if (a <= minSize) 
  {
      direction = 1; // growing
  }

  // console.log(`Size: ${a}, Direction: ${direction}`);

}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}