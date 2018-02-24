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
            let legShear = mat4.create();
            switch (k) {
                case 0:
                    legShear[9] = Math.tan(glMatrix.toRadian(-10));
                    legShear[8] = Math.tan(glMatrix.toRadian(-10));
                    mat4.translate(leg.coordFrame, leg.coordFrame,
                        vec3.fromValues(0.3, 0.3, 0));
                    mat4.multiply(leg.coordFrame, leg.coordFrame, legShear);
                    break;
                case 1:
                    legShear[9] = Math.tan(glMatrix.toRadian(-10));
                    legShear[8] = Math.tan(glMatrix.toRadian(10));
                    mat4.translate(leg.coordFrame, leg.coordFrame,
                        vec3.fromValues(-0.3, 0.3, 0));
                    mat4.multiply(leg.coordFrame, leg.coordFrame, legShear);
                    break;
                case 2:
                    legShear[9] = Math.tan(glMatrix.toRadian(10));
                    legShear[8] = Math.tan(glMatrix.toRadian(-10));
                    mat4.translate(leg.coordFrame, leg.coordFrame,
                        vec3.fromValues(0.3, -0.3, 0));
                    mat4.multiply(leg.coordFrame, leg.coordFrame, legShear);
                    break;
                case 3:
                    legShear[9] = Math.tan(glMatrix.toRadian(10));
                    legShear[8] = Math.tan(glMatrix.toRadian(10));
                    mat4.translate(leg.coordFrame, leg.coordFrame,
                        vec3.fromValues(-0.3, -0.3, 0));
                    mat4.multiply(leg.coordFrame, leg.coordFrame, legShear);
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
                height: 0.53,
                topColor: vec3.fromValues(0.2, 0.121, 0.019),
                bottomColor: vec3.fromValues(0.462, 0.286, 0.058)
            });
            switch(k) {
                case 0:
                    mat4.rotateX(legSupport.coordFrame, legSupport.coordFrame, glMatrix.toRadian(90));
                    // x, y, z
                    mat4.translate(legSupport.coordFrame, legSupport.coordFrame, vec3.fromValues(0.25, 0.3, -.265));
                    break;
                case 1:
                    mat4.rotateX(legSupport.coordFrame, legSupport.coordFrame, glMatrix.toRadian(90));
                    // x, y, z
                    mat4.translate(legSupport.coordFrame, legSupport.coordFrame, vec3.fromValues(-0.25, 0.3, -.265));
                    break;
                case 2:
                    mat4.rotateY(legSupport.coordFrame, legSupport.coordFrame, glMatrix.toRadian(90));
                    // x, y, z
                    mat4.translate(legSupport.coordFrame, legSupport.coordFrame, vec3.fromValues(-0.15, 0.28, -.27));
                    break;
            }
            this.group.push(legSupport);
        }
        // build back pegs of chair
        for (let k = 0; k < 5; k++) {
            let backPeg = new PolygonalPrism(gl, {
                topRadius: 0.015,
                bottomRadius: 0.015,
                numSides: 20,
                height: 0.6,
                topColor: vec3.fromValues(0.2, 0.121, 0.019),
                bottomColor: vec3.fromValues(0.462, 0.286, 0.058)
            });
            let pegShear = mat4.create();
            switch (k) {
                case 0:
                    mat4.translate(backPeg.coordFrame, backPeg.coordFrame,
                        vec3.fromValues(0, 0.25, .7));
                    break;
                case 1:
                    pegShear[8] = Math.tan(glMatrix.toRadian(-4));
                    mat4.translate(backPeg.coordFrame, backPeg.coordFrame,
                        vec3.fromValues(-.1, 0.25, .7));
                    mat4.multiply(backPeg.coordFrame, backPeg.coordFrame, pegShear);
                    break;
                case 2:
                    pegShear[8] = Math.tan(glMatrix.toRadian(-8));
                    mat4.translate(backPeg.coordFrame, backPeg.coordFrame,
                        vec3.fromValues(-.2, 0.25, .7));
                    mat4.multiply(backPeg.coordFrame, backPeg.coordFrame, pegShear);
                    break;
                case 3:
                    pegShear[8] = Math.tan(glMatrix.toRadian(4));
                    mat4.translate(backPeg.coordFrame, backPeg.coordFrame,
                        vec3.fromValues(.1, 0.25, .7));
                    mat4.multiply(backPeg.coordFrame, backPeg.coordFrame, pegShear);
                    break;
                case 4:
                    pegShear[8] = Math.tan(glMatrix.toRadian(8));
                    mat4.translate(backPeg.coordFrame, backPeg.coordFrame,
                        vec3.fromValues(.2, 0.25, .7));
                    mat4.multiply(backPeg.coordFrame, backPeg.coordFrame, pegShear);
                    break;
            }
            this.group.push(backPeg);
        }
        // build seat base
        let cushSupport = new PolygonalPrism(gl, {
            topRadius: 0.35,
            bottomRadius: 0.35,
            numSides: 4,
            height: 0.15,
            topColor: vec3.fromValues(0.2, 0.121, 0.019),
            bottomColor: vec3.fromValues(0.462, 0.286, 0.058)
        });
        mat4.rotateZ(cushSupport.coordFrame, cushSupport.coordFrame, glMatrix.toRadian(45));
        mat4.translate(cushSupport.coordFrame, cushSupport.coordFrame, vec3.fromValues(0, 0, 0.5));
        this.group.push(cushSupport);
        // build seat cushion
        let cush = new PolygonalPrism(gl, {
            topRadius: 0.35,
            bottomRadius: 0.35,
            numSides: 4,
            height: 0.05,
            topColor: vec3.fromValues(0.768, 0.2, 0.109),
            bottomColor: vec3.fromValues(0.494, 0.141, 0.086)
        });
        mat4.rotateZ(cush.coordFrame, cush.coordFrame, glMatrix.toRadian(45));
        mat4.translate(cush.coordFrame, cush.coordFrame, vec3.fromValues(0, 0, 0.65));
        this.group.push(cush);
        // build back head rest
        let backHead = new PolygonalPrism(gl, {
            topRadius: 0.03,
            bottomRadius: 0.03,
            numSides: 20,
            height: .6,
            topColor: vec3.fromValues(0.2, 0.121, 0.019),
            bottomColor: vec3.fromValues(0.462, 0.286, 0.058)
        });
        mat4.rotateX(backHead.coordFrame, backHead.coordFrame, glMatrix.toRadian(-90));
        mat4.rotateY(backHead.coordFrame, backHead.coordFrame, glMatrix.toRadian(-90));
        mat4.translate(backHead.coordFrame, backHead.coordFrame, vec3.fromValues(0.25, -1.3, -.3));
        this.group.push(backHead);
    }
}