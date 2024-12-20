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
  let raioNucleo = 70; // Reduzindo o raio do círculo que contém as partículas
  let raioParticula = 30; // Aumentando o tamanho das partículas

  // Definir a posição dos prótons e nêutrons
  for (let i = 0; i < 11; i++) {
    let angulo = random(TWO_PI); // Distribuir aleatoriamente ao redor do círculo
    let posX = raioNucleo * cos(angulo);
    let posY = raioNucleo * sin(angulo);
    protons.push({ x: posX, y: posY, cor: corProton });
  }

  // Para cada próton, criaremos um nêutron ao lado dele
  for (let i = 0; i < 11; i++) {
    let posX = protons[i].x + random(-15, 15); // Distância aleatória para o nêutron
    let posY = protons[i].y + random(-15, 15); // Distância aleatória para o nêutron
    neutrons.push({ x: posX, y: posY, cor: corNeutron });
  }
}

function draw() {
  background(255);

  // Desenho do núcleo (círculo externo)
  stroke(0);
  ellipse(width / 2, height / 2, 180, 180); // Círculo menor que envolve as partículas

  // Animação do núcleo com tremor
  for (let i = 0; i < protons.length; i++) {
    let tremorX = random(-4, 4); // Tremor para os prótons
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
    // Desenha os nêutrons sem tremor, encostados aos prótons
    fill(neutrons[i].cor);
    ellipse(width / 2 + neutrons[i].x, height / 2 + neutrons[i].y, 24, 24); // Aumentando as partículas
  }
}
