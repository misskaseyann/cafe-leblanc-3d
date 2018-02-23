/**
 * Created by Hans Dulimarta on 2/21/18.
 */
class Grid extends Object3D {
  constructor(gl, props) {
    super(gl);
    let vertices = [];
    let indices = [];
    let colors = [];
    var col = [Math.random(), Math.random(), Math.random()];
    if (typeof props.color !== 'undefined')
      col = props.color;
    var idx = 0;
    for (var x = props.xrange[0]; x <= props.xrange[1]; x += props.xstep) {
      vertices.push (x, props.yrange[0], 0);
      vertices.push (x, props.yrange[1], 0);
      indices.push (idx, idx + 1);
      idx += 2;
    }
    for (var y = props.yrange[0]; y <= props.yrange[1]; y += props.ystep) {
      vertices.push (props.xrange[0], y, 0);
      vertices.push (props.xrange[1], y, 0);
      indices.push (idx, idx + 1);
      idx += 2;
    }
    for (var k = 0; k < vertices.length/3; k++)
      colors.push(col[0], col[1], col[2]);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuff);
    gl.bufferData(gl.ARRAY_BUFFER, Float32Array.from(vertices), gl.STATIC_DRAW);

    this.colorBuff = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuff);
    gl.bufferData(gl.ARRAY_BUFFER, Float32Array.from(colors), gl.STATIC_DRAW);

    let idxBuff = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idxBuff);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, Uint16Array.from(indices), gl.STATIC_DRAW);
    this.primitives.push({type: gl.LINES, numPoints: indices.length, buffer: idxBuff})
  }
}