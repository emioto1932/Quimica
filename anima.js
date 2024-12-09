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
        p.ellipse(x, y, 12, 12); // Desenha o elétron
      });
    });
  };

  // Função para calcular as camadas de distribuição de elétrons
  const calculateLayers = (protons) => {
    let remaining = protons;
    let radius = 70;
    let result = [];
    
    // Camadas com os limites de elétrons
    const maxConfig = [2, 8, 18, 32, 18, 32, 8];

    // Processa cada camada
    for (let i = 0; i < maxConfig.length && remaining > 0; i++) {
      // Se a camada puder receber até 18 ou até 32, coloca o máximo possível
      let layerCapacity = maxConfig[i];
      
      if (remaining > 18 && i === 2) {
        // Na terceira camada, coloca 8 elétrons se houver mais que 18
        layerCapacity = 8;
      } 
      else if (remaining > 18 && i === 3) {
        // Na quarta camada, coloca 18 se houver mais que 18
        layerCapacity = 18;
      }
      else if (remaining > 18 && i === 4) {
        // Na quinta camada, coloca 8 se houver mais que 18
        layerCapacity = 8;
      }
      else if (remaining > 18 && i === 5) {
        // Na sexta camada, coloca 18 se houver mais que 18
        layerCapacity = 18;
      }

      // Adiciona a camada
      const count = Math.min(remaining, layerCapacity);
      result.push({ radius, electrons: new Array(count).fill(0) });
      remaining -= count;
      radius += 30;  // Aumenta o raio da camada para a próxima
    }

    return result;
  };
};
