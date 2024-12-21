let protons = [];
let neutrons = [];
let raio = 60; // Raio do núcleo
let numProtons = 11;  // Número de prótons (do átomo de sódio)
let numNeutrons = 12; // Número de nêutrons (do átomo de sódio)
let maxDeslocamento = raio * 0.75; // Deslocamento máximo de 75% do raio

function setup() {
  createCanvas(400, 400);
  noFill();

  // Cores das partículas
  let corProton = color(255, 165, 0); // Laranja para prótons
  let corNeutron = color(139, 69, 19); // Marrom para nêutrons

  // Colocando a primeira partícula no centro
  let x = 0;
  let y = 0;

  // Adiciona o primeiro próton
  protons.push({ x, y, cor: corProton });

  // Agora vamos adicionar nêutrons e prótons alternados, com deslocamento aleatório
  for (let i = 0; i < numProtons - 1; i++) {
    let deslocamentoX = random(-maxDeslocamento, maxDeslocamento);
    let deslocamentoY = random(-maxDeslocamento, maxDeslocamento);

    // Alternando entre prótons e nêutrons
    if (i % 2 === 0) {
      // Próton
      protons.push({ x: x + deslocamentoX, y: y + deslocamentoY, cor: corProton });
      // Adiciona o nêutron ao lado do próton
      neutrons.push({ x: x + deslocamentoX, y: y + deslocamentoY, cor: corNeutron });
    } else {
      // Próton
      protons.push({ x: x + deslocamentoX, y: y + deslocamentoY, cor: corProton });
      // Adiciona o nêutron ao lado do próton
      neutrons.push({ x: x + deslocamentoX, y: y + deslocamentoY, cor: corNeutron });
    }
  }
}

function draw() {
  background(255);
  translate(width / 2, height / 2);

  // Desenhando os prótons
  for (let i = 0; i < protons.length; i++) {
    // Desenha o próton
    fill(protons[i].cor);
    ellipse(protons[i].x, protons[i].y, 20, 20); // Menor tamanho para aproximar as partículas

    // Adiciona o sinal de positivo no próton
    textSize(16);
    textAlign(CENTER, CENTER);
    fill(255, 0, 0); // Vermelho para destacar o sinal "+"
    text("+", protons[i].x, protons[i].y);

    // Desenha o nêutron ao lado do próton, na posição alternada
    fill(neutrons[i].cor);
    ellipse(neutrons[i].x, neutrons[i].y, 20, 20); // Menor tamanho para aproximar as partículas
  }
}
