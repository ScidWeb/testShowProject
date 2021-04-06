function fixMenu() {
  const options = {
    fixedElement: '.js-header-fixed',
    controlElement: '.js-header-fixed-control',
    checkFunction: checkScrollAfter,
    className: 'wrapper__header_fixed',
  };

  addClassScroll(options);
}

fixMenu();