let raio = 10; // Raio do "círculo" em que as partículas vão estar localizadas
let numProtons = 2;  // Número de prótons
let numNeutrons = 5; // Número de nêutrons
let deslocamento = raio * 0.6; // Deslocamento de 40% do raio para as partículas
let particles = []; // Lista para armazenar as partículas

let vezProton = true; // Controla quando é a vez de adicionar um próton
let vezNeutron = false; // Controla quando é a vez de adicionar um nêutron

// Parâmetros da espiral
let angleIncrement = 0.4; // Incremento do ângulo para a espiral
let radiusIncrement = 0.2; // Incremento do raio (distância entre as partículas)

function setup() {
  createCanvas(400, 400); // Tela de 400x400 px
  noFill();

  // Cores das partículas
  let corProton = color(255, 165, 0); // Laranja para prótons
  let corNeutron = color(139, 69, 19); // Marrom para nêutrons

  // Inicializando as partículas
  let currentAngle = random(TWO_PI); // Ângulo aleatório para o primeiro próton
  let currentRadius = deslocamento; // Raio inicial do espiral
  
  // Total de partículas
  let totalParticulas = numProtons + numNeutrons;
  let diferencaParticulas = numNeutrons - numProtons
  let duplicidadeNeutron = 0

   // Loop para adicionar prótons e nêutrons de forma intercalada
  for (let i = 0; i < totalParticulas; i++) {
    // Calcular a posição em espiral
    let offsetX = cos(currentAngle) * currentRadius;
    let offsetY = sin(currentAngle) * currentRadius;

    // Distribui primeiro um próton e depois dois nêutrons, até a diferença ser zerada
    if (diferencaParticulas > 0) {
      // Adiciona um próton
      if (vezProton && numProtons > 0) {
        particles.push({ x: offsetX, y: offsetY, cor: corProton, tipo: 'proton' });
        numProtons--; // Decrementa o número de prótons após desenhar
        vezProton = false; // Passa para a vez do nêutron
        vezNeutron = true; // Habilita a vez do nêutron
        diferencaParticulas--; // Diminui a diferença entre nêutrons e prótons
      }
      
      // Adiciona dois nêutrons
      if (vezNeutron && numNeutrons > 0) {
        particles.push({ x: offsetX, y: offsetY, cor: corNeutron, tipo: 'neutron' });
        numNeutrons--; // Decrementa o número de nêutrons após desenhar
        diferencaParticulas--; // Diminui a diferença entre nêutrons e prótons
        if (diferencaParticulas <= 0) {
          vezProton = true;  // Habilita a vez do próton novamente
          vezNeutron = false; // Desabilita a vez do nêutron
        }
      }
    } else {
      // Após distribuir a diferença de nêutrons, continua com a alternância normal entre prótons e nêutrons
      // Verifica se é a vez de adicionar um próton
      if (vezProton && numProtons > 0) {
        particles.push({ x: offsetX, y: offsetY, cor: corProton, tipo: 'proton' }); // Adiciona próton
        numProtons--; // Decrementa o número de prótons após desenhar
        vezProton = false; // Passa para a vez do nêutron
        vezNeutron = true; // Habilita a vez do nêutron
      }

      // Verifica se é a vez de adicionar um nêutron
      else if (vezNeutron && numNeutrons > 0) {
        particles.push({ x: offsetX, y: offsetY, cor: corNeutron, tipo: 'neutron' }); // Adiciona nêutron
        numNeutrons--; // Decrementa o número de nêutrons após desenhar
        vezNeutron = false; // Passa para a vez do próton
        vezProton = true; // Habilita a vez do próton
      }
    }

    // Atualiza o ângulo e o raio para criar o efeito espiral
    currentAngle += angleIncrement; // Aumenta o ângulo para o próximo ponto da espiral
    currentRadius += radiusIncrement; // Aumenta o raio para afastar as partículas, criando o efeito espiral
  }
}



function draw() {
  background(255); // Limpa a tela a cada quadro

  // Desenha as partículas
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];

    // Desenha a partícula com a cor apropriada
    fill(p.cor); // Preenche com a cor da partícula
    ellipse(width / 2 + p.x, height / 2 + p.y, 15, 15); // Aplica o deslocamento (p.x e p.y)

    // Se for um próton, coloca o sinal de "+"
    if (p.tipo === 'proton') {
      fill(255, 0, 0); // Cor vermelha para o sinal "+"
      textSize(12); // Ajusta o tamanho do texto
      textAlign(CENTER, CENTER);
      text("+", width / 2 + p.x, height / 2 + p.y); // Coloca o "+" sobre o próton
    }
  }
}
