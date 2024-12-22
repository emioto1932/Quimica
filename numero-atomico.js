let protons = [];
let neutrons = [];
let raio = 10; // Raio do "círculo" em que as partículas vão estar localizadas
let numProtons = 35;  // Número de prótons
let numNeutrons = 40; // Número de nêutrons
let angulo = 0; // Começo do ângulo para as distribuições iniciais
let deslocamento = raio * 0.4; // Deslocamento de 60% do raio para o nêutron e próton

function setup() {
  createCanvas(100, 100); // Tela de 100x100 px
  noFill();

  // Cores das partículas
  let corProton = color(255, 165, 0); // Laranja para prótons
  let corNeutron = color(139, 69, 19); // Marrom para nêutrons

  // Inicializando as partículas
  let currentAngle = random(TWO_PI); // Ângulo aleatório para o primeiro próton

  // Total de partículas
  let totalParticulas = numProtons + numNeutrons;

  // Loop para adicionar prótons e nêutrons de forma intercalada
  for (let i = 0; i < totalParticulas; i++) {
    let offsetX = cos(currentAngle) * deslocamento;
    let offsetY = sin(currentAngle) * deslocamento;

    // Verifica se ainda há prótons para adicionar
    if (numProtons > 0) {
      protons.push({ x: offsetX, y: offsetY, cor: corProton });
      numProtons--; // Decrementa o número de prótons
    } 
    // Verifica se ainda há nêutrons para adicionar
    else if (numNeutrons > 0) {
      neutrons.push({ x: offsetX, y: offsetY, cor: corNeutron });
      numNeutrons--; // Decrementa o número de nêutrons
    }

    // Atualiza o ângulo para o próximo
    currentAngle += random(PI / 4, PI / 2); // Aumenta aleatoriamente de 45 a 90 graus
  }
}

function draw() {
  background(255);

  // Desenhando os prótons
  for (let i = 0; i < protons.length; i++) {
    // Desenha o próton
    fill(protons[i].cor);
    ellipse(width / 2 + protons[i].x, height / 2 + protons[i].y, 25, 25); // Prótons

    // Adiciona o sinal de "+"
    fill(255, 0, 0); // Cor vermelha para o sinal "+"
    textSize(18); // Ajusta o tamanho do texto
    textAlign(CENTER, CENTER);
    text("+", width / 2 + protons[i].x, height / 2 + protons[i].y);
  }

  // Desenhando os nêutrons
  for (let i = 0; i < neutrons.length; i++) {
    // Desenha o nêutron
    fill(neutrons[i].cor);
    ellipse(width / 2 + neutrons[i].x, height / 2 + neutrons[i].y, 25, 25); // Nêutrons
  }
}
