let angleXRed = 0; // Ângulo de rotação do cubo vermelho (eixo X)
let angleYRed = 0; // Ângulo de rotação do cubo vermelho (eixo Y)
let angleXYellow = 0; // Ângulo de rotação do cubo amarelo (eixo X)
let angleYYellow = 0; // Ângulo de rotação do cubo amarelo (eixo Y)
let cubeSize = 150; // Tamanho do cubo

function setup() {
    const canvas = createCanvas(700, 500, WEBGL);
    canvas.parent('p5-container'); // Anexa o canvas ao contêiner no HTML
}

function draw() {
    background(240);
    lights(); // Adiciona iluminação à cena

    // Cubo Vermelho (com bolinhas brancas)
    push();
    rotateX(angleXRed);
    rotateY(angleYRed);
    stroke(0);
    strokeWeight(1);
    fill(255, 0, 0); // Cor vermelha
    drawCubeWithDots();
    drawLabelsRedCube();
    pop();

    // Cubo Amarelo (Sódio) com massa
    push();
    translate(250, 0, 0); // Move o cubo para o lado direito
    rotateX(angleXYellow);
    rotateY(angleYYellow);
    stroke(0);
    strokeWeight(1);
    fill(255, 215, 0); // Cor dourada (Sódio)
    box(cubeSize);
    drawMassLabel();
    pop();

    // Atualiza os ângulos para rotação lenta
    angleXRed += radians(0.5);
    angleYRed += radians(0.4);
    angleXYellow += radians(0.3);
    angleYYellow += radians(0.6);
}

// Desenha o cubo vermelho com bolinhas brancas
function drawCubeWithDots() {
    box(cubeSize); // Desenha o cubo
    let dotSize = 10; // Tamanho das bolinhas

    fill(255); // Cor branca
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

    // Texto abaixo do cubo
    push();
    translate(0, cubeSize + 20, 0);
    text("1 cm³", 0, 0);
    pop();

    // Escreve "1 cm" nas arestas do cubo
    push();
    textSize(12);
    text("1 cm", cubeSize / 2 + 20, 0, 0);
    text("1 cm", -cubeSize / 2 - 20, 0, 0);
    text("1 cm", 0, cubeSize / 2 + 20, 0);
    text("1 cm", 0, -cubeSize / 2 - 20, 0);
    text("1 cm", 0, 0, cubeSize / 2 + 20);
    text("1 cm", 0, 0, -cubeSize / 2 - 20);
    pop();
}

// Desenha a massa no cubo amarelo
function drawMassLabel() {
    fill(0); // Preto
    textSize(14);
    textAlign(CENTER, CENTER);

    push();
    translate(0, 0, cubeSize / 2 + 20);
    text("Massa: 19 g", 0, 0);
    pop();
}
