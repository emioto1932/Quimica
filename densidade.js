let angleX = 0; // Ângulo de rotação no eixo X
let angleY = 0; // Ângulo de rotação no eixo Y

function setup() {
    const canvas = createCanvas(400, 400, WEBGL);
    canvas.parent('p5-container'); // Anexa o canvas ao contêiner no HTML
}

function draw() {
    background(240);

    // Primeiro cubo (vermelho)
    push();
    rotateX(angleX);
    rotateY(angleY);
    stroke(0);
    strokeWeight(2);
    fill(255, 0, 0); // Vermelho
    box(100); // Cubo com 100px
    pop();

    // Segundo cubo (dourado) com texto
    push();
    translate(200, 0, 0); // Translação do segundo cubo
    rotateX(angleX * 1.5);
    rotateY(angleY * 1.5);
    stroke(0);
    strokeWeight(2);
    fill(255, 215, 0); // Dourado
    box(100); // Cubo com 100px
    pop();

    // Incremento dos ângulos para animação
    angleX += radians(1);
    angleY += radians(1);
}
