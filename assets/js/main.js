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
        } else {
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

/** Блок с текстом для анимации изменения визуала слов. */
const mixedText = document.querySelector('.mixed-text');

/** Классы отвечающие за начертание (style). */
const classesStyleArr = ['normal', 'italic'],
    /** Классы отвечающие за цвет. */
    classesColorArr = ['gray', 'black', 'yellow'],
    /** Классы отвечающие за жирность шрифта. */
    classesWeightArr = ['regular', 'medium', 'semi-bold', 'bold', 'bolder'];

if (mixedText) {
    window.addEventListener('DOMContentLoaded', function () {
        mixedTextInit();

        setInterval(mixedTextAnimation, 1000);
    });
}

let newClass = '',
    oldClass = '';

let similarClasses;

/** Скрипт изменения слов в тексте при загрузке страницы. */
function mixedTextInit() {
    /** Собираем массив из слов и символов. */
    const words = mixedText.textContent.split(' ');

    /** Очищаем родителя. */
    mixedText.textContent = '';

    for (let i = 0; i < words.length; i++) {

        if (words[i].length <= 2) {
            /** Если символ тире, предлог или союз, то его добавляем не преобразовывая. */
            mixedText.innerHTML += `${words[i]} `;
        } else {
            /** Генерируем новый класс. */
            newClass = generateMixedClass(classesStyleArr, classesColorArr, classesWeightArr);

            /** Если есть старый класс, то проверяем новый класс на уникальность. */
            if (oldClass) similarClasses = differenceBetweenClasses(oldClass, newClass);

            /** Если есть схожие классы, то генерируем уникальный класс. */
            if (similarClasses) {
                newClass = uniqueClassGenerator(similarClasses, oldClass, newClass, classesStyleArr, classesColorArr, classesWeightArr);
            }

            /** Добавляем слово в родителя. */
            mixedText.innerHTML += `<span class="${newClass}">${words[i]}</span> `;

            /** Перезаписываем переменную. */
            oldClass = newClass;
        }
    }
}

/** Функция анимации mixed текста. */
function mixedTextAnimation() {
    /** Массив для случайных индексов. */
    const randomIndexesArr = [];

    /** Собираем все span в родителе. */
    const allSpans = mixedText.querySelectorAll('span');

    allSpans.forEach((span, i) => {
        console.log(span, i)
        /** Пушим в массив случайный индекс. */
        randomIndexesArr.push(randomIndex(allSpans));

        /** Если текущего индекса нет в массиве, то выходим с текущей итерации. */
        if (!randomIndexesArr.find(item => item === i)) return;

        /** Генерируем новый класс. */
        newClass = generateMixedClass(classesStyleArr, classesColorArr, classesWeightArr);

        /** Если есть старый класс, то проверяем новый класс на уникальность. */
        if (oldClass) similarClasses = differenceBetweenClasses(oldClass, newClass);

        /** Если есть схожие классы, то генерируем уникальный класс. */
        if (similarClasses) {
            newClass = uniqueClassGenerator(similarClasses, oldClass, newClass, classesStyleArr, classesColorArr, classesWeightArr);
        }

        /** Удаляем старые классы. */
        span.classList.remove(...span.classList);

        /** Добавляем новые. */
        span.classList.add(...newClass.split(' '));

        /** Перезаписываем переменную. */
        oldClass = newClass;
    });
}

/** Функция, генерации уникального класса (непохожего на предыдущий). */
function uniqueClassGenerator(similarClasses, oldClass, newClass, ...arr) {
    while (similarClasses) {
        newClass = generateMixedClass(...arr);
        similarClasses = differenceBetweenClasses(oldClass, newClass);
    }

    return newClass;
}

/** Функция сравнения нового класса и старого класса. */
function differenceBetweenClasses(oldClass, newClass) {
    const common = oldClass.split(' ').filter(x => newClass.split(' ').includes(x));

    return common.length !== 0;
}

/** Функция выбора рандомного индекса массива. Принимает аргументом массив. */
function randomIndex(arr) {
    const randomIndex = Math.random() * arr.length;

    return Math.floor(randomIndex);
}

/** Функция генерации класса из массивов. */
function generateMixedClass(...args) {
    let classString = '';

    for (let i = 0; i < args.length; i++) {
        if (i === args.length - 1) {
            classString += `${args[i][randomIndex(args[i])]}`;
        } else {
            classString += `${args[i][randomIndex(args[i])]} `;
        }
    }

    return classString;
}

/** Swiper галереи на главной странице. */
const mainGallerySwiper = new Swiper('.main__gallery .swiper', {
    slidersPerView: 3,
    spaceBetween: 40,
    loop: true,
    // loopedSlides: 2,
    // autoplay: true,
    freeMode: true,
    // speed: 5000,
    // freeModeMomentum: false
});

/** Swiper популярных товаров на главной. */
const popularSwiper = new Swiper('.popular__list .swiper', {
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
        2560: {
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
    spaceBetween: 0, // расстояние между слайдами
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
    spaceBetween: 0, // расстояние между слайдами
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
            direction: 'vertical', // горизонтальная прокрутка
        },
        768: { // при 768px и выше
            direction: 'vertical', // вертикальная прокрутка
        }
    }
});