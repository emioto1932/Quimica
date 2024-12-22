let protons = [];
let neutrons = [];
let raio = 10; // Raio do "círculo" em que as partículas vão estar localizadas
let numProtons = 35;  // Número de prótons
let numNeutrons = 40; // Número de nêutrons
let deslocamento = raio * 0.4; // Deslocamento de 40% do raio para o nêutron e próton

function setup() {
  createCanvas(200, 200); // Aumentei o tamanho da tela para acomodar as partículas
  noFill();

  // Cores das partículas
  let corProton = color(255, 165, 0); // Laranja para prótons
  let corNeutron = color(139, 69, 19); // Marrom para nêutrons

  // Inicializando as partículas
  let currentAngle = random(TWO_PI); // Ângulo aleatório para o primeiro próton

  // Contadores
  let protonsCount = 0;
  let neutronsCount = 0;
  let totalParticulas = numProtons + numNeutrons;

  // Distribuindo prótons e nêutrons
  for (let i = 0; i < totalParticulas; i++) {
    let offsetX = cos(currentAngle) * deslocamento;
    let offsetY = sin(currentAngle) * deslocamento;

    // Alterna entre próton e nêutron
    if (i % 2 === 0 && protonsCount < numProtons) {
      protons.push({ x: offsetX, y: offsetY, cor: corProton });
      protonsCount++;
    } else if (neutronsCount < numNeutrons) {
      neutrons.push({ x: offsetX, y: offsetY, cor: corNeutron });
      neutronsCount++;
    }

    // Atualiza o ângulo para o próximo, garantindo uma distribuição razoavelmente espalhada
    currentAngle += random(PI / 4, PI / 2); // Aumenta aleatoriamente de 45 a 90 graus
  }
}

function draw() {
  background(255);

  // Desenhando os prótons e nêutrons
  for (let i = 0; i < max(protons.length, neutrons.length); i++) {
    // Desenha o próton se houver
    if (i < protons.length) {
      fill(protons[i].cor);
      ellipse(width / 2 + protons[i].x, height / 2 + protons[i].y, 25, 25); // Prótons

      // Adiciona o sinal de "+"
      fill(255, 0, 0); // Cor vermelha para o sinal "+"
      textSize(18); // Ajusta o tamanho do texto
      textAlign(CENTER, CENTER);
      text("+", width / 2 + protons[i].x, height / 2 + protons[i].y);
    }

    // Desenha o nêutron se houver
    if (i < neutrons.length) {
      fill(neutrons[i].cor);
      ellipse(width / 2 + neutrons[i].x, height / 2 + neutrons[i].y, 25, 25); // Nêutrons
    }
  }
}
