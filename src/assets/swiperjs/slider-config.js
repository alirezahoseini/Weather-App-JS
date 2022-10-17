var swiper = new Swiper(".nextHours", {
    slidesPerView: 3,
    spaceBetween: 10,
    navigation: {
        nextEl: ".nextHours .next",
        prevEl: ".nextHours .prev",
    },
    breakpoints: {
    100: {
        slidesPerView: 3,
        spaceBetween: 10,
        },
      768: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      991: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1280: {
        slidesPerView: 3,
        spaceBetween: 25,
      },
    
    },
  });