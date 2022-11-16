/** Анимация на главной JRO. */
const mainPage = document.getElementById('main-page');

window.addEventListener('DOMContentLoaded', function () {
    console.log(mainPage)
    if (mainPage) {
        console.log('here')
        new rive.Rive({
            src: "./assets/riv/jro-new.riv",
            // Or the path to a local Rive asset
            // src: './example.riv',
            canvas: document.getElementById("animation-jro"),
            autoplay: true
        });
    }
})

new Swiper('.swiper', {
    spaceBetween: 30,
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


new Swiper('.twoSwiper', {
    slidersPerView: 2,
    direction: 'vertical',
    freeMode: true,
    navigation: {
        nextEl: '.s-button-next',
        prevEl: '.swiper-button-prev_card',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

});

// Инициализация превью слайдера
const sliderThumbs = new Swiper('.slider__thumbs .swiper-container', { // ищем слайдер превью по селектору
    // задаем параметры
    direction: 'vertical', // вертикальная прокрутка
    slidesPerView: 2, // показывать по 3 превью
    spaceBetween: 24, // расстояние между слайдами
    navigation: { // задаем кнопки навигации
        nextEl: '.slider__next', // кнопка Next
        prevEl: '.slider__prev' // кнопка Prev
    },
    freeMode: true, // при перетаскивании превью ведет себя как при скролле
    breakpoints: { // условия для разных размеров окна браузера
        0: { // при 0px и выше
            direction: 'horizontal', // горизонтальная прокрутка
        },
        768: { // при 768px и выше
            direction: 'vertical', // вертикальная прокрутка
        }
    }
});
// Инициализация слайдера изображений
const sliderImages = new Swiper('.slider__images .swiper-container', { // ищем слайдер превью по селектору
    // задаем параметры
    direction: 'horizontal', // вертикальная прокрутка
    slidesPerView: 1, // показывать по 1 изображению
    spaceBetween: 32, // расстояние между слайдами
    mousewheel: true, // можно прокручивать изображения колёсиком мыши
    navigation: { // задаем кнопки навигации
        nextEl: '.slider__next', // кнопка Next
        prevEl: '.slider__prev' // кнопка Prev
    },
    grabCursor: true, // менять иконку курсора
    thumbs: { // указываем на превью слайдер
        swiper: sliderThumbs // указываем имя превью слайдера
    },
    breakpoints: { // условия для разных размеров окна браузера
        0: { // при 0px и выше
            direction: 'horizontal', // горизонтальная прокрутка
        },
        768: { // при 768px и выше
            direction: 'horizontal', // вертикальная прокрутка
        }
    }
});