document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/data")
    .then((response) => response.json())
    .then((data) => {
      displayCards(data);
    })
    .catch((error) => console.error("Error fetching data:", error));
});

function displayCards(data) {
  const cardsBlock = document.getElementsByClassName("main-content")[0].getElementsByClassName("row")[0];
  for (let i = 0; i < data.length; i++) {
    let card = document.createElement("div");
    card.classList.add("col-lg-4");
    card.classList.add("col-md-6");
    card.classList.add("col-12");
    let cardBody = document.createElement("div");
    cardBody.classList.add("product-card");
    let cardImg = document.createElement("div");
    cardImg.classList.add("product-photo");
    let img = document.createElement("img");
    img.src = `./cardsImg/${data[i].img_url}.png`;
    let details = document.createElement("div");
    details.classList.add("product-details");
    let cardTitle = document.createElement("h4");
    cardTitle.innerText = `${data[i].name}`;
    let cardText = document.createElement("p");
    cardText.innerText = `${data[i].description}`;
    let productWeight = document.createElement("div");
    productWeight.classList.add("product-ves");
    let productWeight1 = document.createElement("p");
    productWeight1.innerText = "вес";
    let productWeight2 = document.createElement("p");
    productWeight2.innerText = `${data[i].weight}г.`;
    let cardBottom = document.createElement("div");
    cardBottom.classList.add("product-bottom-details");
    cardBottom.classList.add("d-flex");
    let cardPrice = document.createElement("div");
    cardPrice.classList.add("product-price");
    let rubles = Math.floor(data[i].price);
    let kopecks = data[i].price - rubles;
    cardPrice.innerHTML = `${rubles}Р <small>${kopecks}К</small>`;

    cardBottom.appendChild(cardPrice);
    productWeight.appendChild(productWeight1);
    productWeight.appendChild(productWeight2);
    details.appendChild(cardTitle);
    details.appendChild(cardText);
    details.appendChild(productWeight);
    details.appendChild(cardBottom);
    cardImg.appendChild(img);
    cardBody.appendChild(cardImg);
    cardBody.appendChild(details);
    card.appendChild(cardBody);
    cardsBlock.appendChild(card);
  }
}
