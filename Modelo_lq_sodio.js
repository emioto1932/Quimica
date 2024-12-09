// Definindo os elementos químicos e seus respectivos números de elétrons
const elementsData = {
  H: { electrons: 1 },
  He: { electrons: 2 },
  Li: { electrons: 3 },
  Be: { electrons: 4 },
  B: { electrons: 5 },
  C: { electrons: 6 },
  N: { electrons: 7 },
  O: { electrons: 8 },
  F: { electrons: 9 },
  Ne: { electrons: 10 },
  Na: { electrons: 11 },
  Mg: { electrons: 12 },
  Al: { electrons: 13 },
  // Adicione outros elementos conforme necessário
};

// Camadas e seus limites máximos de elétrons
const maxElectronsPerLayer = [2, 8, 18, 32, 32, 18, 8];

let electronsLayer1 = [];
let electronsLayer2 = [];
let electronsLayer3 = [];
let electronsLayer4 = [];
let electronsLayer5 = [];
let electronsLayer6 = [];
let electronsLayer7 = [];

let speedLayer1 = 0.03; // Velocidade da camada 1
let speedLayer2 = 0.02; // Velocidade da camada 2
let speedLayer3 = 0.015; // Velocidade da camada 3
let speedLayer4 = 0.01; // Velocidade da camada 4
let speedLayer5 = 0.005; // Velocidade da camada 5
let speedLayer6 = 0.003; // Velocidade da camada 6
let speedLayer7 = 0.002; // Velocidade da camada 7

let electronLayers = [
  electronsLayer1,
  electronsLayer2,
  electronsLayer3,
  electronsLayer4,
  electronsLayer5,
  electronsLayer6,
  electronsLayer7
];

function setup() {
  createCanvas(400, 600);  // Cartaz de 400x600 pixels
  frameRate(60);

  const elementSelect = document.getElementById('element-select');
  elementSelect.addEventListener('change', function() {
    const element = elementSelect.value;
    if (element) {
      const numElectrons = elementsData[element]?.electrons || 0;
      setupElectrons(numElectrons);
    }
  });
}

function setupElectrons(numElectrons) {
  // Limpar as camadas anteriores
  for (let i = 0; i < electronLayers.length; i++) {
    electronLayers[i] = [];
  }

  let remainingElectrons = numElectrons;

  for (let i = 0; i < maxElectronsPerLayer.length; i++) {
    if (remainingElectrons <= 0) break;

    // Definir o número de elétrons para esta camada
    let electronsInLayer = Math.min(remainingElectrons, maxElectronsPerLayer[i]);

    // Criar os elétrons para esta camada
    for (let j = 0; j < electronsInLayer; j++) {
      electronLayers[i].push(createElectron((i + 1) * 30, j * TWO_PI / electronsInLayer));
    }

    remainingElectrons -= electronsInLayer;
  }
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

  // Desenhando as camadas com linhas tracejadas
  for (let i = 0; i < maxElectronsPerLayer.length; i++) {
    drawDottedLine((i + 1) * 30);
  }

  // Desenhando as camadas e elétrons
  for (let i = 0; i < electronLayers.length; i++) {
    drawElectrons(electronLayers[i], (i + 1) * 30, maxElectronsPerLayer[i]);
    moveElectronsLayer(electronLayers[i], getSpeedForLayer(i));
  }
}

// Função para criar elétrons nas órbitas
function createElectron(radius, angle) {
  let x = width / 2 + radius * cos(angle);
  let y = height / 2 + radius * sin(angle);
  return { x: x, y: y, angle: angle, radius: radius };
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

// Função para mover os elétrons uniformemente em cada camada
function moveElectronsLayer(electronArray, speed) {
  for (let e of electronArray) {
    e.angle += speed;  // Controla a velocidade de rotação dos elétrons
    e.x = width / 2 + e.radius * cos(e.angle);
    e.y = height / 2 + e.radius * sin(e.angle);
  }
}

// Função para retornar a velocidade para cada camada
function getSpeedForLayer(layerIndex) {
  switch (layerIndex) {
    case 0: return speedLayer1;
    case 1: return speedLayer2;
    case 2: return speedLayer3;
    case 3: return speedLayer4;
    case 4: return speedLayer5;
    case 5: return speedLayer6;
    case 6: return speedLayer7;
    default: return 0.01;
  }
}
