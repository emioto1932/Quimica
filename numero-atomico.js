let protons = [];
let neutrons = [];
let angulo = 0;
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

  // Distribuindo prótons e nêutrons em posições aleatórias, mantendo eles perto
  for (let i = 0; i < numProtons; i++) {
    let angulo = random(TWO_PI); // Distribuindo aleatoriamente dentro do círculo
    let distancia = raioNucleo * 1.2; // Distância para manter as partículas juntas

    let posX = distancia * cos(angulo);
    let posY = distancia * sin(angulo);

    protons.push({ x: posX, y: posY, cor: corProton });
  }

  for (let i = 0; i < numNeutrons; i++) {
    let angulo = random(TWO_PI); // Distribuindo aleatoriamente dentro do círculo
    let distancia = raioNucleo * 1.2; // Distância para manter as partículas juntas

    let posX = distancia * cos(angulo);
    let posY = distancia * sin(angulo);

    neutrons.push({ x: posX, y: posY, cor: corNeutron });
  }
}

function draw() {
  background(255);

  // Desenha o núcleo
  stroke(0);
  strokeWeight(2);
  ellipse(width / 2, height / 2, 120, 120); // Círculo do núcleo

  // Desenha os prótons
  for (let i = 0; i < protons.length; i++) {
    tremorX = random(-2, 2); // Tremor nos prótons
    tremorY = random(-2, 2);

    fill(protons[i].cor);
    ellipse(width / 2 + protons[i].x + tremorX, height / 2 + protons[i].y + tremorY, 40, 40); // Aumento do tamanho das partículas
    textSize(20);
    textAlign(CENTER, CENTER);
    fill(255, 0, 0); // Vermelho para destacar o sinal "+"
    text("+", width / 2 + protons[i].x + tremorX, height / 2 + protons[i].y + tremorY);
  }

  // Desenha os nêutrons
  for (let i = 0; i < neutrons.length; i++) {
    fill(neutrons[i].cor);
    ellipse(width / 2 + neutrons[i].x, height / 2 + neutrons[i].y, 40, 40); // Aumento do tamanho das partículas
  }
}
