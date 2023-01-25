function setup() {
  createCanvas(500, 500);
  noStroke();
}

function circledraw (i, pathradius, centerX, centerY, direction, cursor, magic, size) {
  
  if (direction == 1){
    xPos = centerX + pathradius * cos(i*noise(cursor+i/25))
    yPos = centerY + pathradius * sin(i*noise(cursor+i/25));
    circle(xPos, yPos, i/20*height*magic);
  }
  else if(direction == 2){
    xPos = centerX + pathradius * sin(i*noise(cursor+i/25))
    yPos = centerY + pathradius * cos(i*noise(cursor+i/25));
  }
  
  circle(xPos, yPos, i/16*height*magic);
}

function draw() {
  background(0);
  
  //RED
  for(let i = 0; i < 20; i++){
    fill(255-15*i,0,0);
    circledraw(i, 200, 250, 250, 1, frameCount/125, 0.25)
  }
  
  //PINK
  for(let i = 0; i < 18; i++){
    fill(225,120,180,140-i*10);
    circledraw(i, 200, 250, 250, 2, frameCount/135, 0.5)
  }
  
  //YELLOW
  for(let i = 0; i < 16; i++){
    fill(200,180,100,160-i*10);
    circledraw(i, 100, 250, 250, 1, frameCount/130, 0.2)
  }
  
  //ORANGE
  for(let i = 0; i < 14; i++){
    fill(250,100,20,140-i*10);
    circledraw(i, 100, 250, 250, 2, frameCount/140, 0.4)
  }
  
  
  
  
}
