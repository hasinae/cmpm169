// sketch.js - Experiment 5: 3D Graphics
// Author: Hasina Esteqlal
// Date: 2/6/2025

/*
What I am going for:
Simulate basic physics in a 3D environment using gravity. 
I will be creating an interactive playground where objects respond to user inputs,
like dragging, dropping, bouncing, or applying forces.
Just basically making a very simple physics sandbox. 
*/

// constants 
let objects = [];
let gravity = 0.2; 
let selectedObject = null;


class PhysicsObject {
  constructor(x, y, z, size) {
      this.position = createVector(x, y, z);
      this.velocity = createVector(0, 0, 0);
      this.size = size;
      this.isDragged = false;
  }

  applyForce(force) 
  {
      this.velocity.add(force);
  }

  update() {
    if (!this.isDragged) 
      {
        this.applyForce(createVector(0, gravity, 0));
        this.position.add(this.velocity);

      // bounce 
      if (this.position.y + this.size / 2 > height / 2) 
        {
          this.position.y = height / 2 - this.size / 2;
          // reduce velocity to show energy loss
          this.velocity.y *= -0.7; 
      }
    }
  }

  draw() 
  {
      push();
      translate(this.position.x, this.position.y, this.position.z);
      fill(200, 100, 150);
      noStroke();
      sphere(this.size / 2); 
      pop();
  }

  isMouseOver() 
  {
      let mouse3D = createVector(mouseX - width / 2, mouseY - height / 2, 0);
      return dist(mouse3D.x, mouse3D.y, this.position.x, this.position.y) < this.size / 2;
  }
}

function resizeScreen() {
    resizeCanvas(canvasContainer.width(), canvasContainer.height(), WEBGL);
}

function setup() {
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height(), WEBGL);
  canvas.parent("canvas-container");

  // random objects
  for (let i = 0; i < 5; i++) {
    let x = random(-width / 4, width / 4);
    let y = random(-height / 4, -height / 2);
    let z = random(-200, 200);
    let size = random(40, 60);
    objects.push(new PhysicsObject(x, y, z, size));
  }

  $(window).resize(function () {
    resizeScreen();
  });
  resizeScreen();
}

function draw() {
  background(0);

  // allows camera to rotate and zoom with mouse and keyboard
  orbitControl(); 

  // Draw ground
  push();
  fill(50);
  noStroke();
  translate(0, height / 2 - 10, 0);
  rotateX(PI / 2);
  plane(width, height);
  pop();

  // draw objects
  for (let obj of objects) 
  {
      obj.update();
      obj.draw();
  }
}

function mousePressed() {
  for (let obj of objects) 
    {
      if (obj.isMouseOver()) 
        {
          obj.isDragged = true;
          selectedObject = obj;
          break;
       }
    }
}

function mouseDragged() 
{
  if (selectedObject) 
  {
    // drag object
    selectedObject.position.x = mouseX - width / 2;
    selectedObject.position.y = mouseY - height / 2;
  }
}

 
function mouseReleased() 
{
  if (selectedObject) 
  {
    selectedObject.isDragged = false;
    selectedObject = null;
  }
}


// explosion effect on double click
function doubleClicked()
{
  for (let obj of objects) 
  {
    obj.velocity = createVector(random(-5, 5), random(-5, 5), random(-5, 5));
  }
}

// dynamic color based on velocity
PhysicsObject.prototype.draw = function () {
  push();
  translate(this.position.x, this.position.y, this.position.z);

  // map velocity to color
  let speed = this.velocity.mag();
  let r = map(speed, 0, 10, 100, 255); 
  let g = map(speed, 0, 10, 100, 50);  
  let b = map(speed, 0, 10, 255, 100); 
  fill(r, g, b);

  noStroke();
  sphere(this.size / 2); 
  pop();
};


