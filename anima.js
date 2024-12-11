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
