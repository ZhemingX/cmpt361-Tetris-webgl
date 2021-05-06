function keyEventListener(){
    document.addEventListener('keydown', (event) => {
        const keyname = event.key;
        console.log('keypress event: ' + keyname);
        if(state === OVER){
            if(keyname === "r"){
                restart = 1;
            }
            else if(keyname === "q"){
                closeBrowserTab();
            }
        }
        else{
            if(keyname === "ArrowLeft"){
                move_left();
            }
            else if(keyname === "ArrowRight"){
                move_right();
            }
            else if(keyname === "ArrowDown"){
                move_down_f();
            }
            else if(keyname === 'ArrowUp'){
                rotation();
            }
        }
    });
}

function closeBrowserTab(){
    window.opener = null;
    window.close();
}

/*basic data structures for the game*/
//record left-top position of each block
var grid_pos = [];
/* grid_pos
 [
    [[x1,y1],[x2,y2]],
    [[x3,y3],[x4,y4]],
 ]
*/
for(i = 0; i < 20; i++){
    var row = [];
    for(j = 0; j < 10; j++){
        row.push([-1.2+0.24*j, 2.4-0.24*i]);
    }
    grid_pos.push(row); 
}

var grid_colors = [];

function init_grid_colors(){
    grid_colors = [];
    for(i = 0; i < 20; i++){
        var row = [];
        for(j = 0; j < 10; j++){
            row.push(0);
        }
        grid_colors.push(row);
    }
}

init_grid_colors();

//for web_gl display
var grid_pos_array = [];
for(i = 0; i < 20; i++){
    for(j = 0; j < 10; j++){
        var temp_pos = grid_pos[i][j];
        grid_pos_array.push(temp_pos[0]);
        grid_pos_array.push(temp_pos[1]);
        grid_pos_array.push(temp_pos[0]+0.24);
        grid_pos_array.push(temp_pos[1]);
        grid_pos_array.push(temp_pos[0]);
        grid_pos_array.push(temp_pos[1]-0.24);
        grid_pos_array.push(temp_pos[0]+0.24);
        grid_pos_array.push(temp_pos[1]-0.24);
    }
}
for(i = 0; i < 20; i++){
    for(j = 0; j < 10; j++){
        var temp_pos = grid_pos[i][j];
        grid_pos_array.push(temp_pos[0]);
        grid_pos_array.push(temp_pos[1]);
        grid_pos_array.push(temp_pos[0]+0.24);
        grid_pos_array.push(temp_pos[1]);
        grid_pos_array.push(temp_pos[0]+0.24);
        grid_pos_array.push(temp_pos[1]-0.24);
        grid_pos_array.push(temp_pos[0]);
        grid_pos_array.push(temp_pos[1]-0.24);
    }
}

var grid_colors_array = [];

update_colors_array();

function update_colors_array(){
    grid_colors_array = [];
    for(i = 0; i < 20; i++){
        for(j = 0; j < 10; j++){
            var temp_color = grid_colors[i][j];
            for(k = 0; k < 4; k++){
                for(p = 0; p < 4; p++){
                    grid_colors_array.push(colorMap[temp_color][p]);
                }
            }
        }
    }
    for(i = 0; i < 3200; i++){
        grid_colors_array.push(0.41);
    }
}

function update_color(){
    for(i = 0; i < new_block.length; i++){
        grid_colors[new_block[i][0]][new_block[i][1]] = block_color;
    }
}

function erase_color(){
    for(i = 0; i < new_block.length; i++){
        grid_colors[new_block[i][0]][new_block[i][1]] = 0;
    }
}

var fpcount = 0;
var restart = 0;
var new_block = [];
var new_block_dir = [];
var block_type; 
var block_offset;
var block_color;
var block_positions = [];
const PRODUCENEW = "PRODUCENEW";
const FALLDOWN = "FALLDOWN";
const COLLISION = "COLLISION";
const OVER = "OVER";
var state = PRODUCENEW;

keyEventListener();

function collision_check(){
    for(i = 0; i < new_block.length; i++){
        var downpos = [new_block[i][0] + 1, new_block[i][1]];
        if(downpos[0] >= 20)
            return true;
        if(new_block.indexOf(downpos) == -1 && grid_colors[downpos[0]][downpos[1]] != 0)
            return true;
    }
    return false;
}

