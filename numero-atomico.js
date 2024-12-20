let protons = [];
let neutrons = [];
let angulo = 0;

function setup() {
  // Criação do canvas
  let canvas = createCanvas(400, 400);
  canvas.parent("canvas-container");  // Associar o canvas ao container HTML
  
  noFill();

  // Cores
  let corProton = color(255, 165, 0); // Laranja para prótons
  let corNeutron = color(139, 69, 19); // Marrom para nêutrons

  // Posição e raio do núcleo
  let raioNucleo = 100;
  let raioParticula = 30; // Aumentando o tamanho das partículas

  // Definir a posição dos prótons e nêutrons
  for (let i = 0; i < 11; i++) {
    let posX = raioNucleo * cos(TWO_PI * (i / 11));
    let posY = raioNucleo * sin(TWO_PI * (i / 11));
    protons.push({ x: posX, y: posY, cor: corProton });
  }

  for (let i = 0; i < 12; i++) {
    let posX = raioNucleo * cos(TWO_PI * (i / 12) + PI / 24); // Deslocar ligeiramente para intercalar
    let posY = raioNucleo * sin(TWO_PI * (i / 12) + PI / 24);
    neutrons.push({ x: posX, y: posY, cor: corNeutron });
  }
}

function draw() {
  background(255);

  // Desenho do núcleo (círculo externo)
  stroke(0);
  ellipse(width / 2, height / 2, 240, 240); // Aumentei o tamanho do círculo externo

  // Animação do núcleo com tremor
  for (let i = 0; i < protons.length; i++) {
    let tremorX = random(-4, 4); // Maior tremor para os prótons
    let tremorY = random(-4, 4);

    // Desenha os prótons com sinal de carga positiva
    fill(protons[i].cor);
    ellipse(width / 2 + protons[i].x + tremorX, height / 2 + protons[i].y + tremorY, 24, 24); // Aumentando as partículas
    textSize(20);
    textAlign(CENTER, CENTER);
    fill(255, 0, 0); // Vermelho para destacar o sinal "+"
    text("+", width / 2 + protons[i].x + tremorX, height / 2 + protons[i].y + tremorY);
  }

  for (let i = 0; i < neutrons.length; i++) {
    // Desenha os nêutrons sem tremor
    fill(neutrons[i].cor);
    ellipse(width / 2 + neutrons[i].x, height / 2 + neutrons[i].y, 24, 24); // Aumentando as partículas
  }
}
