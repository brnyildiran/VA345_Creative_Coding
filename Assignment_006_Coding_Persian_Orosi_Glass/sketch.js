function Orosi_Petal(radius){
  
  let r = radius
  let a = (r * sin(15)) / sin(30);
  let b = (a * sin(135)) / sin(15);
  
  let x1 = -r * cos(60);
  let y1 = -r * sin(60);
  
  let x2 = -b * cos(75);
  let y2 = -b * sin(75);
  
  let x3 = r * cos(60);
  let y3 = y2 - (y1 - y2);
  
  let x4 = x1 - ((y1 - y2) * sin(30)) / cos(30);
  let y4 = y2 - (sin(45) * a * sin(30)) / cos(30);
  
  let x5 = sin(30) * ((sin(45) * a) / cos(30));
  let y5 = y4 - (sin(45) * a) / cos(30);
  
  let x6 = x5 + sin(60) * ((sin(45) * a) / cos(30));
  let y6 = y5 - sin(60) * ((sin(45) * a) / cos(30));
  
  let x7 = -x1 + sin(60) * a + (a * sin(60) * sin(30));
  let y7 = y5 - sin(60) * ((sin(45) * a) / cos(30)) - sin(60) * ((sin(45) * a) / cos(30));
  
  let x8 = -x1 + (cos(45) * a) / cos(15);
  let y8 = y3 - sin(15) * a;
  
  let y9 = y3 - (a * sin(30)) / cos(30);
  

  //INNER FLOWER
  //================================================
  strokeWeight(4);
  stroke("#b9b5f3");
  line(0, 0, 0, -r);
  line(0, 0, x1, y1);
  line(x1, y1, x2, y2);
  line(0, -r, x2, y2);
  line(0, 0, x3, y1);
  line(x3, y1, -x2, y2);
  line(0, -r, -x2, y2);

  //SECOND FLOWER
  //================================================
  stroke("#8391ec");
  line(x4, y2, x1, y3);
  line(x1, y3, 0, y4);
  line(0, y4, 0, -r);
  line(-x1, y1, -x4, y2);
  line(-x4, y2, -x1, y3);
  line(-x1, y3, -0, y4);
  
  //OUTER LINES
  //================================================
  stroke("#6365f8");
  line(0, y4, 0, y5);
  line(x5, y6, x6, y6);
  line(x6, y6, x7, y8);
  
  line(x7, y8, -x4, y2);
  
  line(x5, y6, -x1, y3);
  
  line(x8, y9, -x1, y3);
  
  line(-x5, y6, -x6, y6);
  line(-x6, y6, -x7, y8);
  line(-x5, y6, x1, y3);
  line(-x8, y9, x1, y3); 
  
  //CORNER DIAMOND
  //================================================
  stroke("#3437f1");
  line(0, y5, x5, y6);
  line(0, y5, -x5, y6);
  line(-x5, y6, 0, y7);
  line(x5, y6, 0, y7);
  
}

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  noLoop();
}

function draw() {
  background(0);
  push();
  translate(width/2, height/2);
  for(let i = 0; i <= 5; i++) {
    stroke("white");
    Orosi_Petal(100);
    rotate(60);
  }
  pop();
}