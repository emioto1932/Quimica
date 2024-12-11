
const groupSelect = document.getElementById("group-select");
const elementSelect = document.getElementById("element-select");
const infoTable = document.getElementById("info-table");
const tableBody = infoTable.querySelector("tbody");
const canvasContainer = document.getElementById("canvas-container"); // Novo contêiner para o canvas

let elementoAtual = null; // Variável para armazenar o elemento selecionado
let p5Instance = null; // Instância do p5.js

// Elementos químicos por grupo
const elementsByGroup = {
  "1": [
    { symbol: "H", name: "Hidrogênio" },
    { symbol: "Li", name: "Lítio" },
    { symbol: "Na", name: "Sódio" },
    { symbol: "K", name: "Potássio" },
    { symbol: "Rb", name: "Rubídio" },
    { symbol: "Cs", name: "Césio" },
    { symbol: "Fr", name: "Frâncio" }
  ],
  "2": [
    { symbol: "Be", name: "Berílio" },
    { symbol: "Mg", name: "Magnésio" },
    { symbol: "Ca", name: "Cálcio" },
    { symbol: "Sr", name: "Estrôncio" },
    { symbol: "Ba", name: "Bário" },
    { symbol: "Ra", name: "Radônio" }
  ],
  "13": [
    { symbol: "B", name: "Boro" },
    { symbol: "Al", name: "Alumínio" },
    { symbol: "Ga", name: "Gálio" },
    { symbol: "In", name: "Índio" },
    { symbol: "Tl", name: "Talio" }
  ],
  "14": [
    { symbol: "C", name: "Carbono" },
    { symbol: "Si", name: "Silício" },
    { symbol: "Ge", name: "Germânio" },
    { symbol: "Sn", name: "Estanho" },
    { symbol: "Pb", name: "Chumbo" }
  ],
  "15": [
    { symbol: "N", name: "Nitrogênio" },
    { symbol: "P", name: "Fósforo" },
    { symbol: "As", name: "Arsênio" },
    { symbol: "Sb", name: "Antimônio" },
    { symbol: "Bi", name: "Bismuto" }
  ],
  "16": [
    { symbol: "O", name: "Oxigênio" },
    { symbol: "S", name: "Enxofre" },
    { symbol: "Se", name: "Selênio" },
    { symbol: "Te", name: "Telúrio" },
    { symbol: "Po", name: "Polônio" }
  ],
  "17": [
    { symbol: "F", name: "Flúor" },
    { symbol: "Cl", name: "Cloro" },
    { symbol: "Br", name: "Bromo" },
    { symbol: "I", name: "Iodo" },
    { symbol: "At", name: "Ástato" }
  ],
  "18": [
    { symbol: "He", name: "Hélio" },
    { symbol: "Ne", name: "Neônio" },
    { symbol: "Ar", name: "Argônio" },
    { symbol: "Kr", name: "Cripton" },
    { symbol: "Xe", name: "Xenônio" },
    { symbol: "Rn", name: "Radônio" }
  ]
};

