let protons = [];
let neutrons = [];
let tremorX = 0;
let tremorY = 0;

function setup() {
  // Criação do canvas
  let canvas = createCanvas(400, 400);
  canvas.parent("canvas-container");  // Associar o canvas ao container HTML
  
  noFill();

  // Definindo o tamanho do núcleo e partículas
  let raioNucleo = 50; // Raio do núcleo
  let raioParticula = 15; // Tamanho das partículas (prótons e nêutrons)
  let numProtons = 11;
  let numNeutrons = 12;

  // Cores das partículas
  let corProton = color(255, 165, 0); // Laranja para prótons
  let corNeutron = color(139, 69, 19); // Marrom para nêutrons

  // Posicionando as partículas
  let posicoesProtons = [];
  let posicoesNeutrons = [];
  let distancia = raioNucleo * 1.2; // Distância para manter as partículas juntas
  
  // Intercalando prótons e nêutrons com a organização desejada
  let numTotalParticulas = numProtons + numNeutrons;
  
  for (let i = 0; i < numTotalParticulas; i++) {
    let angulo = map(i, 0, numTotalParticulas, 0, TWO_PI); // Distribui as partículas ao longo do círculo

    let posX = distancia * cos(angulo);
    let posY = distancia * sin(angulo);
    
    // Alterna entre próton (positivo) para cima e nêutron (neutro) para baixo
    if (i % 2 === 0) {
      // Próton
      protons.push({ x: posX, y: posY, cor: corProton, offsetY: -20 });
      neutrons.push({ x: posX, y: posY, cor: corNeutron, offsetY: 20 });
    } else {
      // Nêutron
      protons.push({ x: posX, y: posY, cor: corProton, offsetY: 20 });
      neutrons.push({ x: posX, y: posY, cor: corNeutron, offsetY: -20 });
    }
  }
}

function draw() {
  background(255);

  // Desenha o núcleo
  stroke(0);
  strokeWeight(2);
  ellipse(width / 2, height / 2, 120, 120); // Círculo do núcleo

  // Desenha os prótons e nêutrons
  for (let i = 0; i < protons.length; i++) {
    tremorX = random(-2, 2); // Tremor nos prótons
    tremorY = random(-2, 2);

    // Desenha o próton
    fill(protons[i].cor);
    ellipse(width / 2 + protons[i].x + tremorX, height / 2 + protons[i].y + protons[i].offsetY + tremorY, 40, 40); // Aumento do tamanho das partículas

    // Adiciona o sinal de positivo no próton
    textSize(20);
    textAlign(CENTER, CENTER);
    fill(255, 0, 0); // Vermelho para destacar o sinal "+"
    text("+", width / 2 + protons[i].x + tremorX, height / 2 + protons[i].y + protons[i].offsetY + tremorY);
    
    // Desenha o nêutron ao lado do próton, na posição alternada
    fill(neutrons[i].cor);
    ellipse(width / 2 + neutrons[i].x + tremorX, height / 2 + neutrons[i].y + neutrons[i].offsetY + tremorY, 40, 40); // Aumento do tamanho das partículas
  }
}
