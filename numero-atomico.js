let protons = [];
let neutrons = [];
let raio = 25; // Raio do "círculo" em que as partículas vão estar localizadas
let numProtons = 10;  // Número de prótons
let numNeutrons = 10; // Número de nêutrons
let angulo = 0; // Começo do ângulo para as distribuições iniciais

function setup() {
  createCanvas(100, 100); // Tela de 100x100 px
  noFill();

  // Cores das partículas
  let corProton = color(255, 165, 0); // Laranja para prótons
  let corNeutron = color(139, 69, 19); // Marrom para nêutrons

  // Inicializando as partículas
  let deslocamento = raio * 0.6; // Deslocamento de 60% do raio para o nêutron e próton
  let currentAngle = random(TWO_PI); // Ângulo aleatório para o primeiro próton

  // Criando as partículas e distribuindo-as aleatoriamente
  for (let i = 0; i < numProtons; i++) {
    // Para o primeiro próton, posicione no centro e altere a sua posição
    if (i === 0) {
      protons.push({ x: 0, y: 0, cor: corProton });
      neutrons.push({ x: deslocamento, y: 0, cor: corNeutron });
    } else {
      // Deslocando aleatoriamente os próximos prótons
      let offsetX = cos(currentAngle) * deslocamento;
      let offsetY = sin(currentAngle) * deslocamento;

      // Prótons alternados entre os planos
      let planoY = random() > 0.5 ? 1 : -1;  // Alternando entre 1 (cima) e -1 (baixo)

      protons.push({ x: offsetX, y: offsetY * planoY, cor: corProton });

      // Colocando o nêutron alternado na posição correta
      let deslocamentoNeutron = deslocamento * 1.2; // Um pouco mais afastado
      let offsetXNeutron = cos(currentAngle + PI) * deslocamentoNeutron;
      let offsetYNeutron = sin(currentAngle + PI) * deslocamentoNeutron;

      neutrons.push({
        x: offsetXNeutron,
        y: offsetYNeutron * planoY, // Garantindo a alternância no plano
        cor: corNeutron,
      });

      // Aumenta o ângulo para a próxima partícula
      currentAngle += random(PI / 4, PI / 2); // Aumenta aleatoriamente de 45 a 90 graus
    }
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
