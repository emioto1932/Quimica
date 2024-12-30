let raio = 60; // Raio do "círculo" em que as partículas vão estar localizadas
//let numProtons = 80;  // Número de prótons
//let numNeutrons = 120; // Número de nêutrons
let deslocamento = raio * 0.4; // Deslocamento de 40% do raio para as partículas
let particles = []; // Lista para armazenar as partículas

let vezProton = true; // Controla quando é a vez de adicionar um próton
let vezNeutron = false; // Controla quando é a vez de adicionar um nêutron

// Parâmetros da espiral
let angleIncrement = 0.4; // Incremento do ângulo para a espiral
let radiusIncrement = 0.2; // Incremento do raio (distância entre as partículas)



// Recupera os parâmetros da URL
let numProtons = 0;
let numNeutrons = 0;
let nomeElemento ="";

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  numProtons = parseInt(urlParams.get("protons"));
  numNeutrons = parseInt(urlParams.get("neutrons"));
  nomeElemento = (urlParams.get("NomeEQ"));

  if (!isNaN(numProtons) && !isNaN(numNeutrons)) {
    console.log(`Número de Prótons: ${numProtons}, Número de Nêutrons: ${numNeutrons}`);
  } else {
    console.error("Erro: Não foi possível recuperar os valores de prótons e nêutrons.");
  }


  // Atualiza a tabela com as variáveis obtidas da URL
  atualizarTabela(nomeElemento, numProtons, numNeutrons);
});






function setup() {

 
 // createCanvas(200, 200); // Tela de 400x400 px
 // noFill();


let canvas = createCanvas(200, 200);
canvas.parent('container');


  
  
  // Cores das partículas
  let corProton = color(255, 165, 0); // Laranja para prótons
  let corNeutron = color(139, 69, 19); // Marrom para nêutrons

  // Inicializando as partículas
  let currentAngle = random(TWO_PI); // Ângulo aleatório para o primeiro próton
  let currentRadius = deslocamento; // Raio inicial do espiral

  // Total de partículas
  let totalParticulas = numProtons + numNeutrons;
  let diferencaParticulas = numNeutrons - numProtons

  // Loop para adicionar prótons e nêutrons de forma intercalada
  for (let i = 0; i < totalParticulas; i++) {
    // Calcular a posição em espiral
    let offsetX = cos(currentAngle) * currentRadius;
    let offsetY = sin(currentAngle) * currentRadius;

    // Verifica se é a vez de adicionar um próton
    if (vezProton && numProtons > 0) {
      particles.push({ x: offsetX, y: offsetY, cor: corProton, tipo: 'proton' }); // Adiciona próton
      numProtons--; // Decrementa o número de prótons após desenhar
      vezProton = false; // Passa para a vez do nêutron
      vezNeutron = true; // Habilita a vez do nêutron
    }
    // Verifica se é a vez de adicionar um nêutron
    else if (vezNeutron && numNeutrons > 0) {
      particles.push({ x: offsetX, y: offsetY, cor: corNeutron, tipo: 'neutron' }); // Adiciona nêutron
      numNeutrons--; // Decrementa o número de nêutrons após desenhar
    // Após desenhar o nêutron, se não houver mais prótons, deve desabilitar a vezProton
      if (numProtons === 0) {
        vezProton = false;  // Desabilita a vez do próton
        vezNeutron = true;  // Continua permitindo a vez do nêutron
      } else {
        vezProton = true; // Habilita a vez do próton, caso haja ainda prótons
        vezNeutron = false; // Desabilita a vez do nêutron
      }
    }

    // Atualiza o ângulo e o raio para criar o efeito espiral
    currentAngle += angleIncrement; // Aumenta o ângulo para o próximo ponto da espiral
    currentRadius += radiusIncrement; // Aumenta o raio para afastar as partículas, criando o efeito espiral
  }


   
 

  
}

function draw() {
  background(255); // Limpa a tela a cada quadro

  // Desenha as partículas
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];

    // Desenha a partícula com a cor apropriada
    fill(p.cor); // Preenche com a cor da partícula
    ellipse(width / 2 + p.x, height / 2 + p.y, 60, 60); // Aplica o deslocamento (p.x e p.y)

    // Se for um próton, coloca o sinal de "+"
    if (p.tipo === 'proton') {
      fill(255, 0, 0); // Cor vermelha para o sinal "+"
      textSize(12); // Ajusta o tamanho do texto
      textAlign(CENTER, CENTER);
      text("+", width / 2 + p.x, height / 2 + p.y); // Coloca o "+" sobre o próton
    }
  }
}

// Função para atualizar a tabela com os valores obtidos da URL
function atualizarTabela(nome, protons, neutrons) {
  const elementNameTd = document.getElementById("element-name");
  const atomicNumberTd = document.getElementById("atomic-number");
  const neutronsTd = document.getElementById("neutrons");

  elementNameTd.textContent = nome;
  atomicNumberTd.textContent = protons;
  neutronsTd.textContent = neutrons;

}

