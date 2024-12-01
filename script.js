// Selecionar elementos
const menuButton = document.getElementById("menu-button");// Selecionando o menu e o botão do menu
const menuButton = document.getElementById('menu-button');
const menu = document.getElementById('menu');
const contentContainer = document.getElementById('content-container');
const topics = document.querySelectorAll('a[data-topic]');

// Função para mostrar/esconder o menu
menuButton.addEventListener('click', () => {
    menu.classList.toggle('hidden');
});

// Função para mostrar o conteúdo correto
topics.forEach(topic => {
    topic.addEventListener('click', (event) => {
        event.preventDefault();
        const selectedTopic = event.target.getAttribute('data-topic');
        
        // Atualiza o título
        document.getElementById('selected-topic').innerText = selectedTopic.replace(/-/g, ' ').toUpperCase();
        
        // Esconde todos os conteúdos
        document.querySelectorAll('.content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Mostra o conteúdo do tópico selecionado
        document.getElementById(selectedTopic).classList.add('active');
    });
});

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
