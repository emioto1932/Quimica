// Selecionar botão e menu
const menuButton = document.getElementById("menu-button");
const menu = document.getElementById("menu");

// Adicionar evento de clique
menuButton.addEventListener("click", function () {
    menu.classList.toggle("hidden"); // Alternar visibilidade
});
