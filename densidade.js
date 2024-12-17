let elementos = [
  { id: "hidrogenio", simbolo: "H", nome: "Hidrogênio", densidade: "0,09 g/cm³", cor: [200, 200, 255], tipo: "gas" },
  { id: "litio", simbolo: "Li", nome: "Lítio", densidade: "0,53 g/cm³", cor: [255, 100, 100], tipo: "metal" },
  { id: "sodio", simbolo: "Na", nome: "Sódio", densidade: "0,97 g/cm³", cor: [255, 255, 0], tipo: "metal" },
  { id: "potassio", simbolo: "K", nome: "Potássio", densidade: "0,86 g/cm³", cor: [150, 100, 255], tipo: "metal" },
  { id: "rubidio", simbolo: "Rb", nome: "Rubídio", densidade: "1,53 g/cm³", cor: [255, 165, 0], tipo: "metal" },
  { id: "cesio", simbolo: "Cs", nome: "Césio", densidade: "1,93 g/cm³", cor: [255, 215, 0], tipo: "metal" }
];

function setup() {
  noCanvas();
  elementos.forEach(elemento => {
    let celula = document.getElementById(elemento.id);
    if (celula) {
      criarCubo(celula, elemento);
    }
  });
}

function criarCubo(container, elemento) {
  let canvas = createCanvas(80, 80, WEBGL);
  canvas.parent(container);

  let angulo = 0;

  function drawCubo() {
    background(240);
    lights();
    rotateY(angulo);
    fill(elemento.cor);
    if (elemento.tipo === "gas") {
      noFill();
      stroke(100);
      box(50);
    } else {
      box(50);
    }
    angulo += 0.02;
  }

  container.querySelector("canvas").id = "cubo-" + elemento.id;
  let sketch = new p5((p) => {
    p.setup = () => {
      p.createCanvas(80, 80, p.WEBGL).parent(container);
    };
    p.draw = drawCubo;
  });

  // Adiciona texto diretamente
  let info = document.createElement("div");
  info.innerHTML = `
    <strong>${elemento.simbolo}</strong><br>
    ${elemento.nome}<br>
    Densidade: ${elemento.densidade}
  `;
  container.appendChild(info);
}
