
    new Swiper('.swiper', {
        spaceBetween:30,
        slidersPerView: 3,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            // when window width is <= 320px
            768: {
                slidesPerView: 2,
            },
            2000: {
                slidesPerView: 3,
            },

        },
    });




