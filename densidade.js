const cubo = document.getElementById("cubosAnimado");

// Função para gerar um movimento aleatório do cubo
function movimentoAleatorio() {
    const aleatorioX = Math.floor(Math.random() * 360);
    const aleatorioY = Math.floor(Math.random() * 360);
    const aleatorioZ = Math.floor(Math.random() * 360);

    cubo.style.transform = `rotateX(${aleatorioX}deg) rotateY(${aleatorioY}deg) rotateZ(${aleatorioZ}deg)`;
}

// Chama a função de movimento aleatório a cada 2 segundos
setInterval(movimentoAleatorio, 2000);
