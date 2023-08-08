const fiterBtns = document.querySelectorAll('.filter__btn');
const filterInfo = document.querySelectorAll('.video__item');
const video = document.querySelector('.video');
 // иницилизация slider-filter
const releaseSlider = new Swiper(('.filter-slider'), {
  slideClass: 'video__item',
  // wrapperClass: 'video',
    slidesPerView: 1.5,
    spaceBetween: 30,
});
function filterElem(list, currentCategory) {
  const newList = list.querySelectorAll(`li[data-target="${currentCategory}"]`);
return newList;
}

fiterBtns.forEach(function(btn) {
  btn.addEventListener('click', (event) => {
    let currentCategory  = event.currentTarget.getAttribute('data-filter');
    console.log(currentCategory);

    fiterBtns.forEach((btn) => {
      btn.removeAttribute('data-active');
      event.currentTarget.setAttribute('data-active', 'true');
    });

    if(currentCategory !== 'all') {
      let slideElem = filterElem(video, currentCategory);
      video.classList.add('visually-hidden');

      if(slideElem.length > 1) {
        console.log(slideElem);
        slideElem.forEach((slide)=>{
          console.log(slide);
          releaseSlider.addSlide( 1, slide);
        });

      } else {
        removeAllSlides();
        releaseSlider.update();
      }

    } else {
      video.classList.remove('visually-hidden');
    }
  });
});
