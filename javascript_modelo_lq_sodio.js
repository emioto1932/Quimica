const groupSelect = document.getElementById("group-select");
const elementSelect = document.getElementById("element-select");
const infoTable = document.getElementById("info-table");
const tableBody = infoTable.querySelector("tbody");
const canvasContainer = document.getElementById("canvas-container");

let elementoAtual = null; // Variável para armazenar o elemento selecionado
let p5Instance = null; // Instância do p5.js

// Elementos químicos por grupo
const elementsByGroup = {
  "1": [{ symbol: "H", name: "Hidrogênio" }, { symbol: "Li", name: "Lítio" }, { symbol: "Na", name: "Sódio" }],
  "2": [{ symbol: "Be", name: "Berílio" }, { symbol: "Mg", name: "Magnésio" }, { symbol: "Ca", name: "Cálcio" }],
  "13": [{ symbol: "B", name: "Boro" }, { symbol: "Al", name: "Alumínio" }],
  "14": [{ symbol: "C", name: "Carbono" }, { symbol: "Si", name: "Silício" }],
  "15": [{ symbol: "N", name: "Nitrogênio" }, { symbol: "P", name: "Fósforo" }],
  "16": [{ symbol: "O", name: "Oxigênio" }, { symbol: "S", name: "Enxofre" }],
  "17": [{ symbol: "F", name: "Flúor" }, { symbol: "Cl", name: "Cloro" }],
  "18": [{ symbol: "He", name: "Hélio" }, { symbol: "Ne", name: "Neônio" }]
};

// Propriedades dos elementos
const elementProperties = {
  "H": { protons: 1, electrons: 1, electronegativity: 2.2 },
  "Li": { protons: 3, electrons: 3, electronegativity: 0.98 },
  "Na": { protons: 11, electrons: 11, electronegativity: 0.93 },
  "Be": { protons: 4, electrons: 4, electronegativity: 1.57 },
  "Mg": { protons: 12, electrons: 12, electronegativity: 1.31 },
  "Ca": { protons: 20, electrons: 20, electronegativity: 1.0 },
  "B": { protons: 5, electrons: 5, electronegativity: 2.04 },
  "Al": { protons: 13, electrons: 13, electronegativity: 1.61 },
  "C": { protons: 6, electrons: 6, electronegativity: 2.55 },
  "Si": { protons: 14, electrons: 14, electronegativity: 1.9 },
  "N": { protons: 7, electrons: 7, electronegativity: 3.04 },
  "P": { protons: 15, electrons: 15, electronegativity: 2.19 },
  "O": { protons: 8, electrons: 8, electronegativity: 3.44 },
  "S": { protons: 16, electrons: 16, electronegativity: 2.58 },
  "F": { protons: 9, electrons: 9, electronegativity: 3.98 },
  "Cl": { protons: 17, electrons: 17, electronegativity: 3.16 },
  "He": { protons: 2, electrons: 2, electronegativity: "N/A" },
  "Ne": { protons: 10, electrons: 10, electronegativity: "N/A" }
};

// Carregar elementos ao selecionar o grupo
groupSelect.addEventListener("change", () => {
  const group = groupSelect.value;

  elementSelect.innerHTML = '<option value="">-- Selecione um Elemento --</option>';

  if (group && elementsByGroup[group]) {
    elementSelect.disabled = false;
    elementsByGroup[group].forEach(({ symbol, name }) => {
      const option = document.createElement("option");
      option.value = symbol;
      option.textContent = `${name} (${symbol})`;
      elementSelect.appendChild(option);
    });
  } else {
    elementSelect.disabled = true;
  }
});

// Atualizar a tabela e iniciar animação quando o elemento for selecionado
elementSelect.addEventListener("change", () => {
  const element = elementSelect.value;

  if (!element) return; // Se não houver elemento selecionado, não faz nada

  elementoAtual = elementProperties[element]; // Atualizar o elemento atual

  // Preencher a tabela com as propriedades do elemento
  tableBody.innerHTML = `
    <tr><td>Número de Prótons</td><td>+${elementoAtual.protons}</td></tr>
    <tr><td>Número de Elétrons</td><td>${elementoAtual.electrons}</td></tr>
    <tr><td>Eletronegatividade</td><td>${elementoAtual.electronegativity}</td></tr>
  `;
  
  // Exibir a tabela
  infoTable.classList.remove("hidden");

  // Remover o canvas antigo, se houver
  if (p5Instance) {
    p5Instance.remove();
  }

  // Criar um novo canvas no contêiner
  p5Instance = new p5(createElectronAnimation, canvasContainer); // Passando o contêiner como o segundo parâmetro
});

