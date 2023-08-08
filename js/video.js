// const filterNav = document.querySelector('.filter__nav')
const fiterBtns = document.querySelectorAll('.filter__btn');
const filterInfo = document.querySelectorAll('.video__item');
const video = document.querySelector('.video');
const filterSlider = document.querySelector('.filter-slider');
// let releaseSlider;
 // иницилизация slider-filter
const releaseSlider = new Swiper('.filter-slider', {
  slideClass: 'video__item',
  wrapperClass: 'video',
    slidesPerView: 1.5,
    spaceBetween: 30,
});

fiterBtns.forEach(function(btn) {
  btn.addEventListener('click', (event) => {
    let currentCategory  = event.currentTarget.getAttribute('data-filter');
    console.log(currentCategory);

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