function end_collision_check(){
    for(i = 0; i < new_block.length; i++){
        if(grid_colors[new_block[i][0]][new_block[i][1]] != 0)
            return true;
    }
    return false;
}

function full_row_check() {
    var temp_grid_colors = [];
    for(i = 0; i < 20; i++){
        var flag = false;
        var row = [];
        for(j = 0; j < 10; j++){
            row.push(grid_colors[i][j]);
            if(grid_colors[i][j] == 0){
                flag = true;
            }
        }
        if(flag)
            temp_grid_colors.push(row);
    }
    fl = 20 - temp_grid_colors.length;
    if(fl > 0){
        var temp_fl_colors = [];
        for(i = 0; i < fl; i++){
            var row = [];
            for(j = 0; j < 10; j++)
                row.push(0);
            temp_fl_colors.push(row);
        }
        temp_grid_colors = temp_fl_colors.concat(temp_grid_colors);
    }
    grid_colors = temp_grid_colors;
}

//periodically invoke
function move_down(){
    if(fpcount != 8 || collision_check())
        return;
    for(i = 0; i < new_block.length; i++){
        new_block[i][0]++;
    }
}

function move_down_f(){
    if(collision_check())
        return;
    for(i = 0; i < new_block.length; i++){
        new_block[i][0]++;
    }
}

function move_right(){
    for(i = 0; i < new_block.length; i++){
        var downpos = [new_block[i][0], new_block[i][1] + 1];
        if(downpos[1] >= 10)
            break;
        if(new_block.indexOf(downpos) == -1 && grid_colors[downpos[0]][downpos[1]] != 0)
            break;
    }
    if(i == new_block.length){
        for(i = 0; i < new_block.length; i++){
            new_block[i][1]++;
        }
    }
}

function move_left(){
    for(i = 0; i < new_block.length; i++){
        var downpos = [new_block[i][0], new_block[i][1] - 1];
        if(downpos[0] < 0)
            break;
        if(new_block.indexOf(downpos) == -1 && grid_colors[downpos[0]][downpos[1]] != 0)
            break;
    }
    if(i == new_block.length){
        for(i = 0; i < new_block.length; i++){
            new_block[i][1]--;
        }
    }
}

function rotation(){
    new_block_dir = Block_Type(new_block[0][0], new_block[0][1]);
    var rotation_block= new_block_dir[block_type][(block_offset + 1) % 4];
    for(i = 0; i < rotation_block.length; i++){
        var pos = rotation_block[i];
        if(!(pos[0] >= 0 && pos[0] < 20 && pos[1] >= 0 && pos[1] < 10))
            break; 
        if(new_block.indexOf(pos) == -1 && grid_colors[pos[0]][pos[1]] != 0)
            break;
    }
    if(i == rotation_block.length){
        new_block = rotation_block;
        block_offset = (block_offset + 1) % 4;
    }
}

function random_generate_block(){
    block_type = parseInt(Math.random()*7, 10);
    block_offset = parseInt(Math.random()*2, 10);
    block_color = block_type + 1;
    rx = 1;
    ry = parseInt(Math.random()*6, 10) + 2;
    new_block_dir = Block_Type(rx, ry);
    new_block = new_block_dir[block_type][block_offset];
    //console.log(block_color);
}

function core_loop(){
    fpcount = (++fpcount) % 9;
    if(state === PRODUCENEW){
        if(restart === 1){
            init_grid_colors();
            update_colors_array();
            main();
            restart = 0;
        }
        full_row_check();
        random_generate_block();
        if(!end_collision_check()){
            update_color();
            update_colors_array();
            main();
            erase_color();
            state = FALLDOWN;
        }
        else{
            update_color();
            update_colors_array();
            main();
            //console.log("fail restart!");
            state = OVER;
        }
    }
    else if(state === FALLDOWN){
        if(end_collision_check())
            state = OVER;
        else if(!collision_check()){
            move_down();
            update_color();
            update_colors_array();
            main();
            erase_color();
            state = FALLDOWN;
        }else{
            update_color();
            update_colors_array();
            state = COLLISION;
        }  
    }
    else if(state === COLLISION){
        main();
        state = PRODUCENEW;
    }
    else if(state === OVER){
        //console.log("over!");
        if(restart === 1)
            state = PRODUCENEW;
    }
}

