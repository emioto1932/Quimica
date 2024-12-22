let protons = [];
let neutrons = [];
let raio = 25; // Raio do "círculo" em que as partículas vão estar localizadas
let numProtons = 10;  // Número de prótons
let numNeutrons = 10; // Número de nêutrons
let angulo = 0;

function setup() {
  createCanvas(100, 100); // Tela de 100x100 px
  noFill();

  // Cores das partículas
  let corProton = color(255, 165, 0); // Laranja para prótons
  let corNeutron = color(139, 69, 19); // Marrom para nêutrons

  // Distribuindo os prótons e nêutrons aleatoriamente dentro do círculo
  for (let i = 0; i < numProtons; i++) {
    let posX = cos(angulo) * raio;
    let posY = sin(angulo) * raio;

    // Aleatoriamente, coloca a partícula em um plano positivo ou negativo (alternando entre cima e baixo)
    let planoY = random() > 0.5 ? 1 : -1; // Alterna entre 1 (acima) e -1 (abaixo)

    // Adicionando o próton com a posição no plano
    protons.push({ x: posX, y: posY * planoY, cor: corProton });

    // Calculando a posição do nêutron de forma alternada, mas mantendo a alternância entre planos
    let deslocamento = raio * 0.75; // Deslocamento para os nêutrons
    planoY = random() > 0.5 ? 1 : -1; // Alterna entre 1 (acima) e -1 (abaixo)
    neutrons.push({ x: posX + deslocamento, y: posY * planoY, cor: corNeutron });

    angulo += PI / 5; // Deslocamento angular para distribuição das partículas (72 graus)
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

  // Verificando se as partículas ultrapassaram os limites da tela e ajustando a posição
  for (let i = 0; i < protons.length; i++) {
    checkBoundary(protons[i]);
    checkBoundary(neutrons[i]);
  }
}

// Função para verificar se a partícula está fora da tela e reposicionar
function checkBoundary(particle) {
  let limite = 50; // Limite da tela (metade do tamanho da tela)

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
