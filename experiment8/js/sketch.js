let classifier;
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/zT4Y6F3v/';
let video;
let flippedVideo;
let label = "Detecting...";
let canvasContainer;

function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');

    // Check if ml5.js is available
    if (typeof ml5 === 'undefined') {
        console.error("ml5.js is not loaded yet.");
        return;
    }

    console.log("ml5 version:", ml5.version);
}

function resizeScreen() {
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
}

function setup() {
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  $(window).resize(resizeScreen);

  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();

  if (typeof ml5 !== 'undefined') {
    classifier = ml5.imageClassifier(imageModelURL + 'model.json', modelReady);
  } else {
    console.error("ml5 is not loaded, can't proceed with video capture.");
  }
}

function modelReady() {
  console.log("Model is ready!");
  classifyVideo();
}

function classifyVideo() {
  flippedVideo = ml5.flipImage(video);
  classifier.classify(flippedVideo, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;
  classifyVideo();
}

function draw() {
  background(50, 50, 70);

  fill(255);
  textSize(24);
  textAlign(CENTER, CENTER);
  text(label, width / 2, height - 50);

  noStroke();
  if (label === 'thumbs up') {
    drawThumbsUp();
  } else if (label === 'thumbs down') {
    drawThumbsDown();
  } else if (label === 'peace') {
    drawPeace();
  } else if (label === 'ok symbol') {
    drawOkSymbol();
  }
}

// Function to draw a thumbs-up symbol
function drawThumbsUp() {
  fill(0, 255, 0);
  beginShape();
  vertex(width / 2 - 30, height / 3 + 20);
  vertex(width / 2 + 30, height / 3 + 20);
  vertex(width / 2 + 20, height / 3 - 50);
  vertex(width / 2 - 20, height / 3 - 50);
  endShape(CLOSE);
  rect(width / 2 - 10, height / 3 - 50, 20, 70); // Thumb
  rect(width / 2 - 40, height / 3 + 20, 80, 20); // Hand
}

// Function to draw a thumbs-down symbol
function drawThumbsDown() {
  fill(255, 0, 0);
  beginShape();
  vertex(width / 2 - 30, height / 3 + 20);
  vertex(width / 2 + 30, height / 3 + 20);
  vertex(width / 2 + 20, height / 3 + 90);
  vertex(width / 2 - 20, height / 3 + 90);
  endShape(CLOSE);
  rect(width / 2 - 10, height / 3 + 90, 20, 70); // Thumb
  rect(width / 2 - 40, height / 3 + 20, 80, 20); // Hand
}

// Function to draw the peace symbol
function drawPeace() {
  fill(0, 150, 255);
  ellipse(width / 2, height / 3, 100, 100); // Circle
  line(width / 2, height / 3 - 50, width / 2, height / 3 + 50); // Vertical line
  line(width / 2 - 50, height / 3, width / 2 + 50, height / 3); // Horizontal line
}

// Function to draw the OK symbol
function drawOkSymbol() {
  fill(255, 215, 0);
  ellipse(width / 2, height / 3, 100, 100); // Circle
  line(width / 2 - 30, height / 3, width / 2 + 30, height / 3); // Horizontal line
  line(width / 2, height / 3 - 30, width / 2, height / 3 + 30); // Vertical line
}
