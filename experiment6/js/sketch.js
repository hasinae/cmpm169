// sketch.js - Experiment 6: Grammars & Text Art
// Author: Hasina Esteqlal
// Date: 2/16/2025

/*
What I am going for:
Conversational Bots with Memory: Build a chatbot that generates creative responses using a 
grammar-based system but also remembers context from previous user inputs. It should evolve its style, tone, 
or word choices over time based on the conversation.
*/

// constants
const GRAMMAR_TEMPLATES = {
  neutral: [
    "Tell me more about {topic}!",
    "Why do you think {topic} is important?",
    "That's rlly interesting. What else can you share about {topic}?"
  ],
  playful: [
    "Haha, {topic}? That's wild!",
    "Oh, {topic}? Tell me more!",
    "{topic}? You're so funny lol"
  ],
  poetic: [
    "In the realm of {topic}, dreams take flight.",
    "{topic} whispers secrets to the wind.",
    "The essence of {topic} lingers in the air."
  ]
};

// globals
let canvasContainer;
let chatbot;
let inputField, submitButton;
let conversationHistory = "";
let currentTone = "neutral"; // tracks the current tone for visuals
let shapeX, shapeY; // variables for animated shapes

// chatbot class
class Chatbot {
  constructor() {
    this.memory = [];
    this.style = "neutral"; // tracks the bot's current style
    this.toneKeywords = {
      playful: ["lol", "haha", "funny", "joke"],
      poetic: ["dream", "imagine", "heart", "soul"],
      neutral: []
    };
  }

  // grammar based response generation
  generateResponse(input) {
    const topic = input.split(" ").slice(-1)[0]; // extract last word (the topic)
    const templateList = GRAMMAR_TEMPLATES[this.style];
    const template = templateList[Math.floor(Math.random() * templateList.length)];
    return template.replace("{topic}", topic);
  }

  // detects tone
  detectTone(input) {
    for (const [tone, keywords] of Object.entries(this.toneKeywords)) {
      if (keywords.some(keyword => input.toLowerCase().includes(keyword))) {
        return tone;
      }
    }
    // default tone
    return "neutral";
  }

  // update memory and evolve style
  respond(input) {
    this.memory.push({ user: input });
    this.style = this.detectTone(input);
    const response = this.generateResponse(input);
    this.memory.push({ bot: response });

    // update current tone for visuals
    currentTone = this.style;

    return response;
  }
}

function resizeScreen() {
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
}

function setup() {
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");

  // chatbot
  chatbot = new Chatbot();

  // create input field and button
  inputField = createInput();
  inputField.position(20, height + 20);
  inputField.size(width - 140, 20);

  submitButton = createButton("Submit");
  submitButton.position(width - 110, height + 20);
  submitButton.mousePressed(handleInput);

  $(window).resize(function () {
    resizeScreen();
  });
  resizeScreen();

  // initialize shape position
  shapeX = width / 2;
  shapeY = height / 2;
}

// Draw function
function draw() {
  // set background based on tone
  switch (currentTone) {
    case "playful":
      background(255, 200, 200); // bright pink
      break;
    case "poetic":
      background(200, 220, 255); // soft blue
      break;
    default:
      background(240); // neutral gray
  }

  // draw shapes based on tone
  noStroke();
  switch (currentTone) {
    case "playful":
      fill(255, 150, 150);
      ellipse(shapeX, shapeY, 100, 100); // bouncing circle
      shapeX += random(-5, 5);
      shapeY += random(-5, 5);
      break;
    case "poetic":
      fill(150, 150, 255, 150);
      for (let i = 0; i < 10; i++) {
        let x = random(width);
        let y = random(height);
        ellipse(x, y, 50, 50); // floating circles
      }
      break;
    default:
      fill(150);
      rect(width / 2 - 50, height / 2 - 50, 100, 100); // static square
  }

  // display conversation history
  textSize(16);
  fill(0);
  textAlign(LEFT, TOP);
  text(conversationHistory, 20, 20, width - 40, height - 40);
}

// user input
function handleInput() {
  const userInput = inputField.value();
  if (userInput.trim() === "") return; // ignoring empty inputs !

  // bot's response
  const botResponse = chatbot.respond(userInput);

  // update conversation history
  conversationHistory += `You: ${userInput}\nBot: ${botResponse}\n\n`;

  // clear input
  inputField.value("");
}