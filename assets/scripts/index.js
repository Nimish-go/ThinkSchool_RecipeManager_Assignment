/* Modal JS Code */

const modal = document.getElementById('recipe-modal');
const openBtn = document.getElementById('open-add');
const closeBtn = document.getElementById('modal-close');
const form = document.getElementById('recipe-form');
const modalTitle = document.getElementById('modal-title')
function openModal(mode = 'add', data = null) {
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    modalTitle.textContent = mode === 'edit' ? 'Edit Recipe' : 'Add Recipe';
}
function closeModal() {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    form.reset();
}
openBtn.addEventListener('click', () => openModal('add'));
closeBtn.addEventListener('click', closeModal)
// close modal when clicking overlay
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
})
// keyboard accessibility: Esc to close
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') closeModal();
})
// simple prevent default submit (JS logic to persist will be added later)
// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//   // UI-only: close modal after "save"
//     closeModal();
// });

/** Recipe Rendering and loading into localStorage */

const now = () => Date.now() + Math.floor(Math.random() * 1000);

function loadLocalStorage(){
    if(!(localStorage.getItem("recipes"))){
        const recipes = [
        {
            "id": now(),
            "image": "assets/images/egg_fried_rice.png",
            "description" : "A tasty egg fried rice",
            "title": "Egg Fried Rice",
            "ingredients": ['2 cups Rice Washed and Soaked for 5mins', '3 eggs', '2 medium sized green capsicum diced', '2 medium sized carrots diced', '1/4th cup soy sauce', '1/4th cup chilli sauce', '1 onion medium sized diced', '3 cloves garlic peeled and chopped', '1/4 tsp grated ginger', 'Salt', 'Black Pepper Powder', '1 tsp cream', '2 medium chillies', 'Oil', 'Spring Onion', 'Coriander'],
            "steps": {
                1: "Crack 3 Eggs and extract them into a bowl",
                2: "Whisk the Eggs until frothy. Add Salt and Pepper Powder a pinch each",
                3: "Turn on the Gas Stove and keep a medium flame. Put a frying pan on the stove for heating",
                4: "Once the pan heats add 2 tablespoons of oil. Add the egg mixture and scramble them.",
                5: "Once Scrambled, put 1 tsp of cream in the pan so the eggs stop cooking. Along with that turn off the stove.",
                6: "Put a kadhai on the stove. Turn on the stove and keep a medium flame. Add 3 tablespoons of oil.",
                7: "While the oil is heating, take a pressure cooker, add the washed and soaked rice in the pressure cooker and cook until 3 whistles.",
                8: "Once the oil is heated, add cloves of garlic(peeled and chopped) along with 1/4th tsp of grated ginger, and slice the chillies into two halves and add them as well. Wait until garlic turns golden brown.",
                9: "Add the diced onion. Saute them until golden brown.",
                10: "Once Onion turns golden brown, add the vegetables in the kadhai. Saute them for 3 mins. Add 1tsp of salt and 1tsp of pepper.",
                11: "After 3 mins, add the scrambled eggs and saute for 1 min.",
                12: "After Sauteing, add the cooked rice and mix well in the kadhai.",
                13: "Add a pinch of salt and pepper powder. Taste the rice, if required add more salt and pepper powder(a pinch each).",
                14: "Add 1/4th cup of soy and chilli sauce in the kadhai and mix well.",
                15: "Cook for 1 min with a lid on kadhai. After 1 min, turn off the gas stove and let the rice cook in it's own steam for 2 min.",
                16: "After 1 min, chop some spring onion as well as coriander for garnish and add it in the kadhai.",
                17: "Serve in a bowl and Enjoy your freshly homecooked Egg Fried Rice."
            },
            "categories" : ["Lunch", "Dinner"],
            "difficulty": "Medium",
            "maxPrepTime": "10mins"
        },
        {
            "id": now(),
            "image": "assets/images/alfredo-pasta.jpeg",
            "title": "Creamy Alfredo Pasta",
            "ingredients": [
                "Penne pasta", "Butter", "Fresh cream",
                "Garlic", "Cheese", "Salt", "Pepper"
            ],
            "steps": {
                1: "Boil pasta.",
                2: "Saute garlic in butter.",
                3: "Add cream + cheese.",
                4: "Mix pasta & season."
            },
            "categories" : ["Dinner"],
            "difficulty": "Easy",
            "maxPrepTime": "15 mins"
        },

        {
            "id": now(),
            "image": "assets/images/chicken-curry.jpeg",
            "title": "Spicy Chicken Curry",
            "ingredients": [
                "Chicken", "Tomatoes", "Onions",
                "Ginger-garlic paste", "Oil", "Spices"
            ],
            "steps": {
                1: "Heat oil, fry onions.",
                2: "Add chicken & cook.",
                3: "Add tomato puree.",
                4: "Simmer with spices."
            },
            "categories" : ["Lunch", "Dinner"],
            "difficulty": "Hard",
            "maxPrepTime": "45 mins"
        }
    ];

    localStorage.setItem("recipes",JSON.stringify(recipes));
    }
}

