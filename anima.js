 

const groupSelect = document.getElementById("group-select"); 

const elementSelect = document.getElementById("element-select"); 

const infoTable = document.getElementById("info-table"); 

const tableBody = infoTable.querySelector("tbody"); 

const canvasContainer = document.getElementById("canvas-container"); // Novo contêiner para o canvas 

  

let elementoAtual = null; // Variável para armazenar o elemento selecionado 

let p5Instance = null; // Instância do p5.js 


const exibirComVirgula = (valor) => {
  // Converte o valor para número (removendo zeros à direita) e depois substitui o ponto por vírgula
  return parseFloat(valor).toString().replace('.', ',');
};


  

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

'H': {
    protons: 1,
    numeroProtons: 1,
    electrons: 1,
    massaAtomica: 1.008,
    numeroNeutrons: 0,
    raioAtomico: 53,
    categoria: 'Não-metal',
    electronegativity: 2.20,
    temperaturaFusao: -259.16,
    temperaturaEbulicao: -252.87,
    densidade: 0.00008988,
    configuracaoEletronica: '1',
    energiaIonizacao: 1312
},
'Li': {
    protons: 3,
    numeroProtons: 3,
    electrons: 3,
    massaAtomica: 6.94,
    numeroNeutrons: 4,
    raioAtomico: 152,
    categoria: 'Metal alcalino',
    electronegativity: 0.98,
    temperaturaFusao: 180.54,
    temperaturaEbulicao: 1590,
    densidade: 0.534,
    configuracaoEletronica: '2, 1',
    energiaIonizacao: 520
},
'Na': {
    protons: 11,
    numeroProtons: 11,
    electrons: 11,
    massaAtomica: 22.99,
    numeroNeutrons: 12,
    raioAtomico: 186,
    categoria: 'Metal alcalino',
    electronegativity: 0.93,
    temperaturaFusao: 97.72,
    temperaturaEbulicao: 883,
    densidade: 0.971,
    configuracaoEletronica: '2, 8, 1',
    energiaIonizacao: 495.8
},
'K': {
    protons: 19,
    numeroProtons: 19,
    electrons: 19,
    massaAtomica: 39.1,
    numeroNeutrons: 20,
    raioAtomico: 227,
    categoria: 'Metal alcalino',
    electronegativity: 0.82,
    temperaturaFusao: 63.38,
    temperaturaEbulicao: 759,
    densidade: 0.856,
    configuracaoEletronica: '2, 8, 8, 1',
    energiaIonizacao: 418.8
},
'Rb': {
    protons: 37,
    numeroProtons: 37,
    electrons: 37,
    massaAtomica: 85.47,
    numeroNeutrons: 48,
    raioAtomico: 303,
    categoria: 'Metal alcalino',
    electronegativity: 0.82,
    temperaturaFusao: 39.3,
    temperaturaEbulicao: 688,
    densidade: 1.532,
    configuracaoEletronica: '2, 8, 18, 1',
    energiaIonizacao: 403
},
'Cs': {
    protons: 55,
    numeroProtons: 55,
    electrons: 55,
    massaAtomica: 132.91,
    numeroNeutrons: 78,
    raioAtomico: 343,
    categoria: 'Metal alcalino',
    electronegativity: 0.79,
    temperaturaFusao: 28.44,
    temperaturaEbulicao: 687,
    densidade: 1.873,
    configuracaoEletronica: '2, 8, 18, 18, 1',
    energiaIonizacao: 375.7
},
'Fr': {
    protons: 87,
    numeroProtons: 87,
    electrons: 87,
    massaAtomica: 223,
    numeroNeutrons: 136,
    raioAtomico: 330,
    categoria: 'Metal alcalino',
    electronegativity: 0.7,
    temperaturaFusao: 27,
    temperaturaEbulicao: 650,
    densidade: 1.87,
    configuracaoEletronica: '2, 8, 18, 32, 18, 8, 1',
    energiaIonizacao: 380
},
'Be': {
    protons: 4,
    numeroProtons: 4,
    electrons: 4,
    massaAtomica: 9.01,
    numeroNeutrons: 5,
    raioAtomico: 112,
    categoria: 'Metal alcalino-terroso',
    electronegativity: 1.57,
    temperaturaFusao: 1287,
    temperaturaEbulicao: 2471,
    densidade: 1.848,
    configuracaoEletronica: '2, 2',
    energiaIonizacao: 899.5
},
'Mg': {
    protons: 12,
    numeroProtons: 12,
    electrons: 12,
    massaAtomica: 24.31,
    numeroNeutrons: 12,
    raioAtomico: 160,
    categoria: 'Metal alcalino-terroso',
    electronegativity: 1.31,
    temperaturaFusao: 650,
    temperaturaEbulicao: 1090,
    densidade: 1.738,
    configuracaoEletronica: '2, 8, 2',
    energiaIonizacao: 737.7
},
'Ca': {
    protons: 20,
    numeroProtons: 20,
    electrons: 20,
    massaAtomica: 40.08,
    numeroNeutrons: 20,
    raioAtomico: 197,
    categoria: 'Metal alcalino-terroso',
    electronegativity: 1.00,
    temperaturaFusao: 842,
    temperaturaEbulicao: 1487,
    densidade: 1.54,
    configuracaoEletronica: '2, 8, 8, 2',
    energiaIonizacao: 589.8
},
'Sr': {
    protons: 38,
    numeroProtons: 38,
    electrons: 38,
    massaAtomica: 87.62,
    numeroNeutrons: 50,
    raioAtomico: 215,
    categoria: 'Metal alcalino-terroso',
    electronegativity: 0.95,
    temperaturaFusao: 777,
    temperaturaEbulicao: 1384,
    densidade: 2.64,
    configuracaoEletronica: '2, 8, 18, 8, 2',
    energiaIonizacao: 549.5
},
'Ba': {
    protons: 56,
    numeroProtons: 56,
    electrons: 56,
    massaAtomica: 137.33,
    numeroNeutrons: 81,
    raioAtomico: 253,
    categoria: 'Metal alcalino-terroso',
    electronegativity: 0.89,
    temperaturaFusao: 725,
    temperaturaEbulicao: 1640,
    densidade: 3.62,
    configuracaoEletronica: '2, 8, 18, 18, 8, 2',
    energiaIonizacao: 503.6
},
'Ra': {
    protons: 88,
    numeroProtons: 88,
    electrons: 88,
    massaAtomica: 226,
    numeroNeutrons: 138,
    raioAtomico: 295,
    categoria: 'Metal alcalino-terroso',
    electronegativity: 0.9,
    temperaturaFusao: 700,
    temperaturaEbulicao: 1413,
    densidade: 5.5,
    configuracaoEletronica: '2, 8, 18, 32, 18, 8, 2',
    energiaIonizacao: 509.3
},
'B': {
    protons: 5,
    numeroProtons: 5,
    electrons: 5,
    massaAtomica: 10.81,
    numeroNeutrons: 6,
    raioAtomico: 85,
    categoria: 'Semimetal',
    electronegativity: 2.04,
    temperaturaFusao: 2076,
    temperaturaEbulicao: 4000,
    densidade: 2.34,
    configuracaoEletronica: '2, 3',
    energiaIonizacao: 800.6
},
'Al': {
    protons: 13,
    numeroProtons: 13,
    electrons: 13,
    massaAtomica: 26.98,
    numeroNeutrons: 14,
    raioAtomico: 143,
    categoria: 'Metal',
    electronegativity: 1.61,
    temperaturaFusao: 660.3,
    temperaturaEbulicao: 2470,
    densidade: 2.70,
    configuracaoEletronica: '2, 8, 3',
    energiaIonizacao: 577.5
},
'Ga': {
    protons: 31,
    numeroProtons: 31,
    electrons: 31,
    massaAtomica: 69.72,
    numeroNeutrons: 39,
    raioAtomico: 135,
    categoria: 'Metal',
    electronegativity: 1.81,
    temperaturaFusao: 29.76,
    temperaturaEbulicao: 2204,
    densidade: 5.91,
    configuracaoEletronica: '2, 8, 18, 3',
    energiaIonizacao: 578.8
},
'In': {
    protons: 49,
    numeroProtons: 49,
    electrons: 49,
    massaAtomica: 114.82,
    numeroNeutrons: 66,
    raioAtomico: 162,
    categoria: 'Metal',
    electronegativity: 1.78,
    temperaturaFusao: 156.6,
    temperaturaEbulicao: 2080,
    densidade: 7.31,
    configuracaoEletronica: '2, 8, 18, 18, 3',
    energiaIonizacao: 558.1
},
'Tl': {
    protons: 81,
    numeroProtons: 81,
    electrons: 81,
    massaAtomica: 204.38,
    numeroNeutrons: 123,
    raioAtomico: 196,
    categoria: 'Metal',
    electronegativity: 1.62,
    temperaturaFusao: 304,
    temperaturaEbulicao: 1473,
    densidade: 11.85,
    configuracaoEletronica: '2, 8, 18, 32, 18, 3',
    energiaIonizacao: 589.4
},
'C': {
  protons: 6,
  numeroProtons: 6,
  electrons: 6,
  massaAtomica: 12.01,
  numeroNeutrons: 6,
  raioAtomico: 70,
  categoria: 'Não-metal',
  electronegativity: 2.55,
  temperaturaFusao: 3550,
  temperaturaEbulicao: 4827,
  densidade: 2.267,
  configuracaoEletronica: '2, 4',
  energiaIonizacao: 1086.5
},
'Si': {
  protons: 14,
  numeroProtons: 14,
  electrons: 14,
  massaAtomica: 28.09,
  numeroNeutrons: 14,
  raioAtomico: 111,
  categoria: 'Semimetal',
  electronegativity: 1.90,
  temperaturaFusao: 1414,
  temperaturaEbulicao: 2900,
  densidade: 2.329,
  configuracaoEletronica: '2, 8, 4',
  energiaIonizacao: 786.5
},
'Ge': {
  protons: 32,
  numeroProtons: 32,
  electrons: 32,
  massaAtomica: 72.63,
  numeroNeutrons: 41,
  raioAtomico: 122,
  categoria: 'Semimetal',
  electronegativity: 2.01,
  temperaturaFusao: 938.3,
  temperaturaEbulicao: 2833,
  densidade: 5.323,
  configuracaoEletronica: '2, 8, 18, 4',
  energiaIonizacao: 762.5
},
'Sn': {
  protons: 50,
  numeroProtons: 50,
  electrons: 50,
  massaAtomica: 118.71,
  numeroNeutrons: 69,
  raioAtomico: 141,
  categoria: 'Metal',
  electronegativity: 1.96,
  temperaturaFusao: 231.9,
  temperaturaEbulicao: 2602,
  densidade: 7.31,
  configuracaoEletronica: '2, 8, 18, 18, 4',
  energiaIonizacao: 708.6
},
'Pb': {
  protons: 82,
  numeroProtons: 82,
  electrons: 82,
  massaAtomica: 207.2,
  numeroNeutrons: 125,
  raioAtomico: 175,
  categoria: 'Metal',
  electronegativity: 2.33,
  temperaturaFusao: 327.5,
  temperaturaEbulicao: 1740,
  densidade: 11.34,
  configuracaoEletronica: '2, 8, 18, 32, 18, 4',
  energiaIonizacao: 715.6
},
'N': {
  protons: 7,
  numeroProtons: 7,
  electrons: 7,
  massaAtomica: 14.01,
  numeroNeutrons: 7,
  raioAtomico: 65,
  categoria: 'Não-metal',
  electronegativity: 3.04,
  temperaturaFusao: -209.86,
  temperaturaEbulicao: -195.79,
  densidade: 0.00125,
  configuracaoEletronica: '2, 5',
  energiaIonizacao: 1402.3
},
'P': {
  protons: 15,
  numeroProtons: 15,
  electrons: 15,
  massaAtomica: 30.97,
  numeroNeutrons: 16,
  raioAtomico: 110,
  categoria: 'Não-metal',
  electronegativity: 2.19,
  temperaturaFusao: 44.1,
  temperaturaEbulicao: 280.5,
  densidade: 1.823,
  configuracaoEletronica: '2, 8, 5',
  energiaIonizacao: 1011.8
},
'As': {
  protons: 33,
  numeroProtons: 33,
  electrons: 33,
  massaAtomica: 74.92,
  numeroNeutrons: 42,
  raioAtomico: 114,
  categoria: 'Semimetal',
  electronegativity: 2.18,
  temperaturaFusao: 817,
  temperaturaEbulicao: 614,
  densidade: 5.776,
  configuracaoEletronica: '2, 8, 18, 5',
  energiaIonizacao: 947
},
'Sb': {
  protons: 51,
  numeroProtons: 51,
  electrons: 51,
  massaAtomica: 121.76,
  numeroNeutrons: 71,
  raioAtomico: 139,
  categoria: 'Semimetal',
  electronegativity: 2.05,
  temperaturaFusao: 630.6,
  temperaturaEbulicao: 1587,
  densidade: 6.685,
  configuracaoEletronica: '2, 8, 18, 18, 5',
  energiaIonizacao: 834.9
},
'Bi': {
  protons: 83,
  numeroProtons: 83,
  electrons: 83,
  massaAtomica: 208.98,
  numeroNeutrons: 126,
  raioAtomico: 160,
  categoria: 'Metal',
  electronegativity: 2.02,
  temperaturaFusao: 271.3,
  temperaturaEbulicao: 1564,
  densidade: 9.78,
  configuracaoEletronica: '2, 8, 18, 32, 18, 5',
  energiaIonizacao: 703
},
'O': {
  protons: 8,
  numeroProtons: 8,
  electrons: 8,
  massaAtomica: 16.00,
  numeroNeutrons: 8,
  raioAtomico: 60,
  categoria: 'Não-metal',
  electronegativity: 3.44,
  temperaturaFusao: -218.79,
  temperaturaEbulicao: -182.96,
  densidade: 0.001429,
  configuracaoEletronica: '2, 6',
  energiaIonizacao: 1313.9
},
'S': {
  protons: 16,
  numeroProtons: 16,
  electrons: 16,
  massaAtomica: 32.07,
  numeroNeutrons: 16,
  raioAtomico: 104,
  categoria: 'Não-metal',
  electronegativity: 2.58,
  temperaturaFusao: 115.21,
  temperaturaEbulicao: 444.6,
  densidade: 2.067,
  configuracaoEletronica: '2, 8, 6',
  energiaIonizacao: 999.6
},
'Se': {
  protons: 34,
  numeroProtons: 34,
  electrons: 34,
  massaAtomica: 78.96,
  numeroNeutrons: 45,
  raioAtomico: 120,
  categoria: 'Não-metal',
  electronegativity: 2.55,
  temperaturaFusao: 221,
  temperaturaEbulicao: 684.9,
  densidade: 4.79,
  configuracaoEletronica: '2, 8, 18, 6',
  energiaIonizacao: 941.0
},
'Te': {
  protons: 52,
  numeroProtons: 52,
  electrons: 52,
  massaAtomica: 127.60,
  numeroNeutrons: 76,
  raioAtomico: 138,
  categoria: 'Semimetal',
  electronegativity: 2.01,
  temperaturaFusao: 450,
  temperaturaEbulicao: 988,
  densidade: 6.24,
  configuracaoEletronica: '2, 8, 18, 18, 6',
  energiaIonizacao: 869.3
},
'Po': {
  protons: 84,
  numeroProtons: 84,
  electrons: 84,
  massaAtomica: 209,
  numeroNeutrons: 125,
  raioAtomico: 140,
  categoria: 'Metal',
  electronegativity: 2.0,
  temperaturaFusao: 254,
  temperaturaEbulicao: 962,
  densidade: 9.32,
  configuracaoEletronica: '2, 8, 18, 32, 18, 6',
  energiaIonizacao: 813.1
},
'F': {
  protons: 9,
  numeroProtons: 9,
  electrons: 9,
  massaAtomica: 18.998,
  numeroNeutrons: 10,
  raioAtomico: 64,
  categoria: 'Não-metal',
  electronegativity: 3.98,
  temperaturaFusao: -219.67,
  temperaturaEbulicao: -188.12,
  densidade: 0.001696,
  configuracaoEletronica: '2, 7',
  energiaIonizacao: 1681
},
'Cl': {
  protons: 17,
  numeroProtons: 17,
  electrons: 17,
  massaAtomica: 35.45,
  numeroNeutrons: 18,
  raioAtomico: 99,
  categoria: 'Não-metal',
  electronegativity: 3.16,
  temperaturaFusao: -101.5,
  temperaturaEbulicao: -34.04,
  densidade: 0.003214,
  configuracaoEletronica: '2, 8, 7',
  energiaIonizacao: 1251.2
},
'Br': {
  protons: 35,
  numeroProtons: 35,
  electrons: 35,
  massaAtomica: 79.90,
  numeroNeutrons: 45,
  raioAtomico: 114,
  categoria: 'Não-metal',
  electronegativity: 2.96,
  temperaturaFusao: -7.2,
  temperaturaEbulicao: 58.8,
  densidade: 3.12,
  configuracaoEletronica: '2, 8, 18, 7',
  energiaIonizacao: 1139.9
},
'I': {
  protons: 53,
  numeroProtons: 53,
  electrons: 53,
  massaAtomica: 126.90,
  numeroNeutrons: 74,
  raioAtomico: 140,
  categoria: 'Halogênio',
  electronegativity: 2.66,
  temperaturaFusao: 113.7,
  temperaturaEbulicao: 184.3,
  densidade: 4.933,
  configuracaoEletronica: '2, 8, 18, 18, 7',
  energiaIonizacao: 1008.4
},
'At': {
  protons: 85,
  numeroProtons: 85,
  electrons: 85,
  massaAtomica: 210,
  numeroNeutrons: 125,
  raioAtomico: 150,
  categoria: 'Halogênio',
  electronegativity: 2.2,
  temperaturaFusao: 302,
  temperaturaEbulicao: 337,
  densidade: 6.17,
  configuracaoEletronica: '2, 8, 18, 32, 18, 7',
  energiaIonizacao: 897.91
},
'He': {
  protons: 2,
  numeroProtons: 2,
  electrons: 2,
  massaAtomica: 4.0026,
  numeroNeutrons: 2,
  raioAtomico: 31,
  categoria: 'Gás nobre',
  electronegativity: 0,
  temperaturaFusao: -272.2,
  temperaturaEbulicao: -268.93,
  densidade: 0.0001786,
  configuracaoEletronica: '2',
  energiaIonizacao: 2372.3
},
'Ne': {
  protons: 10,
  numeroProtons: 10,
  electrons: 10,
  massaAtomica: 20.18,
  numeroNeutrons: 10,
  raioAtomico: 38,
  categoria: 'Gás nobre',
  electronegativity: 0,
  temperaturaFusao: -248.59,
  temperaturaEbulicao: -246.05,
  densidade: 0.0008999,
  configuracaoEletronica: '2, 8',
  energiaIonizacao: 2080.7
},
'Ar': {
  protons: 18,
  numeroProtons: 18,
  electrons: 18,
  massaAtomica: 39.95,
  numeroNeutrons: 22,
  raioAtomico: 71,
  categoria: 'Gás nobre',
  electronegativity: 0,
  temperaturaFusao: -189.35,
  temperaturaEbulicao: -185.85,
  densidade: 0.0017837,
  configuracaoEletronica: '2, 8, 8',
  energiaIonizacao: 1520.6
},
'Kr': {
  protons: 36,
  numeroProtons: 36,
  electrons: 36,
  massaAtomica: 83.80,
  numeroNeutrons: 48,
  raioAtomico: 88,
  categoria: 'Gás nobre',
  electronegativity: 0,
  temperaturaFusao: -157.36,
  temperaturaEbulicao: -153.22,
  densidade: 0.003733,
  configuracaoEletronica: '2, 8, 18, 8',
  energiaIonizacao: 1350.8
},
'Xe': {
  protons: 54,
  numeroProtons: 54,
  electrons: 54,
  massaAtomica: 131.29,
  numeroNeutrons: 77,
  raioAtomico: 108,
  categoria: 'Gás nobre',
  electronegativity: 0,
  temperaturaFusao: -111.8,
  temperaturaEbulicao: -108.1,
  densidade: 0.0055,
  configuracaoEletronica: '2, 8, 18, 18, 8',
  energiaIonizacao: 1170.4
},
'Rn': {
  protons: 86,
  numeroProtons: 86,
  electrons: 86,
  massaAtomica: 222,
  numeroNeutrons: 136,
  raioAtomico: 140,
  categoria: 'Gás nobre',
  electronegativity: 0,
  temperaturaFusao: -71,
  temperaturaEbulicao: -61.8,
  densidade: 0.00973,
  configuracaoEletronica: '2, 8, 18, 32, 18, 8',
  energiaIonizacao: 1037.7
}

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

    <tr><td>
   <a href="#" id="linkNumeroAtomico">Número atômico ou Número de Prótons (carga +)</a></td><td id="numProtons">${elementoAtual.protons}</td><td>Categoria</td><td>${elementoAtual.categoria}</td></tr> 

    <tr><td>Número de Elétrons (carga -)</td><td>${elementoAtual.electrons}</td><td>Eletronegatividade (escala de Pauling)</td><td>${exibirComVirgula(elementoAtual.electronegativity)}</td></tr> 

    <tr><td>Massa atômica relativa (u)</td><td>${exibirComVirgula(elementoAtual.massaAtomica)}</td><td>Temperatura de fusão (ºC)</td><td>${exibirComVirgula(elementoAtual.temperaturaFusao)}</td></tr> 
    <tr><td>Número de Neutrons (u )</td><td id="neutrons">${elementoAtual.numeroNeutrons}</td><td>Temperatura de ebulição  (ºC)</td><td>${exibirComVirgula(elementoAtual.temperaturaEbulicao)}</td></tr> 

    <tr><td>Raio atômico (pm  ou picômetros)</td><td>${elementoAtual.raioAtomico}</td><td>1ª Energia de ionização (kJ/mol)</td><td>${exibirComVirgula(elementoAtual.energiaIonizacao)}</td></tr> 
   <tr><td>Configuração Eletrônica (K L M N O P Q)</td><td>${elementoAtual.configuracaoEletronica}</td>
   <td> <a href="objeto.html?propriedade=densidade">Densidade (g/cm³)</a></td><td>${exibirComVirgula(elementoAtual.densidade)}</td></tr> 

