const elementos = [
  { id: "hidrogenio", simbolo: "H", nome: "Hidrogênio", densidade: "0,09 g/cm³", cor: [200, 200, 255] },
  { id: "litio", simbolo: "Li", nome: "Lítio", densidade: "0,53 g/cm³", cor: [255, 100, 100] },
  { id: "sodio", simbolo: "Na", nome: "Sódio", densidade: "0,97 g/cm³", cor: [255, 255, 0] },
  { id: "potassio", simbolo: "K", nome: "Potássio", densidade: "0,86 g/cm³", cor: [150, 100, 255] },
  { id: "rubidio", simbolo: "Rb", nome: "Rubídio", densidade: "1,53 g/cm³", cor: [255, 165, 0] },
  { id: "cesio", simbolo: "Cs", nome: "Césio", densidade: "1,93 g/cm³", cor: [255, 215, 0] }
];

elementos.forEach(elemento => {
  const container = document.getElementById(elemento.id);
  if (container) {
    // Criação do sketch individual
    new p5((p) => {
      let angulo = 0;

      p.setup = () => {
        p.createCanvas(100, 100, p.WEBGL).parent(container);
      };

      p.draw = () => {
        p.background(240);
        p.lights();
        p.rotateY(angulo);
        p.fill(elemento.cor);
        p.stroke(0);
        p.box(50);
        angulo += 0.02;
      };
    });

    // Adiciona o texto com densidade
    const texto = document.createElement("p");
    texto.innerHTML = `<strong>${elemento.simbolo}</strong> (${elemento.nome})<br>Densidade: ${elemento.densidade}`;
    container.appendChild(texto);
  }
});
