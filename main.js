/**
 * Created by Hans Dulimarta on 2/21/18.
 */
var gl, canvas;
var projMat, viewMat;
var projUni, viewUni;
var axis;

function main() {
  canvas = document.getElementById('my-canvas');
  initListener();
  window.addEventListener('resize', resizeHandler);
  gl = WebGLUtils.create3DContext(canvas);
  init(gl);
  ShaderUtils.loadFromFile(gl, "vshader.glsl", "fshader.glsl").then(start);
}

function start(prog) {
  gl.useProgram(prog);
  gl.clearColor(0, 0, 0, 1);
  gl.enable (gl.DEPTH_TEST);

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
  viewMat = mat4.create();

  // the camera is initially looking towards Z-negative
  // rotate around X to bring the Z axis pointing to the sky, but also
  // rotate the camera to get the correct ration for isometric projection

  let angle = Math.asin(1/Math.sqrt(3));
  mat4.rotateX(viewMat, viewMat, glMatrix.toRadian(-90) + angle);

  mat4.rotateZ (viewMat, viewMat, glMatrix.toRadian(-135));
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
  let h = 0.75 * w;
  if (canvas.offsetTop + h + 16 > window.innerHeight) {
    canvas.height = window.innerHeight - canvas.offsetTop - 16;
    canvas.width = 1.333 * canvas.height;
  }
  else {
    canvas.width = w;
    canvas.height = h;
  }
  gl.viewport (0, 0, canvas.width, canvas.height);
  mat4.ortho(projMat, -6, +6, -4.5, +4.5, -10, +10);
  gl.uniformMatrix4fv (projUni, false, projMat);
}

function init(gl) {
  axis = new Axes(gl);
  grid = new Grid(gl, {
    xrange: [-10, 10], yrange: [-10,+10],
    xstep: 1.0, ystep: 1.0,
    color: [1,1,0]
  });
  // blueCube = new Cube(gl, {size: 1,
  //   topColor: [0.1, 0.6, 0.9], bottomColor: [1,1,1]});
  // greenCube = new Cube(gl, {size: 1,
  //   topColor: [0.03, 0.3, 0.25], bottomColor: [1,1,1]});
  // torusBig = new Torus(gl, {
  //     majorRadius: 5, minorRadius: 3
  // });
}

var tmp = mat4.create();

function display() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  let tx = [ 1, 2, 2, 2, 2,  2,  2,  1, 0, -1, -2, -3];
  let ty = [ 3, 3, 2, 1, 0, -1, -2, -2, -2, -2, -2, -2];
  axis.draw(gl);
  grid.draw(gl);
  //torusBig.draw(gl);

  /* line up on the ground */
  // for (var k = 0; k < tx.length; k++) {
  //   mat4.fromTranslation(tmp, vec3.fromValues(tx[k], ty[k], 0));
  //   blueCube.draw(gl, tmp);
  // }
  // /* stack up */
  // for (var k = 1; k <= 4; k++) {
  //   mat4.fromTranslation(tmp, vec3.fromValues(1, 3, k));
  //   greenCube.draw(gl, tmp);
  // }
}

function initListener() {
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
                // newView = mat4.fromTranslation(mat4.create(), vec3.fromValues(0, 0.05, -0.05));
                // mat4.multiply(viewMat, newView, viewMat);
                // gl.uniformMatrix4fv(viewUni, false, viewMat);
                // window.requestAnimFrame(display);
                break;
            // Down Arrow Key - Move: backward -Z axis.
            case 40:
                // newView = mat4.fromTranslation(mat4.create(), vec3.fromValues(0, 0, -0.05));
                // mat4.multiply(viewMat, newView, viewMat);
                // gl.uniformMatrix4fv(viewUni, false, viewMat);
                // window.requestAnimFrame(display);
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
        }
    });
}