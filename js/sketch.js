let shapeData;
let centerX, centerY;

function setup() {
    pixelDensity(CONFIG.GENERATE.PIXEL_DENSITY);
    createCanvas(CONFIG.GENERATE.CANVAS_SIZE, CONFIG.GENERATE.CANVAS_SIZE);
    frameRate(CONFIG.GENERATE.FRAME_RATE);

    shapeData = new ShapeData();
}

function draw() {
    const margin = (CONFIG.SCALE.MAX * CONFIG.GENERATE.CANVAS_SIZE) / 2;
    centerX = random(margin, width - margin);
    centerY = random(margin, height - margin);

    const shapeParams = generateShapeParams();
    drawAndSaveShape(shapeParams);
    saveShapeData(shapeParams);

    if (CONFIG.GENERATE.NUM < frameCount) {
        console.log("save success!!");
        shapeData.save();
        noLoop();
    }
}

function drawAndSaveShape(params) {
    const radius = (params.scale * CONFIG.GENERATE.CANVAS_SIZE) / 2;

    background(0);
    noFill();
    stroke(255);
    strokeWeight(CONFIG.STYLE.STROKE_WEIGHT);

    drawShape(centerX, centerY, radius, params.vertices, params.angle);
    saveCanvas(zeroPadding(frameCount), 'png');
}

function saveShapeData(params) {
    const radius = (params.scale * CONFIG.GENERATE.CANVAS_SIZE) / 2;

    shapeData.addRow({
        file: zeroPadding(frameCount),
        centerX: centerX / CONFIG.GENERATE.CANVAS_SIZE,
        centerY: centerY / CONFIG.GENERATE.CANVAS_SIZE,
        radius: radius,
        vertices: params.vertices,
        angle: params.angle,
        perimeter: calculatePerimeter(radius, params.vertices)
    });
}
