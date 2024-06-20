export function ageVerificationPopup() {
  let popupBack = document.createElement("div");
  popupBack.classList.add("popup-back");

  popupBack.innerHTML = `
    <form action="#" class="popup-body">
      <div class="top-row">
        <div class="popup_content">
          <h2>Если нет 18 лет, мы скажем тебе нет</h2>
          <p>Информация на сайте предназначена для покупателей старше 18 лет.<br>Вы подтверждаете, что ознакомлены с данной информацией и Вам больше 18?</p>
        </div>
        <img src="./img/agePopupImg.png" alt="popupImg">
      </div>
      <div class="btns">
        <button type='submit'>Да, мне есть 18 лет</button>
        <button type='submit'>Нет, мне меньше 18 лет</button>
      </div>
      <p class="facts">В мире всего 7% левшей.<br>Невозможно чихнуть с открытыми глазами.<br>А мы используем файлы <a href="https://ru.wikipedia.org/wiki/Cookie" target="_black">Cookie</a></p>
      <label>
        <input type="checkbox" required />
        Понятно
      </label>
    </form>
  `;

  document.body.appendChild(popupBack);

  let btnYes = popupBack.getElementsByTagName("button")[0];
  let btnNo = popupBack.getElementsByTagName("button")[1];
  let checkbox = popupBack.querySelector('input[type="checkbox"]');

  btnYes.onclick = (e) => {
    if (checkbox.checked) {
      e.preventDefault();
      document.body.style.overflow = 'auto';
      popupBack.style.transform = 'scale(0)';
    }
  };
  btnNo.onclick = (e) => {
    if (checkbox.checked) {
      e.preventDefault();
      window.location.href = './';
    }
  };
}

