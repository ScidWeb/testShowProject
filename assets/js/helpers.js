function getScrollWidth() {
  return window.innerWidth - document.body.clientWidth;
}

function getStyles(element, properties = []) {
  element = document.querySelector(element);
  let result = {};

  properties.forEach((property) => {
    result[property] = parseInt(window.getComputedStyle(element).getPropertyValue(property));
  });

  return result;
}

function toggleScrollBody() {
  const body = document.querySelector('body');

  body.classList.toggle('overflow-hidden');
}

function compensationScrollWrapper() {
  const wrapper = document.querySelector('.js-wrapper-main');

  if (!wrapper.hasAttribute('style')) {
    wrapper.style.marginRight = `${getScrollWidth()}px`;
  } else {
    wrapper.removeAttribute('style');
  }
}

function compensationScrollHeader() {
  const menu = document.querySelector('.js-header-fixed');
  const wrapperStyles = getStyles('.js-wrapper-main', ['padding-right', 'margin-right']);

  if (!menu.hasAttribute('style') && menu.classList.contains('wrapper__header_fixed')) {
    menu.style.paddingRight = `${wrapperStyles['padding-right'] + wrapperStyles['margin-right']}px`;
  } else {
    menu.removeAttribute('style');
  }
}

function addEventOnKeydown(keyCode, handler) {
  document.addEventListener('keydown', function (event) {
    if (event.code === keyCode) {
      handler();
    }
  });
}

function addClassScroll({ fixedElement, controlElement, checkFunction, className }) {
  fixedElement = document.querySelector(fixedElement);
  controlElement = document.querySelector(controlElement);

  function addClass() {
    if (checkFunction(controlElement)) {
      fixedElement.classList.add(className);
    } else {
      fixedElement.classList.remove(className);
    }
  }

  addClass();

  document.addEventListener('scroll', function () {
    addClass();
  });
}

function checkScrollAfter(controlElement) {
  if (window.pageYOffset >= controlElement.offsetHeight + controlElement.offsetTop) {
    return true;
  } else {
    return false;
  }
}

function checkScrollBefore(controlElement) {
  if (window.pageYOffset >= controlElement.offsetHeight) {
    return true;
  } else {
    return false;
  }
}