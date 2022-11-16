/** Переменные для проверки медиа-запроса. */
const mobileMedia = window.matchMedia("(max-width: 767px)")
const desktopMedia = window.matchMedia("(min-width: 768px)")

//TODO Перенести в отдельный файл и подгружать только на главной странице.
/** Функция создания анимации на главной странице. */
function createMainAnimation() {
    /** Враппер главной страницы. */
    const mainPage = document.getElementById('main-page');

    /** Если главная страница, то подгружаем анимацию JRO. */
    if (mainPage) {
        /** Анимация на главной JRO. */
        if (desktopMedia.matches) {
            /** Десктоп версия. */
            new rive.Rive({
                src: "./assets/riv/jro-desktop.riv",
                // Or the path to a local Rive asset
                // src: './example.riv',
                canvas: document.getElementById("animation-jro-desktop"),
                autoplay: true
            });
        }else{
            /** Мобильная версия. */
            new rive.Rive({
                src: "./assets/riv/jro-mobile.riv",
                // Or the path to a local Rive asset
                // src: './example.riv',
                canvas: document.getElementById("animation-jro-mobile"),
                autoplay: true
            });
        }
    }
}

//TODO Перенести в отдельный файл и подгружать только на главной странице.
window.addEventListener('DOMContentLoaded', createMainAnimation);

//TODO Перенести в отдельный файл и подгружать только на главной странице.
// window.addEventListener('resize', createMainAnimation);

/** Скрипт закругления текста. */
/*const circleText = document.querySelectorAll('.circle-text .text');
circleText.forEach(textBlock => {
    const words = textBlock.textContent;

    textBlock.textContent = '';

    const symbolsArr = words.split('');
    const symbolsQuantity = symbolsArr.length;

    const circleStep = 360 / symbolsQuantity;

    for (let i = 0; i < symbolsQuantity; i++) {
        textBlock.innerHTML += `<span style="transform: rotate(${circleStep*i}deg)">${symbolsArr[i]}</span>`;
    }
});*/

/** Swiper галереи на главной странице. */
const mainGallerySwiper = new Swiper('.main__gallery .swiper', {
    slidersPerView: 5,
    spaceBetween: 40,
    freeMode: true,
    autoplay: {
        delay: 0,
    },
    speed: 1000,
    loop: true,
});

/** Какой-то Swiper */
new Swiper('.popular__list .swiper', {
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