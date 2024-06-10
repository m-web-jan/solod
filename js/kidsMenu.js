import { displayCards, sendRequest } from "./controller.js";

function loadCard() {
  fetch(`http://localhost:3000/menu?categoryId=Еда`)
    .then((response) => response.json())
    .then((data) => {
      displayCards(data);
    })
    .catch((error) => console.error("Error fetching data:", error));
}
loadCard();

let categoryBtns = document.getElementsByClassName("bnt-menu");
for (let i = 0; i < categoryBtns.length; i++) {
  categoryBtns[i].onclick = () => {
    for (let i = 0; i < categoryBtns.length; i++) {
      categoryBtns[i].classList.remove("active");
    }
    categoryBtns[i].classList.add("active");

    sendRequest(categoryBtns[i].id, "menu");
  };
}
