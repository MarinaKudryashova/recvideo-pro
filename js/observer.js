const videoObserver = new IntersectionObserver(([entry])=>{
  console.log(entry);
  const videoBg = entry.target || {};
  // проверяем, что видео в принципе запускалось
  if (videoBg.currentTime !== 0) {
    // Если видео вне viewport или видимо только на 20%
    if (!entry.isIntersecting || entry.intersectionRatio <= 0.2) {
      // жмем паузу
      videoBg.pause();
    } else {
      // иначе воспроизводим
      videoBg.play();
    }
  }
},{
  // Трригер сработает при выходе как верхней, так и нижней границы
  threshold: [0.2, 0.8]
});

document.querySelectorAll('.promo__video').forEach((videoBg) => {videoObserver.observe(videoBg);});




const animateObserver= new IntersectionObserver((entries, observer)=>{
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add('el-show');

    } else {
      if (!entry.target.classList.contains('animate-no-repeat')) {
        entry.target.classList.remove('el-show');
      }
    }
  });

},{
  // rootMargin: "0px 0px -50px 0px",
  threshold: [0.2, 0.5]
});

document.querySelectorAll('.el-aminated').forEach((animate) => {
  console.log(animate)
  animateObserver.observe(animate);});
