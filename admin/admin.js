
let columns = [
  "ID",
  "Наименование",
  "Описание",
  "Изображение",
  "Категория",
  "Вес/Объем",
  "Цена",
];
const form = document.getElementsByTagName("form")[0];
let login, password;

form.onsubmit = (e) => {
  login = form.getElementsByTagName("input")[0].value;
  password = form.getElementsByTagName("input")[1].value;
  e.preventDefault();

  getData(login, password);
};

function getData(login, password) {
  fetch(`http://localhost:3000/admin?login=${login}&password=${password}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка");
      }
      return response.json();
    })
    .then((data) => {
      loadAdminPanel(data);
      localStorage.setItem("data", data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error.message);
    });
}

let container;
function loadAdminPanel(data) {
  container = document.getElementsByClassName("container")[0];
  container.innerHTML = `
    <h2>Все записи</h2>
  `;
  createTable(columns);
  fillTable(data);
  addButtons();
}

function createTable(columns) {
  let table = document.createElement("table");
  let tableRow = document.createElement("tr");
  for (let i = 0; i < columns.length; i++) {
    let tableHead = document.createElement("th");
    tableHead.innerText = columns[i];
    tableRow.appendChild(tableHead);
  }
  table.appendChild(tableRow);
  container.appendChild(table);
}

function fillTable(data) {
  let table = document.getElementsByTagName("table")[0];
  for (let x = 0; x < data.length; x++) {
    let tableRow = document.createElement("tr");
    let tableCell = document.createElement("td");
    let image = document.createElement("img");
    image.src = `./bin.png`;
    image.onclick = () => {
      deleteItem(data[x].id);
    };
    tableCell.innerText = data[x].id;
    tableCell.appendChild(image);
    tableRow.appendChild(tableCell);
    tableCell = document.createElement("td");
    tableCell.innerText = data[x].name;
    tableRow.appendChild(tableCell);
    tableCell = document.createElement("td");
    tableCell.innerText = data[x].description;
    tableRow.appendChild(tableCell);
    tableCell = document.createElement("td");
    image = document.createElement("img");
    image.src = `../cardsImg/${data[x].img_url}`;
    tableCell.appendChild(image);
    tableRow.appendChild(tableCell);
    tableCell = document.createElement("td");
    tableCell.innerText = data[x].category;
    tableRow.appendChild(tableCell);
    tableCell = document.createElement("td");
    tableCell.innerText = data[x].weight;
    tableRow.appendChild(tableCell);
    tableCell = document.createElement("td");
    tableCell.innerText = data[x].price;
    tableRow.appendChild(tableCell);

    table.appendChild(tableRow);
  }
}

function addButtons() {
  let addButton = document.createElement("div");
  addButton.innerText = "Добавить";
  addButton.onclick = addItem;
  addButton.classList.add("addBtn");
  container.appendChild(addButton);
}

function deleteItem(id) {
  if (!confirm(`Вы уверены что хотите удалить экспонат под номером ${id}?`)) {
    return;
  }
  fetch(`http://localhost:3000/admin/delete?id=${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка");
      }
      return response.json();
    })
    .then((data) => {
      getData(login, password);
    })
    .catch((error) => {
      console.error("Error fetching data:", error.message);
    });
}

const modal = document.getElementsByClassName("modal-back")[0];
function addItem() {
  modal.classList.toggle("open");
  modal.onclick = (e) => {
    let element = e.target;
    if (element.classList.contains("modal-back")) {
      modal.classList.toggle("open");
    }
  };
}

const addForm = document.getElementsByClassName(
  "modal-content"
)[0];

let name, description, fileName, category, weight, price;
addForm.onsubmit = (e) => {
  e.preventDefault();
  let nameInput = document.querySelector("#name");
  name = nameInput.value;
  let descriptionInput = document.querySelector(
    "#description"
  );
  description = descriptionInput.value;
  let fileInput = document.querySelector("#file");
  loadEnvFile(fileInput);

  let categoryInput = document.querySelector("#category");
  category = categoryInput.value;
  let weightInput = document.querySelector("#weight");
  weight = weightInput.value;
  let priceInput = document.querySelector("#price");
  price = priceInput.value;

  nameInput.value = "";
  descriptionInput.value = "";
  fileInput.value = "";
  categoryInput.value = "";
  weightInput.value = "";
  priceInput.value = "";
  addItem();
};

function loadEnvFile(fileInput) {
  const inputFile = fileInput.files[0];
  if (inputFile) {
    const formData = new FormData();
    formData.append("file", inputFile);

    fetch("http://localhost:3000/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        fileName = JSON.parse(data).filename;
        sendData({
          name: name,
          description: description,
          fileName: fileName,
          category: category,
          weight: weight,
          price: price,
        });
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  } else {
    alert("Please select a file first.");
  }
}

function sendData(formData) {
  fetch("http://localhost:3000/addItem", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.text())
    .then((data) => {
      getData(login, password);
    })
    .catch((error) => {
      console.error("Error uploading file:", error);
    });
}