function renderRecipes() {
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    const container = document.getElementById("recipe-container");

    // Keep ONLY the add card
    const addCard = document.getElementById("open-add");

    container.innerHTML = ""; 
    container.appendChild(addCard); // make sure add-card stays

    recipes.forEach(recipe => {
        const card = document.createElement("div");
        card.classList.add("recipe-card-ui");
        
        card.innerHTML = `
            <div class="recipe-img">
                <img src="${recipe.image}" alt="${recipe.title}">

                <div class="difficulty-container">
                    <span class="chip difficulty-chip" style="
                    background:${
                        (recipe.difficulty === "Easy") ? "#38b000": 
                        (recipe.difficulty === "Medium") ? "#eeba0b" : "#ba181b"
                    };
                    color: #fff;
                    ">${recipe.difficulty}</span>
                </div>
            </div>

            <div class="recipe-info">
                <h3 class="recipe-title">${recipe.title}</h3>

                <div class="category-chip">
                    ${recipe.categories ? recipe.categories[0] : "Category"}
                </div>

                <p class="recipe-prep">Max Prep Time: ${recipe.maxPrepTime}</p>

                <div class="recipe-container-actions">
                    <a class="read-more" data-id="${recipe.id}">Read More</a>
                    <button class="delete-recipe-btn" data-id="${recipe.id}" title="Delete Recipe">
                        <svg class="trash-svg" width="22" height="30" viewBox="0 0 24 24">
                            
                            <!-- LID -->
                            <path class="trash-lid"
                                d="M9 4h6v2H9z"
                                fill="white"/>

                            <!-- Container -->
                            <path class="trash-body"
                                d="M5 6h14l-1 14H6L5 6z"
                                fill="white"/>

                            <!-- Vertical lines -->
                            <path d="M10 10v6" stroke="#c93a43" stroke-width="2" stroke-linecap="round"/>
                            <path d="M14 10v6" stroke="#c93a43" stroke-width="2" stroke-linecap="round"/>

                        </svg>
                    </button>


                </div>
            </div>
        `;
        container.insertBefore(card, addCard); // insert before add card!
    });
}

/** Add Recipe Modal */

const addRecipeForm = document.querySelector(".modal-form");

function showLoadingSpinner() {
    const overlay = document.getElementById("loading-overlay");
    const text = document.getElementById("loading-text");

    // Tagline (you can change this)
    text.textContent = "Cooking up your recipe...";

    overlay.style.display = "flex";

    // Hide after 5 seconds
    setTimeout(() => {
        overlay.style.display = "none";
    }, 5000);
}

/* =====================================
ADD MODAL — IMAGE UPLOAD (BASE64)
===================================== */

// const addImageInput = document.getElementById("image-file");
// const addImagePreview = document.getElementById("add-image-preview");
// let addImageBase64 = "";   // store selected image as Base64

// addImageInput.addEventListener("change", function () {
//     const file = this.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = function (e) {
//         addImageBase64 = e.target.result; // store Base64
//         addImagePreview.src = addImageBase64;
//     };
//     reader.readAsDataURL(file);
// });

