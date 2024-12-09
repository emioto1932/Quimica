const groupSelect = document.getElementById("group-select");
const elementSelect = document.getElementById("element-select");
const confirmButton = document.getElementById("confirm-button");
const infoTable = document.getElementById("info-table");
const tableBody = infoTable.querySelector("tbody");

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
  
  // Resetar o select de elementos
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
    confirmButton.disabled = true;
  }
});

// Habilitar o botão de confirmar ao selecionar um elemento
elementSelect.addEventListener("change", () => {
  confirmButton.disabled = !elementSelect.value;
});

// Mostrar tabela e animação ao clicar em Confirmar
confirmButton.addEventListener("click", () => {
  const element = elementSelect.value;
  elementoAtual = elementProperties[element]; // Atualizar o elemento atual

  // Preencher a tabela com as propriedades do elemento
  tableBody.innerHTML = `
    <tr><td>Número de Prótons</td><td>+${elementoAtual.protons}</td></tr>
    <tr><td>Número de Elétrons</td><td>${elementoAtual.electrons}</td></tr>
    <tr><td>Eletronegatividade</td><td>${elementoAtual.electronegativity}</td></tr>
  `;
  
  // Exibir a tabela
  infoTable.classList.remove("hidden");

  // Reiniciar a animação com o p5.js
  if (p5Instance) {
    p5Instance.remove(); // Remover a instância anterior
  }

  // Criar uma nova instância do p5.js
  p5Instance = new p5(sketch);
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

  // Função para calcular as camadas de distribuição de elétrons
  const calculateLayers = (protons) => {
    const config = [2, 8, 18]; // Camadas de distribuição de elétrons
    let remaining = protons;
    let radius = 70;
    let result = [];

    config.forEach((max, i) => {
      const count = Math.min(remaining, max);
      result.push({ radius, electrons: new Array(count).fill(0) });
      remaining -= count; 
      radius += 30; });
    return result;
  }; };
