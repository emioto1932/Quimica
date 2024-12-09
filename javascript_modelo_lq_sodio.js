const groupSelect = document.getElementById("group-select");
const elementSelect = document.getElementById("element-select");
const confirmButton = document.getElementById("confirm-button");
const infoTable = document.getElementById("info-table");
const tableBody = infoTable.querySelector("tbody");

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

groupSelect.addEventListener("change", () => {
  const group = groupSelect.value;

  // Limpa a lista de elementos e desativa o botão de confirmação
  elementSelect.innerHTML = '<option value="">-- Selecione um Elemento --</option>';
  elementSelect.disabled = true; // Inicialmente desativado
  confirmButton.disabled = true; // Também desativado inicialmente

  if (group && elementsByGroup[group]) {
    elementSelect.disabled = false; // Ativa o menu de seleção de elementos
    elementsByGroup[group].forEach(({ symbol, name }) => {
      const option = document.createElement("option");
      option.value = symbol;
      option.textContent = `${name} (${symbol})`;
      elementSelect.appendChild(option);
    });
  }
});

// Ativar o botão de confirmação ao escolher um elemento
elementSelect.addEventListener("change", () => {
  if (elementSelect.value) {
    confirmButton.disabled = false; // Ativa o botão de confirmação
  } else {
    confirmButton.disabled = true; // Desativa se nenhuma opção for selecionada
  }
});

// Lógica para exibir os dados e iniciar a animação
confirmButton.addEventListener("click", () => {
  const selectedElement = elementSelect.value;

  if (!selectedElement) return;

  const elementData = elements.find(el => el.symbol === selectedElement);

  if (elementData) {
    const tableContainer = document.getElementById("data-table");
    tableContainer.innerHTML = `
      <table border="1">
        <tr><th>Propriedade</th><th>Valor</th></tr>
        <tr><td>Número de Prótons</td><td>P = ${elementData.protons}+</td></tr>
        <tr><td>Número de Elétrons</td><td>E = ${elementData.protons}-</td></tr>
        <tr><td>Eletronegatividade</td><td>${elementData.electronegativity.toFixed(1)}</td></tr>
      </table>
    `;
    // Chamar a função para configurar e iniciar a animação
    setupAnimation(elementData);
  }
});
