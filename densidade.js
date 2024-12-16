let angleX = 0; // Ângulo de rotação no eixo X
let angleY = 0; // Ângulo de rotação no eixo Y
let cubeSize = 100; // Tamanho do cubo

function setup() {
    const canvas = createCanvas(600, 400, WEBGL);
    canvas.parent('p5-container'); // Anexa o canvas ao contêiner no HTML
}

function draw() {
    background(240);
    lights(); // Adiciona luz à cena

    // Cubo vermelho com bolinhas brancas
    push();
    rotateX(angleX);
    rotateY(angleY);
    stroke(0);
    strokeWeight(1);
    fill(255, 0, 0); // Vermelho
    drawCubeWithDots(); // Desenha o cubo com bolinhas
    drawLabelsRedCube(); // Desenha os rótulos do cubo vermelho
    pop();

    // Cubo dourado (Sódio) com massa
    push();
    translate(200, 0, 0); // Posiciona o cubo ao lado
    rotateX(angleX * 1.5);
    rotateY(angleY * 1.5);
    stroke(0);
    strokeWeight(1);
    fill(255, 215, 0); // Dourado
    box(cubeSize); // Cubo com 100px
    drawMassLabel(); // Desenha a massa no cubo
    pop();

    // Incremento dos ângulos para animação
    angleX += radians(1);
    angleY += radians(1);
}

// Desenha o cubo vermelho com bolinhas brancas
function drawCubeWithDots() {
    box(cubeSize); // Cubo principal
    let dotSize = 10;

    // Adiciona bolinhas brancas nas faces
    fill(255); // Branco
    noStroke();

    // Face 1: 1 bolinha
    push();
    translate(0, 0, cubeSize / 2 + 1);
    ellipse(0, 0, dotSize);
    pop();

    // Face 2: 2 bolinhas
    push();
    translate(0, 0, -cubeSize / 2 - 1);
    ellipse(-10, -10, dotSize);
    ellipse(10, 10, dotSize);
    pop();

    // Face 3: 3 bolinhas
    push();
    translate(cubeSize / 2 + 1, 0, 0);
    ellipse(0, -10, dotSize);
    ellipse(-10, 10, dotSize);
    ellipse(10, 10, dotSize);
    pop();

    // Face 4: 4 bolinhas
    push();
    translate(-cubeSize / 2 - 1, 0, 0);
    ellipse(-10, -10, dotSize);
    ellipse(10, -10, dotSize);
    ellipse(-10, 10, dotSize);
    ellipse(10, 10, dotSize);
    pop();

    // Face 5: 5 bolinhas
    push();
    translate(0, -cubeSize / 2 - 1, 0);
    ellipse(0, 0, dotSize);
    ellipse(-10, -10, dotSize);
    ellipse(10, -10, dotSize);
    ellipse(-10, 10, dotSize);
    ellipse(10, 10, dotSize);
    pop();

    // Face 6: 6 bolinhas
    push();
    translate(0, cubeSize / 2 + 1, 0);
    ellipse(-10, -10, dotSize);
    ellipse(10, -10, dotSize);
    ellipse(-10, 10, dotSize);
    ellipse(10, 10, dotSize);
    ellipse(0, -20, dotSize);
    ellipse(0, 20, dotSize);
    pop();
}

// Desenha rótulos no cubo vermelho
function drawLabelsRedCube() {
    fill(0); // Preto
    textSize(12);
    textAlign(CENTER, CENTER);

    // Escreve "1 cm" em cada aresta
    push();
    translate(0, cubeSize / 2 + 15, 0);
    rotateX(HALF_PI);
    text("1 cm", 0, 0);
    pop();

    // Escreve "1 cm³" abaixo do cubo
    push();
    translate(0, cubeSize + 20, 0);
    text("1 cm³", 0, 0);
    pop();
}

// Desenha a massa no cubo dourado
function drawMassLabel() {
    fill(0); // Preto
    textSize(12);
    textAlign(CENTER, CENTER);

    // Massa (15 g)
    push();
    translate(0, 0, cubeSize / 2 + 10);
    text("Massa: 15 g", 0, 0);
    pop();
}
