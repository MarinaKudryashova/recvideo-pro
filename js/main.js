document.addEventListener('DOMContentLoaded', function(){
  // открытие меню-бургер
let burger = document.querySelector('.burger');
let menu = document.querySelector('.menu');
let menuLink = document.querySelectorAll('.menu-link');
const body = document.body;

burger.addEventListener('click', function() {
  burger.classList.toggle('is-open');
  menu.classList.toggle('menu-open');
  if (burger.getAttribute('aria-label') === 'Открыть меню') {
    burger.setAttribute("aria-label", 'Закрыть меню');
    disableScroll();
  } else {
    burger.setAttribute("aria-label", 'Открыть меню');
    enableScroll();
  }
});

let menuClose = function() {
  burger.classList.remove('is-open');
  burger.setAttribute("aria-label", 'Открыть меню');
  menu.classList.remove('menu-open');
  enableScroll();
};

menuLink.forEach(function(e) {
  e.addEventListener('click', function() {
    menuClose();
  });
});

document.addEventListener('click', function(el) {
    let target = el.target;
    if(!target.closest('.header__burger') && !target.closest('.menu__list') && burger.classList.contains('is-open')) {
    menuClose();
  }
});

const fiterBtns = document.querySelectorAll('.filter__btn');
const filterInfo = document.querySelectorAll('.video__item');
const video = document.querySelector('.video');
const filterSlider = document.querySelector('.filter-slider');
 // иницилизация slider-filter
const releaseSlider = new Swiper('.filter-slider', {
  slideClass: 'video__item',
  wrapperClass: 'video',
  slidesPerView: 1.5,
  spaceBetween: 30,

  breakpoints: {
    // when window width is >= 320px
    320: {
      // slidesPerView: 1.7,
      spaceBetween: 15,
    },
    // when window width is >= 768px
    768: {
      // slidesPerView: 1.7,
      spaceBetween: 30,
    },
  },
});

fiterBtns.forEach(function(btn) {
  btn.addEventListener('click', (event) => {
    let currentCategory  = event.currentTarget.getAttribute('data-filter');
    console.log(currentCategory);
    releaseSlider.slideTo(0);


    fiterBtns.forEach((btn) => {
      btn.removeAttribute('data-active');
      event.currentTarget.setAttribute('data-active', 'true');
    });

    if(currentCategory == 'all') {
      filterSlider.querySelector('.video').classList.add('visually-hidden');
      video.classList.remove('visually-hidden');
    } else {
      video.classList.add('visually-hidden');
      filterSlider.querySelector('.video').classList.remove('visually-hidden');
    }

    filterInfo.forEach((info) => {
      info.classList.remove('visually-hidden');
      info.classList.remove('visible');

      if(currentCategory !== 'all' && info.getAttribute('data-target') !== currentCategory) {
        info.classList.add('visually-hidden');
      }
      if(info.getAttribute('data-target') === currentCategory) {
        info.classList.add('visible');
      }
    });
  });
});

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

  // убираем текст ошибки
  error.innerHTML = '';

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
function inputValid(inputValue) {
  const validPhon = isValidTel(inputValue);
  const validEmail = isValidEmail(inputValue);
  // Проверяем, что поля заполнены
  if (!inputValue) {
    return false;
  }
  // Проверяем, введенное значение является ли телефоном или email
  if (!validPhon && !validEmail) {
    return false;
  }
  return true;
}
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
    console.log(inputValid(inputValue));

    // // Проверяем, что поля заполнены
    if (!inputValid(inputValue)) {
      errorMessage = 'Пожалуйста введите ваш телефон или email';
      error.innerHTML = errorMessage;
      return;
    }


    // тут все хорошо и можно отправлять форму

    console.log("Ok!!!!!!!!!!!!")

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

});
