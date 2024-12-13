document.addEventListener("DOMContentLoaded", function() {
    // Pegando o parâmetro da URL
    const urlParams = new URLSearchParams(window.location.search);
    const propriedade = urlParams.get("propriedade");

    // Exibindo o nome da propriedade na pop-up
    const propertyNameElement = document.getElementById("propertyName");

    if (propriedade) {
        // Definindo o nome da propriedade de acordo com o link clicado
        if (propriedade === "densidade") {
            propertyNameElement.textContent = "Densidade";
        } else {
            propertyNameElement.textContent = "Propriedade Não Encontrada";
        }
    } else {
        propertyNameElement.textContent = "Propriedade Não Informada";
    }

    // Função para abrir a pop-up
    const popup = document.getElementById("popup");
    const closePopupBtn = document.getElementById("closePopupBtn");

    // Função para fechar a pop-up
    closePopupBtn.addEventListener("click", function() {
        popup.style.display = "none"; // Fecha a pop-up
    });

    // Abrir pop-up automaticamente quando a página carregar
    popup.style.display = "block";
});
