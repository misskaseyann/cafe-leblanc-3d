/**
 * Created by Hans Dulimarta on 2/21/18.
 */
var gl, canvas, menu;
var projMat, viewMat;
var projUni, viewUni;
var obj;

function main() {
  canvas = document.getElementById('my-canvas');
  menu = document.getElementById('obj-select');
  initListener();
  window.addEventListener('resize', resizeHandler);
  gl = WebGLUtils.create3DContext(canvas);
  init(gl);
  ShaderUtils.loadFromFile(gl, "vshader.glsl", "fshader.glsl").then(start);
}

function start(prog) {
  gl.useProgram(prog);
  gl.clearColor(0, 0, 0, 1);
    gl.enable(gl.CULL_FACE);
  gl.enable (gl.DEPTH_TEST);
  gl.cullFace(gl.BACK);

  let posAttr = gl.getAttribLocation(prog, "vertexPos");
  let colAttr = gl.getAttribLocation(prog, "vertexCol");
  gl.enableVertexAttribArray(posAttr);
  gl.enableVertexAttribArray(colAttr);
  Object3D.linkShaderAttrib({
    positionAttr: posAttr,
    colorAttr: colAttr
  });

  let modelUni = gl.getUniformLocation(prog, "modelCF");
  projUni = gl.getUniformLocation(prog, "projection");
  viewUni = gl.getUniformLocation(prog, "view");
  Object3D.linkShaderUniform({
    projection: projUni,
    view: viewUni,
    model: modelUni
  });
  projMat = mat4.create();
  gl.uniformMatrix4fv (projUni, false, projMat);

  // -----------------------
    viewMat = mat4.lookAt(mat4.create(),
        vec3.fromValues (0, 4, 2),  // eye coord
        vec3.fromValues (0, 0, 1),  // gaze point
        vec3.fromValues (0, 0, 1)   // Z is up
    );
  gl.uniformMatrix4fv (viewUni, false, viewMat);
  resizeHandler();

  requestAnimFrame(display);

  let trackball = new VirtualTrackball(canvas, 0, 0, canvas.width, canvas.height);
  trackball.addEventListener('vtchange', ev => {

    // determine rotation matrix from the quaternion of trackball
    let rotMat = mat4.fromQuat(mat4.create(), ev.detail);

    // rotate the view
    mat4.multiply(viewMat, rotMat, viewMat);
    gl.uniformMatrix4fv (viewUni, false, viewMat);
    requestAnimFrame(display);
  });
}

function resizeHandler() {
    let w = window.innerWidth - 16;
    let h = 0.75 * window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    mat4.perspective (projMat, glMatrix.toRadian(60), w/h, 0.05, 20);
    gl.uniformMatrix4fv (projUni, false, projMat);
    gl.viewport(0, 0, w, h);
}

function init(gl) {
    obj = new ObjectGroup(gl);
  grid = new Grid(gl, {
    xrange: [-10, 10], yrange: [-10,+10],
    xstep: 1.0, ystep: 1.0,
    color: [1,1,0]
  });
  chair1 = new Chair(gl);
  chair2 = new Chair(gl);
  chair3 = new Chair(gl);
  chair4 = new Chair(gl);
  chair5 = new Chair(gl);
  counter = new Counter(gl);
  light1 = new Light(gl);
  light2 = new Light(gl);
  light3 = new Light(gl);
  light4 = new Light(gl);
  sushi1 = new Sushi(gl);
  sushi2 = new Sushi(gl);
  sushi3 = new Sushi(gl);
  sake1 = new SakeBottle(gl);
  sake2 = new SakeBottle(gl);
  sake3 = new SakeBottle(gl);
  rug = new Cone(gl, {
        radius: 4,
        height: 0.0001,
        tipColor: vec3.fromValues(0.317, 0.043, 0.023),
        baseColor: vec3.fromValues(0.317, 0.043, 0.023)
  });
}

let tmp = mat4.create();
let sushitmp = [0, -1.15, 0];
let saketmp = [-1.5, .2, 0];
let chairtmp = [-1, 0, 0];

