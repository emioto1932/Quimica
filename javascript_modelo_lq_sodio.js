// Dados dos elementos químicos
const elementosPorGrupo = {
    "1": [{ nome: "Hidrogênio", simbolo: "H", protons: 1, eletronegatividade: 2.1 }],
    "2": [{ nome: "Hélio", simbolo: "He", protons: 2, eletronegatividade: null }],
    "13": [{ nome: "Boro", simbolo: "B", protons: 5, eletronegatividade: 2.0 }],
    "14": [{ nome: "Carbono", simbolo: "C", protons: 6, eletronegatividade: 2.5 }],
    "15": [{ nome: "Nitrogênio", simbolo: "N", protons: 7, eletronegatividade: 3.0 }],
    "16": [{ nome: "Oxigênio", simbolo: "O", protons: 8, eletronegatividade: 3.5 }],
    "17": [{ nome: "Flúor", simbolo: "F", protons: 9, eletronegatividade: 4.0 }],
    "18": [{ nome: "Neônio", simbolo: "Ne", protons: 10, eletronegatividade: null }]
};

let elementoAtual = null;

// Atualiza os elementos químicos disponíveis com base no grupo selecionado
document.getElementById("grupo-select").addEventListener("change", (e) => {
    const grupo = e.target.value;
    const elementoSelect = document.getElementById("elemento-select");

    elementoSelect.innerHTML = '<option value="">Selecione um elemento</option>';
    elementoSelect.disabled = !grupo;

    if (grupo) {
        elementosPorGrupo[grupo].forEach(elemento => {
            const option = document.createElement("option");
            option.value = elemento.simbolo;
            option.textContent = `${elemento.simbolo} - ${elemento.nome}`;
            elementoSelect.appendChild(option);
        });
    }
});

// Atualiza as propriedades e inicia a animação ao selecionar o elemento
document.getElementById("elemento-select").addEventListener("change", (e) => {
    const simbolo = e.target.value;
    const grupo = document.getElementById("grupo-select").value;

    elementoAtual = elementosPorGrupo[grupo].find(el => el.simbolo === simbolo);

    // Atualizar tabela de propriedades
    const tabelaBody = document.querySelector("#tabela-propriedades tbody");
    tabelaBody.innerHTML = `
        <tr><td>Número de Prótons</td><td>+${elementoAtual.protons}</td></tr>
        <tr><td>Número de Elétrons</td><td>-${elementoAtual.protons}</td></tr>
        <tr><td>Eletronegatividade</td><td>${elementoAtual.eletronegatividade?.toFixed(1) || "N/A"}</td></tr>
    `;

    // Redesenha a animação
    new p5(sketch, document.getElementById("canvas-container"));
});

// Configurações de animação com P5.js
const sketch = (p) => {
    let layers = [];

    p.setup = () => {
        p.createCanvas(400, 400);
        layers = calculateLayers(elementoAtual.protons);
    };

    p.draw = () => {
        p.background(255);
        p.translate(p.width / 2, p.height / 2);

        // Desenhar núcleo
        p.fill(255, 165, 0);
        p.ellipse(0, 0, 50, 50);
        p.fill(0);
        p.textAlign(p.CENTER, p.CENTER);
        p.text(`P=${elementoAtual.protons}`, 0, -10);
        p.text(`N=${Math.round(elementoAtual.protons * 1.2)}`, 0, 10);

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
                p.ellipse(x, y, 12, 12);
            });
        });
    };

    const calculateLayers = (protons) => {
        const config = [2, 8, 18]; // Camadas de distribuição de elétrons
        let remaining = protons;
        let radius = 70;
        let result = [];

        config.forEach((max, i) => {
            const count = Math.min(remaining, max);
            result.push({ radius, electrons: new Array(count).fill(0) });
            remaining -= count;
            radius += 30;
        });

        return result;
    };
};
