let protons = []; // Array para armazenar os prótons
let neutrons = []; // Array para armazenar os nêutrons
let numProtons = 11; // Número de prótons
let numNeutrons = 12; // Número de nêutrons

function setup() {
  createCanvas(50, 50); // Tamanho do canvas 50px x 50px

  let radius = 15; // Raio da área onde as partículas serão distribuídas
  let angleOffset = PI / 4; // Ajuste do ângulo para distribuir as partículas de forma alternada

  // Inicializando os prótons e nêutrons em posições aleatórias, próximos ao centro
  for (let i = 0; i < numProtons; i++) {
    // Distribuindo os prótons em camadas alternadas
    let angle = random(TWO_PI); // Ângulo aleatório
    let distance = random(0, radius); // Distância aleatória dentro do raio
    let x = width / 2 + cos(angle + angleOffset) * distance;
    let y = height / 2 + sin(angle + angleOffset) * distance;
    protons.push(createVector(x, y));
    angleOffset += PI / 6; // Incrementando para espalhar as partículas de forma alternada
  }

  for (let i = 0; i < numNeutrons; i++) {
    // Distribuindo os nêutrons em camadas alternadas
    let angle = random(TWO_PI); // Ângulo aleatório
    let distance = random(0, radius); // Distância aleatória dentro do raio
    let x = width / 2 + cos(angle) * distance;
    let y = height / 2 + sin(angle) * distance;
    neutrons.push(createVector(x, y));
  }
}

function draw() {
  background(255); // Fundo branco

  // Desenhar os prótons (circular e em cor laranja)
  fill(255, 100, 0);
  noStroke();
  for (let i = 0; i < protons.length; i++) {
    ellipse(protons[i].x, protons[i].y, 10, 10);
  }

  // Desenhar os nêutrons (circular e em cor marrom)
  fill(139, 69, 19);
  for (let i = 0; i < neutrons.length; i++) {
    ellipse(neutrons[i].x, neutrons[i].y, 10, 10);
  }
}
