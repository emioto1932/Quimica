let protons = [];  // Array para armazenar os prótons
let neutrons = []; // Array para armazenar os nêutrons
let numProtons = 11;  // Número de prótons
let numNeutrons = 12; // Número de nêutrons

function setup() {
  createCanvas(100, 100); // Tamanho da tela 100px x 100px
  
  let radius = 30; // Raio da área onde as partículas serão distribuídas
  
  // Inicializando os prótons e nêutrons de forma intercalada aleatoriamente
  for (let i = 0; i < numProtons; i++) {
    let angle = random(TWO_PI); // Ângulo aleatório
    let distance = random(0, radius); // Distância aleatória dentro do raio
    let x = width / 2 + cos(angle) * distance;
    let y = height / 2 + sin(angle) * distance;
    let z = random([-1, 1]); // Aleatoriamente para frente (1) ou para trás (-1)
    protons.push(createVector(x, y, z)); // Adiciona os prótons
  }

  // Inicializando os nêutrons de forma intercalada aleatoriamente
  for (let i = 0; i < numNeutrons; i++) {
    let angle = random(TWO_PI); // Ângulo aleatório
    let distance = random(0, radius); // Distância aleatória dentro do raio
    let x = width / 2 + cos(angle) * distance;
    let y = height / 2 + sin(angle) * distance;
    let z = random([-1, 1]); // Aleatoriamente para frente (1) ou para trás (-1)
    neutrons.push(createVector(x, y, z)); // Adiciona os nêutrons
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
    let p_z = p.z;
    
    let n = neutrons[i];
    let n_x = n.x;
    let n_y = n.y;
    let n_z = n.z;

    // Alternando para frente (1) ou para trás (-1) aleatoriamente
    p_z = random([-1, 1]);  // Aleatório para frente ou para trás
    n_z = random([-1, 1]);  // Aleatório para frente ou para trás

    // Atualiza as posições
    protons[i] = createVector(p_x, p_y, p_z);
    neutrons[i] = createVector(n_x, n_y, n_z);
  }
}

function draw() {
  background(255);

  // Desenha os prótons
  for (let i = 0; i < protons.length; i++) {
    let zOffset = protons[i].z * 5; // Desloca os prótons com base no z
    fill(255, 100, 0); // Cor laranja para prótons
    noStroke();
    ellipse(protons[i].x + zOffset, protons[i].y + zOffset, 10, 10); // Desenha com offset
  }

  // Desenha os nêutrons
  for (let i = 0; i < neutrons.length; i++) {
    let zOffset = neutrons[i].z * 5; // Desloca os nêutrons com base no z
    fill(139, 69, 19); // Cor marrom para nêutrons
    noStroke();
    ellipse(neutrons[i].x + zOffset, neutrons[i].y + zOffset, 10, 10); // Desenha com offset
  }
}
