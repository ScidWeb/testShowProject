function carouselStart() {
  let elements = document.querySelectorAll('.js-carousel-item');
  let currentIndex = 0;
  // let timerElement = 7000;
  // let timerCommon = 10000;

  function loop() {
    elements[currentIndex].classList.remove('main__item_active');

    // if (currentIndex > 0) {
    //   timerElement = 2000;
    //   timerCommon = 5000;
    // }

    if (currentIndex < elements.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }

    setTimeout(() => {
      elements[currentIndex].classList.add('main__item_active');
    }, 2000);

    setTimeout(loop, 5000);
  }

  setTimeout(() => {
    loop();
  }, 3000);
}

carouselStart();