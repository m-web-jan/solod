import { ageVerificationPopup } from "../js/ageVerificationPopup.js";

async function getData(category) {
  fetch(`http://localhost:3000/menu?categoryId=${category}`)
    .then((response) => response.json())
    .then((data) => {
      if (category === "Напитки") {
        displayDrinks(data);
      } else if (category === "Чай") {
        displayDrinks1(data);
      }
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



getData("Напитки")
function displayDrinks(data) {
  const cards = document.getElementsByClassName("napitki-head")[0];
  for (let i = 0; i < data.length; i++) {
    const rubels = Math.floor(data[i].price);
    const kopeiki = ((data[i].price - rubels) * 100).toFixed(0);
    const card = document.createElement("div");
    card.classList.add("alk-content");
    card.innerHTML = `
    <div class="napitki-name">
              <p>${data[i].name}</p>
              <div class="napitki-description">
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

getData("Чай");
function displayDrinks1(data) {
  const cards1 = document.getElementsByClassName("tea-block")[0];
  cards1.innerHTML = '<div class="category"><img src="../img/tea-coffe2.png" alt="" />ЧАЙ</div>';
  for (let i = 0; i < data.length; i++) {
    const rubels1 = Math.floor(data[i].price);
    const kopeiki1 = ((data[i].price - rubels1) * 100).toFixed(0);
    
    const card1 = document.createElement("div");
    card1.classList.add("tea-content");
    card1.innerHTML = `
    <div class="tea-name">
              <p>${data[i].name}</p>
              <div class="tea-description">
                <p>${data[i].description}</p>
              </div>
            </div>
            <div class="tea-weight">
              <p>${data[i].weight} мл.</p>
            </div>
            <div class="tea-price">
              <p>${rubels1}Р<small>${kopeiki1}К</small></p>
            </div>
            `;
    cards1.appendChild(card1);
  }
}


// ageVerificationPopup();
