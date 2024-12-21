let protons = [];
let neutrons = [];

function setup() {
  createCanvas(400, 400);
  noFill();

  // Definindo o tamanho das partículas
  let raioParticula = 15; // Tamanho das partículas (prótons e nêutrons)
  let numProtons = 11;  // Número de prótons (do átomo de sódio)
  let numNeutrons = 12; // Número de nêutrons (do átomo de sódio)

  // Cores das partículas
  let corProton = color(255, 165, 0); // Laranja para prótons
  let corNeutron = color(139, 69, 19); // Marrom para nêutrons

  // Posicionando as partículas
  let distancia = 30; // Distância para manter as partículas juntas

  // Intercalando prótons e nêutrons com a organização desejada
  let numTotalParticulas = numProtons + numNeutrons;

  for (let i = 0; i < numProtons; i++) {
    let angulo = map(i, 0, numProtons, -PI, PI); // Distribui as partículas ao longo do círculo

    let posX = distancia * cos(angulo);
    let posY = distancia * sin(angulo);

    // Alterna entre próton (positivo) para cima e nêutron (neutro) para baixo
    if (i % 2 === 0) {
      protons.push({ x: posX, y: posY, cor: corProton, offsetY: -20 });
      neutrons.push({ x: posX, y: posY, cor: corNeutron, offsetY: 20 });
    } else {
      protons.push({ x: posX, y: posY, cor: corProton, offsetY: 20 });
      neutrons.push({ x: posX, y: posY, cor: corNeutron, offsetY: -20 });
    }
  }
}

function draw() {
  background(255);

  // Desenha os prótons e nêutrons
  for (let i = 0; i < protons.length; i++) {
    // Desenha o próton
    fill(protons[i].cor);
    ellipse(width / 2 + protons[i].x, height / 2 + protons[i].y + protons[i].offsetY, 40, 40); // Aumento do tamanho das partículas

    // Adiciona o sinal de positivo no próton
    textSize(20);
    textAlign(CENTER, CENTER);
    fill(255, 0, 0); // Vermelho para destacar o sinal "+"
    text("+", width / 2 + protons[i].x, height / 2 + protons[i].y + protons[i].offsetY);

    // Desenha o nêutron ao lado do próton, na posição alternada
    fill(neutrons[i].cor);
    ellipse(width / 2 + neutrons[i].x, height / 2 + neutrons[i].y + neutrons[i].offsetY, 40, 40); // Aumento do tamanho das partículas
  }
}
