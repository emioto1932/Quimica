
document.addEventListener("DOMContentLoaded", function() {
  // Referências aos elementos HTML
  const groupSelect = document.getElementById("group-select");
  const elementSelect = document.getElementById("element-select");
  const confirmButton = document.getElementById("confirm-button");

  // Dados de exemplo para os elementos de cada grupo
  const elementsByGroup = {
    1: ["Hidrogênio", "Lítio", "Sódio"],
    2: ["Berílio", "Magnésio", "Cálcio"],
    13: ["Boro", "Alumínio", "Gálio"],
    14: ["Carbono", "Silício", "Germânio"],
    15: ["Nitrogênio", "Fósforo", "Arsênio"],
    16: ["Oxigênio", "Enxofre", "Selênio"],
    17: ["Flúor", "Cloro", "Bromo"],
    18: ["Hélio", "Neônio", "Argônio"]
  };

  // Evento para quando um grupo for selecionado
  groupSelect.addEventListener("change", () => {
    const selectedGroup = groupSelect.value;

    if (selectedGroup) {
      // Popula o select de elementos com base no grupo selecionado
      populateElementSelect(selectedGroup);

      // Ativa o select de elementos
      elementSelect.disabled = false;
    } else {
      // Se nenhum grupo for selecionado, desativa o select de elementos
      elementSelect.disabled = true;
      elementSelect.innerHTML = `<option value="">-- Selecione um Elemento --</option>`;
    }

    // Sempre desativa o botão de confirmação até um elemento ser selecionado
    confirmButton.disabled = true;
  });

  // Evento para quando um elemento for selecionado
  elementSelect.addEventListener("change", () => {
    // Habilita o botão de confirmação se um elemento for selecionado
    confirmButton.disabled = !elementSelect.value;
  });

  // Função para preencher o select de elementos com base no grupo selecionado
  function populateElementSelect(group) {
    const elements = elementsByGroup[group] || [];
    elementSelect.innerHTML = `<option value="">-- Selecione um Elemento --</option>`;

    elements.forEach((element) => {
      const option = document.createElement("option");
      option.value = element;
      option.textContent = element;
      elementSelect.appendChild(option);
    });
  }
});