function display() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  //grid.draw(gl);
  chair1.draw(gl);
  mat4.fromTranslation(tmp, vec3.fromValues(chairtmp[0], chairtmp[1], chairtmp[2]));
  mat4.rotateZ(tmp, tmp, glMatrix.toRadian(-40));
  chair2.draw(gl, tmp);
  mat4.fromTranslation(tmp, vec3.fromValues(-2, 0, 0));
  chair3.draw(gl, tmp);
  mat4.fromTranslation(tmp, vec3.fromValues(1, 0, 0));
  chair4.draw(gl, tmp);
  mat4.fromTranslation(tmp, vec3.fromValues(2, 0, 0));
  chair5.draw(gl, tmp);

  mat4.fromTranslation(tmp, vec3.fromValues(-3, -.75, 0));
  counter.draw(gl, tmp);

  mat4.fromTranslation(tmp, vec3.fromValues(-2, -1.1, 0));
  light1.draw(gl, tmp);
  mat4.fromTranslation(tmp, vec3.fromValues(-.75, -1.1, 0));
  light2.draw(gl, tmp);
  mat4.fromTranslation(tmp, vec3.fromValues(.75, -1.1, 0));
  light3.draw(gl, tmp);
  mat4.fromTranslation(tmp, vec3.fromValues(2, -1.1, 0));
  light4.draw(gl, tmp);

  mat4.fromTranslation(tmp, vec3.fromValues(sushitmp[0], sushitmp[1], sushitmp[2]));
  sushi1.draw(gl, tmp);
  mat4.fromTranslation(tmp, vec3.fromValues(1, -1.15, 0));
  sushi2.draw(gl, tmp);
  mat4.fromTranslation(tmp, vec3.fromValues(-2, -1.15, 0));
  sushi3.draw(gl, tmp);

  sake1.draw(gl);
  mat4.fromTranslation(tmp, vec3.fromValues(saketmp[0], saketmp[1], saketmp[2]));
  sake2.draw(gl, tmp);
  mat4.fromTranslation(tmp, vec3.fromValues(2, 0, 0));
  sake3.draw(gl, tmp);
  mat4.fromTranslation(tmp, vec3.fromValues(0, -1.5, 0));
  rug.draw(gl, tmp);
}

