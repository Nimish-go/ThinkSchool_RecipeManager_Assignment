## 📖 MealByte — Your Personal Kitchen Companion

**A clean, responsive Recipe Manager Web App built with HTML, CSS, and JavaScript, storing all data in the browser using localStorage.**

## 📁 Project Structure
```
MealByte-Recipe-Manager/
│
├── index.html                 # Main application UI
├── README.md                  # Documentation
│
├── assets/
│   ├── images/                # Recipe images + default placeholder
│   │   ├── alfredo-pasta-1.jpeg
│   │   ├── alfredo-pasta.jpeg
│   │   ├── chicken-curry.jpeg
│   │   ├── default.png
│   │   └── egg_fried_rice.png
│   │
│   ├── scripts/
│   │   └── index.js           # Application logic (CRUD, modals, filters, LS)
│   │
│   └── stylesheets/
│       └── main.css           # Full styling (layout, animations, components)
│
```

## ✨Features

**📝Add Recipes**
- Add title, description, ingredients, steps, prep time, difficulty & image URL

- Simulated 5-second loading animation (“Cooking your recipe…”)

- Toast notification after add

- View Recipe (Detailed Modal)

- Full modal with editable fields

- Numbered steps rendered in structured format

**✏️Edit Recipes**

- "Edit" → unlocks all fields

- "Save" updates the recipe instantly in localStorage

**🗑️Delete Recipes**

- Animate-on-hover trash-bin icon

- Confirmation modal

- Fade-out animation + toast message

**🔍Search & Filter**

- Live search across title, ingredients & description

- Filter by:

    * Difficulty (Easy / Medium / Hard)

    * Maximum Prep Time (10, 20, 30, 60 mins)

**🧩Responsive Card Grid**

- Auto-fitting grid layout

- Add-recipe card stays aligned properly

- Works on all screen sizes

### **(Updated)**
**📊Categorized View of the recipes / Kanban Board**
- Latest Update includes a *Kanban Board* View or you can say a categorized view of recipes.

- You can drag and drop recipes from one category to another. Makes Editing of categories easier.

## 🚀 Getting Started / How to Use?
1. Navigate to **<a href="https://nimish-go.github.io/ThinkSchool_RecipeManager_Assignment/">Here</a>**.

2. In the Homepage, you will see three preloaded recipes to show how will the recipes look after adding to the **localStorage**.

3. If you want to add another recipe, Click on the Add Another Recipe Container. By clicking this it will open a **Add Recipe** Modal.

4. Add every detail as:
    - *Title* : As it is in Text Format.

    - *Description* : As it is in Text Format.

    - *Ingredients* : Comma Seperated Text Format.

    - *Steps* : Each Step on new line Text Format.

    - *Prep Time* : Number Format.

    - *Difficulty* : Default selection is **Medium**, but you can change as it is a dropdown selection.

    - *Image URL* : This is optional. If not provided default image is provided for you. If you wish to *Add Image*, then go to **Google.com**. Search the dish name in the Images Tab. Right Click on an Image and say *Copy image address*.

    - After adding all details, click the **Save Button**, to save the data in *localStorage*.

5. If you want to edit a certain recipe, follow the below steps:
    - Click on "Read More" Link on the recipe card which you wish to edit.

    - After Clicking, a View / Edit Modal will appear. Scroll down in the modal and click the *Edit* Button.

    - After clicking the *Edit* Button, you will see the text fields have been activated. Edit the info you wish to edit.

    - After completing the *Edit*, Click *Save* Button. After Saving, the recipe will get updated. Click on *Read More* Link once more to view your edits.

6. Search and Filter Functionality
    - Click on the Search bar, and search for a recipe by typing the recipe title.

    - The *Searched Recipe* will Render.

    - Click on the dropdown filter of *Filter By Difficulty* or *Max Prep Time*. You can  also filter recipes by selecting filter from both filters.

    - The *Filtered Recipe* will rendered.

### **(Updated)**
7. Accessing Kanban Board
    - Once navigating to the website, you will see the default view of how the recipes will look on the home page. Just below the navbar and above the Search Bar, there are 2 buttons from where we can switch between Default View and Kanban / Categorized View.

    - Click the button with the title Kanban Board. You will be directed to the Kanban Board View.

    - Over here, we can edit the recipe we wish by simply clicking on the recipe. The same view/ edit modal will appear once clicking. We can click *Edit* button in the modal and after the editing is done, we can save the edits by simply clicking the *Save* Button. Also if we want to just change the categories of a recipe, we can simply drag and drop it in different categories.

## 🗂️Data Structure in localStorage
The recipes that are loaded on the Homepage are stored in *localStorage* under the key:

```

recipes

```

The Structure of recipes is an **Array** of different **JSON** objects. A **JSON** Object Structure of an individual recipe looks like

```
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
}
```

**📝Notes**
- An *image* has to be an **URL**.

- *Steps* is numbered Object such as:

```
{1:"...",2:"..."}
```

- *Ingredients* is an array and *Steps* is another nested JSON Object.

- *Id* is auto-generated.

- Editing a Recipe, updates the existing recipe.

## ⚙️Assumptions & Limitations

- The app is offline-first.

- Data exists only in localStorage.

- No backend or authentication layer.

- Steps are manually entered line-by-line.

- User is expected to input a valid image URL.

- Grid automatically adjusts based on number of recipes.

## 🐞Known Issues / Limitations

**No validation for broken image URLs**

    - If the URL is invalid, the card will show a broken image icon.

**LocalStorage Size Limit**

    - Browsers typically allow 5–10MB, limiting large Base64 images.

**No Pagination**

    - Large lists may require scrolling.

**No Cloud Sync**

    - Data does not sync between devices.

**Steps require manual numbering in the Edit Modal**

    - They need to follow the format:

    ```
    1: step
    2: step
    3: step
    ```
