async function startFancyboxWorks() {
  const galleries = document.querySelectorAll('.js-fancybox-works');

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
  let response = await fetch(`http://vasilisa.bitrix.mobi/ajax/load_our_works.php`);

  if (response.ok) {
    let images = await response.json();

    return images;
  } else {
    const error = new Error(`HTTP error: ${response.status}`);
    console.error(error);
    return;
  }
}

startFancyboxWorks();