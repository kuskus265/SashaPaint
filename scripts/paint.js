
let c = 70;
var i = 0;
let buffersx = [];
let buffersy = [];
let bufferex = [];
let bufferey = [];
let color_pick;
let bg_color_pick;
let weight_slider;
let clear_btn;
let eraser_btn;
let secret_btn;
let textDiv;
var default_bg_col = '#ffffff';
var toolbar_pos_x;
var toolbar_pos_y;
var tool;
var hue;


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
    secret_btn = createButton('Click meee');
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
    brush_btn.mousePressed(brush);
    secret_btn.mousePressed(secret);                
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
}
function secret(){
    tool = 1;
}

function drawBuffer(){
    buffersx.forEach(drwbuf);
    console.log('attempted');
}

function drwbuf(item, index){
    line(buffersx[index], buffersy[index], bufferex[index], bufferey[index]);
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
    buffersx.push(mouseX);
    buffersy.push(mouseY);
    bufferex.push(pmouseX);
    bufferey.push(pmouseY);
    console.log("pushed");

    return false; //cross browser compatibility
}
