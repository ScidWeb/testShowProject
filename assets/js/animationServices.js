function gsapInit() {
  const elements = document.querySelectorAll('.services-content__item');

  elements.forEach((element) => {
    gsap.to(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 30%',
        end: 'top top',
        scrub: 1,
        //   markers: true,
      },
      duration: 3,
      ease: 'expo.in',
      xPercent: 150,
      yPercent: -150,
      opacity: 0,
    });
  });
}

gsapInit();