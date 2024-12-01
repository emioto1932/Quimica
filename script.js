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
        showContent(topic); // Mostrar conteúdo do tema
        menu.classList.add("hidden"); // Esconder o menu
    });
});

// Função para exibir o conteúdo do tema selecionado
function showContent(topic) {
    // Atualizar o título do tema
    selectedTopic.textContent = topic;

    // Atualizar o conteúdo do container
    const imageSrc = `img/${topic.replace(/\s+/g, '-').toLowerCase()}.png`;
    const videoLink = `https://www.youtube.com/results?search_query=${encodeURIComponent(topic)}`;
    contentContainer.innerHTML = `
        <div class="image-container">
            <a href="${videoLink}" target="_blank">
                <img src="${imageSrc}" alt="Imagem de ${topic}">
            </a>
        </div>
        <div class="text-container">
            <p>${topic} é um conceito importante em química. Clique na imagem ou no texto para assistir a uma explicação detalhada.</p>
            <a href="${videoLink}" target="_blank">Clique aqui para o vídeo</a>
        </div>
    `;
}
