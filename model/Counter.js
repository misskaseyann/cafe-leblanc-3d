class Counter extends ObjectGroup {
    constructor(gl) {
        super(gl);

        let bottomFront = new PolygonalPrism(gl, {
            topRadius: 0.75,
            bottomRadius: 0.75,
            numSides: 4,
            height: 6,
            topColor: vec3.fromValues(0.2, 0.121, 0.019),
            bottomColor: vec3.fromValues(0.376, 0.231, 0.043)
        });
        mat4.rotateX(bottomFront.coordFrame, bottomFront.coordFrame, glMatrix.toRadian(45));
        mat4.rotateY(bottomFront.coordFrame, bottomFront.coordFrame, glMatrix.toRadian(90));
        mat4.translate(bottomFront.coordFrame, bottomFront.coordFrame, vec3.fromValues(-.75, 0, 0));
        this.group.push(bottomFront);

        let lip = new PolygonalPrism(gl, {
            topRadius: 0.1,
            bottomRadius: 0.1,
            numSides: 4,
            height: 6,
            topColor: vec3.fromValues(0.462, 0.286, 0.058),
            bottomColor: vec3.fromValues(0.2, 0.121, 0.019)
        });
        mat4.rotateX(lip.coordFrame, lip.coordFrame, glMatrix.toRadian(45));
        mat4.rotateY(lip.coordFrame, lip.coordFrame, glMatrix.toRadian(90));
        mat4.translate(lip.coordFrame, lip.coordFrame, vec3.fromValues(-.7, .75, 0));
        this.group.push(lip);
    }
}