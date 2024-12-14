document.addEventListener("DOMContentLoaded", function() {
    const popup = document.getElementById("popup");
    const openPopupBtn = document.getElementById("openPopupBtn");
    const closePopupBtn = document.getElementById("closePopupBtn");

    // Função para abrir a pop-up
    openPopupBtn.addEventListener("click", function() {
        popup.style.display = "block"; // Torna a pop-up visível
        adjustTableSize(); // Ajusta o tamanho da tabela com base na tela
    });

    // Função para fechar a pop-up
    closePopupBtn.addEventListener("click", function() {
        popup.style.display = "none"; // Torna a pop-up invisível
    });

    // Função para fechar clicando fora da janela
    popup.addEventListener("click", function(e) {
        if (e.target === popup) { // Fechar quando clicar fora da janela
            popup.style.display = "none";
        }
    });

    // Função que calcula o tamanho das células
    function adjustTableSize() {
        const popupWidth = window.innerWidth * 0.8; // 80% da largura da tela
        const popupHeight = window.innerHeight * 0.8; // 80% da altura da tela

        const cellWidth = popupWidth / 4; // Largura de cada célula (dividido por 4 colunas)
        const cellHeight = popupHeight / 4; // Altura de cada célula (dividido por 4 linhas)

        // Aplica os novos valores no CSS das células
        const cells = document.querySelectorAll(".popup-table td");
        cells.forEach(cell => {
            cell.style.width = `${cellWidth}px`;
            cell.style.height = `${cellHeight}px`;
        });
    }

    // Criar objetos arrastáveis para teste
    function createDraggableObject(content) {
        const object = document.createElement("div");
        object.classList.add("draggable");
        object.setAttribute("draggable", "true");
        object.textContent = content;

        object.addEventListener("dragstart", function() {
            object.classList.add("dragging");
        });

        object.addEventListener("dragend", function() {
            object.classList.remove("dragging");
        });

        document.body.appendChild(object);
    }

    // Criar objetos para o exemplo
    createDraggableObject("H2O");
    createDraggableObject("NaCl");
    createDraggableObject("CO2");
    createDraggableObject("O2");

    // Adicionar a funcionalidade de arraste
    const cells = document.querySelectorAll(".popup-table td");
    cells.forEach(cell => {
        cell.classList.add("droppable");
        cell.addEventListener("dragover", function(e) {
            e.preventDefault();
        });

        cell.addEventListener("drop", function(e) {
            e.preventDefault();
            const draggedElement = document.querySelector(".dragging");
            if (draggedElement) {
                cell.appendChild(draggedElement); // Adiciona o objeto na célula
                cell.style.minWidth = "50px"; // Ajusta o tamanho mínimo, caso necessário
                cell.style.minHeight = "50px"; // Ajusta o tamanho mínimo, caso necessário
            }
        });
    });
});
