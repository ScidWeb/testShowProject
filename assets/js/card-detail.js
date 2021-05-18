let galleryThumbs = new Swiper('.swiper-container_card-detail-gallery_thumbs', {
  spaceBetween: 15,
  slidesPerView: 3,
  centerInsufficientSlides: true,
  watchOverflow: true,

  navigation: {
    nextEl: '.swiper-button-next.card-detail-gallery__button_thumbs',
    prevEl: '.swiper-button-prev.card-detail-gallery__button_thumbs',
  },

  breakpoints: {
    1140: {
      spaceBetween: 30,
    },
    960: {
      spaceBetween: 15,
    },
    720: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    540: {
      slidesPerView: 4,
      spaceBetween: 15,
    },
  },
});

thumbsShow();

let galleryTop = new Swiper('.swiper-container_card-detail-gallery_top', {
  centeredSlides: true,
  watchOverflow: true,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  pagination: {
    el: '.js-swiper-pagination-card-detail-gallery',
    bulletClass: 'swiper-pagination-bullet_card-detail-gallery',
    bulletActiveClass: 'swiper-pagination-bullet-active_card-detail-gallery',
  },

  thumbs: {
    swiper: galleryThumbs,
  },

  // zoom: {
  //   maxRatio: 2,
  // },
});

function thumbsShow() {
  const thumbsContainer = document.querySelector('.card-detail-gallery__thumbs');

  if (galleryThumbs.slides.length > 1) {
    thumbsContainer.classList.add('active');
  } else {
    thumbsContainer.classList.add('hide');
  }
}
$('[data-fancybox="gallery"]').fancybox({
  hash: true,
  backFocus: false, // item index on closing equal starting index
});
/* accordion */
$(document).ready(function () {
  const $accordion = $('.accordion');
  const $items = $accordion.find('.accordion__item');
  const $headers = $accordion.find('.accordion__header');

  $headers.on('click', function (event) {
    event.preventDefault();

    $item = $(event.target).closest('.accordion__item');
    $header = $(event.target).closest('.accordion__header');

    $itemIsActive = $item.hasClass('active');

    $item.removeClass('active');

    // $items.each(function (i, elem) {
    //   $(elem).removeClass('active');
    // });

    if (!$itemIsActive) {
      $item.addClass('active');
    }

    $(window).trigger('resize');
  });
});