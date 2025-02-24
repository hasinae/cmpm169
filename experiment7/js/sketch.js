// sketch.js - Experiment 7: Data Visualization & Networks
// Author: Hasina Esteqlal
// Date: 2/23/2025

/*
What I am going for:
Emotion-Driven Data: Instead of hard numbers, visualize an emotional experience, a personal history, or a collective feeling.
How do you represent something subjective in a way that still tells a compelling story?

I use an app called Dailyo to track my daily emotions, so I wanted to use a similar format of showing data. 
*/

// constants
let emotions = [];
let colors = {
  happy: [255, 204, 0, 200],
  sad: [0, 102, 204, 200],
  anxious: [255, 0, 102, 200],
  calm: [102, 255, 153, 200]
};

// globals
let canvasContainer;

function resizeScreen() {
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
}

function setup() {
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  $(window).resize(resizeScreen);
  resizeScreen();
  noStroke();
  textAlign(CENTER, CENTER);
}

function draw() {
  background(240); // neutral gray
  
  for (let i = 0; i < emotions.length; i++) {
    let emotion = emotions[i];
    emotion.intensity *= 0.98;
    emotion.alpha = max(emotion.alpha - 2, 50); 
    let col = colors[emotion.name];
    fill(col[0], col[1], col[2], emotion.alpha);
    ellipse(emotion.x, emotion.y, emotion.intensity * 20);
    fill(0, emotion.alpha);
    text(emotion.name, emotion.x, emotion.y);
  }
  drawLegend();
}

function addEmotion(name, intensity) {
  emotions.push({
    name,
    intensity,
    x: random(width),
    y: random(height),
    alpha: 200
  });
}

function drawLegend() {
  fill(0);
  textSize(16);
  textAlign(LEFT, TOP);
  let y = 10;
  for (let key in colors) {
    fill(colors[key]);
    rect(10, y, 15, 15);
    fill(0);
    text(key, 30, y + 5);
    y += 20;
  }
}

function mousePressed() {
  // add a random emotion on mouse click
  let emotionNames = Object.keys(colors);
  let randomEmotion = random(emotionNames);
  addEmotion(randomEmotion, random(5, 10));
}

function keyPressed() {
  // add specific emotions on key press
  let keyMap = { 'h': 'happy', 's': 'sad', 'a': 'anxious', 'c': 'calm' };
  if (keyMap[key]) addEmotion(keyMap[key], 5);
}