// Função de animação com p5.js
function createElectronAnimation(p) {
  let electronsLayer1 = [];
  let electronsLayer2 = [];
  let electronLayer3 = [];

  let speedLayer1 = 0.03;
  let speedLayer2 = 0.02;
  let speedLayer3 = 0.01;

  let totalElectrons = elementoAtual.electrons;

  p.setup = () => {
    p.createCanvas(400, 600);
    p.frameRate(60);

    // Criando elétrons nas camadas, baseado no número de elétrons do elemento
    if (totalElectrons <= 2) {
      for (let i = 0; i < totalElectrons; i++) {
        electronsLayer1.push(createElectron(70, i * p.TWO_PI / 2));
      }
    } else if (totalElectrons <= 10) {
      for (let i = 0; i < 8; i++) {
        electronsLayer2.push(createElectron(100, i * p.TWO_PI / 8));
      }
      for (let i = 0; i < totalElectrons - 8; i++) {
        electronLayer3.push(createElectron(130, i * p.TWO_PI / (totalElectrons - 8)));
      }
    } else {
      for (let i = 0; i < 8; i++) {
        electronsLayer2.push(createElectron(100, i * p.TWO_PI / 8));
      }
      for (let i = 0; i < 18; i++) {
        electronLayer3.push(createElectron(130, i * p.TWO_PI / 18));
      }
    }
  };

  p.draw = () => {
    p.background(255);

    // Desenhando o núcleo (círculo laranja no centro)
    p.fill(255, 165, 0);
    p.noStroke();
    p.ellipse(p.width / 2, p.height / 2, 50, 50);

    p.fill(0);
    p.textSize(16);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('P = ' + elementoAtual.protons, p.width / 2, p.height / 2 - 10);
    p.text('N = ' + Math.round(elementoAtual.protons * 1.2), p.width / 2, p.height / 2 + 10);

    // Desenhando as camadas com linhas tracejadas
    drawDottedLine(70);
    drawDottedLine(100);
    drawDottedLine(130);

    // Desenhando os elétrons nas camadas
    drawElectrons(electronsLayer1, 70, 2);
    drawElectrons(electronsLayer2, 100, 8);
    drawElectrons(electronLayer3, 130, 18);

    // Atualizando as posições dos elétrons
    moveElectronsLayer(electronsLayer1, speedLayer1);
    moveElectronsLayer(electronsLayer2, speedLayer2);
    moveElectronsLayer(electronLayer3, speedLayer3);
  };

  // Função para criar elétrons
  function createElectron(radius, angle) {
    let x = p.width / 2 + radius * p.cos(angle);
    let y = p.height / 2 + radius * p.sin(angle);
    return { x: x, y: y, angle: angle, radius: radius };
  }

  // Função para desenhar os elétrons
  function drawElectrons(electronArray, radius, numElectrons) {
    for (let e of electronArray) {
      p.fill(0, 0, 255);  // Cor azul para os elétrons
      p.ellipse(e.x, e.y, 12, 12);
    }
  }

  // Função para desenhar a linha tracejada de cada camada
  function drawDottedLine(radius) {
    p.stroke(0);
    p.strokeWeight(1);
    p.noFill();
    p.drawingContext.setLineDash([5, 5]); // Estilo de linha tracejada
    p.ellipse(p.width / 2, p.height / 2, radius * 2, radius * 2);
    p.drawingContext.setLineDash([]);  // Reseta para linha contínua
  }

  // Função para mover os elétrons uniformemente
  function moveElectronsLayer(electronArray, speed) {
    for (let e of electronArray) {
      e.angle += speed;
      e.x = p.width / 2 + e.radius * p.cos(e.angle);
      e.y = p.height / 2 + e.radius * p.sin(e.angle);
    }
  }
}
