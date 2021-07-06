function imageCompareInit() {
  const element = document.querySelector('.js-images-compare');

  const options = {
    controlColor: '#A78460',
    addCircle: true,
    controlShadow: false,

    smoothing: false,
  };

  const viewer = new ImageCompare(element, options).mount();

  function changeStyleLine() {
    const line = document.querySelector('.icv__control-line');

    line.style.background = 'linear-gradient(to bottom, rgba(167, 132, 96, 0), rgba(167, 132, 96, 1))';
  }

  changeStyleLine();
}

imageCompareInit();