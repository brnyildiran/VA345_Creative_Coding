// ====================================================
// Berna Yıldıran @ Milky Typography [Jan 13, 2023] 
// VA345 Creative Coding Final Project
// ====================================================

// CANVAS PROPERTIES
// -----------------------------------------
const canvasWidth = 1920;
const canvasHeight = 1080;
const backgroundColor = 0;

// TEXT PROPERTIES
// -----------------------------------------
var string = "";
const fontSize = 480;
const fontFile = "PlayfairDisplay-Bold.ttf";
const divFont = "Roboto";
// Alpha of the text --> Low value, slowly fade in
const textAlpha = 0;

// LINES
// -----------------------------------------
// Alpha of the lines
// Lower numbers --> More transparent
const strokeAlpha = 200;

// Line color
const strokeColor = 255;

// Maximum amount each point can move each frame
const lineSpeed = 2;

// Number of points
// Higher numbers --> More detail
// 0.2 - 0.4 - 0.6 - 0.8 - 1.0
let fontSampleFactor;

// NOISE
// -----------------------------------------
// Size of the Noise
// Higher numbers --> Smaller waves
// 0.016 - 0.024 - 0.04 - 0.064
let noiseZoom;

// Octaves for the Noise
// 8 - 16 - 24 - 32 - 40 - 48 - 64 - 80
let noiseOctaves;

// Falloff for the Noise
// Either 0.0 or 0.4, only these works the best
let noiseFalloff;

/*
// DEFAULTS
// -----------------------------------------
const fontSampleFactor = 0.6;
const noiseZoom = 0.024;
const noiseOctaves = 4;
const noiseFalloff = 0.4;
*/

// How much the noise field changes in the z direction each frame
const zOffsetChange = 0;

// Distance btw the lines in the z noise axies
//Higher number --> More chaotic canvas
const individualZOffset = 0;

// OTHER VARIABLES
// -----------------------------------------
var font;
var points = [];
var startingPoints;
var inputField, submitButton;
var canvas;
var Div1, Div2, Div3, Div4;

// LOADING THE FONT FILE
// -----------------------------------------
function preload() {
  font = loadFont(fontFile);
}

// SETUP
// -----------------------------------------
function setup() {
  canvas = createCanvas(canvasWidth, canvasHeight);
  background(backgroundColor);

  // create the input field and submit button
  inputField = createInput();
  submitButton = createButton("Submit");

  // position the input field and submit button
  inputField.position(24, 24);
  submitButton.position(inputField.x + inputField.width, 24);

  textFont(divFont);

  let txt_ENTER = "ENTER /// Submit your text.";
  let txt_ALT = "ALT /// Save canvas as PNG.";
  let txt_ESC = "ESC /// Reset canvas.";
  let txt_Signature = "Berna Yıldıran @ Milky Typography " + 
      "[Jan 13, 2023] // VA345 Creative Coding Final Project";

  Div1 = createDiv(txt_ENTER);
  Div1.style("font-size", "16px");
  Div1.style("font-family", divFont);
  Div1.style("color", "white");
  Div1.position(inputField.x, inputField.y + inputField.height + 8);

  Div2 = createDiv(txt_ALT);
  Div2.style("font-size", "16px");
  Div2.style("font-family", divFont);
  Div2.style("color", "white");
  Div2.position(inputField.x, inputField.y + inputField.height + 32);

  Div3 = createDiv(txt_ESC);
  Div3.style("font-size", "16px");
  Div3.style("font-family", divFont);
  Div3.style("color", "white");
  Div3.position(inputField.x, inputField.y + inputField.height + 56);

  fill("white");
  textSize(20);
  text(txt_Signature, 24, canvasHeight - 24);
  
  textFont(font);
  textSize(fontSize);

  fill(backgroundColor, textAlpha);

  //COLORS
  colors = [
    "greenyellow",
    "lime",
    "palegreen",
    "springgreen",
    "aquamarine",
    "cyan",
    "paleturquoise",
    "lightcyan",
    "lightskyblue",
    "deepskyblue",
    "darkturquoise",
    "blueviolet",
    "mediumpurple",
    "orchid",
    "magenta",
    "hotpink",
    "pink",
    "lightpink",
    "crimson",
    "tomato",
    "coral",
    "orange",
    "gold",
    "whitesmoke",
    "white",
    "lemonchiffon",
  ];
  let colorChoice = random(colors);
  stroke(color(colorChoice), strokeAlpha);
  print("Color: ", colorChoice);

  //The number of octaves for the noise
  noiseOctaves = random([8, 16, 24, 32, 40, 48, 64, 80]);
  print("Noise Octaves: ", noiseOctaves);

  noiseFalloff = random([0.0, 0.4]);
  print("Noise Falloff: ", noiseFalloff);

  //noiseZoom = random([0.016, 0.024, 0.04, 0.064]);
  noiseZoom = random([0.024, 0.04, 0.064]);
  print("Noise Zoom: ", noiseZoom);

  //fontSampleFactor = random([0.2, 0.4, 0.6, 0.8, 1.0]);
  fontSampleFactor = random([0.4, 0.6, 0.8, 1.0]);
  print("Font Sample Factor: ", fontSampleFactor);
  print("--------------------------------------");

  noiseDetail(noiseOctaves, noiseFalloff);
}

