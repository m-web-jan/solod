const contactBtn = document.getElementsByClassName("button")[0];

contactBtn.onclick = () => {
  const contactModal = document.getElementsByClassName("contactModal")[0];
  contactModal.classList.toggle("close");
  contactModal.onclick = (e) => {
    if (e.target.classList.contains("contactModal"))
      contactModal.classList.toggle("close");
  };
};


document.addEventListener("DOMContentLoaded", () => {
  let result, result1;
  const nameInput = document.getElementsByTagName('input')[0];
  nameInput.oninput = function() {
    result = validateName(nameInput.value);
    const nameError = document.getElementsByClassName('nameError')[0];
    if (result) {
      nameError.innerText = '';
    } else {
      nameError.innerText = 'Пожалуйста, введите корректное имя.';
    }
  }
  const teleInput = document.getElementsByTagName('input')[1];
  teleInput.oninput = function() {
    result1 = validateBelarusianPhone(teleInput.value);
    const teleError = document.getElementsByClassName('teleError')[0];
    if (result1) {
      teleError.innerText = '';
    } else {
      teleError.innerText = 'Пожалуйста, введите корректный номер телефона.';
    }
  }
  const contactForm = document.getElementsByTagName('button')[2];
  contactForm.onclick = async (e) => {
    e.preventDefault();
    if (result && result1) {
      const name = nameInput.value;
      const phone = teleInput.value;

      const token = '7039622023:AAHUoc0vySI66curHKvm3jvuu2sM4fOxjp4';
      const chat_id = '-1002158221190';
      const text = `<b>Имя посетителя: </b> ${name}\n<b>Телефон: </b> ${phone}`;

      const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&parse_mode=html&text=${encodeURIComponent(text)}`;

      try {
        const response = await fetch(url);
        if (response.ok) {
          console.log('succes');
        } else {
          throw new Error('Ошибка при отправке сообщения в Telegram');
        }
      } catch (error) {
        console.error(error);
        alert('Ошибка при отправке формы');
      }
    }
  }
})


function validateName(name) {
  const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s]+$/;
  return nameRegex.test(name) && name.trim() !== '';
}

function validateBelarusianPhone(phone) {
  const phoneRegex = /^\+375(17|25|29|33|44)\d{7}$/;
  return phoneRegex.test(phone);
}