/** Showing Error Messages if input is null */

function clearErrors() {
    document.querySelectorAll(".error-msg").forEach(e => e.textContent = "");
}

function showError(id, msg) {
    document.getElementById(id).textContent = msg;
}

document.querySelectorAll("#recipe-form input, #recipe-form textarea").forEach(field => {
    field.addEventListener("input", () => {
        const errId = "err-" + field.id;
        document.getElementById(errId).textContent = "";
    });
});



addRecipeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    clearErrors();

    let hasError = false;

    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const ingredientsInput = document.getElementById("ingredients").value.trim();
    const stepsInput = document.getElementById("steps").value.trim();
    const difficulty = document.getElementById("difficulty").value;
    const prepTime = document.getElementById("prep").value.trim();
    const imageURL = document.getElementById("image-url").value.trim();
    const categoryNodes = document.querySelectorAll(".category-options input:checked");
    const selectedCategories = [...categoryNodes].map(c => c.value);

    if (selectedCategories.length === 0) {
        showError("err-categories", "Select at least one category.");
        hasError = true;
    }

    if (!title) {
        showError("err-title", "Please enter a recipe title.");
        hasError = true;
    }
    if (!description) {
        showError("err-description", "Please enter a description.");
        hasError = true;
    }
    if (!ingredientsInput) {
        showError("err-ingredients", "Please add at least one ingredient.");
        hasError = true;
    }
    if (!stepsInput) {
        showError("err-steps", "Please add at least one step.");
        hasError = true;
    }
    if (!prepTime) {
        showError("err-prep", "Please enter a prep time.");
        hasError = true;
    }

    // STOP if any errors exist
    if (hasError) return;

    showLoadingSpinner(); // spinner starts (5s)

    const ingredients = ingredientsInput
        .split(",")
        .map(i => i.trim())
        .filter(Boolean);

    const stepsArr = stepsInput
        .split(/\r?\n/)
        .map(s => s.trim())
        .filter(Boolean);

    const stepsObj = {};
    stepsArr.forEach((step, index) => {
        stepsObj[index + 1] = step;
    });

    const finalImage = imageURL || "assets/images/default.png";

    const newRecipe = {
        id: now(),
        title,
        description,
        ingredients,
        steps: stepsObj,
        maxPrepTime: prepTime + " mins",
        categories : selectedCategories,
        difficulty,
        image: finalImage
    };

    // Save into localStorage
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    recipes.push(newRecipe);
    localStorage.setItem("recipes", JSON.stringify(recipes));

    // 🔥 DO EVERYTHING only AFTER 5 seconds (spinner duration)
    setTimeout(() => {

        // Re-render list
        renderRecipes();

        // Close modal
        closeModal();

        // Reset form
        addRecipeForm.reset();

        // Show toast AFTER modal closes
        showToast("add");

        console.log("Recipe added successfully!");

    }, 5000);  // match spinner duration
});



/** View/Edit Modal */
/* ---------- View/Edit Modal Logic (open, preview file instantly, edit/save) ---------- */

const viewModalEl = document.getElementById('view-modal');
const viewImageURLEl = document.getElementById("view-image-url");
const viewImagePreview = document.getElementById("view-image-preview");

const viewTitleEl = document.getElementById('view-title');
const viewDescriptionEl = document.getElementById('view-description');
const viewIngredientsEl = document.getElementById('view-ingredients'); // if present
const viewStepsEl = document.getElementById('view-steps');
const viewPrepEl = document.getElementById('view-prep');
const viewDifficultyEl = document.getElementById('view-difficulty');
const viewImagePathEl = document.getElementById('view-image'); // if present earlier; not necessary

const viewEditBtn = document.getElementById('view-edit-btn');
const viewSaveBtn = document.getElementById('view-save-btn');
const viewCloseBtn = document.getElementById('view-close-btn');
const viewCategories = document.querySelectorAll('#edit-category-options input');

