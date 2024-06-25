getData("Еда");
getData("НапиткиД");

async function getData(category) {
  fetch(`http://localhost:3000/menu?categoryId=${category}`)
    .then((response) => response.json())
    .then((data) => {
      if (category === "Еда") {
        displayFood(data);
      } else {
        displayDrinks(data);
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
}

function displayFood(data) {
  const modalBack = document.getElementsByClassName("modal-back")[0];
  modalBack.onclick = (e) => {
    if (e.target.classList.contains("modal-back"))
      modalBack.classList.toggle("close");
  };
  const cards = document.getElementsByClassName("main-content")[0];
  cards.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    const rubels = Math.floor(data[i].price);
    const kopeiki = ((data[i].price - rubels) * 100).toFixed(0);
    const card = document.createElement("div");
    card.classList.add("card-eda");
    card.innerHTML = `
            <div class="img">
          <img src="../cardsImg/${data[i].img_url}" alt="menuImg">
        </div>
        <div class="content">
          <div class="card-name">${data[i].name}</div>
          <div class="card-footer">
            <div class="card-weight">
              <p>Вес:</p>
              <p>${data[i].weight} г.</p>
            </div>
            <div class="card-price">
              <p>Цена:</p>
              <p>${rubels}Р<small>${kopeiki}К</small></p>
            </div>
          </div>
        </div>
        `;

    card.onclick = () => {
      modalBack.classList.toggle("close");
      const name = modalBack.getElementsByTagName("h2")[0];
      name.innerText = data[i].name;
      const text = modalBack.getElementsByTagName("p")[0];
      text.innerText = data[i].description;
      const modalImg = modalBack.getElementsByTagName("img")[0];
      modalImg.src = `../cardsImg/${data[i].img_url}`;
      const price = modalBack.getElementsByClassName("price")[0];
      price.innerText = `${data[i].price} р.`;
      const weight = modalBack.getElementsByClassName("weight")[0];
      weight.innerText = `Вес: ${data[i].weight} г.`;
      console.log(data[i]);
    };
    cards.appendChild(card);
  }
}

function displayDrinks(data) {
  const cards = document.getElementsByClassName("drinks")[0];
  for (let i = 0; i < data.length; i++) {
    const card = document.createElement("div");
    const rubels = Math.floor(data[i].price);
    const kopeiki = ((data[i].price - rubels) * 100).toFixed(0);
    card.classList.add("drinkCard");
    card.innerHTML = `
    <div class="name">
      <h2>${data[i].name}</h2>
      <p>${data[i].description}</p>
    </div>
    <p class="volume">${data[i].weight} мл.</p>
    <p class="price">${rubels}р ${kopeiki}к</p>
    `;

    cards.appendChild(card);
  }
}