// Propriedades dos elementos (adicionando os novos elementos)
const elementProperties = {
  "H": { protons: 1, electrons: 1, electronegativity: 2.2 },
  "Li": { protons: 3, electrons: 3, electronegativity: 0.98 },
  "Na": { protons: 11, electrons: 11, electronegativity: 0.93 },
  "K": { protons: 19, electrons: 19, electronegativity: 0.82 },
  "Rb": { protons: 37, electrons: 37, electronegativity: 0.82 },
  "Cs": { protons: 55, electrons: 55, electronegativity: 0.79 },
  "Fr": { protons: 87, electrons: 87, electronegativity: 0.7 },
  "Be": { protons: 4, electrons: 4, electronegativity: 1.57 },
  "Mg": { protons: 12, electrons: 12, electronegativity: 1.31 },
  "Ca": { protons: 20, electrons: 20, electronegativity: 1.0 },
  "Sr": { protons: 38, electrons: 38, electronegativity: 0.95 },
  "Ba": { protons: 56, electrons: 56, electronegativity: 0.89 },
  "Ra": { protons: 88, electrons: 88, electronegativity: 0.9 },
  "B": { protons: 5, electrons: 5, electronegativity: 2.04 },
  "Al": { protons: 13, electrons: 13, electronegativity: 1.61 },
  "Ga": { protons: 31, electrons: 31, electronegativity: 1.81 },
  "In": { protons: 49, electrons: 49, electronegativity: 1.78 },
  "Tl": { protons: 81, electrons: 81, electronegativity: 1.62 },
  "C": { protons: 6, electrons: 6, electronegativity: 2.55 },
  "Si": { protons: 14, electrons: 14, electronegativity: 1.9 },
  "Ge": { protons: 32, electrons: 32, electronegativity: 2.01 },
  "Sn": { protons: 50, electrons: 50, electronegativity: 1.96 },
  "Pb": { protons: 82, electrons: 82, electronegativity: 2.33 },
  "N": { protons: 7, electrons: 7, electronegativity: 3.04 },
  "P": { protons: 15, electrons: 15, electronegativity: 2.19 },
  "As": { protons: 33, electrons: 33, electronegativity: 2.18 },
  "Sb": { protons: 51, electrons: 51, electronegativity: 2.05 },
  "Bi": { protons: 83, electrons: 83, electronegativity: 2.02 },
  "O": { protons: 8, electrons: 8, electronegativity: 3.44 },
  "S": { protons: 16, electrons: 16, electronegativity: 2.58 },
  "Se": { protons: 34, electrons: 34, electronegativity: 2.55 },
  "Te": { protons: 52, electrons: 52, electronegativity: 2.1 },
  "Po": { protons: 84, electrons: 84, electronegativity: 2.0 },
  "F": { protons: 9, electrons: 9, electronegativity: 3.98 },
  "Cl": { protons: 17, electrons: 17, electronegativity: 3.16 },
  "Br": { protons: 35, electrons: 35, electronegativity: 2.96 },
  "I": { protons: 53, electrons: 53, electronegativity: 2.66 },
  "At": { protons: 85, electrons: 85, electronegativity: 2.2 },
  "He": { protons: 2, electrons: 2, electronegativity: "N/A" },
  "Ne": { protons: 10, electrons: 10, electronegativity: "N/A" },
  "Ar": { protons: 18, electrons: 18, electronegativity: "N/A" },
  "Kr": { protons: 36, electrons: 36, electronegativity: "N/A" },
  "Xe": { protons: 54, electrons: 54, electronegativity: "N/A" },
  "Rn": { protons: 86, electrons: 86, electronegativity: "N/A" }
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
  p5Instance = new p5(sketch, canvasContainer); // Passando o contêiner como o segundo parâmetro
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


const calculateLayers = (electrons) => {
  const maxPerLayer = [2, 8, 18, 32, 32, 18, 8]; // Máximo de elétrons por camada
  const divisibleValues = [8, 18, 32]; // Valores possíveis para cada camada
  const layers = [];
  let remainingElectrons = electrons;

  for (let i = 0; i < maxPerLayer.length && remainingElectrons > 0; i++) {
    let electronsInLayer = Math.min(remainingElectrons, maxPerLayer[i]);

    // Se a camada for de camada 3 ou mais, aplica a nova regra
    if (i >= 2 && remainingElectrons > 0) {
      // Encontra o maior valor de divisibleValues que seja menor ou igual ao máximo permitido para a camada atual
      for (let j = divisibleValues.length - 1; j >= 0; j--) {
        if (divisibleValues[j] <= maxPerLayer[i] && remainingElectrons >= divisibleValues[j]) {
          electronsInLayer = divisibleValues[j];
          break;
        }
      }
    }

    layers.push({
      radius: 50 + i * 30, // Raio da camada (ajustável)
      electrons: Array(electronsInLayer).fill(0) // Elétrons na camada
    });

    remainingElectrons -= electronsInLayer;
  }

  // Se ainda restarem elétrons, eles vão para a camada seguinte
  if (remainingElectrons > 0) {
    layers.push({
      radius: 50 + layers.length * 30,
      electrons: Array(remainingElectrons).fill(0)
    });
  }

  return layers;
};

