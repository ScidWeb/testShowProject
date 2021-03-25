function toggleMenu() {
  const body = document.querySelector('body');
  const wrapper = document.querySelector('.wrapper');
  const burger = document.querySelector('.burger');
  const menuContent = document.querySelector('.main-menu__content');

  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    menuContent.classList.toggle('active');

    if (!wrapper.hasAttribute('style')) {
      wrapper.style.marginRight = `${getScrollWidth()}px`;
    } else {
      wrapper.removeAttribute('style');
    }

    body.classList.toggle('overflow-hidden');
  });
}

function getScrollWidth() {
  return window.innerWidth - document.body.clientWidth;
}

toggleMenu();