// Adiciona um ouvinte de evento para o clique no link
document.getElementById("linkNumeroAtomico").addEventListener("click", function(e) {
    e.preventDefault(); // Previne o comportamento padrão do link

    // Recupera os valores de numProtons e numNeutrons da tabela
    let numProtons = document.getElementById("numProtons").textContent;
    let numNeutrons = document.getElementById("numNeutrons").textContent;

    // Cria a URL com os parâmetros de numProtons e numNeutrons
    let url = "numero-atomico.html?numProtons=" + numProtons + "&numNeutrons=" + numNeutrons;

    // Redireciona para a página numero-atomico.html
    window.location.href = url;
});


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

    p.text(`P=${elementoAtual.protons}+`, 0, -10); 

    p.text(`N=${elementoAtual.numeroNeutrons}`, 0, 10); 

  

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


document.getElementById("group-select").addEventListener("change", function() {
  var selectedGroup = this.value;
  var groupImage = document.getElementById("group-image");

  // Ocultar a imagem inicialmente
  groupImage.style.display = "none";

  // Verifica o grupo selecionado e atualiza a imagem correspondente
  switch (selectedGroup) {
    case "1":
      groupImage.src = "img/grupo01.jpg";
      break;
    case "2":
      groupImage.src = "img/grupo02.jpg";
      break;
    case "13":
      groupImage.src = "img/grupo13.jpg";
      break;
    case "14":
      groupImage.src = "img/grupo14.jpg";
      break;
    case "15":
      groupImage.src = "img/grupo15.jpg";
      break;
    case "16":
      groupImage.src = "img/grupo16.jpg";
      break;
    case "17":
      groupImage.src = "img/grupo17.jpg";
      break;
    case "18":
      groupImage.src = "img/grupo18.jpg";
      break;
    default:
      groupImage.src = "";
      break;
  }

  // Exibe a imagem se um grupo for selecionado
  if (groupImage.src !== "") {
    groupImage.style.display = "block";
  }
});


// pergunta e resposta sobre os grupos cima para baixo
    function mostrarResposta(id) {
      const resposta = document.getElementById(id);
      resposta.style.display = resposta.style.display === 'block' ? 'none' : 'block';
    }
 
