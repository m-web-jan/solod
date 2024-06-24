getData('Горячее');

function getData(category) {
  fetch(`http://localhost:3000/menu?categoryId=${category}`)
    .then((response) => response.json())
    .then((data) => {
      displayProductCards(data);
    })
    .catch((error) => console.error("Error fetching data:", error));
}


function displayProductCards(data) {
    const cards = document.getElementsByClassName('main-content')[0];
    cards.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        const rubels = Math.floor(data[i].price);
        const kopeiki = (data[i].price - rubels) * 100;
        const card = document.createElement('div');
        card.classList.add('card-eda');
        card.innerHTML = `
            <div class="img">
          <img src="./img/${data[i].img_url}" alt="menuImg">
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
        cards.appendChild(card);
    }
}

const categoryBtns = document.getElementsByClassName('bnt-menu');
for (let i = 0; i < categoryBtns.length; i++) {
    categoryBtns[i].onclick = () => {
        for (let x = 0; x < categoryBtns.length; x++) {
            categoryBtns[x].classList.remove('active');
        }
        getData(categoryBtns[i].id);
        categoryBtns[i].classList.add('active');
    }
}