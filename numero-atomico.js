let angulo = 0; // Variável para rotacionar as partículas
let raio = 150; // Raio do círculo central

// Definição das partículas
let protons = [];  // Lista para armazenar os prótons
let neutrons = []; // Lista para armazenar os nêutrons

function setup() {
  createCanvas(400, 400);
  // Gerar 11 prótons e 12 nêutrons
  for (let i = 0; i < 11; i++) {
    let p = createVector(0, 0); // Posição inicial do próton
    protons.push(p);
  }
  
  for (let i = 0; i < 12; i++) {
    let n = createVector(0, 0); // Posição inicial do nêutron
    neutrons.push(n);
  }
  
  noStroke();
}

function draw() {
  background(255);

  // Desenhar os prótons e nêutrons
  for (let i = 0; i < protons.length; i++) {
    // Deslocamento para o próximo próton
    let angle = random(TWO_PI); // Escolhe um ângulo aleatório
    let offset = random(raio * 0.75); // Define um deslocamento dentro do raio
    
    protons[i].x = cos(angle) * offset;
    protons[i].y = sin(angle) * offset;

    // Desenha os prótons
    fill(255, 165, 0); // Cor laranja para os prótons
    ellipse(protons[i].x + width / 2, protons[i].y + height / 2, 20, 20);
    
    // Coloca o símbolo de "positivo" para os prótons
    textSize(18);
    fill(255, 0, 0); // Cor vermelha para o sinal de positivo
    text("+", protons[i].x + width / 2 - 5, protons[i].y + height / 2 + 5);
  }

  for (let i = 0; i < neutrons.length; i++) {
    // Deslocamento para o próximo nêutron, em ângulo alternado
    let angle = random(TWO_PI); // Escolhe um ângulo aleatório
    let offset = random(raio * 0.75); // Define um deslocamento dentro do raio
    
    neutrons[i].x = cos(angle) * offset;
    neutrons[i].y = sin(angle) * offset;

    // Desenha os nêutrons
    fill(139, 69, 19); // Cor marrom para os nêutrons
    ellipse(neutrons[i].x + width / 2, neutrons[i].y + height / 2, 20, 20);
  }

  // Aumentar o ângulo para dar a sensação de movimento, se desejado
  angulo += 0.01;
}
