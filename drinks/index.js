import { ageVerificationPopup } from "../js/ageVerificationPopup.js";

async function getData(category, classes) {
  fetch(`http://localhost:3000/menu?categoryId=${category}`)
    .then((response) => response.json())
    .then((data) => {
      displayDrinks(data, classes);
    })
    .catch((error) => console.error("Error fetching data:", error));
}

function displayDrinks(data, classes) {
  const cards = document.getElementsByClassName(classes[0])[0];
  for (let i = 0; i < data.length; i++) {
    let rubels = Math.floor(data[i].price);
    let kopeiki = ((data[i].price - rubels) * 100).toFixed(0);
    if (data[0].price[data[0].price.length - 1] == "°") {
      rubels = "";
      kopeiki = "";
    }
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
              <p>${data[i].weight !== "" ? +data[i].weight + "мл." : ""}</p>
            </div>
            <div class="napitki-price">
              <p>${
                rubels == ""
                  ? data[i].price
                  : rubels + "Р<small> " + kopeiki + "К</small>"
              }</p>
            </div>
            `;
    cards.appendChild(card);
  }
}

getData("Напитки", [
  "napitki-head",
  "alk-content",
  "napitki-name",
  "napitki-description",
]);
getData("Чай", [
  "tea-block",
  "alk-content",
  "napitki-name",
  "napitki-description",
]);
getData("Кофе", [
  "coffe-block",
  "alk-content",
  "napitki-name",
  "napitki-description",
]);
getData("Настойки", [
  "name-product",
  "alk-content",
  "napitki-name",
  "napitki-description",
]);
getData("Наливки", [
  "name-product1",
  "alk-content",
  "napitki-name",
  "napitki-description",
]);
getData("Сет", ["sets-head", "sets-content", "sets-name", "sets-description"]);


const check = getCookie('adult');
if (!check) {
  ageVerificationPopup();
  setCookie('adult', 3600);
}

function setCookie(name, expiresIn) {
  const deadTokenDate = new Date(Date.now() + expiresIn * 1000).toUTCString();
  document.cookie = `${name}=${true}; expires=${deadTokenDate}; path=/`;
};

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
