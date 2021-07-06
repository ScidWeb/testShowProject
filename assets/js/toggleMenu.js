function toggleMenu() {
  const modalBurger = document.querySelector('.js-modal-burger');
  const modalButton = document.querySelector('.js-modal-button');
  const menuContent = document.querySelector('.js-modal-content');

  modalButton.addEventListener('click', () => {
    modalBurger.classList.toggle('active');
    menuContent.classList.toggle('active');

    compensationScrollWrapper();

    toggleScrollBody();

    compensationScrollHeader();
  });
}

toggleMenu();