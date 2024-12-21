let protons = [];  // Array para armazenar os prótons
let neutrons = []; // Array para armazenar os nêutrons
let numProtons = 11;  // Número de prótons
let numNeutrons = 12; // Número de nêutrons

function setup() {
  createCanvas(100, 100); // Tamanho da tela 100px x 100px
  
  let radius = 30; // Raio da área onde as partículas serão distribuídas
  
  // Inicializando os prótons de forma alternada aleatoriamente
  for (let i = 0; i < numProtons; i++) {
    let angle = random(TWO_PI); // Ângulo aleatório
    let distance = random(0, radius); // Distância aleatória dentro do raio
    let x = width / 2 + cos(angle) * distance;
    let y = height / 2 + sin(angle) * distance;
    protons.push(createVector(x, y)); // Adiciona os prótons
  }

  // Inicializando os nêutrons de forma alternada aleatoriamente
  for (let i = 0; i < numNeutrons; i++) {
    let angle = random(TWO_PI); // Ângulo aleatório
    let distance = random(0, radius); // Distância aleatória dentro do raio
    let x = width / 2 + cos(angle) * distance;
    let y = height / 2 + sin(angle) * distance;
    neutrons.push(createVector(x, y)); // Adiciona os nêutrons
  }

  // Agora vamos alternar as posições dos prótons e nêutrons de maneira aleatória
  alternarParticulas();
}

function alternarParticulas() {
  let allParticles = [];

  // Distribuir alternadamente as partículas
  for (let i = 0; i < numProtons; i++) {
    let p = protons[i];
    let p_x = p.x;
    let p_y = p.y;
    let n = neutrons[i];
    let n_x = n.x;
    let n_y = n.y;
    
    // Alternando para cima ou para baixo aleatoriamente
    let direction = random([1, -1]);  // 1 para cima, -1 para baixo
    p_y += direction * 5;
    
    direction = random([1, -1]);  // 1 para cima, -1 para baixo
    n_y += direction * 5;

    // Atualiza as posições
    protons[i] = createVector(p_x, p_y);
    neutrons[i] = createVector(n_x, n_y);
  }
}

function draw() {
  background(255);

  // Desenha os prótons
  for (let i = 0; i < protons.length; i++) {
    fill(255, 100, 0); // Cor laranja para prótons
    noStroke();
    ellipse(protons[i].x, protons[i].y, 10, 10);
  }

  // Desenha os nêutrons
  for (let i = 0; i < neutrons.length; i++) {
    fill(139, 69, 19); // Cor marrom para nêutrons
    noStroke();
    ellipse(neutrons[i].x, neutrons[i].y, 10, 10);
  }
}
