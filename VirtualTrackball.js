/**
 * Created by Hans Dulimarta on 2/18/18.
 *
 * Reference for implementation
 * https://www.khronos.org/opengl/wiki/Object_Mouse_Trackball
 */
class VirtualTrackball extends EventTarget {
  constructor(canvas, left, top, width, height) {
    super();
    this.myLeft = left;
    this.myTop = top;
    this.myWidth = width;
    this.myHeight = height;
    //this.canvas = canvas;
    /* (0,0) should be at the center of the viewport */
    this.ctrX = left + width/2;
    this.ctrY = top + height/2;
    // determine the sphere radius that fits the viewport
    this.radius = Math.min(width, height);
    this.dragging = false;
    canvas.addEventListener('mousedown', this._mouseDownHandler.bind(this));
    canvas.addEventListener('mousemove', this._mouseMoveHandler.bind(this));
    canvas.addEventListener('mouseup', ev => {
      this.dragging = false;
    });

    this.prevPoint = vec3.create();
    this.currPoint = vec3.create();
  }

  _mouseDownHandler(event) {
    /* ignore gesture if mouse is clicked outside the viewport */
    if (event.offsetX < this.myLeft) return;
    if (event.offsetX > this.myLeft + this.myWidth) return;
    if (event.offsetY < this.myTop) return;
    if (event.offsetY > this.myTop + this.myHeight) return;
    this.dragging = true;

    // Calculate the unit vector of the initial click
    this._calculateZ(this.prevPoint, event.offsetX, event.offsetY);
  }

  _calculateZ (vec, x, y) {
    /* convert to unit sphere */
    let xWorld = 2 * (x - this.ctrX) / this.radius;
    let yWorld = 2 * (-y + this.ctrY) / this.radius;
    var zWorld = 0.0;
    let hypot = xWorld * xWorld + yWorld * yWorld;
    if (hypot < 0.5)
      zWorld = Math.sqrt(1 - hypot);    // use the sphere
    else
      zWorld = 0.5 / Math.sqrt(hypot);  // use the hyperbolic sheet
    vec3.set(vec, xWorld, yWorld, zWorld);
    vec3.normalize(vec, vec);
  }

  _mouseMoveHandler(event) {
    if (!this.dragging) return;
    // Calculate the unit vector of the initial click
    this._calculateZ(this.currPoint, event.offsetX, event.offsetY);

    // Determine the quaternion for the rotation between the two unit vectors
    let rotaQuat = quat.rotationTo (quat.create(), this.prevPoint, this.currPoint);
    let vtEvent = new CustomEvent('vtchange', {detail: rotaQuat});
    this.dispatchEvent (vtEvent);

    // the current point becomes the previous
    vec3.copy(this.prevPoint, this.currPoint);
  }
}