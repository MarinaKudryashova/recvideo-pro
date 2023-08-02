 // плавный скролл по якорям
 const smoothLinks = document.querySelectorAll('a[href^="#"]');
 for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener('click', function (e) {
      e.preventDefault();
      const id = smoothLink.getAttribute('href');
      document.querySelector(id).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  }

// Валидация и отправка формы
const form = document.querySelector('.form__feedback');
const input = form.querySelector('.form__input');
const error = form.querySelector('.error');
const btn = form.querySelector('button[type="submit"]');

// маска на телефон
form.addEventListener('input', (event) => {
  let value = event.target.value;

  const isPhone = /^\d{1,10}$/.test(value); //digits
  const isPhone0 = /^[+]\d{1,3}$/g.test(value); //+7
  const isPhone1 = /^[+][\d]\s?[(]\d*$/g.test(value); //+7 (000
  const isPhone2 = /^[+][\d]\s?[(]\d{3}[)]\s?\d*$/g.test(value); //+7 (000) 000
  const isPhone3 = /^[+][\d]\s?[(]\d{3}[)]\s?\d{3}[-]\d*?$/g.test(value); //+7 (000) 000-00
  const isPhone4 = /^[+][\d]\s?[(]\d{3}[)]\s?\d{3}[-]\d{2}[-]\d{0,2}$/g.test(value);//+7 (000) 000-00-00

  if (isPhone || isPhone0 || isPhone1 || isPhone2 || isPhone3 || isPhone4) {
    let clearValue = value.replace(/\D+/g, "");
    let result = "+";
    if (clearValue[0] !== "7") {
      clearValue = "7" + clearValue;
    }

    [...clearValue].forEach((item, index) => {
      switch (index) {
        case 1:
          result += " (";
          break;
        case 4:
          result += ") ";
          break;
        case 7:
          result += "-";
          break;
        case 9:
          result += "-";
          break;
        default:
          break;
      }
      result += item;
    })

    value = result;
  }
   else {
    if (value.indexOf("+") === 0) {
      value = value.replace(/\s/g, '');
      value = value.replace('+7(', '');
      value = value.replace(')', '');
      value = value.replace(/-/g, '');
    }
  }

  event.target.value = value;

  return true;
});

// проверка в поле только цифры (регулярным выражением)
function isValidTel(inputValue) {
  // const numbers = /^[\d\+][\d\(\)\ -]{10,18}\d$/;
  let value = inputValue.replace(/\D+/g, "");
  let valid = value.length > 10 && value[0] === "7" ;
  if (!valid) {
    return false;
  }
  return true;
}

// проверка в поле email (регулярным выражением)
function isValidEmail(inputValue) {
  // const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const emailRegExp =/^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i;
  let valid = emailRegExp.test(inputValue);
  return valid;
}
// проверка валидности введенного значения в поля
function inputValid(el) {
  const inputValue = el.value;
  // const inputValue = input.value;
  const validPhon = isValidTel(inputValue);
  const validEmail = isValidEmail(inputValue);
  // Проверяем, что поля заполнены
  if (!inputValue) {
    el.setAttribute("is-valid", "0");
    errorMessage = 'Пожалуйста введите ваш телефон или email';
    error.innerHTML = errorMessage;
    return;
  }

  // Проверяем, введенное значение является ли телефоном или email
  if (!validPhon && !validEmail) {
    el.setAttribute("is-valid", "0");
    errorMessage = 'Введите правильно ваш телефон или email';
    error.innerHTML = errorMessage;
    return;
  } else {
    el.setAttribute("is-valid", "1");
  }
}
// function buttonHandler(e) {
//   const allValid = [];
//   validFormArr.forEach((el) => {
//     allValid.push(el.getAttribute("is-valid"));
//   });
//   const isAllValid = allValid.reduce((acc, current) => {
//     return acc && current;
//   });

//   if (!Boolean(Number(isAllValid))) {
//     e.preventDefault();
//   }
// }
// проверка валидности перед отправкой формы
// function buttonHandler(e) {
//   form.forEach((el) => {
//     let valid = el.getAttribute("is-valid");
//     console.log(valid);
//   });
//   e.preventDefault();
// }

// btn.addEventListener("click", buttonHandler);
// btn.addEventListener("click", buttonHandler);
// ???
// const ajaxSend = async (formData) => {
//   const response = await fetch("mail.php", {
//       method: "POST",
//       body: formData
//   });
//   if (!response.ok) {
//       throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}`);
//   }
//   return await response.text();
// };

form.addEventListener('submit', function(evt) {

  evt.preventDefault();

    // Получаем значения полей формы
    const inputValue = input.value;
    // console.log(inputValid(inputValue));
    // inputValid(inputValue)
    // const validPhon = isValidTel(inputValue);
    // const validEmail = isValidEmail(inputValue);

    // // Проверяем, что поля заполнены
    // if (!inputValue) {
    //   errorMessage = 'Пожалуйста введите ваш телефон или email';
    //   error.innerHTML = errorMessage;
    //   return;
    // }

    // // Проверяем, введенное значение является ли телефоном или email
    // if (!validPhon && !validEmail) {
    //   errorMessage = 'Введите правильно ваш телефон или email';
    //   error.innerHTML = errorMessage;
    //   return;
    // } else {
    //   form.submit();
    //   error.innerHTML = '';
    // }

// Здесь определяется поведение при попытке отправить данные


  // // Если всё в порядке, отправляем форму
  // const formData = new FormData(this);

  // ajaxSend(formData)
  //     .then((response) => {
  //         console.log("отправлено")
  //         console.log(response);
  //         form.reset(); // очищаем поля формы
  //     })
  //     .catch((err) => console.error(err))
});



