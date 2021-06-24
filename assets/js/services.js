async function startServices() {
  async function getPlacemark() {
    let response;

    try {
      response = await fetch('https://winia.ru/ajax/load-services/');
    } catch (error) {
      new Error(`Request failed! ${error}`);
    }

    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  let serviceMap;

  let currentLazy = 0;
  let stepLazy = 10;

  let placemarks = await getPlacemark();
  let filteredPlacemarks = await placemarks;

  /* services-toggle */
  $(document).ready(function () {
    const $servicesContainer = $('.services');
    const $buttonMap = $servicesContainer.find('.js-toggle-map');
    const $buttonList = $servicesContainer.find('.js-toggle-list');
    const $showMap = $servicesContainer.find('.js-show-map');
    const $showList = $servicesContainer.find('.js-show-list');
  
    $buttonMap.on('click', function (event) {
      event.preventDefault();
  
      $buttonList.removeClass('button_services_active');
      $buttonMap.addClass('button_services_active');
  
      $showList.hide();
      $showMap.show();
    });
  
    $buttonList.on('click', function (event) {
      event.preventDefault();
  
      $buttonMap.removeClass('button_services_active');
      $buttonList.addClass('button_services_active');
  
      $showMap.hide();
      $showList.show();
    });
  });
  ymaps.ready(async function () {
    serviceMap = new ymaps.Map(
      'map',
      {
        center: [55.751574, 37.573856],
        zoom: 9,
        controls: ['zoomControl'],
      },
      {
        searchControlProvider: 'yandex#search',
      }
    );
  
    placemarks.forEach((item) => {
      let telephones = '';
      let userFields = '';
  
      if (item.telephones.length) {
        item.telephones.forEach((telephone, index) => {
          if (index === item.telephones.length - 1) {
            telephones += `<a href="tel:${telephone}" class="services-map__link">${telephone}</a>`;
          } else {
            telephones += `<a href="tel:${telephone}" class="services-map__link">${telephone}, </a>`;
          }
        });
      }
  
      if (item.userFieldsData) {
        item.userFieldsData.forEach((data) => {
          userFields += `
            <span class="services-map__text">${data}</span>
          `;
        });
      }
  
      const hint = item.hint;
      const balloonHeader = `<div class="services-map__title">${item.title}</div>`;
      const balloonBody = `
          <div class="services-map__information">
              <div class="services-map__row">
                <span class="services-map__text">${item.city}, </span>
                <span class="services-map__text">${item.address}</span>
              </div>
              <div class="services-map__row">
                ${telephones}
              </div>
              <div class="services-map__row">
                ${userFields}
              </div>
              </div>
              
              <div class="services-map__button">
                <a href="https://yandex.ru/maps/?pt=${item.longitude},${item.latitude}&z=9&l=map" class="services-map__link-button">Проложить маршрут</a>
              </div>`;
  
      const placemark = new ymaps.Placemark(
        [item.latitude, item.longitude],
        {
          balloonContentHeader: balloonHeader,
          balloonContentBody: balloonBody,
          hintContent: hint,
        },
        {
          iconLayout: 'default#image',
          iconImageHref: 'assets/img/services/services_1.svg',
          iconImageSize: [27, 33],
          iconImageOffset: [-13, -33],
          balloonPanelMaxMapArea: 220400,
        }
      );
  
      serviceMap.geoObjects.add(placemark);
    });
  });
  function moveToCenter() {
    if (serviceMap) {
      const $servicesContainer = $('.services');
      const $buttonMap = $servicesContainer.find('.js-toggle-map');
  
      serviceMap.setCenter([event.target.dataset.latitude, event.target.dataset.longitude], 9);
      $buttonMap.trigger('click');
    } else {
      return;
    }
  }
  
  function addPlacemarks(isUpdate = false) {
    const $container = $('.services-list');
    if (isUpdate) {
      $container.empty();
      currentLazy = 0;
    }
  
    filteredPlacemarks.forEach((placemark, index) => {
      if (index >= currentLazy && index <= currentLazy + stepLazy) {
        let telephones = '';
        let userFields = '';
        let email = '';
  
        if (placemark.telephones.length) {
          placemark.telephones.forEach((telephone, index) => {
            if (index === placemark.telephones.length - 1) {
              telephones += `<a href="tel:${telephone}" class="services-list-item-cell__link">${telephone}</a>`;
            } else {
              telephones += `<a href="tel:${telephone}" class="services-list-item-cell__link">${telephone}, </a>`;
            }
          });
        }
  
        if (placemark.userFieldsData) {
          placemark.userFieldsData.forEach((data) => {
            if (data) {
              userFields += `
        <div class="services-list-item-cell__row">
          <span class="services-list-item-cell__text">${data}</span>
        </div>`;
            }
          });
        }
  
        if (placemark.email) {
          email += `
      <div class="services-list-item-cell__row">
        <a href="mailto:${placemark.email}" class="services-list-item-cell__link">${placemark.email}</a>
      </div>
      `;
        }
  
        const template = $(`
          <div class="services-list__item">
            <div class="services-list-item">
              <div class="services-list-item__information">
                <h2 class="services-list-item__title">${placemark.title}</h2>
                <div class="services-list-item__cell">
                  <div class="services-list-item-cell">
                    <h3 class="services-list-item-cell__title">Адрес</h3>
                    <div class="services-list-item-cell__content">
                      <div class="services-list-item-cell__row">
                        <span class="services-list-item-cell__text">${placemark.country}, </span>
                        <span class="services-list-item-cell__text">${placemark.region}</span>
                      </div>
                      <div class="services-list-item-cell__row">
                        <span class="services-list-item-cell__text">${placemark.city}, </span>
                      </div>
                      <div class="services-list-item-cell__row">
                        <span class="services-list-item-cell__text">${placemark.address}, </span>
                      </div>
                      <div class="services-list-item-cell__row">
                        <span class="services-list-item-cell__text">${placemark.postcode}</span>
                      </div>
                    </div>
                  </div>
  
                  <div class="services-list-item-cell">
                    <h3 class="services-list-item-cell__title">Контакты</h3>
                    <div class="services-list-item-cell__content">
                      <div class="services-list-item-cell__row">
                        ${telephones}
                      </div>
                        ${email}
                    </div>
                  </div>
  
                  <div class="services-list-item-cell">
                    <h3 class="services-list-item-cell__title">Режим работы</h3>
                    <div class="services-list-item-cell__content">
                      ${userFields}
                    </div>
                  </div>
                </div>
              </div>
  
              <div class="services-list-item__buttons">
                <div class="services-list-item__button">
                  <button class="button button_services-item js-move-map" data-longitude="${placemark.longitude}" data-latitude="${placemark.latitude}" >Показать на карте</button>
                </div>
                <div class="services-list-item__button">
                <a href="https://yandex.ru/maps/?pt=${placemark.longitude},${placemark.latitude}&z=9&l=map" class="services-list__link-button">Проложить маршрут</a>
                </div>
              </div>
            </div>
          </div>
        `);
  
        template.find('.js-move-map').on('click', moveToCenter);
  
        $container.append(template);
      } else {
        return;
      }
    });
    if (!isUpdate) {
      currentLazy += stepLazy;
    }
  }
  
  function addServicesList() {
    $(window).on('scroll', () => {
      if ($(window).innerHeight() + $(window).scrollTop() >= $('body').height()) {
        addPlacemarks();
      }
    });
  
    addPlacemarks();
  }
  
  addServicesList();
  function addSelectize() {
    function addOptions() {
      const $autocomplete = $('.js-header-autocomplete');
  
      placemarks.forEach((placemark) => {
        $autocomplete.append(`<option value="${placemark.city}">${placemark.city}</option>`);
      });
    }
  
    addOptions();
  }
  
  addSelectize();
  
  $('.js-header-autocomplete').selectize({
    onChange: function (value) {
      if (value) {
        filteredPlacemarks = placemarks.filter((placemark) => {
          return placemark.city === value;
        });
  
        serviceMap.setCenter([filteredPlacemarks[0].latitude, filteredPlacemarks[0].longitude], 9);
  
        addPlacemarks(true);
      } else {
        filteredPlacemarks = placemarks;
  
        addPlacemarks();
      }
    },
  });
}

startServices();