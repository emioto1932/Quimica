// Selecionar elementos
const menuButton = document.getElementById("menu-button");
const menu = document.getElementById("menu");
const selectedTopic = document.getElementById("selected-topic");
const contentContainer = document.getElementById("content-container");

// Adicionar evento para alternar o menu
menuButton.addEventListener("click", function () {
    menu.classList.toggle("hidden");
});

// Adicionar evento aos itens do menu
menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", function (event) {
        event.preventDefault(); // Evitar comportamento padrão
        const topic = this.dataset.topic; // Pegar o tema
        applyTheme(topic); // Aplicar a classe do tema
        menu.classList.add("hidden"); // Esconder o menu
    });
});

// Função para aplicar o tema
function applyTheme(topic) {
    // Atualizar o título
    selectedTopic.textContent = topic.replace(/-/g, ' ');

    // Remover classes anteriores do container
    contentContainer.className = 'container';

    // Adicionar a classe correspondente ao tema
    contentContainer.classList.add(`tema-${topic}`);
}
