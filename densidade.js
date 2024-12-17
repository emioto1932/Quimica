let angleXRed = 0; // Ângulo de rotação do cubo vermelho (eixo X)
let angleYRed = 0; // Ângulo de rotação do cubo vermelho (eixo Y)
let angleXYellow = 0; // Ângulo de rotação do cubo amarelo (eixo X)
let angleYYellow = 0; // Ângulo de rotação do cubo amarelo (eixo Y)
let cubeSize = 30; // Tamanho reduzido do cubo (aproximadamente 1 cm³)

function setup() {
    const canvas = createCanvas(700, 600, WEBGL);
    canvas.parent('p5-container'); // Anexa o canvas ao contêiner no HTML
}

function draw() {
    background(240);
    lights(); // Adiciona iluminação à cena

    // Proveta com as marcações de volume
    drawBeaker();

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

// Desenha a proveta como um cilindro com boca estreita e as marcas de 1 mL
function drawBeaker() {
    push();
    translate(-250, 0, 0); // Move a proveta para a esquerda

    // Desenhando a boca da proveta (abertura estreita)
    fill(255);
    stroke(0);
    strokeWeight(2);
    beginShape();
    vertex(-15, -150); // Topo da boca
    vertex(15, -150);
    vertex(15, -130);
    vertex(-15, -130);
    endShape(CLOSE);

    // Corpo do cilindro (proveta)
    beginShape();
    vertex(-15, -130);
    vertex(15, -130);
    vertex(15, 200);
    vertex(-15, 200);
    endShape(CLOSE);

    // Marcações de 1 mL (representando 1 cm³)
    let startY = -120;
    for (let i = 1; i <= 10; i++) {
        line(-12, startY, 12, startY); // Marca de 1 mL
        textSize(14);
        fill(0);
        textAlign(CENTER, CENTER);
        text(i + " mL", 0, startY + 10); // Número da marca
        startY += 30; // Distância entre as marcas
    }
    pop();
}

// Desenha o cubo vermelho com bolinhas brancas
function drawCubeWithDots() {
    box(cubeSize); // Desenha o cubo
    let dotSize = 3; // Tamanho das bolinhas

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
    text("1 cm", 0, -cubeSize / 2 - 10);
    text("1 cm", 0, cubeSize / 2 + 10);
    text("1 cm", cubeSize / 2 + 10, 0);
    text("1 cm", -cubeSize / 2 - 10, 0);
    pop();
}

// Desenha o rótulo de massa no cubo amarelo (sódio)
function drawMassLabel() {
    fill(0); // Preto
    textSize(16);
    textAlign(CENTER, CENTER);
    text("19 g", 0, 0);
}
