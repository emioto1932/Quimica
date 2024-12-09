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

  elementSelect.innerHTML = '<option value="">Selecione um elemento</option>';
  if (group) {
    elementsByGroup[group].forEach(element => {
      const option = document.createElement("option");
      option.value = element.symbol;
      option.textContent = element.name;
      elementSelect.appendChild(option);
    });
  }
  infoTable.style.display = "none";  // Ocultar a tabela inicialmente
  if (p5Instance) {
    p5Instance.remove();  // Remover a instância de p5.js se existirem
  }
  canvasContainer.innerHTML = ''; // Limpar o contêiner
});

// Exibir informações e animação do elemento ao selecionar
elementSelect.addEventListener("change", () => {
  const elementSymbol = elementSelect.value;

  if (!elementSymbol) {
    infoTable.style.display = "none";
    return;
  }

  elementoAtual = elementSymbol;
  const properties = elementProperties[elementoAtual];

  // Exibir propriedades na tabela
  tableBody.innerHTML = `
    <tr><td>Prótons:</td><td>${properties.protons}</td></tr>
    <tr><td>Elétrons:</td><td>${properties.electrons}</td></tr>
    <tr><td>Eletronegatividade:</td><td>${properties.electronegativity}</td></tr>
  `;
  infoTable.style.display = "table"; // Exibir a tabela

  // Desenhar o modelo atômico do elemento selecionado
  if (p5Instance) {
    p5Instance.remove();  // Remover a instância anterior do p5.js
  }
  canvasContainer.innerHTML = '';
  p5Instance = new p5((p) => {
    p.setup = () => {
      p.createCanvas(400, 400);
      p.background(255);
      desenhaModeloAtomico(p, properties.protons);
    };
    
    // Função para desenhar o modelo atômico
    function desenhaModeloAtomico(p, numeroDeProtons) {
      const camadas = calcularCamadas(numeroDeProtons);
      const raio = 60;
      
      p.translate(p.width / 2, p.height / 2);
      p.stroke(0);
      p.noFill();

      // Desenhar as camadas e os elétrons
      camadas.forEach((camada, index) => {
        p.ellipse(0, 0, raio * 2 * (index + 1), raio * 2 * (index + 1));  // Desenho das camadas
        camada.forEach(el => {
          p.circle(raio * (index + 1) * Math.cos(el.angle), raio * (index + 1) * Math.sin(el.angle), 10); // Elétrons
        });
      });
    }
    


    // Função para calcular camadas de elétrons
function calcularCamadas(numProtons) {
  const camadas = [];
  const camadasMaximas = [2, 8, 18, 32]; // Sequência máxima para as camadas
  let camadaAtual = [];
  let index = 0;
  
  // Distribuir elétrons nas camadas seguindo a sequência de 2, 8, 18, 32
  for (let i = 1; i <= numProtons; i++) {
    let capacidadeDaCamada = camadasMaximas[index]; // Capacidade da camada atual
    
    // Se a camada atual estiver cheia (capacidade atingida)
    if (camadaAtual.length === capacidadeDaCamada) {
      camadas.push(camadaAtual); // Finaliza a camada atual e começa uma nova
      camadaAtual = [];
      index++; // Passa para a próxima camada
      capacidadeDaCamada = camadasMaximas[index]; // Define a nova capacidade da camada
    }

    camadaAtual.push({ angle: 2 * Math.PI * (i - 1) / capacidadeDaCamada }); // Adiciona elétron na camada
  }

  if (camadaAtual.length > 0) {
    camadas.push(camadaAtual); // Adiciona a última camada, caso tenha elétrons restantes
  }

  return camadas;
}






    
  });
});
