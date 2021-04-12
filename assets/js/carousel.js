function carouselStart() {
  let elements = document.querySelectorAll('.js-carousel-item');
  let currentIndex = 0;

  setInterval(() => {
    elements[currentIndex].classList.remove('main__item_active');

    if (currentIndex < elements.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }

    setTimeout(() => {
      elements[currentIndex].classList.add('main__item_active');
    }, 2000);
  }, 7000);
}

carouselStart();