  const videos = document.querySelectorAll('.video');
  const links = document.querySelectorAll('.video__link');
  const videoBtns = document.querySelectorAll('.video__btn');
  const videoBlock = document.getElementById('video');

// получаем id видео
function getVideoId(url) {
  let videoId = url.split(".be/")[1];
  return videoId;
}

function findVideo() {
  const videos = document.querySelectorAll('.video');
  videos.forEach(video => {
    setupVideo(video);
  });
};

function setupVideo(video) {
  let link = video.querySelector('.video__link');
  let image = video.querySelector('.video__img');
  let button = video.querySelector('.video__btn');
  let id = getVideoId(link.getAttribute('data-src'));

  video.addEventListener('click', () => {
      let iframe = createIframe(id);
      link.remove();
      button.remove();
      video.appendChild(iframe);
  });

  link.removeAttribute('href');
  video.classList.add('video--enabled');
}

function createIframe(videoId) {
  let iframe = document.createElement('iframe');

  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('allow', 'autoplay');
  iframe.setAttribute('src', generateURL(videoId));
  iframe.classList.add('video__img');

  return iframe;
}

function generateURL(videoId) {
  let query = '?rel=0&showinfo=0&autoplay=1';

  return 'https://www.youtube.com/embed/' + videoId + query;
}

findVideo();


