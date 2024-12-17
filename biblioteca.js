let cubeSize = 20;
let angle = 0;
let provetaY = 0;

function setup() {
  createCanvas(800, 600, WEBGL);
}

function draw() {
  background(240);
  lights();

  // Cubo vermelho
  push();
  translate(-100, sin(frameCount * 0.01) * 50, 0);
  rotateY(angle);
  drawCube("red", "1 cm³", true);
  pop();

  // Cubo amarelo
  push();
  translate(100, cos(frameCount * 0.01) * 50, 0);
  rotateY(angle);
  drawCube("yellow", "19 g", false);
  pop();

  // Proveta
  push();
  translate(0, 100 + provetaY, 0);
  drawGraduatedCylinder();
  pop();

  angle += 0.01;
}

function drawCube(colorName, label, withDots) {
  fill(colorName === "red" ? [255, 0, 0] : [255, 215, 0]);
  stroke(0);
  box(cubeSize);

  fill(0);
  textSize(12);
  textAlign(CENTER, CENTER);
  text(label, 0, cubeSize + 15);

  if (withDots) {
    fill(255);
    for (let i = 1; i <= 6; i++) {
      push();
      translate(0, 0, cubeSize / 2 + 1);
      ellipse(0, 0, 5, 5);
      pop();
    }
  }
}

function drawGraduatedCylinder() {
  fill(200, 230, 255, 100);
  noStroke();
  cylinder(30, 200);

  translate(0, 100, 0);
  rotateX(HALF_PI);
  fill(150, 150, 150, 150);
  cylinder(40, 10, 6);

  push();
  stroke(0);
  for (let i = -90; i <= 90; i += 20) {
    line(-15, i, 15, i);
  }
  textSize(10);
  fill(0);
  textAlign(CENTER);
  for (let j = 0; j <= 10; j++) {
    text(`${j} mL`, 25, -90 + j * 20);
  }
  pop();
}
