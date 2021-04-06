function toggleMenu() {
  const burger = document.querySelector('.burger');
  const menuContent = document.querySelector('.main-menu__content');

  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    menuContent.classList.toggle('active');

    compensationScrollWrapper();

    toggleScrollBody();

    compensationScrollHeader();
  });
}

toggleMenu();