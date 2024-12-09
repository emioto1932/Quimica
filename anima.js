<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Elementos Químicos</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.min.js"></script>
  <style>
    .hidden { display: none; }
    #canvas-container { margin-top: 20px; }
  </style>
</head>
<body>
  <h1>Seleção de Elementos Químicos</h1>

  <label for="group-select">Selecione um Grupo:</label>
  <select id="group-select">
    <option value="">-- Selecione um Grupo --</option>
    <option value="1">Grupo 1</option>
    <option value="2">Grupo 2</option>
    <option value="13">Grupo 13</option>
    <option value="14">Grupo 14</option>
    <option value="15">Grupo 15</option>
    <option value="16">Grupo 16</option>
    <option value="17">Grupo 17</option>
    <option value="18">Grupo 18</option>
  </select>

  <label for="element-select">Selecione um Elemento:</label>
  <select id="element-select" disabled>
    <option value="">-- Selecione um Elemento --</option>
  </select>

  <table id="info-table" class="hidden" border="1">
    <thead>
      <tr>
        <th>Propriedade</th>
        <th>Valor</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>

  <div id="canvas-container"></div>

  <script>
    const groupSelect = document.getElementById("group-select");
    const elementSelect = document.getElementById("element-select");
    const infoTable = document.getElementById("info-table");
    const tableBody = infoTable.querySelector("tbody");
    const canvasContainer = document.getElementById("canvas-container");

    let elementoAtual = null; // Variável para armazenar o elemento selecionado
    let p5Instance = null; // Instância do p5.js

    // Elementos químicos por grupo
    const elementsByGroup = {
      "1": [ { symbol: "H", name: "Hidrogênio" }, { symbol: "Li", name: "Lítio" } ],
      "2": [ { symbol: "Be", name: "Berílio" }, { symbol: "Mg", name: "Magnésio" } ],
      "13": [ { symbol: "B", name: "Boro" }, { symbol: "Al", name: "Alumínio" } ],
      "14": [ { symbol: "C", name: "Carbono" }, { symbol: "Si", name: "Silício" } ],
      "15": [ { symbol: "N", name: "Nitrogênio" }, { symbol: "P", name: "Fósforo" } ],
      "16": [ { symbol: "O", name: "Oxigênio" }, { symbol: "S", name: "Enxofre" } ],
      "17": [ { symbol: "F", name: "Flúor" }, { symbol: "Cl", name: "Cloro" } ],
      "18": [ { symbol: "He", name: "Hélio" }, { symbol: "Ne", name: "Neônio" } ]
    };

    // Propriedades dos elementos
    const elementProperties = {
      "H": { protons: 1, electrons: 1, electronegativity: 2.2 },
      "Li": { protons: 3, electrons: 3, electronegativity: 0.98 },
      "Be": { protons: 4, electrons: 4, electronegativity: 1.57 },
      "Mg": { protons: 12, electrons: 12, electronegativity: 1.31 },
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

    // Atualizar tabela e iniciar animação
    elementSelect.addEventListener("change", () => {
      const element = elementSelect.value;
      if (!element) return;
      elementoAtual = elementProperties[element];
      tableBody.innerHTML = `
        <tr><td>Número de Prótons</td><td>+${elementoAtual.protons}</td></tr>
        <tr><td>Número de Elétrons</td><td>${elementoAtual.electrons}</td></tr>
        <tr><td>Eletronegatividade</td><td>${elementoAtual.electronegativity}</td></tr>
      `;
      infoTable.classList.remove("hidden");
      if (p5Instance) p5Instance.remove();
      p5Instance = new p5(sketch, canvasContainer);
    });

    // Função de animação
    const sketch = (p) => {
      let layers = [];

      p.setup = () => {
        p.createCanvas(400, 400);
        layers = calcularCamadas(elementoAtual.electrons);
      };

      p.draw = () => {
        p.background(255);
        p.translate(p.width / 2, p.height / 2);
        p.fill(255, 165, 0);
        p.ellipse(0, 0, 50, 50);
        layers.forEach((layer, i) => {
          p.noFill();
          p.ellipse(0, 0, layer * 50, layer * 50);
        });
      };

      function calcularCamadas(eletrons) {
        const camadas = [];
        let restante = eletrons;
        const maxPorCamada = [2, 8, 18];
        for (let i = 0; i < maxPorCamada.length && restante > 0; i++) {
          const camada = Math.min(restante, maxPorCamada[i]);
          camadas.push(camada);
          restante -= camada;
        }
        return camadas;
      }
    };
  </script>
</body>
</html>
