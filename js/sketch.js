let shapeData;
let centerX, centerY;
let generateShapes = false;
let showOneShape = false;
let numShapes;
let zip;
let imgCount = 0;

function setup() {
    pixelDensity(CONFIG.GENERATE.PIXEL_DENSITY);
    createCanvas(CONFIG.GENERATE.CANVAS_SIZE, CONFIG.GENERATE.CANVAS_SIZE);
    frameRate(CONFIG.GENERATE.FRAME_RATE);
    noLoop(); // 初期状態ではループを停止

    shapeData = new ShapeData();

    const generateButton = select('#generateButton');
    generateButton.mousePressed(() => {
        numShapes = int(select('#numShapes').value());
        generateShapes = true;
        showOneShape = false;
        frameCount = 0;
        imgCount = 0;
        zip = new JSZip();
        loop(); // ボタンがクリックされたらループを開始
    });

    const showOneButton = select('#showOneButton');
    showOneButton.mousePressed(() => {
        generateShapes = false;
        showOneShape = true;
        frameCount = 0;
        loop(); // ボタンがクリックされたらループを開始
    });
}

function draw() {
    if (generateShapes) {
        generateAndSaveShapes();
    } else if (showOneShape) {
        showSingleShape();
    }
}

function generateAndSaveShapes() {
    const margin = (CONFIG.SCALE.MAX * CONFIG.GENERATE.CANVAS_SIZE) / 2;
    centerX = random(margin, width - margin);
    centerY = random(margin, height - margin);

    const shapeParams = generateShapeParams();
    drawAndSaveShape(shapeParams);
    saveShapeData(shapeParams);

    if (numShapes < frameCount) {
        console.log("save success!!");
        shapeData.save();
        zip.generateAsync({ type: "blob" }).then(function(content) {
            saveAs(content, "shapes.zip");
        });
        noLoop();
        generateShapes = false;
    }
}

function drawAndSaveShape(params) {
    const radius = (params.scale * CONFIG.GENERATE.CANVAS_SIZE) / 2;

    background(0);
    noFill();
    stroke(255);
    strokeWeight(CONFIG.STYLE.STROKE_WEIGHT);

    drawShape(centerX, centerY, radius, params.vertices, params.angle);

    // Save the canvas as an image and add it to the zip
    const canvas = document.querySelector('canvas');
    canvas.toBlob(function(blob) {
        zip.file(zeroPadding(frameCount) + ".png", blob);
        imgCount++;
    });
}

function showSingleShape() {
    const margin = (CONFIG.SCALE.MAX * CONFIG.GENERATE.CANVAS_SIZE) / 2;
    centerX = random(margin, width - margin);
    centerY = random(margin, height - margin);

    const shapeParams = generateShapeParams();
    drawShape(centerX, centerY, (shapeParams.scale * CONFIG.GENERATE.CANVAS_SIZE) / 2, shapeParams.vertices, shapeParams.angle);

    noLoop();
    showOneShape = false;
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
