//p5.js drawing app by kuskus265 http://github.com/kuskus265 
//Ultra simple, non OOP, ugly, super l33t, but hey. I never coded in js. send help.
let buffersx = [];
let buffersy = [];
let bufferex = [];
let bufferey = [];
let col_buf = [];
let weight_buf = [];
let tool_buf = [];
let bufferp = [];
let color_pick = 20;
let bg_color_pick;
let weight_slider;
let shiftX;
let shiftY;
let clear_btn;
let eraser_btn;
let secret_btn;
let textDiv;
let move_toolbar_btn;
let move_btn;
let toolbar_rect;
var default_bg_col = '#ffffff';
var toolbar_pos_x;
var toolbar_pos_y;
var tool;
var prev_tool;
var hue;
var prev_stroke;
var stroke = {
    "weight": 0,
    "col" : 0
}

function colorPickPos(x_pos, y_pos, c) {
    var d = document.getElementById(c);
    d.style.position = "absolute";
    d.style.left = x_pos+'px';
    d.style.top = y_pos+'px';
    d.style.width = '45px';
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

function toolbarSetup(){
    toolbar_pos_x = windowWidth - windowWidth / 3.6;
    toolbar_pos_y = windowHeight - windowHeight / 2.6;
    clear_btn = createButton("<img src =\"./assets/ico/64px/clear.png\" width=30 height=30 title=\"Clear Canvas\">");
    move_toolbar_btn = createButton("<img src =\"./assets/ico/64px/move.png\" width=16 height=16 title=\"Move Toolbar\">"); //move toolbar is currently assigned to Load buffer, e.g. drawBuffer()
    eraser_btn = createButton("<img src =\"./assets/ico/64px/eraser.png\" width=30 height=30 title=\"Eraser\">");
    brush_btn = createButton("<img src =\"./assets/ico/64px/brush.png\" width=30 height=30 title=\"Brush\">");
    secret_btn = createButton("<img src =\"./assets/ico/64px/secret.png\" width=30 height=30 title=\"<3\">");
    weight_slider = createSlider(1, 50, 8, 1);
    weight_slider.changed(updateToolbar)
    textDiv = createDiv(`Brush size: ${weight_slider.value()}px`);
    textDiv.style('color:black');  
    textDiv.id('textDiv');
    move_toolbar_btn.id('move_btn');
    move_btn = document.getElementById('move_btn');
    shiftX = mouseX - move_btn.getBoundingClientRect().left;
    shiftY = mouseY - move_btn.getBoundingClientRect().top;

}

function toolbarPosition(){
    
    textDiv.position(toolbar_pos_x + 123, toolbar_pos_y+ 20);
    colorPickPos(toolbar_pos_x + 20, toolbar_pos_y + 30, 'col1');
    //color_pick.position(toolbar_pos_x + 20, toolbar_pos_y + 30);
    //bg_color_pick.position(toolbar_pos_x + 20, toolbar_pos_y + 60);
    weight_slider.position(toolbar_pos_x + 94, toolbar_pos_y + 45);
    clear_btn.position(toolbar_pos_x + 86, toolbar_pos_y + 154);
    brush_btn.position(toolbar_pos_x + 30, toolbar_pos_y + 100);
    eraser_btn.position(toolbar_pos_x + 86, toolbar_pos_y + 100);
    secret_btn.position(toolbar_pos_x + 30, toolbar_pos_y + 154);
    move_toolbar_btn.position(toolbar_pos_x + 320, toolbar_pos_y + 20);    
    
}

function moveToolbar(){
    tool = 3;
    toolbar_pos_x = mouseX - 325;
    toolbar_pos_y = mouseY - 35;
    toolbarPosition();
    clear();
    drawBuffer();
}

function setup() {
    
    createCanvas(windowWidth, windowHeight);
    background(color(default_bg_col));
    toolbarSetup();
    toolbarPosition();
    tool = 0;
    hue = 0;
}


function draw(){
    clear_btn.mousePressed(clearCanvas);
    eraser_btn.mousePressed(eraser);
    brush_btn.mousePressed(brush);
    secret_btn.mousePressed(secret);    
    stroke.weight = weight_slider.value();  
    document.addEventListener('mousedown', drawPoint);
          
    //bg_color_pick.mousePressed(changeBgColor)
    move_btn.onmousedown = function(event){
        toolbar_pos_x = mouseX - 325;
        toolbar_pos_y = mouseY - 35;
        //background(default_bg_col);
        document.body.append(move_btn);
        document.addEventListener('mousemove', moveToolbar);
        move_btn.onmouseup = function(){
            document.removeEventListener('mousemove', moveToolbar);
            tool = prev_tool;
            move_btn.onmouseup = null;
        };
    };
    toolbar_bg();
    move_btn.ondragstart = function() {
        return false;
      };

    
}

function changeBgColor(){
    background(default_bg_col);
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


function setPrevTool(){
    tool = prev_tool;
    document.removeEventListener('mouseup', setPrevTool, false);
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
    point(buffersx[index], buffersy[index]);
}
function clearBuffer(item, index){
    bufferp = [];
    bufferex = [];
    bufferey = [];
    buffersx = [];
    bufferxy = [];
    col_buf = [];
    weight_buf = [];
    tool_buf = [];
}

function drawPoint() {
    push();
    stroke(stroke.col);
    strokeWeight(stroke.weight);
    point(mouseX, mouseY);
    pop();
}
 
function mouseDragged() {
    if (tool != 3){
        stroke.weight = weight_slider.value();
        switch (tool) {
            case 0:
                prev_stroke = stroke.col;
                stroke.col = "#" + document.getElementById('col1').value;
                stroke(stroke.col);
                break;
            case 1:
                if (hue > 360) {
                    hue = 0;
                } else {
                    hue++;
                }
                colorMode(HSL, 360);
                noStroke();
                stroke.col = hue;
                stroke(stroke.col, 200, 200);
                prev_stroke = stroke.col;
                break;
            case 2:
                stroke.col = default_bg_col;
                stroke(stroke.col);
                prev_stroke = stroke.col;
                break;
        }
        strokeWeight(stroke.weight);
        line(mouseX, mouseY, pmouseX, pmouseY);
        prev_tool = tool;
        //--------------------------------------------------
        //Storing into super ugly buffer
        if (prev_stroke != stroke.col){
            clear();
            background(color(default_bg_col));
            drawBuffer();           
        }
        else{
            buffersx.push(mouseX);
            buffersy.push(mouseY);
            bufferex.push(pmouseX);
            bufferey.push(pmouseY);
            col_buf.push(stroke.col);
            weight_buf.push(stroke.weight);
            tool_buf.push(tool);
        }
    }
    //--------------------------------------------------
    return false; //cross browser compatibility
}
