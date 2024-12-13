document.addEventListener("DOMContentLoaded", function() {
    const popup = document.getElementById("popup");
    const openPopupBtn = document.getElementById("openPopupBtn");

    // Função para abrir a pop-up
    openPopupBtn.addEventListener("click", function() {
        popup.style.display = "block"; // Torna a pop-up visível
    });

    // Função para fechar a pop-up
    popup.addEventListener("click", function(e) {
        if (e.target === popup) { // Fechar quando clicar fora da janela
            popup.style.display = "none";
        }
    });

    // Função que permite arrastar elementos nas células da tabela
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
                cell.appendChild(draggedElement);
            }
        });
    });

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
});
