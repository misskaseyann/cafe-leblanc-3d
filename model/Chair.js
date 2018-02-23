class Chair extends ObjectGroup {
    constructor(gl) {
        super(gl);
        // build object here
        let leg = new PolygonalPrism(gl, {
            topRadius: 0.1,
            bottomRadius: 0.1,
            numSides: 20,
            height: 0.5
        });
        this.group.push(leg);
    }
}