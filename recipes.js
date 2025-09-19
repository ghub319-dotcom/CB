const ICONS = {
  Vegetarian: "assets/quinoa-salad.jpg",
  Meat: "assets/meat.png",
  Vegan: "assets/vegan.png"
};

const RECIPES = [
  {
    id: 1,
    title: 'Quinoa Salad',
    category: 'Vegetarian',
    desc: 'Quick quinoa salad.',
    img: 'assets/q1.svg',
    ingredients: ['1 cup quinoa','2 cups water','Veggies'],
    steps: ['Boil quinoa','Mix veggies'],
    nutrition: { cal: 350, carb: 45, prot: 10, fat: 12 }
  },
  {
    id: 2,
    title: 'Grilled Chicken',
    category: 'Meat',
    desc: 'Chicken with veg.',
    img: 'assets/chicken.svg',
    ingredients: ['150g chicken','Veggies'],
    steps: ['Grill chicken','Cook veg'],
    nutrition: { cal: 420, carb: 20, prot: 38, fat: 18 }
  },
  {
    id: 3,
    title: 'Berry Smoothie',
    category: 'Vegan',
    desc: 'Blend fruits.',
    img: 'assets/smoothie.svg',
    ingredients: ['Berries','Banana','Oat milk'],
    steps: ['Blend all'],
    nutrition: { cal: 220, carb: 45, prot: 4, fat: 3 }
  }
];

const box = document.getElementById('recipes'),
      modal = document.getElementById('modal'),
      inner = document.getElementById('modal-inner'),
      search = document.getElementById('search'),
      filterSel = document.getElementById('filter'),
      clearBtn = document.getElementById('clear');

function show(list) {
  box.innerHTML = list.map(r => `
    <div class="card">
      <img src="${r.img}" style="width:100%;height:120px;object-fit:cover">
      <h4>${r.title}</h4>
      <img src="${ICONS[r.category]}" style="width:25px">
      <p>${r.desc}</p>
      <button onclick="openRecipe(${r.id})">Open</button>
    </div>`).join('');
}

show(RECIPES);

function openRecipe(id) {
  const r = RECIPES.find(x => x.id === id);
  inner.innerHTML = `
    <h3>${r.title}</h3>
    <img src="${ICONS[r.category]}" style="width:25px">
    <ul>${r.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
    <ol>${r.steps.map(s => `<li>${s}</li>`).join('')}</ol>
    <table border="1">
      <tr><th>Cal</th><th>Carb</th><th>Protein</th><th>Fat</th></tr>
      <tr>
        <td>${r.nutrition.cal}</td>
        <td>${r.nutrition.carb}</td>
        <td>${r.nutrition.prot}</td>
        <td>${r.nutrition.fat}</td>
      </tr>
    </table>
    <button onclick="modal.classList.add('hidden')">Close</button>`;
  modal.classList.remove('hidden');
}

search.oninput = () => filter();
filterSel.onchange = () => filter();

clearBtn.onclick = () => {
  search.value = '';
  filterSel.value = '';
  show(RECIPES);
};

function filter() {
  let v = search.value.toLowerCase(),
      f = filterSel.value;
  show(
    RECIPES.filter(r =>
      r.title.toLowerCase().includes(v) &&
      (!f || r.category === f)
    )
  );
}

// close modal if background clicked
modal.onclick = (e) => {
  if (e.target.id === 'modal') {
    modal.classList.add('hidden');
  }
};
