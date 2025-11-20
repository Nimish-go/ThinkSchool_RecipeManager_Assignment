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
form.addEventListener('submit', (e) => {
    e.preventDefault();
  // UI-only: close modal after "save"
    closeModal();
});

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
            "difficulty": "Hard",
            "maxPrepTime": "45 mins"
        }
    ];

    localStorage.setItem("recipes",JSON.stringify(recipes));
    }
}

function renderRecipes(filter = "All", search = "None") {
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    const container = document.getElementById("recipe-container");
    container.innerHTML = ""; // clear container

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
                        (recipe.difficulty === "Medium") ? "#f5cc00" : "#ba181b"
                    };
                    color: #fff;
                    ">${recipe.difficulty}</span>
                </div>
            </div>

            <div class="recipe-info">
                <h3 class="recipe-title">${recipe.title}</h3>
                <p class="recipe-prep">Max Prep Time: ${recipe.maxPrepTime}</p>

                <div class="recipe-container-actions">
                    <a class="read-more" data-id="${recipe.id}">Read More</a>
                    <button class="delete-recipe-btn" data-id="${recipe.id}">Delete Recipe</button>
                </div>
            </div>
        `;

        container.appendChild(card);
    });
}

/** Add Recipe Modal */

const addRecipeForm = document.querySelector(".modal-form");

{/* <div id="recipe-modal" class="modal-overlay" aria-hidden="true">
        <div class="modal-box" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <h2 id="modal-title" class="modal-title">Add Recipe</h2>

            <form class="modal-form" id="recipe-form" autocomplete="off">
                <label for="title">Title</label>
                <input id="title" name="title" type="text" placeholder="Recipe title">

                <label for="description">Description</label>
                <textarea id="description" name="description" placeholder="Short description"></textarea>

                <label for="ingredients">Ingredients (comma-separated)</label>
                <textarea id="ingredients" name="ingredients" placeholder="egg, flour, milk"></textarea>

                <label for="steps">Steps</label>
                <textarea id="steps" name="steps" placeholder="Step 1, Step 2..."></textarea>

                <label for="prep">Prep Time (mins)</label>
                <input id="prep" name="prep" type="number" min="0" placeholder="e.g. 20">

                <label for="difficulty">Difficulty</label>
                <select id="difficulty" name="difficulty">
                    <option value="Easy">Easy</option>
                    <option value="Medium" selected>Medium</option>
                    <option value="Hard">Hard</option>
                </select>

                <label for="image">Image URL (optional)</label>
                <input id="image" name="image" type="text" placeholder="https://...">

                <button type="submit" class="modal-save-btn">Save Recipe</button>
            </form>

            <button class="modal-close-btn" id="modal-close">Close</button>
        </div>
    </div> */}

addRecipeForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Form fields
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const ingredientsInput = document.getElementById("ingredients").value.trim();
    const stepsInput = document.getElementById("steps").value.trim();
    const prepTime = document.getElementById("prep").value.trim();
    const difficulty = document.getElementById("difficulty").value;
    const imageURL = document.getElementById("image").value.trim();

    // 1️⃣ VALIDATION — if any required field is empty
    if (
        !title ||
        !description ||
        !ingredientsInput ||
        !stepsInput ||
        !prepTime ||
        !difficulty
    ) {
        alert("Error. Input fields are empty.");
        return;
    }

    const ingredients = ingredientsInput.split(",").map(i => i.trim()).filter(i => i !== "");

    const stepsArr = stepsInput.split(".").map(s => s.trim()).filter(s => s !== "");
    const stepsObj = {};
    stepsArr.forEach((step, index) => {
        stepsObj[index + 1] = step;
    });

    const newRecipe = {
        id: now(),
        title,
        description,
        ingredients,
        steps: stepsObj,
        maxPrepTime: prepTime + " mins",
        difficulty,
        image: imageURL
    };

    // Get existing recipes
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

    // Push new recipe
    recipes.push(newRecipe);

    // Save back to localStorage
    localStorage.setItem("recipes", JSON.stringify(recipes));

    // Re-render updated cards
    renderRecipes();

    // Close modal
    closeModal();

    // Reset form
    addRecipeForm.reset();

    console.log("Recipe added!");
});

/** View/Edit Modal */
/* ---------- View/Edit Modal Logic (open, preview file instantly, edit/save) ---------- */

const viewModalEl = document.getElementById('view-modal');
const viewImagePreview = document.getElementById('view-image-preview');
const viewImageFileInput = document.getElementById('view-image-file');

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
  viewImageFileInput.disabled = !enable;
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
  latestSelectedFile = null;
  latestPreviewDataUrl = null;

  // fill fields
  viewTitleEl.value = recipe.title || '';
  viewDescriptionEl.value = recipe.description || '';
  if (viewIngredientsEl) viewIngredientsEl.value = (Array.isArray(recipe.ingredients) ? recipe.ingredients.join(', ') : (recipe.ingredients || ''));
  viewStepsEl.value = formatStepsForTextarea(recipe.steps || {});
  viewPrepEl.value = recipe.maxPrepTime || '';
  viewDifficultyEl.value = recipe.difficulty || '';

  // preview image: if we previously used file preview store, use that; otherwise show recipe.image
  if (recipe.image) {
    // show the path (if file not actually present it may break on refresh but preview works after upload)
    viewImagePreview.src = recipe.image;
  } else {
    viewImagePreview.src = 'assets/images/default.png';
  }

  // fields initially disabled
  toggleViewFields(false);
  viewEditBtn.style.display = 'inline-block';
  viewSaveBtn.style.display = 'none';

  // show modal
  viewModalEl.style.display = 'flex';
  viewModalEl.setAttribute('aria-hidden','false');
}

// instant preview when user chooses a file in modal (does not save yet)
viewImageFileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(evt) {
        latestPreviewDataUrl = evt.target.result; // Base64
        viewImagePreview.src = latestPreviewDataUrl;
    };
    reader.readAsDataURL(file);
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
    // basic validation
    const title = viewTitleEl.value.trim();
    const description = viewDescriptionEl.value.trim();
    const stepsText = viewStepsEl.value.trim();
    const prep = viewPrepEl.value.trim();
    const difficulty = viewDifficultyEl.value.trim();

    if (!title || !stepsText || !prep) {
        alert('Error. Input fields are empty.');
        return;
    }

    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const idx = recipes.findIndex(r => String(r.id) === String(currentRecipeId));
    if (idx === -1) { alert('Recipe not found'); return; }

    // Parse steps "1: text"
    const stepsObj = parseStepsFromTextarea(stepsText);

    // DEFAULT: keep the OLD image
    let finalImage = recipes[idx].image;

    // If user uploaded a new image file → use Base64
    if (latestPreviewDataUrl) {
        finalImage = latestPreviewDataUrl;  // Base64 data
    }

    // update recipe values
    recipes[idx].title = title;
    recipes[idx].description = description;
    recipes[idx].ingredients = (
        viewIngredientsEl
            ? viewIngredientsEl.value.split(',').map(s => s.trim()).filter(Boolean)
            : recipes[idx].ingredients
    );
    
    recipes[idx].steps = stepsObj;
    recipes[idx].maxPrepTime = prep;
    recipes[idx].difficulty = difficulty;
    recipes[idx].image = finalImage;   // ✔ Important: only use finalImage

    // Save back to localStorage
    localStorage.setItem('recipes', JSON.stringify(recipes));

    // Update UI
    if (typeof renderRecipes === 'function') renderRecipes();

    // Close modal
    viewModalEl.style.display = 'none';
    viewModalEl.setAttribute('aria-hidden','true');

    // Reset
    latestSelectedFile = null;
    latestPreviewDataUrl = null;
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
    if (e.target.classList.contains("delete-recipe-btn")) {
        deleteRecipeId = e.target.getAttribute("data-id");
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
    showToast();
});

// Toast function
function showToast() {
    const toast = document.getElementById("toast");
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 1800);
}



document.addEventListener("DOMContentLoaded",() => {
    loadLocalStorage();
    renderRecipes();
});
