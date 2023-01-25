let tileSizeSlider;

function setup() {
  createCanvas(600, 600);
  
  //Tile Size Slider
  tileSizeSlider = createSlider(16, 200, 48, 8);
  tileSizeSlider.position(0, width);
  
  const tile_size = tileSizeSlider.value(); 
  
  //Number of rows & columns that fit the tile at the given size
  n_rows = floor(height / tile_size);
  n_cols = floor(width / tile_size);
  
}


function ShallaThombs_Tile() {
  xpos = 0;
  ypos = 0;
  
  n_points = 8
  
  radius_2 = tileSizeSlider.value();
  radius_1 = radius_2 * (sin(radians(45)) / sin(radians(112.5)));
  let t = radius_2 - radius_2 / (2 + 2 * sqrt(2));
  let p = radius_2 / (2 * sqrt(2) + 2);
  
  push();
  let cappella_angle = TWO_PI / this.n_points;
  
  beginShape();
  for (let a = 0; a < TWO_PI; a += cappella_angle) {
    let shape_x = this.xpos + cos(a) * this.radius_2;
    let shape_y = this.ypos + sin(a) * this.radius_2;
    vertex(shape_x, shape_y);

    shape_x = this.xpos + cos(a + (cappella_angle/2)) * this.radius_1;
    shape_y = this.ypos + sin(a + (cappella_angle/2)) * this.radius_1;
    vertex(shape_x, shape_y);
  }
  endShape(CLOSE);
  pop();
  
  for (let i = 0; i < 8; i++) {
    push();
    rotate(PI/4*i);
    translate(p, p);
    rect(0, 0, t, t);
    pop();
  }
}

function ShallaThombs_Pattern(){
  tile_size = tileSizeSlider.value();
  for (let iter_row = 0; iter_row < n_rows+4; iter_row++) {
    for (let iter_col = 0; iter_col < n_cols+4; iter_col++) {
      push();
      stroke("white")
      translate(2.825*tile_size * iter_col, 2.825*tile_size * iter_row);
      ShallaThombs_Tile();
      pop();
    } 
  }
}



function draw() {
  background(0);
  strokeWeight(1);
  
  noFill();
  ShallaThombs_Pattern();

}