function initListener() {
    menu.addEventListener('click', event=> {
        switch (menu.selectedIndex) {
            case 0:
                obj = 0;
                break;
            case 1:
                obj = 1;
                break;
            case 2:
                obj = 2;
                break;
        }
    });
    window.addEventListener('wheel', event => {
        switch (event.deltaMode) {
            case event.deltaY:
                newView = mat4.fromTranslation(mat4.create(), vec3.fromValues(0, 0, 0.05));
                mat4.multiply(viewMat, newView, viewMat);
                gl.uniformMatrix4fv(viewUni, false, viewMat);
                window.requestAnimFrame(display);
                break;
            case (event.deltaX):
                newView = mat4.fromTranslation(mat4.create(), vec3.fromValues(0, 0, -0.05));
                mat4.multiply(viewMat, newView, viewMat);
                gl.uniformMatrix4fv(viewUni, false, viewMat);
                window.requestAnimFrame(display);
                break;
        }
    });
    window.addEventListener('keydown', event => {
        switch (event.keyCode) {
            // W Key - Pitch: -X axis.
            case 87:
                newView = mat4.create();
                mat4.fromXRotation(newView, -.01);
                mat4.multiply(viewMat, newView, viewMat);
                gl.uniformMatrix4fv(viewUni, false, viewMat);
                window.requestAnimFrame(display);
                break;
            // S Key - Pitch: +X axis.
            case 83:
                newView = mat4.create();
                mat4.fromXRotation(newView, .01);
                mat4.multiply(viewMat, newView, viewMat);
                gl.uniformMatrix4fv(viewUni, false, viewMat);
                window.requestAnimFrame(display);
                break;
            // A Key - Yaw: -Y axis.
            case 65:
                newView = mat4.create();
                mat4.fromYRotation(newView, -.01);
                mat4.multiply(viewMat, newView, viewMat);
                gl.uniformMatrix4fv(viewUni, false, viewMat);
                window.requestAnimFrame(display);
                break;
            // D Key - Yaw: +Y axis.
            case 68:
                newView = mat4.create();
                mat4.fromYRotation(newView, .01);
                mat4.multiply(viewMat, newView, viewMat);
                gl.uniformMatrix4fv(viewUni, false, viewMat);
                window.requestAnimFrame(display);
                break;
            // Up Arrow Key - Move: forward +Z axis.
            case 38:
                newView = mat4.fromTranslation(mat4.create(), vec3.fromValues(0, 0, 0.05));
                mat4.multiply(viewMat, newView, viewMat);
                gl.uniformMatrix4fv(viewUni, false, viewMat);
                window.requestAnimFrame(display);
                break;
            // Down Arrow Key - Move: backward -Z axis.
            case 40:
                newView = mat4.fromTranslation(mat4.create(), vec3.fromValues(0, 0, -0.05));
                mat4.multiply(viewMat, newView, viewMat);
                gl.uniformMatrix4fv(viewUni, false, viewMat);
                window.requestAnimFrame(display);
                break;
            // Right Arrow Key - Roll: right +Z axis.
            case 39:
                newView = mat4.create();
                mat4.fromZRotation(newView, .01);
                mat4.multiply(viewMat, newView, viewMat);
                gl.uniformMatrix4fv(viewUni, false, viewMat);
                window.requestAnimFrame(display);
                break;
            // Left Arrow Key - Roll: left -Z axis.
            case 37:
                newView = mat4.create();
                mat4.fromZRotation(newView, -.01);
                mat4.multiply(viewMat, newView, viewMat);
                gl.uniformMatrix4fv(viewUni, false, viewMat);
                window.requestAnimFrame(display);
                break;
            case 49:
                viewMat = mat4.lookAt(mat4.create(),
                    vec3.fromValues (1, -1, 2),  // eye coord
                    vec3.fromValues (0, 0, 1),  // gaze point
                    vec3.fromValues (0, 0, 1)   // Z is up
                );
                gl.uniformMatrix4fv (viewUni, false, viewMat);
                window.requestAnimFrame(display);
                break;
            case 50:
                viewMat = mat4.lookAt(mat4.create(),
                    vec3.fromValues (-1, 0, 4),  // eye coord
                    vec3.fromValues (0, 0, 1),  // gaze point
                    vec3.fromValues (0, 0, 1)   // Z is up
                );
                gl.uniformMatrix4fv (viewUni, false, viewMat);
                window.requestAnimFrame(display);
                break;
            case 51:
                viewMat = mat4.lookAt(mat4.create(),
                    vec3.fromValues (0, -4, 3),  // eye coord
                    vec3.fromValues (0, 0, 1),  // gaze point
                    vec3.fromValues (0, 0, 1)   // Z is up
                );
                gl.uniformMatrix4fv (viewUni, false, viewMat);
                window.requestAnimFrame(display);
                break;
            case 52:
                viewMat = mat4.lookAt(mat4.create(),
                    vec3.fromValues (0, 4, 2),  // eye coord
                    vec3.fromValues (0, 0, 1),  // gaze point
                    vec3.fromValues (0, 0, 1)   // Z is up
                );
                gl.uniformMatrix4fv (viewUni, false, viewMat);
                window.requestAnimFrame(display);
                break;
            case 85:
                // u moves objects left
                if (obj === 0) {
                    sushitmp[0] = sushitmp[0] + 0.05;
                    window.requestAnimFrame(display);
                }
                if (obj === 1) {
                    saketmp[0] = saketmp[0] + 0.05;
                    window.requestAnimFrame(display);
                }
                if (obj === 2) {
                    chairtmp[0] = chairtmp[0] + 0.05;
                    window.requestAnimFrame(display);
                }
                break;
            case 73:
                // i moves objects right
                if (obj === 0) {
                    sushitmp[0] = sushitmp[0] - 0.05;
                    window.requestAnimFrame(display);
                }
                if (obj === 1) {
                    saketmp[0] = saketmp[0] - 0.05;
                    window.requestAnimFrame(display);
                }
                if (obj === 2) {
                    chairtmp[0] = chairtmp[0] - 0.05;
                    window.requestAnimFrame(display);
                }
                break;
            case 74:
                // j moves objects closer
                if (obj === 0) {
                    sushitmp[1] = sushitmp[1] + 0.05;
                    window.requestAnimFrame(display);
                }
                if (obj === 1) {
                    saketmp[1] = saketmp[1] + 0.05;
                    window.requestAnimFrame(display);
                }
                if (obj === 2) {
                    chairtmp[1] = chairtmp[1] + 0.05;
                    window.requestAnimFrame(display);
                }
                break;
            case 75:
                // k moves objects further away
                if (obj === 0) {
                    sushitmp[1] = sushitmp[1] - 0.05;
                    window.requestAnimFrame(display);
                }
                if (obj === 1) {
                    saketmp[1] = saketmp[1] - 0.05;
                    window.requestAnimFrame(display);
                }
                if (obj === 2) {
                    chairtmp[1] = chairtmp[1] - 0.05;
                    window.requestAnimFrame(display);
                }
                break;
            case 78:
                // n moves objects up
                if (obj === 0) {
                    sushitmp[2] = sushitmp[2] + 0.05;
                    window.requestAnimFrame(display);
                }
                if (obj === 1) {
                    saketmp[2] = saketmp[2] + 0.05;
                    window.requestAnimFrame(display);
                }
                if (obj === 2) {
                    chairtmp[2] = chairtmp[2] + 0.05;
                    window.requestAnimFrame(display);
                }
                break;
            case 77:
                // k moves objects down
                if (obj === 0) {
                    sushitmp[2] = sushitmp[2] - 0.05;
                    window.requestAnimFrame(display);
                }
                if (obj === 1) {
                    saketmp[2] = saketmp[2] - 0.05;
                    window.requestAnimFrame(display);
                }
                if (obj === 2) {
                    chairtmp[2] = chairtmp[2] - 0.05;
                    window.requestAnimFrame(display);
                }
                break;
        }
    });
}