let raio = 10; // Raio do "círculo" em que as partículas vão estar localizadas
let numProtons = 5;  // Número de prótons
let numNeutrons = 6; // Número de nêutrons
let deslocamento = raio * 0.4; // Deslocamento de 40% do raio para as partículas
let particles = []; // Lista para armazenar as partículas

// Parâmetros da espiral
let angleIncrement = 0.8; // Incremento do ângulo para a espiral
let radiusIncrement = 1.5; // Incremento do raio (distância entre as partículas)

function setup() {
  createCanvas(400, 400); // Tela de 400x400 px
  noFill();

  // Cores das partículas
  let corProton = color(255, 165, 0); // Laranja para prótons
  let corNeutron = color(139, 69, 19); // Marrom para nêutrons

  // Inicializando as partículas
  let currentAngle = random(TWO_PI); // Ângulo aleatório para o primeiro próton
  let currentRadius = 10; // Raio inicial da espiral

  // Total de partículas
  let totalParticulas = numProtons + numNeutrons;

  // Loop para adicionar prótons e nêutrons de forma intercalada
  for (let i = 0; i < totalParticulas; i++) {
    let offsetX = cos(currentAngle) * currentRadius;
    let offsetY = sin(currentAngle) * currentRadius;

    // Alterna entre próton e nêutron de forma intercalada
    if (i % 2 === 0 && numProtons > 0) {
      particles.push({ x: offsetX, y: offsetY, cor: corProton, tipo: 'proton' }); // Adiciona próton
      numProtons--; // Decrementa o número de prótons após desenhar
    } 
    if (i % 2 !== 0 && numNeutrons > 0) {
      particles.push({ x: offsetX, y: offsetY, cor: corNeutron, tipo: 'neutron' }); // Adiciona nêutron
      numNeutrons--; // Decrementa o número de nêutrons após desenhar
    }

    // Atualiza o ângulo e o raio para o próximo
    currentAngle += angleIncrement; // Aumenta o ângulo
    currentRadius += radiusIncrement; // Aumenta o raio (distância entre as partículas)
  }
}

function draw() {
  background(255); // Limpa a tela a cada quadro

  // Desenha as partículas
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];

    // Desenha a partícula com a cor apropriada
    fill(p.cor); // Preenche com a cor da partícula
    ellipse(width / 2 + p.x, height / 2 + p.y, 10, 10); // Aplica o deslocamento (p.x e p.y), agora com círculos menores

    // Se for um próton, coloca o sinal de "+"
    if (p.tipo === 'proton') {
      fill(255, 0, 0); // Cor vermelha para o sinal "+"
      textSize(12); // Ajusta o tamanho do texto
      textAlign(CENTER, CENTER);
      text("+", width / 2 + p.x, height / 2 + p.y); // Coloca o "+" sobre o próton
    }
  }
}
