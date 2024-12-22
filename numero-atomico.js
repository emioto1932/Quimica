let protons = [];
let neutrons = [];
let raio = 30; // Raio do "círculo" em que as partículas vão estar localizadas
let angulo = 0; // Ângulo de deslocamento para posicionar os prótons e nêutrons

function setup() {
  createCanvas(100, 100); // Tela de 100x100 px
  noFill();

  // Definindo o tamanho das partículas
  let raioParticula = 15; // Tamanho das partículas (prótons e nêutrons)
  let numProtons = 10;  // Número de prótons (do átomo de sódio)
  let numNeutrons = 10; // Número de nêutrons (do átomo de sódio)

  // Cores das partículas
  let corProton = color(255, 165, 0); // Laranja para prótons
  let corNeutron = color(139, 69, 19); // Marrom para nêutrons

  // Posicionando as partículas de acordo com a lógica solicitada
  for (let i = 0; i < numProtons; i++) {
    let posX = cos(angulo) * raio;
    let posY = sin(angulo) * raio;
    
    if (i % 2 === 0) {
      // Para prótons: Posicionamento alternado, com algum deslocamento para evitar sobreposição
      protons.push({ x: posX, y: posY, cor: corProton });
      neutrons.push({ x: posX + (raio * 0.75), y: posY, cor: corNeutron });
    } else {
      // Para nêutrons: Posicionamento alternado
      protons.push({ x: posX, y: posY, cor: corProton });
      neutrons.push({ x: posX - (raio * 0.75), y: posY, cor: corNeutron });
    }
    angulo += PI / 5; // Distribuição angular dos prótons e nêutrons (cada partícula a 72 graus)
  }
}

function draw() {
  background(255);

  // Desenhando os prótons e nêutrons
  for (let i = 0; i < protons.length; i++) {
    // Desenha o próton
    fill(protons[i].cor);
    ellipse(width / 2 + protons[i].x, height / 2 + protons[i].y, 30, 30); // Aumentando o tamanho das partículas

    // Adiciona o sinal de positivo no próton
    textSize(20);
    textAlign(CENTER, CENTER);
    fill(255, 0, 0); // Vermelho para destacar o sinal "+"
    text("+", width / 2 + protons[i].x, height / 2 + protons[i].y);

    // Desenha o nêutron ao lado do próton, na posição alternada
    fill(neutrons[i].cor);
    ellipse(width / 2 + neutrons[i].x, height / 2 + neutrons[i].y, 30, 30); // Aumentando o tamanho das partículas

    // Verificando se as partículas ultrapassaram os limites da tela e ajustando a posição
    checkBoundary(protons[i]);
    checkBoundary(neutrons[i]);
  }
}

// Função para verificar se a partícula está fora da tela e reposicionar
function checkBoundary(particle) {
  let limite = 50; // Limite da tela

  if (particle.x > limite) {
    particle.x = -limite; // Reposiciona no lado oposto
    particle.y = random(-limite, limite); // Aleatoriamente desloca a posição
  } else if (particle.x < -limite) {
    particle.x = limite;
    particle.y = random(-limite, limite);
  }

  if (particle.y > limite) {
    particle.y = -limite;
    particle.x = random(-limite, limite);
  } else if (particle.y < -limite) {
    particle.y = limite;
    particle.x = random(-limite, limite);
  }
}
