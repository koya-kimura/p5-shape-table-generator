function generateShapeParams() {
    return {
        vertices: floor(random(3, 7)),
        scale: random(CONFIG.SCALE.MIN, CONFIG.SCALE.MAX),
        angle: random(TAU)
    };
}

function drawShape(centerX, centerY, radius, vertices, angle) {
    push();
    translate(centerX, centerY);
    rotate(angle);

    beginShape();
    for (let i = 0; i < vertices; i++) {
        const theta = (TAU * i) / vertices;
        vertex(
            radius * cos(theta),
            radius * sin(theta)
        );
    }
    endShape(CLOSE);
    pop();
}

function calculatePerimeter(radius, vertices) {
    const sideLength = 2 * radius * sin(PI / vertices);
    return sideLength * vertices;
}

function zeroPadding(num) {
    return num.toString().padStart(4, '0');
}
