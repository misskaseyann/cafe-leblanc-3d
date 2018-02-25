class Sushi extends ObjectGroup {
    constructor(gl) {
        super(gl);
        let plate = new Cone(gl, {
            radius: .3,
            height: 0.0001,
            tipColor: vec3.fromValues(0.858, 0.858, 0.858),
            baseColor: vec3.fromValues(1, 1, 1)
        });
        mat4.translate(plate.coordFrame, plate.coordFrame, vec3.fromValues(0, 0, 1.1));
        this.group.push(plate);
        let sashimi1 = new PolygonalPrism(gl, {
            topRadius: .03,
            bottomRadius: .03,
            numSides: 4,
            height: .2,
            topColor: vec3.fromValues(0.972, 0.349, 0.125),
            bottomColor: vec3.fromValues(0.972, 0.349, 0.125)
        });
        mat4.rotateX(sashimi1.coordFrame, sashimi1.coordFrame, glMatrix.toRadian(90));
        mat4.translate(sashimi1.coordFrame, sashimi1.coordFrame, vec3.fromValues(0, 1.1, .05));
        this.group.push(sashimi1);
        let sashimi2 = new PolygonalPrism(gl, {
            topRadius: .03,
            bottomRadius: .03,
            numSides: 4,
            height: .2,
            topColor: vec3.fromValues(0.972, 0.156, 0.125),
            bottomColor: vec3.fromValues(0.972, 0.156, 0.125)
        });
        mat4.rotateX(sashimi2.coordFrame, sashimi2.coordFrame, glMatrix.toRadian(90));
        mat4.translate(sashimi2.coordFrame, sashimi2.coordFrame, vec3.fromValues(0.1, 1.1, .05));
        this.group.push(sashimi2);
        let sashimi3 = new PolygonalPrism(gl, {
            topRadius: .03,
            bottomRadius: .03,
            numSides: 4,
            height: .2,
            topColor: vec3.fromValues(0.964, 0.662, 0.654),
            bottomColor: vec3.fromValues(0.964, 0.662, 0.654)
        });
        mat4.rotateX(sashimi3.coordFrame, sashimi3.coordFrame, glMatrix.toRadian(90));
        mat4.translate(sashimi3.coordFrame, sashimi3.coordFrame, vec3.fromValues(-0.1, 1.1, .05));
        this.group.push(sashimi3);
        let roll1 = new PolygonalPrism(gl, {
            topRadius: .05,
            bottomRadius: .05,
            numSides: 10,
            height: .05,
            topColor: vec3.fromValues(0.011, 0.427, 0.156),
            bottomColor: vec3.fromValues(0.027, 0.235, 0.086)
        });
        mat4.translate(roll1.coordFrame, roll1.coordFrame, vec3.fromValues(0, .15, 1.11));
        this.group.push(roll1);

        let rice1 = new PolygonalPrism(gl, {
            topRadius: .04,
            bottomRadius: .04,
            numSides: 10,
            height: .01,
            topColor: vec3.fromValues(1, 1, 1),
            bottomColor: vec3.fromValues(1, 1, 1)
        });
        mat4.translate(rice1.coordFrame, rice1.coordFrame, vec3.fromValues(0, .15, 1.16));
        this.group.push(rice1);

        let egg1 = new Sphere(gl, {
            radius: 0.03,
            splitDepth: 5,
            northColor: vec3.fromValues(0.929, 0.317, 0.313),
            equatorColor: vec3.fromValues(0.905, 0.082, 0.074),
            southColor: vec3.fromValues(0.658, 0.066, 0.062)
        });
        mat4.translate(egg1.coordFrame, egg1.coordFrame, vec3.fromValues(0, .15, 1.15));
        this.group.push(egg1);

        let roll2 = new PolygonalPrism(gl, {
            topRadius: .05,
            bottomRadius: .05,
            numSides: 10,
            height: .05,
            topColor: vec3.fromValues(0.011, 0.427, 0.156),
            bottomColor: vec3.fromValues(0.027, 0.235, 0.086)
        });
        mat4.translate(roll2.coordFrame, roll2.coordFrame, vec3.fromValues(.15, .15, 1.11));
        this.group.push(roll2);

        let rice2 = new PolygonalPrism(gl, {
            topRadius: .04,
            bottomRadius: .04,
            numSides: 10,
            height: .01,
            topColor: vec3.fromValues(1, 1, 1),
            bottomColor: vec3.fromValues(1, 1, 1)
        });
        mat4.translate(rice2.coordFrame, rice2.coordFrame, vec3.fromValues(.15, .15, 1.16));
        this.group.push(rice2);

        let egg2 = new Sphere(gl, {
            radius: 0.03,
            splitDepth: 5,
            northColor: vec3.fromValues(0.929, 0.317, 0.313),
            equatorColor: vec3.fromValues(0.905, 0.082, 0.074),
            southColor: vec3.fromValues(0.658, 0.066, 0.062)
        });
        mat4.translate(egg2.coordFrame, egg2.coordFrame, vec3.fromValues(.15, .15, 1.15));
        this.group.push(egg2);

        let chop1 = new PolygonalPrism(gl, {
            topRadius: .005,
            bottomRadius: .02,
            numSides: 4,
            height: .5,
            topColor: vec3.fromValues(0.980, 0.913, 0.819),
            bottomColor: vec3.fromValues(0.874, 0.721, 0.505)
        });
        mat4.rotateX(chop1.coordFrame, chop1.coordFrame, glMatrix.toRadian(90));
        mat4.translate(chop1.coordFrame, chop1.coordFrame, vec3.fromValues(-0.32, 1.1, -.15));
        this.group.push(chop1);

        let chop2 = new PolygonalPrism(gl, {
            topRadius: .005,
            bottomRadius: .02,
            numSides: 4,
            height: .5,
            topColor: vec3.fromValues(0.980, 0.913, 0.819),
            bottomColor: vec3.fromValues(0.874, 0.721, 0.505)
        });
        mat4.rotateX(chop2.coordFrame, chop2.coordFrame, glMatrix.toRadian(90));
        mat4.translate(chop2.coordFrame, chop2.coordFrame, vec3.fromValues(-0.25, 1.11, -.15));
        this.group.push(chop2);
    }
}