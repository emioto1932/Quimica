let raio = 150; // Raio máximo para as partículas
let protons = [];  // Lista para armazenar os prótons
let neutrons = []; // Lista para armazenar os nêutrons

function setup() {
  createCanvas(400, 400);
  let posX, posY;
  
  // Gerar 11 prótons e 12 nêutrons, distribuídos alternadamente
  for (let i = 0; i < 11; i++) {
    // Definir a distância para cada partícula (incrementando progressivamente)
    let dist = random(0.5 * raio, 0.75 * raio);
    let angle = random(TWO_PI);  // Ângulo aleatório para distribuir as partículas
    posX = cos(angle) * dist;
    posY = sin(angle) * dist;
    
    // Adicionar próton
    protons.push(createVector(posX, posY));
    
    // Definir a posição do nêutron alternando a direção
    dist = random(0.5 * raio, 0.75 * raio);
    angle = random(TWO_PI);
    posX = cos(angle) * dist;
    posY = sin(angle) * dist;
    
    // Adicionar nêutron
    neutrons.push(createVector(posX, posY));
  }
  
  noStroke();
}

function draw() {
  background(255);

  // Desenhar os prótons
  for (let i = 0; i < protons.length; i++) {
    fill(255, 165, 0); // Cor laranja para os prótons
    ellipse(protons[i].x + width / 2, protons[i].y + height / 2, 20, 20);
    
    // Coloca o símbolo de "positivo" para os prótons
    textSize(18);
    fill(255, 0, 0); // Cor vermelha para o sinal de positivo
    text("+", protons[i].x + width / 2 - 5, protons[i].y + height / 2 + 5);
  }

  // Desenhar os nêutrons
  for (let i = 0; i < neutrons.length; i++) {
    fill(139, 69, 19); // Cor marrom para os nêutrons
    ellipse(neutrons[i].x + width / 2, neutrons[i].y + height / 2, 20, 20);
  }
}
