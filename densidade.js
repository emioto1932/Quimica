let elementos = [
  { id: "hidrogenio", simbolo: "H", nome: "Hidrogênio", densidade: "0,09 g/cm³", cor: [200, 200, 255], tipo: "gas" },
  { id: "litio", simbolo: "Li", nome: "Lítio", densidade: "0,53 g/cm³", cor: [255, 100, 100], tipo: "metal" },
  { id: "sodio", simbolo: "Na", nome: "Sódio", densidade: "0,97 g/cm³", cor: [255, 255, 0], tipo: "metal" },
  { id: "potassio", simbolo: "K", nome: "Potássio", densidade: "0,86 g/cm³", cor: [150, 100, 255], tipo: "metal" },
  { id: "rubidio", simbolo: "Rb", nome: "Rubídio", densidade: "1,53 g/cm³", cor: [255, 165, 0], tipo: "metal" },
  { id: "cesio", simbolo: "Cs", nome: "Césio", densidade: "1,93 g/cm³", cor: [255, 215, 0], tipo: "metal" }
];

function setup() {
  noCanvas(); // Desabilita a tela principal do p5.js
  elementos.forEach(elemento => {
    let celula = document.getElementById(elemento.id);
    if (celula) {
      criarCubo(celula, elemento);
    }
  });
}

function criarCubo(container, elemento) {
  let canvas = createGraphics(100, 100, WEBGL); // Canvas do cubo
  canvas.parent(container);

  container.style.backgroundColor = `rgb(${elemento.cor[0]}, ${elemento.cor[1]}, ${elemento.cor[2]})`;
  container.innerHTML += `
    <div style="margin-top: 10px;">
      <strong>${elemento.simbolo}</strong> (${elemento.nome})<br>
      Densidade: ${elemento.densidade}
    </div>
  `;

  let angulo = 0;

  canvas.draw = function () {
    background(240);
    lights();
    if (elemento.tipo === "gas") {
      fill(255, 255, 255, 50);
      sphere(50);
    } else {
      fill(elemento.cor);
      rotateY(angulo);
      box(50);
    }
    angulo += 0.02;
  };
}
