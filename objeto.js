document.addEventListener("DOMContentLoaded", function() {
    // Recuperar as informações do Local Storage
    const elemento = localStorage.getItem("elementoEscolhido");
    const grupo = localStorage.getItem("grupoEscolhido");

    // Exibir o nome do elemento e grupo no popup
    const propertyNameElement = document.getElementById("propertyName");
    if (elemento && grupo) {
        propertyNameElement.textContent = `${elemento} - ${grupo}`;
    } else {
        propertyNameElement.textContent = "Propriedade Não Informada";
    }

    // Configuração da pop-up
    const popup = document.getElementById("popup");
    const closePopupBtn = document.getElementById("closePopupBtn");

    // Fechar a pop-up e voltar sem limpar dados
    closePopupBtn.addEventListener("click", function() {
        window.history.back(); // Volta para a página anterior
    });

    // Exibir a pop-up automaticamente
    popup.style.display = "block";
});
