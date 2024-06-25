import { ageVerificationPopup } from "../js/ageVerificationPopup.js";

async function getData(category, classes) {
  fetch(`http://localhost:3000/menu?categoryId=${category}`)
    .then((response) => response.json())
    .then((data) => {
      // if (category === "Напитки") {
        displayDrinks(data, classes);
      // } else if (category === "Чай") {
      //   displayDrinks1(data);
      // } else if (category === "Кофк") {
      //   displayDrinks1(data);
      // }
    })
    
    .catch((error) => console.error("Error fetching data:", error));
}

// const categories = ["Чай", "Кофе", "Напитки", "Наливки", "Настойки", "Сет", "Разливное", "Бутылочное", "Водка", "Коньяк", "Вино", "Игристое"];

// for (let i = 0; i < categories.length; i++) {
//   getData(categories[i]);
// }

// function displayDrinks(data, title) {
//   const cards = document.getElementsByClassName("drinks")[0];
//   const categoryBlock = document.createElement("div");
//   categoryBlock.classList.add("category-block");
//   categoryBlock.classList.add(title);
//   const categoryTitle = document.createElement("h2");
//   categoryTitle.innerText = title;
//   categoryBlock.appendChild(categoryTitle);

//   for (let i = 0; i < data.length; i++) {
//     const card = document.createElement("div");
//     const rubels = Math.floor(data[i].price);
//     const kopeiki = ((data[i].price - rubels) * 100).toFixed(0);
//     card.classList.add("drinkCard");
//     card.innerHTML = `
//     <div class="name">
//       <h2>${data[i].name}</h2>
//       <p>${data[i].description}</p>
//     </div>
//     <p class="volume">${data[i].weight} мл.</p>
//     <p class="price">${rubels}р ${kopeiki}к</p>
//     `;

//     categoryBlock.appendChild(card);
//   }
//   cards.appendChild(categoryBlock);
// }

// Мой бред



function displayDrinks(data, classes) {
  const cards = document.getElementsByClassName(classes[0])[0];
  for (let i = 0; i < data.length; i++) {
    const rubels = Math.floor(data[i].price);
    const kopeiki = ((data[i].price - rubels) * 100).toFixed(0);
    const card = document.createElement("div");
    card.classList.add(classes[1]);
    card.innerHTML = `
    <div class="${classes[2]}">
              <p>${data[i].name}</p>
              <div class="${classes[3]}">
                <p>${data[i].description}</p>
              </div>
            </div>
            <div class="napitki-weight">
              <p>${data[i].weight} мл.</p>
            </div>
            <div class="napitki-price">
              <p>${rubels}Р<small>${kopeiki}К</small></p>
            </div>
            `;
    cards.appendChild(card);
  }
}

getData("Напитки", ['napitki-head', 'alk-content', 'napitki-name', 'napitki-description']);
getData("Чай", ['tea-block', 'alk-content', 'napitki-name', 'napitki-description']);
getData("Кофе", ['coffe-block', 'alk-content', 'napitki-name', 'napitki-description']);



// ageVerificationPopup();
