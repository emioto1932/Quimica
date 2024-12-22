let protons = [];
let neutrons = [];
let raio = 25; // Raio do "círculo" em que as partículas vão estar localizadas
let numProtons = 10;  // Número de prótons
let numNeutrons = 10; // Número de nêutrons
let angulo = 0; // Começo do ângulo para as distribuições iniciais
let deslocamento = raio * 0.6; // Deslocamento de 60% do raio para o nêutron e próton

function setup() {
  createCanvas(100, 100); // Tela de 100x100 px
  noFill();

  // Cores das partículas
  let corProton = color(255, 165, 0); // Laranja para prótons
  let corNeutron = color(139, 69, 19); // Marrom para nêutrons

  // Inicializando as partículas
  let currentAngle = random(TWO_PI); // Ângulo aleatório para o primeiro próton

  // Alternar entre prótons e nêutrons em cada plano
  let totalParticulas = numProtons + numNeutrons;

  for (let i = 0; i < totalParticulas; i++) {
    // Deslocando aleatoriamente os próximos prótons
    let offsetX = cos(currentAngle) * deslocamento;
    let offsetY = sin(currentAngle) * deslocamento;

    // Definindo o plano em que a partícula será colocada
    let planoY = (i % 2 === 0) ? 1 : -1;  // Alternando entre 1 (cima) e -1 (baixo)

    // Alternando entre próton e nêutron
    if (i % 2 === 0) {
      // Criando o próton
      protons.push({ x: offsetX, y: offsetY * planoY, cor: corProton });
    } else {
      // Criando o nêutron
      neutrons.push({ x: offsetX, y: offsetY * planoY, cor: corNeutron });
    }

    // Aumenta o ângulo para a próxima partícula
    currentAngle += random(PI / 4, PI / 2); // Aumenta aleatoriamente de 45 a 90 graus
  }
}

function draw() {
  background(255);

  // Desenhando os prótons
  for (let i = 0; i < protons.length; i++) {
    fill(protons[i].cor);
    ellipse(width / 2 + protons[i].x, height / 2 + protons[i].y, 25, 25); // Prótons

    // Adiciona o sinal de positivo no próton
    textSize(15);
    textAlign(CENTER, CENTER);
    fill(255, 0, 0); // Vermelho para o sinal "+"
    text("+", width / 2 + protons[i].x, height / 2 + protons[i].y);
  }

  // Desenhando os nêutrons
  for (let i = 0; i < neutrons.length; i++) {
    fill(neutrons[i].cor);
    ellipse(width / 2 + neutrons[i].x, height / 2 + neutrons[i].y, 25, 25); // Nêutrons
  }
}
