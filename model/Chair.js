class Chair extends ObjectGroup {
    constructor(gl) {
        super(gl);
        // build object here
        for (let k = 0; k < 4; k++) {
            let leg = new PolygonalPrism(gl, {
                topRadius: 0.03,
                bottomRadius: 0.001,
                numSides: 20,
                height: 0.5,
                topColor: vec3.fromValues(0.2, 0.121, 0.019),
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
    }
}