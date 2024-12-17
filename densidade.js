let cuboSize = 40; // Tamanho padrão dos cubos
let elementos = [
  { simbolo: "H", densidade: "0.09", cor: [200, 200, 255], tipo: "gas" },
  { simbolo: "Li", densidade: "0.53", cor: [255, 100, 100], tipo: "metal" },
  { simbolo: "Na", densidade: "0.97", cor: [255, 255, 0], tipo: "metal" },
  { simbolo: "K", densidade: "0.86", cor: [150, 100, 255], tipo: "metal" },
  { simbolo: "Rb", densidade: "1.53", cor: [255, 165, 0], tipo: "metal" },
  { simbolo: "Cs", densidade: "1.93", cor: [255, 215, 0], tipo: "metal" },
  { simbolo: "Fr", densidade: "–", cor: [100, 255, 200], tipo: "metal" }
];

function setup() {
  let canvas = createCanvas(800, 800, WEBGL);
  canvas.parent("tabela");
}

function draw() {
  background(240);
  lights();
  orbitControl(); // Permite mover a câmera para visualizar a tabela

  let xOffset = -300;
  let yOffset = -300;

  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      let index = getElementIndex(row, col);
      if (index !== null) {
        let elemento = elementos[index];
        push();
        translate(xOffset + col * 150, yOffset + row * 150, 0);
        drawCubo(elemento);
        if (row == 1) drawText(elemento.simbolo, elemento.densidade);
        pop();
      }
    }
  }
}

function getElementIndex(row, col) {
  let positions = [
    [0, null, 1, null], // Linha 1: H, -, Li, -
    [2, null, null, null], // Linha 2: Na
    [null, 3, null, null], // Linha 3: -, K
    [4, null, 5, null] // Linha 4: Rb, -, Cs
  ];
  return positions[row][col];
}

function drawCubo(elemento) {
  fill(elemento.cor);
  rotateY(frameCount * 0.01); // Movimento giratório
  box(cuboSize);

  // Se for hidrogênio, desenha neblina
  if (elemento.tipo === "gas") {
    push();
    fill(255, 255, 255, 50); // Branco semi-transparente
    translate(0, -cuboSize / 2, 0);
    sphere(cuboSize * 0.7); // Simula uma neblina ao redor
    pop();
  }
}

function drawText(simbolo, densidade) {
  push();
  translate(0, cuboSize + 10, 0);
  rotateX(HALF_PI);
  fill(0);
  textSize(18);
  textAlign(CENTER);
  text(`${simbolo} - ${densidade} g/cm³`, 0, 0);
  pop();
}
