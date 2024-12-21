let protons = [];
let neutrons = [];
let raio = 25; // Raio reduzido para ajustar à tela de 50px x 50px
let angulo = 0; // Ângulo de deslocamento para posicionar os prótons e nêutrons

function setup() {
  createCanvas(50, 50); // Tamanho da tela reduzido para 50x50px
  noFill();

  // Definindo o tamanho das partículas
  let raioParticula = 5; // Tamanho das partículas (prótons e nêutrons)
  let numProtons = 11;  // Número de prótons (do átomo de sódio)
  let numNeutrons = 12; // Número de nêutrons (do átomo de sódio)

  // Cores das partículas
  let corProton = color(255, 165, 0); // Laranja para prótons
  let corNeutron = color(139, 69, 19); // Marrom para nêutrons

  // Posicionando as partículas de acordo com a lógica solicitada
  let deslocamento = 0.75 * raio; // Deslocamento de 75% do raio para o nêutron

  // Colocando as partículas com a sequência desejada
  for (let i = 0; i < numProtons; i++) {
    if (i === 0) {
      // O primeiro próton no centro
      protons.push({ x: 0, y: 0, cor: corProton });
      neutrons.push({ x: deslocamento, y: 0, cor: corNeutron }); // O primeiro nêutron deslocado 75% do raio
    } else {
      // Prótons e nêutrons alternados, com deslocamento
      let posX = cos(angulo) * raio;
      let posY = sin(angulo) * raio;
      
      // Adicionando um próton e um nêutron intercalados
      if (i % 2 === 0) {
        protons.push({ x: posX, y: posY, cor: corProton });
        neutrons.push({ x: posX + deslocamento, y: posY, cor: corNeutron }); // Nêutron deslocado em relação ao próton
      } else {
        protons.push({ x: posX, y: posY, cor: corProton });
        neutrons.push({ x: posX - deslocamento, y: posY, cor: corNeutron }); // Nêutron deslocado em direção oposta
      }
    }
    angulo += PI / 3; // Deslocamento de 33 graus entre as partículas
  }
}

function draw() {
  background(255);

  // Desenhando os prótons e nêutrons
  for (let i = 0; i < protons.length; i++) {
    // Desenha o próton
    fill(protons[i].cor);
    ellipse(width / 2 + protons[i].x, height / 2 + protons[i].y, 8, 8); // Reduzindo o tamanho das partículas

    // Adiciona o sinal de positivo no próton
    textSize(8);
    textAlign(CENTER, CENTER);
    fill(255, 0, 0); // Vermelho para destacar o sinal "+"
    text("+", width / 2 + protons[i].x, height / 2 + protons[i].y);

    // Desenha o nêutron ao lado do próton, na posição alternada
    fill(neutrons[i].cor);
    ellipse(width / 2 + neutrons[i].x, height / 2 + neutrons[i].y, 8, 8); // Reduzindo o tamanho das partículas
  }
}
