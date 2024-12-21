let protons = [];  // Array para armazenar os prótons
let neutrons = []; // Array para armazenar os nêutrons
let numProtons = 11;  // Número de prótons
let numNeutrons = 12; // Número de nêutrons

function setup() {
  createCanvas(100, 100); // Tamanho da tela 100px x 100px
  
  let radius = 30; // Raio da área onde as partículas serão distribuídas
  
  // Inicializando os prótons e nêutrons de forma alternada aleatoriamente
  for (let i = 0; i < numProtons; i++) {
    // Para os prótons, distribuindo aleatoriamente para cima ou para baixo
    let angle = random(TWO_PI); // Ângulo aleatório
    let distance = random(0, radius); // Distância aleatória dentro do raio

    let x = width / 2 + cos(angle) * distance;
    let y = height / 2 + sin(angle) * distance;
    protons.push(createVector(x, y));
  }

  for (let i = 0; i < numNeutrons; i++) {
    // Para os nêutrons, distribuindo aleatoriamente para cima ou para baixo
    let angle = random(TWO_PI); // Ângulo aleatório
    let distance = random(0, radius); // Distância aleatória dentro do raio

    let x = width / 2 + cos(angle) * distance;
    let y = height / 2 + sin(angle) * distance;
    neutrons.push(createVector(x, y));
  }

  // Agora vamos alternar os prótons e nêutrons de maneira aleatória para cima e para baixo
  alternarParticulas();
}

function alternarParticulas() {
  // Embaralhar as partículas
  let particles = [...protons, ...neutrons]; // Junta todos em um único array
  particles = shuffle(particles); // Embaralha o array para distribuir aleatoriamente

  // Reatribuir as partículas para as variáveis de prótons e nêutrons
  protons = particles.filter(p => p !== undefined && p.color === 'proton');
  neutrons = particles.filter(p => p !== undefined && p.color === 'neutron');

  // Agora vamos adicionar aleatoriamente se será próton ou nêutron
  for (let i = 0; i < particles.length; i++) {
    if (particles[i].color === 'proton') {
      particles[i].x = random(width);
      particles[i].y = random(height);
    } else {
    }
}

}


}