let currentRecipeId = null;
let latestSelectedFile = null;   // holds File object chosen in modal
let latestPreviewDataUrl = null; // holds the temporary preview data URL

// helper — disable/enable all fields in right & steps
function toggleViewFields(enable) {
    viewTitleEl.disabled = !enable;
    viewDescriptionEl.disabled = !enable;
    viewIngredientsEl && (viewIngredientsEl.disabled = !enable);
    viewStepsEl.disabled = !enable;
    viewPrepEl.disabled = !enable;
    viewDifficultyEl.disabled = !enable;
    viewImageURLEl.disabled = !enable;
    // viewImageFileInput.disabled = !enable;
    viewCategories.forEach(input => {
        input.disabled = !enable;
    });
}

// format steps object -> numbered lines "1: text\n2: text"
function formatStepsForTextarea(stepsObj) {
    let lines = [];
    Object.keys(stepsObj).sort((a,b) => Number(a) - Number(b)).forEach(key => {
        lines.push(`${key}: ${stepsObj[key]}`);
    });
    return lines.join('\n');
}

// parse textarea lines back -> steps object {1: "...", 2: "..."}
function parseStepsFromTextarea(txt) {
    const lines = txt.split('\n').map(l => l.trim()).filter(l => l);
    const stepsObj = {};
    lines.forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex !== -1) {
        const numStr = line.substring(0, colonIndex).trim();
        const rest = line.substring(colonIndex + 1).trim();
        if (numStr && !isNaN(numStr)) {
            stepsObj[numStr] = rest;
        }
        }
    });
    return stepsObj;
}

// open view modal and populate fields
function openRecipeViewModal(recipeId) {
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const recipe = recipes.find(r => String(r.id) === String(recipeId));
    if (!recipe) return;

    currentRecipeId = recipe.id;
    latestPreviewDataUrl = null;

    // Fill inputs
    viewTitleEl.value = recipe.title || '';
    viewDescriptionEl.value = recipe.description || '';
    if (viewIngredientsEl)
        viewIngredientsEl.value = Array.isArray(recipe.ingredients)
            ? recipe.ingredients.join(', ')
            : recipe.ingredients || '';

    viewStepsEl.value = formatStepsForTextarea(recipe.steps || {});
    viewPrepEl.value = recipe.maxPrepTime || '';
    viewDifficultyEl.value = recipe.difficulty || '';

    document.querySelectorAll("#edit-category-options input").forEach(input => {
        input.checked = recipe.categories && recipe.categories.includes(input.value);
    });

    // 🔥 FIXED IMAGE PREVIEW
    if (recipe.image && recipe.image.trim() !== "") {
        viewImagePreview.src = recipe.image;
    } else {
        viewImagePreview.src = "assets/images/default.png";
    }

    // 🔥 FIXED IMAGE URL FIELD
    document.getElementById("view-image-url").value = recipe.image || "";

    

    // Disable fields initially
    toggleViewFields(false);
    viewEditBtn.style.display = "inline-block";
    viewSaveBtn.style.display = "none";

    viewModalEl.style.display = "flex";
    viewModalEl.setAttribute("aria-hidden", "false");
}

// LIVE UPDATE IMAGE PREVIEW when URL changes
viewImageURLEl.addEventListener("input", () => {
    const val = viewImageURLEl.value.trim();

    if (val.length === 0) {
        viewImagePreview.src = "assets/images/default.png";
        return;
    }

    // Try setting preview
    viewImagePreview.src = val;
});


// Edit button -> enable fields and switch to Save
viewEditBtn.addEventListener('click', () => {
    toggleViewFields(true);
    viewEditBtn.style.display = 'none';
    viewSaveBtn.style.display = 'inline-block';
    // focus first field
    viewTitleEl.focus();
});

