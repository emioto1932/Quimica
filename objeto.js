document.addEventListener("DOMContentLoaded", function() {
    // Pegando os parâmetros da URL
    const urlParams = new URLSearchParams(window.location.search);
    const propriedade = urlParams.get("propriedade");
    const grupo = urlParams.get("grupo"); // Recupera o grupo
    const elemento = urlParams.get("elemento"); // Recupera o elemento químico

    // Exibindo o nome da propriedade na pop-up
    const propertyNameElement = document.getElementById("propertyName");
    const groupElement = document.getElementById("groupName"); // Elemento para exibir o grupo
    const elementNameElement = document.getElementById("elementName"); // Elemento para exibir o nome do elemento

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

    // Exibindo o grupo e o nome do elemento
    if (grupo && elemento) {
        groupElement.textContent = grupo; // Exibe o grupo
        elementNameElement.textContent = elemento; // Exibe o nome do elemento
    } else {
        groupElement.textContent = "Grupo Não Informado";
        elementNameElement.textContent = "Elemento Não Informado";
    }

    // Função para abrir a pop-up
    const popup = document.getElementById("popup");
    const closePopupBtn = document.getElementById("closePopupBtn");

    // Função para fechar a pop-up e voltar para a página anterior
    closePopupBtn.addEventListener("click", function() {
        window.history.back(); // Volta para a página anterior
    });

    // Abrir pop-up automaticamente quando a página carregar
    popup.style.display = "block";
});
