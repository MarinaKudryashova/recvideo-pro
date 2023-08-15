document.addEventListener('DOMContentLoaded', function(){
  // открытие меню-бургер
let burger = document.querySelector('.burger');
let menu = document.querySelector('.menu');
let menuLink = document.querySelectorAll('.menu-link');
const body = document.body;
let toggleNav = function toggleNav() {
  burger.classList.toggle('is-open');
  menu.classList.toggle('menu-open');
  if (burger.getAttribute('aria-label') === 'Открыть меню') {
    burger.setAttribute("aria-label", 'Закрыть меню');
    // disableScroll();
  } else {
    burger.setAttribute("aria-label", 'Открыть меню');
    // enableScroll();
  }
}

burger.addEventListener('click', toggleNav);
burger.addEventListener('ontouchstart', toggleNav);

let menuClose = function() {
  burger.classList.remove('is-open');
  burger.setAttribute("aria-label", 'Открыть меню');
  menu.classList.remove('menu-open');
  enableScroll();
};

menuLink.forEach(function(e) {
  e.addEventListener('click', menuClose);
  e.addEventListener('ontouchstart', menuClose);
});

document.addEventListener('click', function(el) {
    let target = el.target;
    if(!target.closest('.header__burger') && !target.closest('.menu__list') && burger.classList.contains('is-open')) {
    menuClose();
  }
});


const fiterBtns = document.querySelectorAll('.filter-nav__btn');
const filter = document.querySelectorAll('.filter-info');
const filterItems = document.querySelectorAll('.filter-info__item');
 // иницилизация slider-filter
const releaseSlider = new Swiper('.filter-slider', {
  slideClass: 'filter-info__item',
  wrapperClass: 'filter-info',
  navigation: {
    nextEl: '.filter-slider__btn-next',
    prevEl: '.filter-slider__btn-prev',
  },
  slidesPerView: 1.5,
  spaceBetween: 30,
  observer: true,
  observeParents: true,

  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1.2,
      spaceBetween: 15,
    },
    // when window width is >= 768px
    768: {
      slidesPerView: 1.5,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 1.45,
      spaceBetween: 50,
    },
  },
  a11y: {
    enabled: true,
    prevSlideMessage: 'Предыдущий слайд',
    nextSlideMessage: 'Следующий слайд',
    firstSlideMessage: 'Это первый слайд',
    lastSlideMessage: 'Это последний слайд',
    slideLabelMessage: 'Слайд {{index}} из {{slidesLength}}',
  },
});

fiterBtns.forEach(function(btn) {
  btn.addEventListener('click', (event) => {

    fiterBtns.forEach((btn) => {
      btn.removeAttribute('data-active');
    });

    let currentCategory  = event.currentTarget.getAttribute('data-filter');
    event.currentTarget.setAttribute('data-active', 'true');
    releaseSlider.slideTo(0);

    filterItems.forEach((item) => {
      // if(item.classList.contains('el-show')) {
        // item.classList.remove('el-show');
      // }
      if(currentCategory !== 'all' && item.getAttribute('data-target') !== currentCategory) {
        item.style.display = 'none';
        // item.classList.remove('el-show');
      } else {
        console.log (item.querySelector('.video'));
        item.removeAttribute('style');
        // item.classList.add('el-show');
      }
    });
    console.log (releaseSlider.getTranslate());
    releaseSlider.update();
  });
});

// открытие видео
const videoBtns = document.querySelectorAll('.btn-play');


// получаем id видео
function getVideoId(url) {
  let videoId = url.split(".be/")[1];
  return videoId;
}

function createIframe(videoId) {
  let iframe = document.createElement('iframe');
  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('allow', 'autoplay');
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('src', generateURL(videoId));
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.classList.add('video__iframe');
  return iframe;
}

function generateURL(videoId) {
  let query = '?rel=0&showinfo=0&autoplay=1';
  return 'https://www.youtube.com/embed/' + videoId + query;
}

function checkLink(videoSrc) {
  if (videoSrc.includes('https://youtu.be')) {
    return true
  } else {
    return false
  }
}

let videoClose = function(videoSrc) {
  if(checkLink(videoSrc)) {
    videoYoutube.removeChild(iframe);
    videoYoutube.removeAttribute('style');
    currentBtn.style.display = 'block';
    btnClose.classList.add('visually-hidden');
  } else {
    videoBase.removeAttribute('src');
    videoBase.removeAttribute('controls');
    videoBase.pause();
    videoBase.removeAttribute('style');
    currentBtn.style.display = 'block';
    btnClose.classList.add('visually-hidden');
  }

}

