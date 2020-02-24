//p5.js drawing app by kuskus265 http://github.com/kuskus265 
//Ultra simple, non OOP, ugly, super l33t, but hey. I never coded in js. send help.
let c = 70;
var i = 0;
let buffersx = [];
let buffersy = [];
let bufferex = [];
let bufferey = [];
let col_buf = [];
let weight_buf = [];
let tool_buf = [];
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
var stroke = {
    "weight": 0,
    "col" : 0
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

function updateToolbar(){
    document.getElementById("textDiv").innerHTML = `Brush size: ${weight_slider.value()}px`;
}

function toolbar(){
    toolbar_pos_x = windowWidth - windowWidth / 3.6;
    toolbar_pos_y = windowHeight - windowHeight / 2.6;
    clear_btn = createButton('Clear');
    move_toolbar_btn = createButton('Load buffer');
    eraser_btn = createButton();
    brush_btn = createButton("<img src =\"/assets/ico/64px/paintbrush2.png\" width=30 height=30 value =\"brush\">");
    secret_btn = createButton('Click meee');
    color_pick = createColorPicker(color('black'));
    bg_color_pick = createColorPicker(color(default_bg_col));
    weight_slider = createSlider(1, 50, 8, 1);
    weight_slider.changed(updateToolbar)
    textDiv = createDiv(`Brush size: ${weight_slider.value()}px`);
    textDiv.style('color:black');  
    textDiv.id('textDiv');
    //---------Position of elements-----------
    textDiv.position(toolbar_pos_x + 123, toolbar_pos_y+ 20);
    color_pick.position(toolbar_pos_x + 20, toolbar_pos_y + 30);
    bg_color_pick.position(toolbar_pos_x + 20, toolbar_pos_y + 60);
    weight_slider.position(toolbar_pos_x + 94, toolbar_pos_y + 45);
    clear_btn.position(toolbar_pos_x + 20, toolbar_pos_y + 135);
    brush_btn.position(toolbar_pos_x + 70, toolbar_pos_y + 120);
    eraser_btn.position(toolbar_pos_x + 70, toolbar_pos_y + 200);
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
    move_toolbar_btn.mousePressed(drawBuffer);
    toolbar_bg();
}

function changeBgColor(){
    background(bg_color_pick.color());
}

function clearCanvas(){
    clear();
    background(color(default_bg_col));
    clearBuffer();
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
}

function drwbuf(item, index){
    if (tool_buf[index] == 1) {
        stroke(col_buf[index], 200, 200);
    }
    else{
        stroke(col_buf[index]);
    }
    strokeWeight(weight_buf[index]);
    line(buffersx[index], buffersy[index], bufferex[index], bufferey[index]);
}
function clearBuffer(item, index){
    bufferex = [];
    bufferey = [];
    buffersx = [];
    bufferxy = [];
    col_buf = [];
    weight_buf = [];
    tool_buf = [];
}
 
function mouseDragged() {
    stroke.weight = weight_slider.value();
    if (tool == 0){
        stroke.col = color_pick.color();
        stroke(stroke.col);
    }
    else if (tool == 1){
        if (hue > 360) {
            hue = 0;
          } else {
            hue++;
          }
          colorMode(HSL, 360);
          noStroke();
          stroke.col = hue;
          console.log(stroke.col);
          stroke(stroke.col, 200, 200);
    }
    else{
        stroke.col = default_bg_col;
        stroke(stroke.col);
    }
    strokeWeight(stroke.weight);
    line(mouseX, mouseY, pmouseX, pmouseY);
    //--------------------------------------------------
    //Storing into super ugly buffer
    buffersx.push(mouseX);
    buffersy.push(mouseY);
    bufferex.push(pmouseX);
    bufferey.push(pmouseY);
    col_buf.push(stroke.col);
    weight_buf.push(stroke.weight);
    tool_buf.push(tool);
    //--------------------------------------------------
    return false; //cross browser compatibility
}
