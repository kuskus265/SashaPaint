'use strict';

const sx = screen.width;
const sy = screen.height;

function toolbar(){
    clear_btn = createButton('Clear');
    eraser_btn = createButton('Eraser');
    brush_btn = createButton('Brush');
    color_pick = createColorPicker(color('black'));
    bg_color_pick = createColorPicker(color(default_bg_col));
    weight_slider = createSlider(1, 50, 8, 1);
    color_pick.position(sx - sx / 5, sy / 5);
    bg_color_pick.position(sx - sx / 5, sy / 6);
    weight_slider.position( sx - sx / 5, sy / 4);
    clear_btn.position(sx - sx / 5, sy / 3);
}

function setup(){
    createCanvas(300, 400);
    background(color('white'));
    toolbar();
}

