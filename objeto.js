document.addEventListener("DOMContentLoaded", function() {
    // Recupera o parâmetro da URL
    const urlParams = new URLSearchParams(window.location.search);
    const propriedade = urlParams.get("propriedade");


      const protons = urlParams.get("protons");
      const neutrons = urlParams.get("neutrons");
      const nomeEQ = urlParams.get("nomeEQ");




    
    // Elementos da página
    const propertyTitle = document.getElementById("propertyTitle");
    const propertyIframe = document.getElementById("propertyIframe");

    // Define o título da propriedade e carrega o iframe correspondente
    if (propriedade) {
        if (propriedade === "densidade") {
            propertyTitle.textContent = "Densidade";
            propertyIframe.src = "densidade.html"; // Carrega a página densidade.html
        } else if (propriedade === "numero-atomico") {
            propertyTitle.textContent = "Número Atômico ou Número de Prótons";
            propertyIframe.src = "numero-atomico.html"; // Carrega a página ponto_fusao.html

    
                    // Passe os valores de prótons e nêutrons ao iframe como parâmetros
                    propertyIframe.src = `numero-atomico.html?protons=${protons}&neutrons=${neutrons}&nomeEQ=${nomeEQ}`;


           
        } else if (propriedade === "condutividade") {
            propertyTitle.textContent = "Condutividade";
            propertyIframe.src = "condutividade.html"; // Carrega a página condutividade.html
        } else {
            propertyTitle.textContent = "Propriedade Não Encontrada";
        }
    } else {
        propertyTitle.textContent = "Propriedade Não Informada";
    }

    // Função para fechar a pop-up e voltar para a página anterior
    const closePopupBtn = document.getElementById("closePopupBtn");
    closePopupBtn.addEventListener("click", function() {
        window.location.href = "anima.html"; // Redireciona para anima.html
    });

    // Exibe a pop-up
    const popup = document.getElementById("popup");
    popup.style.display = "block";
});
