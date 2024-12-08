let electronsLayer1 = [];
let electronsLayer2 = [];
let electronLayer3 = [];

function setup() {
  createCanvas(400, 600); // Cartaz de 400x600 pixels
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
  text('11', width / 2, height / 2);  // Número atômico do sódio

  // Desenhando as camadas e elétrons
  drawElectrons(electronsLayer1, 70, 2); // Primeira camada
  drawElectrons(electronsLayer2, 100, 8); // Segunda camada
  drawElectrons(electronLayer3, 130, 1); // Terceira camada (nuvem de elétrons)

  // Atualizando a posição dos elétrons na camada 3
  moveElectronsLayer3();
}

function createElectron(radius, angle) {
  let x = width / 2 + radius * cos(angle);
  let y = height / 2 + radius * sin(angle);
  return { x: x, y: y, angle: angle, radius: radius };
}

function createRandomElectron(radius) {
  let angle = random(TWO_PI);
  let x = width / 2 + radius * cos(angle);
  let y = height / 2 + radius * sin(angle);
  return { x: x, y: y, radius: radius, angle: angle };
}

function drawElectrons(electronArray, radius, numElectrons) {
  for (let e of electronArray) {
    fill(0, 0, 255);  // Cor azul para os elétrons
    ellipse(e.x, e.y, 12, 12);  // Desenha os elétrons
  }
}

function moveElectronsLayer3() {
  for (let e of electronLayer3) {
    let angleChange = random(-0.05, 0.05);  // Movimento mais suave
    e.angle += angleChange;
    e.x = width / 2 + e.radius * cos(e.angle);
    e.y = height / 2 + e.radius * sin(e.angle);
  }
}
