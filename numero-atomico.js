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
  let raioNucleo = 50; // Raio do círculo do núcleo, agora reduzido pela metade
  let raioParticula = 20; // Aumento do tamanho das partículas

  // Definir a posição dos prótons e nêutrons em duas camadas (frente e fundo)
  for (let i = 0; i < 11; i++) {
    // Alterna entre frente e fundo
    let camada = i % 2 === 0 ? 'frente' : 'fundo';

    let angulo = random(TWO_PI); // Distribuir aleatoriamente dentro do círculo
    let distancia = raioNucleo * 1.2; // Distância para garantir que as partículas fiquem juntas

    let posX = distancia * cos(angulo);
    let posY = distancia * sin(angulo);

    if (camada === 'frente') {
      protons.push({ x: posX, y: posY, cor: corProton });
      let posX_neutron = posX + random(-5, 5); // Ajustando posição do nêutron
      let posY_neutron = posY + random(-5, 5);
      neutrons.push({ x: posX_neutron, y: posY_neutron, cor: corNeutron });
    } else {
      let posX_neutron = posX + random(-5, 5); // Ajustando posição do nêutron
      let posY_neutron = posY + random(-5, 5);
      neutrons.push({ x: posX_neutron, y: posY_neutron, cor: corNeutron });
      protons.push({ x: posX, y: posY, cor: corProton });
    }
  }
}

function draw() {
  background(255);

  // Desenha os prótons e nêutrons
  for (let i = 0; i < protons.length; i++) {
    let tremorX = random(-2, 2); // Tremor para os prótons
    let tremorY = random(-2, 2);

    // Desenha os prótons
    fill(protons[i].cor);
    ellipse(width / 2 + protons[i].x + tremorX, height / 2 + protons[i].y + tremorY, 40, 40); // Aumento do tamanho das partículas
    textSize(20);
    textAlign(CENTER, CENTER);
    fill(255, 0, 0); // Vermelho para destacar o sinal "+"
    text("+", width / 2 + protons[i].x + tremorX, height / 2 + protons[i].y + tremorY);
  }

  for (let i = 0; i < neutrons.length; i++) {
    // Desenha os nêutrons
    fill(neutrons[i].cor);
    ellipse(width / 2 + neutrons[i].x, height / 2 + neutrons[i].y, 40, 40); // Aumento do tamanho das partículas
  }

  // Desenha o círculo central envolvendo todos os prótons e nêutrons
  stroke(0);
  ellipse(width / 2, height / 2, 120, 120); // Círculo que cobre todas as partículas
}
