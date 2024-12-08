let electronCountLayer1 = 2;
let electronCountLayer2 = 8;
let electronCountLayer3 = 1;

let electronsLayer1 = [];
let electronsLayer2 = [];
let electronsLayer3 = [];

function setup() {
  createCanvas(400, 600);  // Cartaz com 400x600 pixels
  frameRate(60);

  // Criando elétrons nas camadas
  // Primeira camada
  for (let i = 0; i < electronCountLayer1; i++) {
    electronsLayer1.push(createElectron(100, 200, i * TWO_PI / electronCountLayer1));
  }

  // Segunda camada
  for (let i = 0; i < electronCountLayer2; i++) {
    electronsLayer2.push(createElectron(150, 200, i * TWO_PI / electronCountLayer2));
  }

  // Terceira camada (nuvem de elétrons, movendo aleatoriamente)
  for (let i = 0; i < electronCountLayer3; i++) {
    electronsLayer3.push(createRandomElectron(200, 200));
  }
}

function draw() {
  background(255);

  // Desenhando o núcleo
  fill(255, 165, 0);  // Cor laranja
  noStroke();
  ellipse(width / 2, height / 2, 50, 50);  // Núcleo no centro
  fill(0);
  textSize(16);
  textAlign(CENTER, CENTER);
  text('11', width / 2, height / 2);  // Número atômico do sódio

  // Desenhando as camadas e elétrons
  drawElectrons(electronsLayer1, 100, 200);
  drawElectrons(electronsLayer2, 150, 200);
  drawElectrons(electronsLayer3, 200, 200);

  // Atualizando a posição dos elétrons da última camada (nuvem)
  moveElectronsLayer3();
}

function createElectron(radius, centerX, angle) {
  let x = centerX + radius * cos(angle);
  let y = height / 2 + radius * sin(angle);
  return { x: x, y: y, angle: angle, radius: radius };
}

function createRandomElectron(radius, centerX) {
  let angle = random(TWO_PI);
  let x = centerX + radius * cos(angle);
  let y = height / 2 + radius * sin(angle);
  return { x: x, y: y, radius: radius };
}

function drawElectrons(electronArray, radius, centerX) {
  for (let e of electronArray) {
    fill(0, 0, 255);  // Elétrons azuis
    ellipse(e.x, e.y, 10, 10);
  }
}

function moveElectronsLayer3() {
  for (let e of electronsLayer3) {
    let angleChange = random(-0.1, 0.1);
    e.angle += angleChange;  // Mudando a direção aleatoriamente
    e.x = width / 2 + e.radius * cos(e.angle);
    e.y = height / 2 + e.radius * sin(e.angle);
  }
}
