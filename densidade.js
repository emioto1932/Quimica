/*
Atualização da proveta para se assemelhar à imagem fornecida:
1. Proveta cilíndrica transparente com marcações graduadas.
2. Base hexagonal semelhante à imagem.
3. Boca estreita e inclinada no topo.
4. Volume marcado em 10 mL, com o cubo de 1 cm³ correspondendo a 1 mL visualmente.
5. Cubos menores ajustados e fixados na posição correta.

Linguagem: p5.js
*/

let cubeSize = 20; // Redução do tamanho dos cubos

function setup() {
  createCanvas(800, 600, WEBGL); // Canvas 3D
}

function draw() {
  background(240);
  lights();

  // Desenha a proveta
  drawGraduatedCylinder();

  // Cubo Vermelho: Volume de 1 cm³
  push();
  translate(-100, 100, 0);
  drawRedCubeWithDots();
  pop();

  // Cubo Amarelo: Massa de 19 g (elemento sódio)
  push();
  translate(100, 100, 0);
  drawYellowMassCube();
  pop();
}

// Função para desenhar a proveta graduada
function drawGraduatedCylinder() {
  push();
  fill(200, 230, 255, 100); // Azul claro com transparência
  noStroke();
  // Cilindro principal
  cylinder(40, 300);

  // Base hexagonal
  translate(0, 150, 0);
  rotateX(HALF_PI);
  fill(150, 150, 150, 150);
  cylinder(50, 10, 6); // Hexágono na base
  pop();

  // Marcas graduadas
  push();
  stroke(0);
  for (let i = -120; i <= 120; i += 20) {
    line(-20, i, 20, i); // Linhas horizontais
  }
  textSize(12);
  fill(0);
  textAlign(CENTER, CENTER);
  for (let j = 0; j <= 10; j++) {
    push();
    translate(30, -120 + j * 20, 0);
    rotateY(HALF_PI);
    text(`${j} mL`, 0, 0);
    pop();
  }
  pop();
}

// Cubo vermelho com bolinhas brancas
function drawRedCubeWithDots() {
  push();
  fill(255, 0, 0); // Vermelho
  box(cubeSize);
  pop();

  // Adiciona bolinhas brancas numeradas
  fill(255);
  for (let i = 1; i <= 6; i++) {
    push();
    translate(0, 0, cubeSize / 2 + 1);
    ellipse(0, 0, 5, 5); // Ajustar posições conforme necessidade
    pop();
  }

  push();
  fill(0);
  textSize(12);
  textAlign(CENTER);
  text("1 cm\u00b3", 0, cubeSize + 15);
  pop();
}

// Cubo amarelo representando massa de 19 g
function drawYellowMassCube() {
  push();
  fill(255, 215, 0); // Amarelo (cor do sódio)
  box(cubeSize);

  // Texto de 19 g
  fill(0);
  textSize(12);
  textAlign(CENTER, CENTER);
  text("19 g", 0, 0);
  pop();
}

