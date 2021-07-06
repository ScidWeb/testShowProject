function startModal() {
  let cacheNews = [];

  // localStorage.clear('cacheNews');

  localCacheNews = sessionStorage.getItem('cacheNews');

  if (localCacheNews) {
    cacheNews = JSON.parse(localCacheNews);
  } else {
    sessionStorage.setItem('cacheNews', JSON.stringify(cacheNews));
  }

  const modal = document.querySelector('.js-modal-overlay');
  const modalBackground = document.querySelector('.js-modal-overlay-background');
  const modalNumber = document.querySelector('.js-modal-number');
  const modalTitle = document.querySelector('.js-modal-title');
  const modalText = document.querySelector('.js-modal-text');
  const modalCloseContainers = document.querySelectorAll('.js-modal-overlay-close');
  const modalOpenContainers = document.querySelectorAll('.js-modal-parent-open');

  async function toggleModal() {
    let simpleBar;

    modalCloseContainers.forEach((element) => {
      element.addEventListener('click', () => {
        closeModal();
      });
    });

    modalOpenContainers.forEach((button) => {
      button.addEventListener('click', async function (event) {
        event.preventDefault();

        const newsId = button.getAttribute('data-modal-id');
        const modalParent = document.querySelector(`[data-modal-id="${newsId}`);

        const buttonBackgroundColor = window.getComputedStyle(button).backgroundColor;
        modalBackground.style.backgroundColor = buttonBackgroundColor;

        modal.classList.add('active');

        compensationScrollWrapper();
        compensationScrollHeader();
        toggleScrollBody();

        const newsData = await getNewsData(newsId);

        modalNumber.textContent = modalParent.querySelector('.js-modal-parent-number').textContent;
        modalTitle.textContent = modalParent.querySelector('.js-modal-parent-title').textContent;
        modalText.textContent = `${newsData.text}`;

        if (simpleBar) simpleBar.unMount();
        simpleBar = new SimpleBar(modalBackground, {
          autoHide: false,
        });
      });
    });
  }

  async function getNewsData(newsId) {
    const empty = {
      id: Number(newsId),
      text: 'No data',
    };

    let news = cacheNews.find((item) => {
      return item.id.toString() === newsId;
    });

    if (news) {
      return news;
    }

    let response = await fetch(`https://my-json-server.typicode.com/typicode/demo/posts/${newsId}`);

    if (response.ok) {
      let currentNews = await response.json();

      cacheNews.push(currentNews);
      sessionStorage.setItem('cacheNews', JSON.stringify(cacheNews));

      return currentNews;
    } else {
      cacheNews.push(empty);
      sessionStorage.setItem('cacheNews', JSON.stringify(cacheNews));
      const error = new Error(`HTTP error: ${response.status}`);
      console.error(error);
      return empty;
    }
  }

  function closeModal() {
    compensationScrollWrapper();
    compensationScrollHeader();
    toggleScrollBody();

    modal.classList.remove('active');
  }

  toggleModal();

  addEventOnKeydown('Escape', closeModal);
}

startModal();