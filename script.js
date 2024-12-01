// Selecionando o menu e o botão do menu
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
       // document.getElementById('selected-topic').innerText = selectedTopic.replace(/-/g, ' ').toUpperCase();

        // Atualiza o título
        document.getElementById('selected-topic').innerText = selectedTopic.replace(/-/g, ' ');
        
        // Esconde todos os conteúdos
        document.querySelectorAll('.content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Mostra o conteúdo do tópico selecionado
        document.getElementById(selectedTopic).classList.add('active');

        // Esconde o menu
        menu.classList.add('hidden');
    });
});