// MOUSE PRESSED ON BUTTON
// -----------------------------------------
function mousePressed() {
  // check if the mouse is over the submit button
  if (
    mouseX > submitButton.x &&
    mouseX < submitButton.x + submitButton.width &&
    mouseY > submitButton.y &&
    mouseY < submitButton.y + submitButton.height
  ) {
    // submit button clicked, stop getting input and continue
    var input = inputField.value();

    // clear the input field
    inputField.value("");

    // pass the input string to the MilkyType() function
    MilkyType(input);
  }
}

// FLOWERY TYPE
// -----------------------------------------
function MilkyType(string) {
  push();
  translate(0, canvasHeight / 8);

  startingPoints = font.textToPoints(
    string,
    width / 2 - textWidth(string) / 2,
    height / 2,
    fontSize,
    { sampleFactor: fontSampleFactor }
  );

  for (let p = 0; p < startingPoints.length; p++) {
    points[p] = startingPoints[p];
    points[p].zOffset = random();
  }

  for (let pt = 0; pt < points.length; pt++) {
    let p = points[pt];
    let noiseX = p.x * noiseZoom;
    let noiseY = p.y * noiseZoom;
    let noiseZ = frameCount * zOffsetChange + p.zOffset * individualZOffset;
    let newPX =
      p.x + map(noise(noiseX, noiseY, noiseZ), 0, 1, -lineSpeed, lineSpeed);
    let newPY =
      p.y +
      map(noise(noiseX, noiseY, noiseZ + 214), 0, 1, -lineSpeed, lineSpeed);
    line(p.x, p.y, newPX, newPY);
    p.x = newPX;
    p.y = newPY;
  }
  pop();
}

// DRAW
// -----------------------------------------
function draw() {
  MilkyType(string);
}

// KEYBOARD CONTROLS
// -----------------------------------------
// ENTER --> Submit your text
// ALT --> Save canvas as PNG
// ESCAPE --> Resest the Canvas
// -----------------------------------------
function keyPressed() {
  if (keyCode == ALT) {
    Div1.hide();
    Div2.hide();
    Div3.hide();
    saveCanvas(canvas, "MilkyType", "png");
  }

  if (keyCode == ESCAPE) {
    points = [];
    Div1.remove();
    Div2.remove();
    Div3.remove();
    setup();
  }

  if (keyCode == ENTER) {
    var input = inputField.value();
    // clear the input field
    inputField.value("");

    // pass the input string to the MilkyType() function
    MilkyType(input);
  }
}
