/**
 * Created by Hans Dulimarta on 2/22/18.
 */
class Cube extends Object3D {
  constructor(gl, props) {
    super(gl);
    if (!this._checkProperties(props, ['size'])) {
      throw "Cube: missing required properties: size";
    }
    var topClr, botClr;
    if (typeof props.topColor == 'undefined')
      topClr = [Math.random(), Math.random(), Math.random()];
    else
      topClr = props.topColor;
    if (typeof props.bottomColor == 'undefined')
      botClr = [Math.random(), Math.random(), Math.random()];
    else
      botClr = props.bottomColor;
    const S = props.size / 2;
    let vertices = [
      -S, -S, -S, +S, -S, -S, +S, +S, -S, -S, +S, -S,  /* bottom vertices */
      -S, -S, +S, +S, -S, +S, +S, +S, +S, -S, +S, +S]; /* top vertices */
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuff);
    gl.bufferData(gl.ARRAY_BUFFER, Float32Array.from(vertices), gl.STATIC_DRAW);

    let colors = [];
    for (var k = 0; k < 4; k++)
      colors.push(botClr[0], botClr[1], botClr[2]);
    for (var k = 0; k < 4; k++)
      colors.push(topClr[0], topClr[1], topClr[2]);

    this.colorBuff = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuff);
    gl.bufferData(gl.ARRAY_BUFFER, Float32Array.from(colors), gl.STATIC_DRAW);

    var idx0Buff = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idx0Buff);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, Uint16Array.from([4,0,5,1,6,2,7,3,4,0]),
        gl.STATIC_DRAW);
    this.primitives.push({type: gl.TRIANGLE_STRIP, numPoints: 10, buffer: idx0Buff});

    var idx1Buff = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idx1Buff);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, Uint16Array.from([4,5,6,7]),
        gl.STATIC_DRAW);
    this.primitives.push({type: gl.TRIANGLE_FAN, numPoints: 4, buffer: idx1Buff});

    var idx2Buff = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idx2Buff);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, Uint16Array.from([0,3,2,1]),
        gl.STATIC_DRAW);
    this.primitives.push({type: gl.TRIANGLE_FAN, numPoints: 4, buffer: idx2Buff});
    this.coordFrame[12] += 0.5;
    this.coordFrame[13] += 0.5;
    this.coordFrame[14] += 0.5;
  }
}