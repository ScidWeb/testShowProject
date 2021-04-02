function getScrollWidth() {
  return window.innerWidth - document.body.clientWidth;
}

function toggleScrollBody() {
  const body = document.querySelector('body');

  body.classList.toggle('overflow-hidden');
}

function compensationScroll() {
  const wrapper = document.querySelector('.wrapper');

  if (!wrapper.hasAttribute('style')) {
    wrapper.style.marginRight = `${getScrollWidth()}px`;
  } else {
    wrapper.removeAttribute('style');
  }
}

function addEventOnKeydown(keyCode, handler) {
  document.addEventListener('keydown', function (event) {
    if (event.code === keyCode) {
      handler();
    }
  });
}