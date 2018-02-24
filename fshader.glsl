precision mediump float;
varying vec4 varColor;

void main() {
  gl_FragColor = varColor;
  //gl_FragColor = texture2D(u_texture, v_texcoord);
}
