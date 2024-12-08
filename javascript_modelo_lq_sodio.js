let electronsLayer1 = [];
let electronsLayer2 = [];
let electronLayer3 = [];

function setup() {
  createCanvas(400, 600);  // Cartaz de 400x600 pixels
  frameRate(60);
  
  // Criando elétrons nas camadas
  // Primeira camada (2 elétrons)
  for (let i = 0; i < 2; i++) {
    electronsLayer1.push(createElectron(70, i * TWO_PI / 2));
  }
  
  // Segunda camada (8 elétrons)
  for (let i = 0; i < 8; i++) {
    electronsLayer2.push(createElectron(100, i * TWO_PI / 8));
  }
  
  // Terceira camada (1 elétron com movimento aleatório)
  electronLayer3.push(createRandomElectron(130));
}

function draw() {
  background(255);

  // Desenhando o núcleo (círculo laranja no centro)
  fill(255, 165, 0);
  noStroke();
  ellipse(width / 2, height / 2, 50, 50);  // Núcleo
  fill(0);
  textSize(16);
  textAlign(CENTER, CENTER);
  
  // Exibindo o número atômico com sinal positivo
  text('11+', width / 2, height / 2 - 10);
  
  // Exibindo prótons e nêutrons dentro do núcleo
  textSize(12);
  text('P: 11', width / 2, height / 2 + 10);  // Prótons
  text('N: 12', width / 2, height / 2 + 25);  // Nêutrons

  // Desenhando as camadas com linhas tracejadas
  drawDottedLine(70);  // Primeira camada
  drawDottedLine(100); // Segunda camada
  drawDottedLine(130); // Terceira camada
  
  // Desenhando as camadas e elétrons
  drawElectrons(electronsLayer1, 70, 2); // Primeira camada
  drawElectrons(electronsLayer2, 100, 8); // Segunda camada
  drawElectrons(electronLayer3, 130, 1); // Terceira camada (nuvem de elétrons)

  // Atualizando a posição dos elétrons na camada 3
  moveElectronsLayer3();
}

// Função para criar elétrons nas órbitas
function createElectron(radius, angle) {
  let x = width / 2 + radius * cos(angle);
  let y = height / 2 + radius * sin(angle);
  return { x: x, y: y, angle: angle, radius: radius };
}

// Função para criar um elétron com movimento aleatório
function createRandomElectron(radius) {
  let angle = random(TWO_PI);
  let x = width / 2 + radius * cos(angle);
  let y = height / 2 + radius * sin(angle);
  return { x: x, y: y, radius: radius, angle: angle };
}

// Função para desenhar os elétrons
function drawElectrons(electronArray, radius, numElectrons) {
  for (let e of electronArray) {
    fill(0, 0, 255);  // Cor azul para os elétrons
    ellipse(e.x, e.y, 12, 12);  // Desenha os elétrons
  }
}

// Função para desenhar a linha tracejada de cada camada
function drawDottedLine(radius) {
  stroke(0);
  strokeWeight(1);
  noFill();
  drawingContext.setLineDash([5, 5]); // Estilo de linha tracejada
  ellipse(width / 2, height / 2, radius * 2, radius * 2); // Desenha a linha da órbita
  drawingContext.setLineDash([]);  // Reseta para linha contínua
}

// Função para mover os elétrons da camada 3 (nuvem de elétrons)
function moveElectronsLayer3() {
  for (let e of electronLayer3) {
    let angleChange = random(-0.05, 0.05);  // Movimento mais suave
    e.angle += angleChange;
    e.x = width / 2 + e.radius * cos(e.angle);
    e.y = height / 2 + e.radius * sin(e.angle);
  }
}
