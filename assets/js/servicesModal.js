function startModal() {
  let cacheNews = [];

  // localStorage.clear('cacheNews');

  localCacheNews = sessionStorage.getItem('cacheNews');

  if (localCacheNews) {
    cacheNews = JSON.parse(localCacheNews);
  } else {
    sessionStorage.setItem('cacheNews', JSON.stringify(cacheNews));
  }

  const overlay = document.querySelector('.js-modal-overlay');
  const overlayBackground = document.querySelector('.js-modal-overlay-background');
  const overlayNumber = document.querySelector('.js-modal-number');
  const overlayTitle = document.querySelector('.js-modal-title');
  const overlayText = document.querySelector('.js-modal-text');
  const overlayCloseContainers = document.querySelectorAll('.js-modal-overlay-close');
  const buttonContainers = document.querySelectorAll('.js-item-modal-open');

  function toggleModal() {
    let simpleBar;

    overlayCloseContainers.forEach((element) => {
      element.addEventListener('click', () => {
        closeModal();
      });
    });

    buttonContainers.forEach((button) => {
      button.addEventListener('click', async function (event) {
        event.preventDefault();

        const buttonBackgroundColor = window.getComputedStyle(button).backgroundColor;
        overlayBackground.style.backgroundColor = buttonBackgroundColor;

        let newsId = button.getAttribute('data-modal-id');

        overlay.classList.add('active');

        compensationScrollWrapper();
        compensationScrollHeader();
        toggleScrollBody();

        const newsData = await getNewsData(newsId);

        overlayNumber.textContent = newsId;
        overlayTitle.textContent = newsData.title;
        overlayText.textContent = `${newsData.title} Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;

        if (simpleBar) simpleBar.unMount();
        simpleBar = new SimpleBar(overlayBackground, {
          autoHide: false,
        });
      });
    });
  }

  async function getNewsData(newsId) {
    const empty = {
      id: Number(newsId),
      number: 'No data',
      title: 'No data',
      text: 'No data',
    };

    let news = cacheNews.find((item) => {
      return item.id.toString() === newsId;
    });

    if (news) {
      return news;
    }

    let response = await fetch('https://my-json-server.typicode.com/typicode/demo/posts');

    if (response.ok) {
      let json = await response.json();

      const currentNews = json.find((item) => item.id.toString() === newsId);

      if (currentNews) {
        cacheNews.push(currentNews);
        sessionStorage.setItem('cacheNews', JSON.stringify(cacheNews));

        return currentNews;
      } else {
        console.log(`No data by '${newsId}' id`);
        cacheNews.push(empty);
        sessionStorage.setItem('cacheNews', JSON.stringify(cacheNews));

        return empty;
      }
    } else {
      const error = new Error(`HTTP error: ${response.status}`);
      console.error(error);
      return empty;
    }
  }

  function closeModal() {
    compensationScrollWrapper();
    compensationScrollHeader();
    toggleScrollBody();

    overlay.classList.remove('active');
  }

  toggleModal();

  addEventOnKeydown('Escape', closeModal);
}

startModal();