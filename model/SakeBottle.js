class SakeBottle extends ObjectGroup {
    constructor(gl) {
        super(gl);
        let base = new PolygonalPrism(gl, {
            topRadius: .07,
            bottomRadius: .07,
            numSides: 20,
            height: .05,
            topColor: vec3.fromValues(0.133, 0.729, 0.109),
            bottomColor: vec3.fromValues(0.101, 0.537, 0.082)
        });
        mat4.translate(base.coordFrame, base.coordFrame, vec3.fromValues(.5, -1.3, 1.1));
        this.group.push(base);

        let label = new PolygonalPrism(gl, {
            topRadius: .07,
            bottomRadius: .07,
            numSides: 20,
            height: .11,
            topColor: vec3.fromValues(0.980, 0.925, 0.776),
            bottomColor: vec3.fromValues(0.980, 0.925, 0.776)
        });
        mat4.translate(label.coordFrame, label.coordFrame, vec3.fromValues(.5, -1.3, 1.15));
        this.group.push(label);

        let top = new PolygonalPrism(gl, {
            topRadius: .03,
            bottomRadius: .11,
            numSides: 20,
            height: .2,
            topColor: vec3.fromValues(0.101, 0.537, 0.082),
            bottomColor: vec3.fromValues(0.133, 0.729, 0.109)
        });
        mat4.translate(top.coordFrame, top.coordFrame, vec3.fromValues(.5, -1.3, 1.26));
        this.group.push(top);

        let cap = new PolygonalPrism(gl, {
            topRadius: .033,
            bottomRadius: .033,
            numSides: 20,
            height: .05,
            topColor: vec3.fromValues(0.780, 0.780, 0.780),
            bottomColor: vec3.fromValues(0.639, 0.639, 0.639)
        });
        mat4.translate(cap.coordFrame, cap.coordFrame, vec3.fromValues(.5, -1.3, 1.45));
        this.group.push(cap);
    }
}