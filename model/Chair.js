class Chair extends ObjectGroup {
    constructor(gl) {
        super(gl);
        // build object here
        // build four legs
        for (let k = 0; k < 4; k++) {
            let leg = new PolygonalPrism(gl, {
                topRadius: 0.03,
                bottomRadius: 0.001,
                numSides: 20,
                height: 0.5,
                topColor: vec3.fromValues(0, 0, 0),
                bottomColor: vec3.fromValues(0.462, 0.286, 0.058)
            });
            switch (k) {
                case 0:
                    mat4.translate(leg.coordFrame, leg.coordFrame,
                        vec3.fromValues(0.2, 0.2, 0));
                    break;
                case 1:
                    mat4.translate(leg.coordFrame, leg.coordFrame,
                        vec3.fromValues(-0.2, 0.2, 0));
                    break;
                case 2:
                    mat4.translate(leg.coordFrame, leg.coordFrame,
                        vec3.fromValues(0.2, -0.2, 0));
                    break;
                case 3:
                    mat4.translate(leg.coordFrame, leg.coordFrame,
                        vec3.fromValues(-0.2, -0.2, 0));
                    break;
            }
            this.group.push(leg);
        }
        // build horizontal leg supports
        for (let k = 0; k < 3; k++) {
            let legSupport = new PolygonalPrism(gl, {
                topRadius: .01,
                bottomRadius: .01,
                numSides: 20,
                height: 0.4,
                topColor: vec3.fromValues(0.2, 0.121, 0.019),
                bottomColor: vec3.fromValues(0.462, 0.286, 0.058)
            });
            switch(k) {
                case 0:
                    mat4.rotateX(legSupport.coordFrame, legSupport.coordFrame, glMatrix.toRadian(90));
                    // x, y, z
                    mat4.translate(legSupport.coordFrame, legSupport.coordFrame, vec3.fromValues(0.2, 0.3, -.2));
                    break;
                case 1:
                    mat4.rotateX(legSupport.coordFrame, legSupport.coordFrame, glMatrix.toRadian(90));
                    // x, y, z
                    mat4.translate(legSupport.coordFrame, legSupport.coordFrame, vec3.fromValues(-0.2, 0.3, -.2));
                    break;
                case 2:
                    mat4.rotateY(legSupport.coordFrame, legSupport.coordFrame, glMatrix.toRadian(90));
                    // x, y, z
                    mat4.translate(legSupport.coordFrame, legSupport.coordFrame, vec3.fromValues(-0.15, 0.2, -.2));
                    break;
            }
            this.group.push(legSupport);
        }
    }
}