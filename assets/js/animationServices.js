function gsapInit() {
  const elements = document.querySelectorAll('.services-content__item');

  elements.forEach((element, index) => {
    if (!(index % 2)) {
      gsap.to(element, {
        scrollTrigger: {
          trigger: element,
          start: 'top 24%',
          end: 'top 10%',
          scrub: 1,
          // markers: true,
        },
        duration: 3,
        ease: 'sine.in',
        xPercent: 20,
        yPercent: -100,
        opacity: 0,
      });
    } else {
      gsap.to(element, {
        scrollTrigger: {
          trigger: element,
          start: 'top 29%',
          end: 'top 16%',
          scrub: 1,
          // markers: true,
        },
        duration: 3,
        ease: 'sine.in',
        xPercent: 40,
        yPercent: -100,
        opacity: 0,
      });
    }
  });
}

gsapInit();