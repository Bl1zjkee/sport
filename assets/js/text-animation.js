/** Блок с текстом для анимации изменения визуала слов. */
const mixedText = document.querySelector('.mixed-text');

/** Классы со свойствами для анимаций. */
const ANIMATION_OPTIONS = {
    /** Классы отвечающие за начертание. */
    classesStyleArr: ['normal', 'italic'],
    /** Классы отвечающие за цвет. */
    classesColorArr: ['gray', 'black', 'yellow'],
    /** Классы отвечающие за жирность шрифта. */
    classesWeightArr: ['regular', 'medium', 'semi-bold', 'bold', 'bolder']
}

/** Переменные для хранения классов. */
const CLASS_VARIABLES = {
    newClass: '',
    oldClass: '',
    similarClasses: ''
}

/** Загрузка скрипта. */
if (mixedText) {
    window.addEventListener('DOMContentLoaded', function () {
        mixedTextInit();

        setInterval(mixedTextAnimation, 2000);
    });
}

/** Скрипт изменения слов в тексте при загрузке страницы. */
function mixedTextInit() {
    /** Классы стилей. */
    const {classesStyleArr, classesColorArr, classesWeightArr} = ANIMATION_OPTIONS;
    /** Переменные для хранения классов. */
    let {newClass, oldClass, similarClasses} = CLASS_VARIABLES;

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
    /** Классы стилей. */
    const {classesStyleArr, classesColorArr, classesWeightArr} = ANIMATION_OPTIONS;
    /** Переменные для хранения классов. */
    let {newClass, oldClass, similarClasses} = CLASS_VARIABLES;

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