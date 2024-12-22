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
      fill(corProton); // Preenche com a cor do próton
      ellipse(width / 2 + offsetX, height / 2 + offsetY, 25, 25); // Desenha o próton

      // Adiciona o sinal de "+"
      fill(255, 0, 0); // Cor vermelha para o sinal "+"
      textSize(18); // Ajusta o tamanho do texto
      textAlign(CENTER, CENTER);
      text("+", width / 2 + offsetX, height / 2 + offsetY);

      numProtons--; // Decrementa o número de prótons
    }
    // Verifica se ainda há nêutrons para adicionar
    else if (numNeutrons > 0) {
      fill(corNeutron); // Preenche com a cor do nêutron
      ellipse(width / 2 + offsetX, height / 2 + offsetY, 25, 25); // Desenha o nêutron

      numNeutrons--; // Decrementa o número de nêutrons
    }

    // Atualiza o ângulo para o próximo
    currentAngle += random(PI / 4, PI / 2); // Aumenta aleatoriamente de 45 a 90 graus
  }
}

function draw() {
  // O desenho das partículas já foi feito no setup(), então não há necessidade de desenhar novamente no draw().
}