// Save button -> write edits back to localStorage and re-render
viewSaveBtn.addEventListener('click', () => {
    const title = viewTitleEl.value.trim();
    const description = viewDescriptionEl.value.trim();
    const stepsText = viewStepsEl.value.trim();
    const prep = viewPrepEl.value.trim();
    const difficulty = viewDifficultyEl.value.trim();
    const imageUrl = viewImageURLEl.value.trim();

    if (!title || !stepsText || !prep) {
        alert('Error. Input fields are empty.');
        return;
    }

    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const idx = recipes.findIndex(r => String(r.id) === String(currentRecipeId));
    if (idx === -1) { alert('Recipe not found'); return; }

    const stepsObj = parseStepsFromTextarea(stepsText);

    let finalImage = recipes[idx].image;
    if (imageUrl) finalImage = imageUrl;

    // ⭐ NEW — categories
    const updatedCategories = [...document.querySelectorAll("#edit-category-options input:checked")]
        .map(c => c.value);

    // Update recipe object
    recipes[idx].title = title;
    recipes[idx].description = description;
    recipes[idx].ingredients = viewIngredientsEl
        ? viewIngredientsEl.value.split(',').map(s => s.trim()).filter(Boolean)
        : recipes[idx].ingredients;

    recipes[idx].steps = stepsObj;
    recipes[idx].maxPrepTime = prep;
    recipes[idx].difficulty = difficulty;
    recipes[idx].image = finalImage;
    recipes[idx].categories = updatedCategories;  // ⭐ added

    localStorage.setItem('recipes', JSON.stringify(recipes));

    showLoadingSpinner();
    renderRecipes();
    viewModalEl.style.display = "none";
});



// close modal
viewCloseBtn.addEventListener('click', () => {
    viewModalEl.style.display = 'none';
    viewModalEl.setAttribute('aria-hidden','true');
});

// close on overlay click
viewModalEl.addEventListener('click', (e) => {
    if (e.target === viewModalEl) {
        viewModalEl.style.display = 'none';
        viewModalEl.setAttribute('aria-hidden','true');
    }
});

// open modal when clicking Read More (delegated)
document.addEventListener('click', (e) => {
    if (e.target && e.target.classList && e.target.classList.contains('read-more')) {
        const id = e.target.getAttribute('data-id');
        openRecipeViewModal(id);
    }
});

let deleteRecipeId = null;

// When clicking delete button on card
document.addEventListener("click", function (e) {
    const btn = e.target.closest(".delete-recipe-btn");

    if (btn) {
        deleteRecipeId = btn.getAttribute("data-id");
        document.getElementById("delete-modal").style.display = "flex";
    }
});


// Cancel delete
document.getElementById("cancel-delete").addEventListener("click", () => {
    document.getElementById("delete-modal").style.display = "none";
    deleteRecipeId = null;
});

// Confirm delete
document.getElementById("confirm-delete").addEventListener("click", () => {
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    const newList = recipes.filter(r => String(r.id) !== String(deleteRecipeId));

    localStorage.setItem("recipes", JSON.stringify(newList));

    // Fade-out animation for card
    const card = document.querySelector(`.delete-recipe-btn[data-id="${deleteRecipeId}"]`)
        .closest(".recipe-card-ui");

    if (card) {
        card.classList.add("fade-out");

        setTimeout(() => {
            renderRecipes();
        }, 350);
    }

    deleteRecipeId = null;

    // Close modal
    document.getElementById("delete-modal").style.display = "none";

    // Show toast
    showToast("delete");
});

// Toast function
function showToast(functionality) {
    const toast = document.getElementById("toast");
    toast.classList.add("show");

    if(functionality === "delete"){
        toast.textContent = "Recipe Deleted!!";
    }

    if(functionality === "add"){
        toast.textContent = "Recipe Added!!";
    }

    setTimeout(() => {
        toast.classList.remove("show");
    }, 1800);
}

/* ================================
SEARCH + FILTER FUNCTIONALITY
================================= */

const searchInput = document.querySelector(".search");
const difficultyFilter = document.querySelector(".difficulty-filter");
const prepFilter = document.querySelector(".prep-filter");


