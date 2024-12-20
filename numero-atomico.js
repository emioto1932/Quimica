const elementos = [
  { id: "hidrogenio", simbolo: "H", nome: "Hidrogênio", numeroAtomico: 1, numeroNeutron: 0, cor: [200, 200, 255] },
  { id: "helios", simbolo: "He", nome: "Hélio", numeroAtomico: 2, numeroNeutron: 2, cor: [255, 100, 100] },
  { id: "litio", simbolo: "Li", nome: "Lítio", numeroAtomico: 3, numeroNeutron: 4, cor: [255, 255, 0] },
  { id: "sodio", simbolo: "Na", nome: "Sódio", numeroAtomico: 11, numeroNeutron: 12, cor: [150, 100, 255] },
  { id: "potassio", simbolo: "K", nome: "Potássio", numeroAtomico: 19, numeroNeutron: 20, cor: [255, 165, 0] },
  { id: "rubidio", simbolo: "Rb", nome: "Rubídio", numeroAtomico: 37, numeroNeutron: 48, cor: [255, 215, 0] },
  { id: "cesio", simbolo: "Cs", nome: "Césio", numeroAtomico: 55, numeroNeutron: 78, cor: [200, 255, 100] }
];

elementos.forEach(elemento => {
  const container = document.getElementById(elemento.id);
  if (container) {
    // Adiciona o texto com o número atômico
    const texto = document.createElement("p");
    texto.innerHTML = `<strong>${elemento.simbolo}</strong> (${elemento.nome})<br>Número Atômico: ${elemento.numeroAtomico}`;
    container.appendChild(texto);
  }
});
