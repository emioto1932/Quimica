let protons = []; // Array para armazenar os prótons
let neutrons = []; // Array para armazenar os nêutrons
let numProtons = 11; // Número de prótons
let numNeutrons = 12; // Número de nêutrons

function setup() {
  createCanvas(50, 50); // Tamanho do canvas 50px x 50px

  // Inicializando os prótons e nêutrons em posições aleatórias, próximos do centro
  let radius = 15; // Raio da área onde as partículas serão distribuídas

  for (let i = 0; i < numProtons; i++) {
    // A posição dos prótons
    let angle = random(TWO_PI);
    let distance = random(0, radius);
    let x = width / 2 + cos(angle) * distance;
    let y = height / 2 + sin(angle) * distance;
    protons.push(createVector(x, y));
  }

  for (let i = 0; i < numNeutrons; i++) {
    // A posição dos nêutrons
    let angle = random(TWO_PI);
    let distance = random(0, radius);
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
