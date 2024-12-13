// Função para abrir a pop-up e mostrar a tabela da propriedade selecionada
function openPopup(propriedade) {
    const popup = document.getElementById("popup");
    const propertyTitle = document.getElementById("propertyTitle");

    // Alterando o título da propriedade conforme o link clicado
    if (propriedade === "densidade") {
        propertyTitle.textContent = "Densidade";
    } else {
        propertyTitle.textContent = "Propriedade Não Encontrada";
    }

    // Exibir a pop-up
    popup.style.display = "block";
}

// Função para fechar a pop-up
document.getElementById("closePopupBtn").addEventListener("click", function() {
    const popup = document.getElementById("popup");
    popup.style.display = "none"; // Apenas esconde a pop-up, sem recarregar a página
});
