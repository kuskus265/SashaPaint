
let c = 70;
var i = 0;
let buffer = [];
let color_pick;
let bg_color_pick;
let weight_slider;
let clear_btn;
let eraser_btn;
let textDiv;
var default_bg_col = '#ffffff';
var toolbar_pos_x;
var toolbar_pos_y;
var tool;
var hue;

var buf_dict = {
    sx: 0,
    sy: 0,
    ex: 0,
    ey: 0
}

function toolbar_bg(){
    push();
    fill('#ffffff');
    strokeJoin(BEVEL);
    strokeWeight(3);
    stroke(51);
    rect(toolbar_pos_x, toolbar_pos_y, 350, 250);
    pop();
}

function toolbar(){
    toolbar_pos_x = windowWidth - windowWidth / 3.6;
    toolbar_pos_y = windowHeight - windowHeight / 2.6;
    clear_btn = createButton('Clear');
    move_toolbar_btn = createButton('');
    eraser_btn = createButton('Eraser');
    brush_btn = createButton('Brush');
    textDiv = createDiv('I have seks and <br> you should too');
    color_pick = createColorPicker(color('black'));
    bg_color_pick = createColorPicker(color(default_bg_col));
    weight_slider = createSlider(1, 50, 8, 1);
    textDiv.position(toolbar_pos_x + 20, toolbar_pos_y+ 120);
    textDiv.style('color:black');  
    color_pick.position(toolbar_pos_x + 20, toolbar_pos_y + 30);
    bg_color_pick.position(toolbar_pos_x + 20, toolbar_pos_y + 60);
    weight_slider.position(toolbar_pos_x + 50, toolbar_pos_y + 90);
    clear_btn.position(windowWidth - windowWidth / 5, windowHeight / 3);
}

function setup() {
    
     createCanvas(windowWidth, windowHeight);
     background(color(default_bg_col));
     toolbar();
     tool = 0;
     hue = 0;
}
 
function draw(){
    clear_btn.mousePressed(clearCanvas);
    eraser_btn.mousePressed(eraser);
    brush_btn.mousePressed(drawBuffer);
    bg_color_pick.mousePressed(changeBgColor);
    toolbar_bg();
}

function changeBgColor(){
    background(bg_color_pick.color());
}

function clearCanvas(){
    clear();
    background(color(default_bg_col));
}

function brush(){
    tool = 0;
}

function eraser(){
    tool = 2;
    console.log(buffer[4]);
    console.log(buffer[13]);
}
function secret(){
    tool = 1;
}

function drawBuffer(){
    buffer.forEach(drwbuf);
}

function drwbuf(item, index){
    console.log(index);
    line(buffer[index].sx, buffer[index].sy, buffer[index].ex, buffer[index].ey);
}
function clearBuffer(item, index){

}
 
function mouseDragged() {
    if (tool == 0){
        stroke(color_pick.color());
    }
    else if (tool == 1){
        if (hue > 360) {
            hue = 0;
          } else {
            hue++;
          }
          colorMode(HSL, 360);
          noStroke();
          stroke(hue, 200, 200);
    }
    else{
        stroke(default_bg_col);
    }
    strokeWeight(weight_slider.value());
    line(mouseX, mouseY, pmouseX, pmouseY);
    buf_dict.sx = mouseX;
    buf_dict.sy = mouseY;
    buf_dict.ex = pmouseX;
    buf_dict.ey = pmouseY;
    buffer.push(buf_dict.sx);
    console.log(buffer[i]);
    i++;

    return false; //cross browser compatibility
}
 