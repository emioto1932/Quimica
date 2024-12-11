const groupSelect = document.getElementById("group-select");
const elementSelect = document.getElementById("element-select");
const infoTable = document.getElementById("info-table");
const tableBody = infoTable.querySelector("tbody");
const canvasContainer = document.getElementById("canvas-container");
const electronDistribution = document.getElementById("electron-distribution"); // Novo elemento para mostrar a distribuição eletrônica

let elementoAtual = null; // Variável para armazenar o elemento selecionado
let p5Instance = null; // Instância do p5.js

// Elementos químicos por grupo
const elementsByGroup = {
  // Adicione todos os grupos e elementos aqui como já está no seu código.
};

// Propriedades dos elementos (adicionando os novos elementos)
const elementProperties = {
  // Adicione as propriedades dos elementos aqui como já está no seu código.
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

  if (!element) return;

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
  p5Instance = new p5(sketch, canvasContainer); // Passando o contêiner como o segundo parâmetro

  // Exibir a distribuição de elétrons abaixo da animação
  displayElectronDistribution(elementoAtual.electrons);
});

// Função de animação com p5.js
const sketch = (p) => {
  let layers = [];

  p.setup = () => {
    p.createCanvas(400, 400);
    layers = calculateLayers(elementoAtual.protons); // Calcular camadas para a distribuição de elétrons
  };

  p.draw = () => {
    p.background(255);
    p.translate(p.width / 2, p.height / 2);

    // Desenhar núcleo
    p.fill(255, 165, 0);
    p.ellipse(0, 0, 50, 50);
    p.fill(0);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(`P=${elementoAtual.protons}`, 0, -10);
    p.text(`N=${Math.round(elementoAtual.protons * 1.2)}`, 0, 10);

    // Desenhar camadas e elétrons
    layers.forEach((layer, index) => {
      p.noFill();
      p.stroke(0);
      p.ellipse(0, 0, layer.radius * 2, layer.radius * 2);

      layer.electrons.forEach((e, i) => {
        const angle = p.frameCount * 0.01 + (i * p.TWO_PI) / layer.electrons.length;
        const x = layer.radius * Math.cos(angle);
        const y = layer.radius * Math.sin(angle);

        p.fill(0, 0, 255);
        p.ellipse(x, y, 12, 12); // Desenha o elétron
      });
    });
  };
};

// Função para calcular as camadas de acordo com o número de elétrons
const calculateLayers = (electrons) => {
  const maxPerLayer = [2, 8, 18, 32, 32, 18, 8];
  const layers = [];
  let remainingElectrons = electrons;

  for (let i = 0; i < maxPerLayer.length && remainingElectrons > 0; i++) {
    let electronsInLayer = Math.min(remainingElectrons, maxPerLayer[i]);
    layers.push({
      radius: 50 + i * 30,
      electrons: Array(electronsInLayer).fill(0)
    });
    remainingElectrons -= electronsInLayer;
  }

  return layers;
};

// Função para exibir a distribuição de elétrons
const displayElectronDistribution = (electrons) => {
  const maxPerLayer = [2, 8, 18, 32, 32, 18, 8]; // Máximo de elétrons por camada
  let remainingElectrons = electrons;
  let distribution = "";

  // Calcula a distribuição por camada
  for (let i = 0; i < maxPerLayer.length && remainingElectrons > 0; i++) {
    let electronsInLayer = Math.min(remainingElectrons, maxPerLayer[i]);
    distribution += `${String.fromCharCode(75 + i)} = ${electronsInLayer}, `;
    remainingElectrons -= electronsInLayer;
  }

  // Atualiza o texto da distribuição de elétrons no HTML
  electronDistribution.textContent = `Distribuição Eletrônica - Número de elétrons por camada: ${distribution.slice(0, -2)}`;
};
