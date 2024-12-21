let protons = []; // Array para armazenar os prótons
let neutrons = []; // Array para armazenar os nêutrons
let numProtons = 11; // Número de prótons
let numNeutrons = 12; // Número de nêutrons

function setup() {
  createCanvas(100, 100); // Tamanho da tela 100px x 100px
  
  let radius = 30; // Raio da área onde as partículas serão distribuídas (aumentado para caber melhor na tela)
  
  let angleOffset = PI / 4; // Ajuste de ângulo para distribuir as partículas de forma alternada

  // Inicializando os prótons e nêutrons
  for (let i = 0; i < numProtons; i++) {
    // Para os prótons, distribuindo alternadamente para cima e para baixo
    let angle = random(TWO_PI); // Ângulo aleatório
    let distance = random(0, radius); // Distância aleatória dentro do raio

    let x = width / 2 + cos(angle + angleOffset) * distance;
    let y = height / 2 + sin(angle + angleOffset) * distance;
    protons.push(createVector(x, y));
    angleOffset += PI / 8; // Modificar o offset para que as partículas fiquem alternadas
  }

  for (let i = 0; i < numNeutrons; i++) {
    // Para os nêutrons, distribuindo alternadamente para cima e para baixo
    let angle = random(TWO_PI); // Ângulo aleatório
    let distance = random(0, radius); // Distância aleatória dentro do raio

    let x = width / 2 + cos(angle) * distance;
    let y = height / 2 + sin(angle) * distance;
    neutrons.push(createVector(x, y));
  }
}

function draw() {
  background(255); // Fundo branco

  // Desenhar os prótons (círculo laranja)
  fill(255, 100, 0);
  noStroke();
  for (let i = 0; i < protons.length; i++) {
    ellipse(protons[i].x, protons[i].y, 15, 15); // Prótons maiores
  }

  // Desenhar os nêutrons (círculo marrom)
  fill(139, 69, 19);
  for (let i = 0; i < neutrons.length; i++) {
    ellipse(neutrons[i].x, neutrons[i].y, 15, 15); // Nêutrons maiores
  }
}
