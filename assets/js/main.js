let carouselMain = new Swiper('.js-swiper-container-main', {
  centeredSlides: true,
  watchOverflow: true,

  breakpoints: {
    1140: {},
    960: {},
    720: {},
    540: {},
  },
});

let carouselMainLinks = new Swiper('.js-swiper-container-main-links', {
  // centeredSlides: true,
  // watchOverflow: false,
  // slidesPerView: 3,

  pagination: {
    el: '.js-swiper-pagination-main-links',
    bulletClass: 'swiper-pagination-bullet_main-links',
    bulletActiveClass: 'swiper-pagination-bullet-active_main-links',
  },

  breakpoints: {
    1140: {
      watchOverflow: true,
      slidesPerView: 3,
    },
    961: {
      watchOverflow: true,
      slidesPerView: 3,
    },
    720: {
      watchOverflow: false,
      slidesPerView: 2,
    },
    540: {
      slidesPerView: 1,
    },
  },
});