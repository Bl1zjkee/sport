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

        setInterval(mixedTextAnimation, 2000);
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

/** Swiper популярных товаров на главной. */
const popularSwiper = new Swiper('.popular__list .swiper', {
    spaceBetween: 30,
    // loop: true,
    navigation: {
        nextEl: '.popular__list .swiper-button-next',
        prevEl: '.popular__list .swiper-button-prev',
    },
    pagination: {
        el: '.popular__list .swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});

/** Swiper галереи на главной странице. */
const mainGallerySwiper = new Swiper('.main__gallery .swiper-gallery', {
    slidesPerView: 'auto',
    loop: true,
    freeMode: true,
    simulateTouch: false,
    autoplay: {
        delay: 1,
        disableOnInteraction: true,
    },
    freeModeMomentum: false,
    speed: 5000,
    breakpoints: {
        320: {
            spaceBetween: 6,
        },
        768: {
            spaceBetween: 40,
        },
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

/** Аккордеоны. */
const accordions = document.querySelectorAll('.accordion');

if (accordions) {
    document.addEventListener('click', function (e) {
        e.stopPropagation();

        const header = e.target.closest('.accordion__header');

        if (header) {

            if (header.parentElement.classList.contains('questions-faq__item_active')) {
                header.parentElement.classList.remove('questions-faq__item_active');
                return;
            }

            accordions.forEach((accordion => {
                accordion.classList.remove('questions-faq__item_active');
            }))

            header.parentElement.classList.add('questions-faq__item_active');
        }
    });
}

/** Document overflow: hidden. */
function documentOverflowHidden() {
    document.documentElement.classList.add('hidden');
    document.body.classList.add('hidden');
}

/** Document overflow: hidden. */
function documentOverflowNormal() {
    document.documentElement.classList.remove('hidden');
    document.body.classList.remove('hidden');
}

/** Триггер мобильного меню. */
const burger = document.querySelector('.burger-js'),
    mobileMenu = document.querySelector('.mobile-menu-overlay');

if (burger) {
    burger.addEventListener('click', function () {
        documentOverflowHidden();
        mobileMenu.classList.add('overlay_opened');
    });
}

/** Закрытие модального окна. */
const closeButton = document.querySelectorAll('.close-window--js');

if (closeButton) {
    document.addEventListener('click', function (e) {
        const target = e.target;

        if (target.closest('.close-window--js') || target.classList.contains('close-window--js')) {
            documentOverflowNormal();
            target.closest('.overlay').classList.remove('overlay_opened');
        }
    });
}

/** Закрытие модального окна при клике на overlay. */
const overlay = document.querySelectorAll('.overlay');

if (overlay) {
    document.addEventListener('click', function (e) {
        const target = e.target;

        if (target.classList.contains('overlay')) {
            documentOverflowNormal();
            target.closest('.overlay').classList.remove('overlay_opened');
        }
    });
}

/** Рассылка. */
const mailingTrigger = document.querySelector('.mailing');
const closeWidget = document.querySelector('.close-widget');
const subscriptionPlaceholder = document.querySelector('.subscription-widget__placeholder');
const subscriptionInput = document.getElementById('email-subscription');
const subscriptionWidget = document.querySelector('.subscription-widget');
const subscriptionSendBtn = subscriptionWidget.querySelector('.tosend');

if (subscriptionInput) {
    subscriptionInput.addEventListener('focus', function () {
        subscriptionPlaceholder.style.display = 'none';
        subscriptionSendBtn.classList.add('tosend_active');
    });

    subscriptionInput.addEventListener('blur', function () {
        if (subscriptionInput.value === '') {
            subscriptionPlaceholder.style.display = 'block';
            subscriptionSendBtn.classList.remove('tosend_active');
        }
    });

    mailingTrigger.addEventListener('click', function () {
        this.classList.add('mailing_hide');
        subscriptionWidget.classList.add('subscription-widget_opened');
    });

    closeWidget.addEventListener('click', function () {
        mailingTrigger.classList.remove('mailing_hide');
        subscriptionWidget.classList.remove('subscription-widget_opened');
    })
}

/** Функция получения координаты скролла от верха страницы. */
function getBodyScrollTop() {
    return self.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop);
}

/** Появление меню при скролле на главной. */
const mainMenu = document.querySelector('.header_main');

if (mainMenu) {
    window.addEventListener('scroll', function () {
        const mainMenuHeight = mainMenu.clientHeight;

        if (getBodyScrollTop() > mainMenuHeight) {
            mainMenu.classList.add('showed-js');
        } else {
            mainMenu.classList.remove('showed-js');
        }
    });
}