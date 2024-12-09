let electronsLayer1 = []; 

let electronsLayer2 = []; 

let electronsLayer3 = []; 

let electronsLayer4 = []; 

let electronsLayer5 = []; 

let electronsLayer6 = []; 

let electronsLayer7 = []; 

  

let speedLayer1 = 0.03; // Velocidade da camada 1 

let speedLayer2 = 0.02; // Velocidade da camada 2 

let speedLayer3 = 0.015; // Velocidade da camada 3 

let speedLayer4 = 0.01; // Velocidade da camada 4 

let speedLayer5 = 0.005; // Velocidade da camada 5 

let speedLayer6 = 0.003; // Velocidade da camada 6 

let speedLayer7 = 0.002; // Velocidade da camada 7 

  

function setup() { 

  createCanvas(400, 600);  // Cartaz de 400x600 pixels 

  frameRate(60); 

  

  // Criando elétrons nas camadas 

  // Primeira camada (2 elétrons) 

  for (let i = 0; i < 2; i++) { 

    electronsLayer1.push(createElectron(70, i * TWO_PI / 2)); 

  } 

  

  // Segunda camada (8 elétrons) 

  for (let i = 0; i < 8; i++) { 

    electronsLayer2.push(createElectron(100, i * TWO_PI / 8)); 

  } 

  

  // Terceira camada (18 elétrons) 

  for (let i = 0; i < 18; i++) { 

    electronsLayer3.push(createElectron(130, i * TWO_PI / 18)); 

  } 

  

  // Quarta camada (32 elétrons) 

  for (let i = 0; i < 32; i++) { 

    electronsLayer4.push(createElectron(160, i * TWO_PI / 32)); 

  } 

  

  // Quinta camada (32 elétrons) 

  for (let i = 0; i < 32; i++) { 

    electronsLayer5.push(createElectron(190, i * TWO_PI / 32)); 

  } 

  

  // Sexta camada (18 elétrons) 

  for (let i = 0; i < 18; i++) { 

    electronsLayer6.push(createElectron(220, i * TWO_PI / 18)); 

  } 

  

  // Sétima camada (2 elétrons) 

  for (let i = 0; i < 2; i++) { 

    electronsLayer7.push(createElectron(250, i * TWO_PI / 2)); 

  } 

} 

  

function draw() { 

  background(255); 

  

  // Desenhando o núcleo (círculo laranja no centro) 

  fill(255, 165, 0); 

  noStroke(); 

  ellipse(width / 2, height / 2, 50, 50);  // Núcleo 

  fill(0); 

  textSize(16); 

  textAlign(CENTER, CENTER); 

  

  // Exibindo o número de prótons e nêutrons 

  textSize(12); 

  text('P = 11', width / 2, height / 2 - 10);  // Prótons 

  text('N = 12', width / 2, height / 2 + 10);  // Nêutrons 

  

  // Desenhando as camadas com linhas tracejadas 

  drawDottedLine(70);   // Primeira camada 

  drawDottedLine(100);  // Segunda camada 

  drawDottedLine(130);  // Terceira camada 

  drawDottedLine(160);  // Quarta camada 

  drawDottedLine(190);  // Quinta camada 

  drawDottedLine(220);  // Sexta camada 

  drawDottedLine(250);  // Sétima camada 

  

  // Desenhando as camadas e elétrons 

  drawElectrons(electronsLayer1, 70, 2);  // Primeira camada 

  drawElectrons(electronsLayer2, 100, 8); // Segunda camada 

  drawElectrons(electronsLayer3, 130, 18); // Terceira camada 

  drawElectrons(electronsLayer4, 160, 32); // Quarta camada 

  drawElectrons(electronsLayer5, 190, 32); // Quinta camada 

  drawElectrons(electronsLayer6, 220, 18); // Sexta camada 

  drawElectrons(electronsLayer7, 250, 2);  // Sétima camada 

  

  // Atualizando a posição dos elétrons nas camadas 

  moveElectronsLayer(electronsLayer1, speedLayer1); 

  moveElectronsLayer(electronsLayer2, speedLayer2); 

  moveElectronsLayer(electronsLayer3, speedLayer3); 

  moveElectronsLayer(electronsLayer4, speedLayer4); 

  moveElectronsLayer(electronsLayer5, speedLayer5); 

  moveElectronsLayer(electronsLayer6, speedLayer6); 

  moveElectronsLayer(electronsLayer7, speedLayer7); 

} 

  

// Função para criar elétrons nas órbitas 

function createElectron(radius, angle) { 

  let x = width / 2 + radius * cos(angle); 

  let y = height / 2 + radius * sin(angle); 

  return { x: x, y: y, angle: angle, radius: radius }; 

} 

  

// Função para desenhar os elétrons 

function drawElectrons(electronArray, radius, numElectrons) { 

  for (let e of electronArray) { 

    fill(0, 0, 255);  // Cor azul para os elétrons 

    ellipse(e.x, e.y, 12, 12);  // Desenha os elétrons 

  } 

} 

  

// Função para desenhar a linha tracejada de cada camada 

function drawDottedLine(radius) { 

  stroke(0); 

  strokeWeight(1); 

  noFill(); 

  drawingContext.setLineDash([5, 5]); // Estilo de linha tracejada 

  ellipse(width / 2, height / 2, radius * 2, radius * 2); // Desenha a linha da órbita 

  drawingContext.setLineDash([]);  // Reseta para linha contínua 

} 

  

// Função para mover os elétrons uniformemente em cada camada 

function moveElectronsLayer(electronArray, speed) { 

  for (let e of electronArray) { 

    e.angle += speed;  // Controla a velocidade de rotação dos elétrons 

    e.x = width / 2 + e.radius * cos(e.angle); 

    e.y = height / 2 + e.radius * sin(e.angle); 

  } 

} 

 
