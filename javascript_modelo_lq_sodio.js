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

  if