//main loop function
setInterval(core_loop, 100);

//main();
//
// Start here
//
function main() {
  const canvas = document.querySelector('#glcanvas');
  const gl = canvas.getContext('webgl');

  // If we don't have a GL context, give up now

  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }

  // Vertex shader program

  const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec4 aVertexColor;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying lowp vec4 vColor;

    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vColor = aVertexColor;
    }
  `;

  // Fragment shader program

  const fsSource = `
    varying lowp vec4 vColor;

    void main(void) {
      gl_FragColor = vColor;
    }
  `;

  // Initialize a shader program; this is where all the lighting
  // for the vertices and so forth is established.
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

  // Collect all the info needed to use the shader program.
  // Look up which attributes our shader program is using
  // for aVertexPosition, aVevrtexColor and also
  // look up uniform locations.
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
    },
  };

  // Here's where we call the routine that builds all the
  // objects we'll be drawing.
  const buffers = initBuffers(gl);

  // Draw the scene
  drawScene(gl, programInfo, buffers);
}

//
// initBuffers
//
// Initialize the buffers we'll need. For this demo, we just
// have one object -- a simple two-dimensional square.
//
function initBuffers(gl) {

  // Create a buffer for the square's positions.

  const positionBuffer = gl.createBuffer();

  // Select the positionBuffer as the one to apply buffer
  // operations to from here out.

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Now create an array of positions for the square.
/*
  const positions = [
     1.0,  1.0,
    -1.0,  1.0,
     1.0, -1.0,
    -1.0, -1.0,
  ];
*/ 
  // Now pass the list of positions into WebGL to build the
  // shape. We do this by creating a Float32Array from the
  // JavaScript array, then use it to fill the current buffer.

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(grid_pos_array), gl.STATIC_DRAW);

  // Now set up the colors for the vertices

  var colors = [
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
  ];

  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(grid_colors_array), gl.STATIC_DRAW);

  return {
    position: positionBuffer,
    color: colorBuffer,
  };
}

//
// Draw the scene.
//
function drawScene(gl, programInfo, buffers) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
  gl.clearDepth(1.0);                 // Clear everything
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

  // Clear the canvas before we start drawing on it.

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Create a perspective matrix, a special matrix that is
  // used to simulate the distortion of perspective in a camera.
  // Our field of view is 45 degrees, with a width/height
  // ratio that matches the display size of the canvas
  // and we only want to see objects between 0.1 units
  // and 100 units away from the camera.

  const fieldOfView = 45 * Math.PI / 180;   // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix,
                   fieldOfView,
                   aspect,
                   zNear,
                   zFar);

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
  const modelViewMatrix = mat4.create();

  // Now move the drawing position a bit to where we want to
  // start drawing the square.

  mat4.translate(modelViewMatrix,     // destination matrix
                 modelViewMatrix,     // matrix to translate
                 [-0.0, 0.0, -6.0]);  // amount to translate

  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute
  {
    const numComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexPosition);
  }

  // Tell WebGL how to pull out the colors from the color buffer
  // into the vertexColor attribute.
  {
    const numComponents = 4;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexColor,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexColor);
  }
  
  // Tell WebGL to use our program when drawing

  gl.useProgram(programInfo.program);

  // Set the shader uniforms

  gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix);
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrix);

  {
    const offset = 0;
    const vertexCount = 4;
    for(i = 0; i < 400; i++){
        if(i < 200)
            gl.drawArrays(gl.TRIANGLE_STRIP, offset+i*4, vertexCount);
        else
            gl.drawArrays(gl.LINE_LOOP, offset+i*4, vertexCount);
    }
   }
}

//
// Initialize a shader program, so WebGL knows how to draw our data
//
function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Create the shader program

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}

//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  // Send the source to the shader object

  gl.shaderSource(shader, source);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

