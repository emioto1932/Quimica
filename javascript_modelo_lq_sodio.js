// Referências aos elementos do DOM
const groupSelect = document.getElementById("group-select");
const elementSelect = document.getElementById("element-select");
const confirmButton = document.getElementById("confirm-button");
const tableContainer = document.getElementById("data-table");

// Dados da tabela periódica por grupo
const elementsByGroup = {
  1: [
    { symbol: "H", name: "Hidrogênio", protons: 1, electronegativity: 2.1 },
    { symbol: "Li", name: "Lítio", protons: 3, electronegativity: 1.0 },
    { symbol: "Na", name: "Sódio", protons: 11, electronegativity: 0.9 },
  ],
  2: [
    { symbol: "Be", name: "Berílio", protons: 4, electronegativity: 1.5 },
    { symbol: "Mg", name: "Magnésio", protons: 12, electronegativity: 1.2 },
    { symbol: "Ca", name: "Cálcio", protons: 20, electronegativity: 1.0 },
  ],
  // Outros grupos podem ser adicionados aqui
};

// Lógica para manipular a seleção de grupo
groupSelect.addEventListener("change", () => {
  const group = groupSelect.value;

  // Limpa e desativa os controles ao trocar o grupo
  elementSelect.innerHTML = '<option value="">-- Selecione um Elemento --</option>';
  elementSelect.disabled = true;
  confirmButton.disabled = true;

  if (group && elementsByGroup[group]) {
    // Popula o menu de elementos com os dados do grupo selecionado
    elementSelect.disabled = false; // Ativa o menu de elementos
    elementsByGroup[group].forEach(({ symbol, name }) => {
      const option = document.createElement("option");
      option.value = symbol;
      option.textContent = `${name} (${symbol})`;
      elementSelect.appendChild(option);
    });
  }
});

// Lógica para ativar o botão de confirmação ao escolher um elemento
elementSelect.addEventListener("change", () => {
  confirmButton.disabled = !elementSelect.value; // Ativa/desativa dinamicamente
});

// Lógica para exibir os dados do elemento escolhido e iniciar a animação
confirmButton.addEventListener("click", () => {
  const selectedElement = elementSelect.value;

  if (!selectedElement) return;

  // Procura os dados do elemento selecionado
  const group = groupSelect.value;
  const elementData = elementsByGroup[group].find(el => el.symbol === selectedElement);

  if (elementData) {
    // Renderiza a tabela com as propriedades
    tableContainer.innerHTML = `
      <table border="1">
        <tr><th>Propriedade</th><th>Valor</th></tr>
        <tr><td>Número de Prótons</td><td>P = ${elementData.protons}+</td></tr>
        <tr><td>Número de Elétrons</td><td>E = ${elementData.protons}-</td></tr>
        <tr><td>Eletronegatividade</td><td>${elementData.electronegativity.toFixed(1)}</td></tr>
      </table>
    `;

    // Chama a função para configurar e iniciar a animação do modelo
    setupAnimation(elementData);
  }
});

// Função para iniciar a animação com base nos dados do elemento
function setupAnimation(elementData) {
  console.log(`Iniciando animação para o elemento ${elementData.name} (${elementData.symbol})`);
  // Substitua por sua lógica de animação
}
