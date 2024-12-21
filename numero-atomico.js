let protons = [];
let neutrons = [];
let raio = 60; // Raio da esfera (menor para que as partículas fiquem mais próximas)
let numProtons = 11;  // Número de prótons (do átomo de sódio)
let numNeutrons = 12; // Número de nêutrons (do átomo de sódio)

function setup() {
  createCanvas(400, 400);
  noFill();

  // Cores das partículas
  let corProton = color(255, 165, 0); // Laranja para prótons
  let corNeutron = color(139, 69, 19); // Marrom para nêutrons

  // Distribuindo prótons e nêutrons de forma esférica, mas mais próximos
  for (let i = 0; i < numProtons; i++) {
    // Calculando a posição de cada partícula no espaço esférico
    let theta = map(i, 0, numProtons, 0, PI); // ângulo de latitude
    let phi = map(i, 0, numProtons, 0, TWO_PI); // ângulo de longitude

    // Calculando as coordenadas esféricas para cada partícula
    let x = raio * sin(theta) * cos(phi);
    let y = raio * sin(theta) * sin(phi);
    let z = raio * cos(theta);

    // Alternando entre prótons e nêutrons, colocando-os próximos
    if (i % 2 === 0) {
      protons.push({ x, y, z, cor: corProton });
      neutrons.push({ x: x + 0.6 * raio, y, z, cor: corNeutron }); // Nêutron deslocado 60% do raio
    } else {
      protons.push({ x, y, z, cor: corProton });
      neutrons.push({ x: x - 0.6 * raio, y, z, cor: corNeutron }); // Nêutron deslocado na direção oposta
    }
  }
}

function draw() {
  background(255);
  translate(width / 2, height / 2);

  // Desenhando os prótons e nêutrons
  for (let i = 0; i < protons.length; i++) {
    // Desenha o próton
    fill(protons[i].cor);
    ellipse(protons[i].x, protons[i].y, 30, 30); // Menor tamanho para aproximar as partículas

    // Adiciona o sinal de positivo no próton
    textSize(16);
    textAlign(CENTER, CENTER);
    fill(255, 0, 0); // Vermelho para destacar o sinal "+"
    text("+", protons[i].x, protons[i].y);

    // Desenha o nêutron ao lado do próton, na posição alternada
    fill(neutrons[i].cor);
    ellipse(neutrons[i].x, neutrons[i].y, 30, 30); // Menor tamanho para aproximar as partículas
  }
}