function applyFilters() {
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    const searchVal = searchInput.value.toLowerCase();
    const diffVal = difficultyFilter.value;
    const prepVal = prepFilter.value;
    const title = document.querySelector(".section-title");

    const headings = {
        "Easy": "Easy Difficulty Recipes",
        "Medium": "Medium Difficulty Recipes",
        "Hard": "Hard Difficulty Recipes",
        "All": "All Recipes"
    };

    title.textContent = headings[diffVal];

    const container = document.getElementById("recipe-container");
    container.innerHTML = ""; // Clear all cards

    const filtered = recipes.filter(recipe => {

        // ---------- SEARCH ----------
        if (searchVal !== "") {
            const matchText =
                `${recipe.title} ${recipe.description} ${recipe.ingredients.join(" ")}`.toLowerCase();
            if (!matchText.includes(searchVal)) return false;
        }

        // ---------- DIFFICULTY ----------
        if (diffVal !== "All" && recipe.difficulty !== diffVal) {
            return false;
        }

        // ---------- PREP TIME ----------
        if (prepVal !== "All") {
            const recipeTime = parseInt(recipe.maxPrepTime);
            if (recipeTime > parseInt(prepVal)) return false;
        }

        return true;
    });

    // No results → show empty message
    if (filtered.length === 0) {
        container.innerHTML = `<p class="no-results">No recipes match your filters.</p>`;
        
        // Still add the Add-card so user can add new recipe
        const addCard = document.createElement("div");
        addCard.classList.add("add-card");
        addCard.id = "open-add";
        addCard.textContent = "+ Add another Recipe";
        addCard.addEventListener("click", () => openModal('add'));
        container.appendChild(addCard);

        return;
    }

    // Render filtered recipes
    filtered.forEach(recipe => {
        const card = document.createElement("div");
        card.classList.add("recipe-card-ui");

        card.innerHTML = `
            <div class="recipe-img">
                <img src="${recipe.image}" alt="${recipe.title}">

                <div class="difficulty-container">
                    <span class="chip difficulty-chip" style="
                        background:${recipe.difficulty === "Easy" ? "#38b000" :
                                    recipe.difficulty === "Medium" ? "#e4b61a" : "#ba181b"};
                        color:white;">
                        ${recipe.difficulty}
                    </span>
                </div>
            </div>

            <div class="recipe-info">
                <h3 class="recipe-title">${recipe.title}</h3>

                <div class="category-chip">
                    ${recipe.categories ? recipe.categories[0] : "Category"}
                </div>

                <p class="recipe-prep">Max Prep Time: ${recipe.maxPrepTime}</p>

                <div class="recipe-container-actions">
                    <a class="read-more" data-id="${recipe.id}">Read More</a>

                    <button class="delete-recipe-btn" data-id="${recipe.id}" title="Delete Recipe">
                        <svg class="trash-svg" width="22" height="30" viewBox="0 0 24 24">
                            
                            <!-- LID -->
                            <path class="trash-lid"
                                d="M9 4h6v2H9z"
                                fill="white"/>

                            <!-- Container -->
                            <path class="trash-body"
                                d="M5 6h14l-1 14H6L5 6z"
                                fill="white"/>

                            <!-- Vertical lines -->
                            <path d="M10 10v6" stroke="#c93a43" stroke-width="2" stroke-linecap="round"/>
                            <path d="M14 10v6" stroke="#c93a43" stroke-width="2" stroke-linecap="round"/>

                        </svg>
                    </button>


                </div>
            </div>
        `;

        container.appendChild(card);
    });

    /* ===================================
       ⭐ ALWAYS append Add-Recipe card
       =================================== */
    const addCard = document.createElement("div");
    addCard.classList.add("add-card");
    addCard.id = "open-add";
    addCard.textContent = "+ Add another Recipe";

    // Reattach modal click
    addCard.addEventListener("click", () => openModal('add'));

    container.appendChild(addCard);
}



// live event listeners
searchInput.addEventListener("input", applyFilters);
difficultyFilter.addEventListener("change", applyFilters);
prepFilter.addEventListener("change", applyFilters);



document.addEventListener("DOMContentLoaded",() => {
    loadLocalStorage();
    renderRecipes();
});