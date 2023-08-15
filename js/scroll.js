let burger = document.querySelector('.burger');
let header = document.querySelector('.header');
let secTitleOffset = document.querySelector('.about__title').offsetHeight;
let secOffset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--ofset-main'));
let currentTopOffsetBurger = `${((secTitleOffset - 40)/2) + secOffset}px`;

let smallOffset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--ofset-header'));
let scrollDistance = window.scrollY;


const burgerScroll = () => {
  let scrollDistance = window.scrollY;
  if (scrollDistance > header.offsetTop - smallOffset) {
    burger.style.top = currentTopOffsetBurger;
  }
  if (scrollDistance <= smallOffset) {
    burger.style.top = `${smallOffset}px`;;
  }
}

burgerScroll();
window.addEventListener('scroll', burgerScroll);
