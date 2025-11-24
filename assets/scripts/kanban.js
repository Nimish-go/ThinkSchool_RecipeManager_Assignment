document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", function () {
        document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

        this.classList.add("active");
        document.getElementById(this.dataset.tab).classList.add("active");

        if (this.dataset.tab === "kanban-view") renderKanban();
    });
});


function renderKanban() {
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

    document.querySelectorAll(".kanban-list").forEach(l => l.innerHTML = "");

    recipes.forEach(recipe => {
        recipe.categories.forEach(cat => {
            const list = document.querySelector(`.kanban-column[data-category="${cat}"] .kanban-list`);
            if (!list) return;

            const card = document.createElement("div");
            card.dataset.id = recipe.id;
            card.classList.add("kanban-card");
            card.textContent = recipe.title;
            card.draggable = true;
            card.dataset.id = recipe.id;

            list.appendChild(card);
        });
    });
}

document.addEventListener("dragstart", e => {
    if (e.target.classList.contains("kanban-card")) {
        e.dataTransfer.setData("id", e.target.dataset.id);
    }
});

document.addEventListener("click", (e) => {
    if(e.target.classList.contains("kanban-card")){
        const id = e.target.dataset.id;
        openRecipeViewModal(id);
    }
})

document.querySelectorAll(".kanban-list").forEach(list => {
    list.addEventListener("dragover", e => e.preventDefault());

    list.addEventListener("drop", e => {
        const id = e.dataTransfer.getData("id");
        const newCategory = list.closest(".kanban-column").dataset.category;

        let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
        const recipe = recipes.find(r => String(r.id) === String(id));

        recipe.categories = [newCategory];   // single category movement
        localStorage.setItem("recipes", JSON.stringify(recipes));

        renderKanban();
        renderRecipes();
    });
});
