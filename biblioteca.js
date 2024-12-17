let liquidLevel = 60; // Nível do líquido (ajustável)

function setup() {
  createCanvas(800, 600, WEBGL); // Configura o canvas 3D
}

function draw() {
  background(240); // Fundo cinza claro
  lights(); // Adiciona iluminação

  // Desenha a proveta
  drawGraduatedCylinder();
}

// Função principal da proveta
function drawGraduatedCylinder() {
  push();
  // Corpo da proveta
  noStroke();
  fill(200, 230, 255, 80); // Transparência azul clara
  cylinder(40, 200); // Cilindro da proveta

  // Base hexagonal sólida
  push();
  translate(0, 100, 0); // Desce até a base
  rotateX(HALF_PI);
  fill(100, 100, 100, 150); // Cinza semi-transparente
  cylinder(45, 10, 6); // Hexágono na base
  pop();

  // Marcas graduadas
  drawGraduations();

  // Faixa do líquido
  drawLiquid();
  pop();
}

// Função para desenhar as graduações
function drawGraduations() {
  push();
  stroke(0); // Linhas pretas
  for (let i = -90; i <= 90; i += 20) { // Intervalos de 1 mL
    line(-20, i, 20, i); // Linhas horizontais
  }

  // Números das graduações
  textSize(12);
  fill(0);
  textAlign(CENTER, CENTER);
  for (let j = 0; j <= 10; j++) {
    push();
    translate(30, -100 + j * 20, 0); // Ajusta posição dos números
    rotateY(HALF_PI); // Gira para leitura correta
    text(`${j} mL`, 0, 0);
    pop();
  }
  pop();
}

// Função para desenhar o líquido na proveta
function drawLiquid() {
  push();
  fill(0, 100, 255, 150); // Azul mais forte com transparência
  translate(0, -100 + liquidLevel / 2, 0); // Ajusta o nível do líquido
  cylinder(38, liquidLevel); // Cilindro interno representando o líquido
  pop();
}
