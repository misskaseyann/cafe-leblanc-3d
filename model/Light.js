class Light extends ObjectGroup {
    constructor(gl) {
        super(gl);
        let bulb = new PolygonalPrism(gl, {
            topRadius: 0.1,
            bottomRadius: 0.1,
            numSides: 20,
            height: 0.25,
            topColor: vec3.fromValues(0.992, 0.972, 0.768),
            bottomColor: vec3.fromValues(1, 1, 1)
        });
        mat4.translate(bulb.coordFrame, bulb.coordFrame, vec3.fromValues(0, 0, 2));
        this.group.push(bulb);
        let bulbBottomRing = new Torus(gl, {
            majorRadius: 0.05,
            minorRadius: 0.03,
            topColor: vec3.fromValues(1, 1, 1),
            bottomColor: vec3.fromValues(1, 1, 1)
        });
        mat4.translate(bulbBottomRing.coordFrame, bulbBottomRing.coordFrame, vec3.fromValues(0, 0, 2));
        this.group.push(bulbBottomRing);
        let bulbBottom = new Sphere(gl, {
            radius: 0.05,
            splitDepth: 5,
            northColor: vec3.fromValues(1, 1, 1),
            equatorColor: vec3.fromValues(1, 1, 1),
            southColor: vec3.fromValues(1, 1, 1)
        });
        mat4.translate(bulbBottom.coordFrame, bulbBottom.coordFrame, vec3.fromValues(0, 0, 1.98));
        this.group.push(bulbBottom);
        let topShade = new Cone(gl, {
            radius: 0.2,
            height: 0.1,
            tipColor: vec3.fromValues(0.211, 0.211, 0.211),
            baseColor: vec3.fromValues(0.109, 0.109, 0.109)
        });
        mat4.translate(topShade.coordFrame, topShade.coordFrame, vec3.fromValues(0, 0, 2.25));
        this.group.push(topShade);
        let shadeTop = new Sphere(gl, {
            radius: 0.03,
            splitDepth: 5,
            northColor: vec3.fromValues(0.211, 0.211, 0.211),
            equatorColor: vec3.fromValues(0.211, 0.211, 0.211),
            southColor: vec3.fromValues(0.211, 0.211, 0.211)
        });
        mat4.translate(shadeTop.coordFrame, shadeTop.coordFrame, vec3.fromValues(0, 0, 2.35));
        this.group.push(shadeTop);
        let rod = new PolygonalPrism(gl, {
            topRadius: 0.01,
            bottomRadius: 0.01,
            numSides: 8,
            height: 1,
            topColor: vec3.fromValues(0, 0, 0),
            bottomColor: vec3.fromValues(0.211, 0.211, 0.211)
        });
        mat4.translate(rod.coordFrame, rod.coordFrame, vec3.fromValues(0, 0, 2.35));
        this.group.push(rod);
    }
}