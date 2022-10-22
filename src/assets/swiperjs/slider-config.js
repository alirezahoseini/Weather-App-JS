var swiper = new Swiper(".nextHours", {
    slidesPerView: 3,
    spaceBetween: 10,
    breakpoints: {
    100: {
        slidesPerView: 4.5,
        spaceBetween: 10,
        },
      768: {
        slidesPerView: 4.5,
        spaceBetween: 15,
      },
      991: {
        slidesPerView: 5.5,
        spaceBetween: 15,
      },
      1280: {
        slidesPerView: 5.5,
        spaceBetween: 15,
      },
    
    },
  });