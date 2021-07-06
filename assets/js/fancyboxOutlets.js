async function startFancyboxOutlets() {
  const galleries = document.querySelectorAll('.js-fancybox-outlets');

  const images = await getGalleryImages();

  galleries.forEach((gallery, index) => {
    gallery.addEventListener('click', (event) => {
      event.preventDefault();

      const dataId = event.target.parentNode.dataset.fancyboxId;

      let instance = $.fancybox.open(images);

      instance.jumpTo(dataId);
    });
  });
}

async function getGalleryImages() {
  let response = await fetch(`http://vasilisa.bitrix.mobi/ajax/load_gallery.php`);

  if (response.ok) {
    let images = await response.json();

    return images;
  } else {
    const error = new Error(`HTTP error: ${response.status}`);
    console.error(error);
    return;
  }

  // const stab = [
  //   { id: 0, src: './assets/img/outlets/outlets_1.jpg', opts: { caption: 'alt text 0' } },
  //   { id: 1, src: './assets/img/outlets/outlets_2.jpg', opts: { caption: 'alt text 1' } },
  //   { id: 2, src: './assets/img/outlets/outlets_1.jpg', opts: { caption: 'alt text 2' } },
  //   { id: 3, src: './assets/img/outlets/outlets_2.jpg', opts: { caption: 'alt text 3' } },
  // ];

  // return stab;
}

startFancyboxOutlets();