document.addEventListener ('click', (event) => {
  console.log(event.target)
});
// releaseSlider.on('slideChange', function () {
//   console.log('slide changed');
// });
videoBtns.forEach((videoBtn) => {
  videoBtn.addEventListener('click', (event) => {

    console.log(event.target)

    let currentBtn = event.target;
    let video = currentBtn.parentNode;
    let videoSrc = video.getAttribute('data-src');
    let videoYoutube = video.querySelector('.video__youtube');
    let videoBase = video.querySelector('.video__base');

    console.log(videoSrc);

    if(checkLink(videoSrc)) {
      console.log('это ютуб видео');
      let videoId = getVideoId(videoSrc);
      let iframe = createIframe(videoId);
      videoYoutube.appendChild(iframe);
      videoYoutube.style.display = 'flex';
      currentBtn.style.display = 'none';
      let btnClose = currentBtn.parentNode.querySelector('.video__btn-close')
      btnClose.classList.remove('visually-hidden');
      releaseSlider.disable();

      btnClose.addEventListener('click', () => {
        videoYoutube.removeChild(iframe);
        videoYoutube.removeAttribute('style');
        currentBtn.style.display = 'block';
        btnClose.classList.add('visually-hidden');
        releaseSlider.enable();
      });
      // btnClose.addEventListener('click', () => {videoClose()});
    } else {
      videoBase.setAttribute('src', videoSrc);
      videoBase.setAttribute('controls', '');
      videoBase.play();
      // videoBase.setAttribute('autoplay', '');
      videoBase.style.display = 'flex';
      currentBtn.style.display = 'none';
      let btnClose = video.querySelector('.video__btn-close')
      btnClose.classList.remove('visually-hidden');
      releaseSlider.disable();

      btnClose.addEventListener('click', () => {
        videoBase.removeAttribute('src');
        videoBase.removeAttribute('controls');
        // videoBase.setAttribute('autoplay', '');
        videoBase.pause();
        videoBase.removeAttribute('style');
        currentBtn.style.display = 'block';
        btnClose.classList.add('visually-hidden');
        releaseSlider.enable();
      });
      console.log('видео с сервера');
    }

  });

});


// плавный скролл по якорям
const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
  // smoothLink.addEventListener('click', scrollTo);
  smoothLink.addEventListener('click', clickHandler);
  // smoothLink.addEventListener('click', function (e) {
  //   e.preventDefault();
  //   const id = smoothLink.getAttribute('href');
  //   document.querySelector(id).scrollIntoView({
  //     behavior: 'smooth',
  //     block: 'start'
  //   });
  // });
}

function clickHandler(e) {
  e.preventDefault();
  const href = this.getAttribute("href");
  const offsetTop = document.querySelector(href).offsetTop;
  scroll({
    top: offsetTop,
    behavior: "smooth"
  });
}
// const scrollTo=()=>{
//       const step = 17;
//       const id = smoothLink.getAttribute('href');
//       const element = document.querySelector(id);
//       if(element.offsetTop < window.pageYOffset + step){
//          document
//                  .documentElement
//                  .scrollTo(0,element.offsetTop );
//       }else{
//          document
//                  .documentElement
//                  .scrollTo(0,window.pageYOffset+step);
//       }
//       if(element.offsetTop !== window.pageYOffset)requestAnimationFrame(scrollTo)


// }

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

// инициализация библиотеки
// let wow = new WOW(
//   {
//     boxClass:     'wow',      // animated element css class (default is wow)
//     animateClass: 'animated', // animation css class (default is animated)
//     offset:       0,          // distance to the element when triggering the animation (default is 0)
//     mobile:       true,       // trigger animations on mobile devices (default is true)
//     live:         true,       // act on asynchronously loaded content (default is true)
//     callback:     function(box) {
//       // the callback is fired every time an animation is started
//       // the argument that is passed in is the DOM node being animated
//     },
//     scrollContainer: null,    // optional scroll container selector, otherwise use window,
//     resetAnimation: true,     // reset animation on end (default is true)
//   }
// );
// wow.init();

// new WOW().init();
