function add100vh() {
  const appHeight = () => {
    const element = document.querySelector('.js-modal-overlay');

    console.log('test', window.innerHeight);

    element.style.setProperty('--app-height', `${window.innerHeight}px`);
  };

  window.addEventListener('resize', appHeight);
}

add100vh();