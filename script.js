// ОБНОВЛЕННОЕ УПРАВЛЕНИЕ МОДАЛЬНЫМ ОКНОМ
const modal = document.getElementById('orderModal');
const openBtn = document.querySelector('.cta-btn');
const closeBtn = document.querySelector('.close-btn');
const form = document.getElementById('repairForm');

// Открываем окно
openBtn.addEventListener('click', function() {
    modal.classList.add('modal-visible'); // Добавляем класс анимации
});

// Закрываем окно при клике на крестик
closeBtn.addEventListener('click', function() {
    modal.classList.remove('modal-visible'); // Убираем класс
});

// Закрываем окно при клике на темный фон
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.classList.remove('modal-visible');
    }
});

// НАДЕЖНАЯ ОТПРАВКА ФОРМЫ НА ПОЧТУ
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Останавливаем стандартную перезагрузку страницы

    // Собираем все заполненные данные из формы
    const data = new FormData(form);

    // Отправляем данные на сервер Formspree
    fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            // Если всё прошло успешно
            alert('Спасибо! Ваша заявка успешно отправлена. Мы скоро свяжемся с вами.');
            modal.classList.remove('modal-visible'); // Закрываем окно
            form.reset(); // Очищаем поля
        } else {
            // Если произошла ошибка на сервере
            alert('Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз.');
        }
    }).catch(error => {
        // Если вообще нет интернета
        alert('Ошибка сети. Проверьте подключение к интернету.');
    });
});
// База данных с ценами для разных консолей
const priceData = {
    ps: [
        { name: "Чистка + замена термопасты (PS4/PS5)", time: "1 час", price: "от 1 500 ₽" },
        { name: "Ремонт стика геймпада DualSense/DualShock", time: "40 мин", price: "от 1 400 ₽" },
        { name: "Замена разъема HDMI", time: "2 часа", price: "от 3 500 ₽" }
    ],
    xbox: [
        { name: "Чистка + замена термопасты (Xbox One/Series)", time: "1 час", price: "от 1 500 ₽" },
        { name: "Устранение дрифта стика геймпада Xbox", time: "40 мин", price: "от 1 400 ₽" },
        { name: "Ремонт блока питания", time: "1-2 дня", price: "от 3 500 ₽" }
    ],
    nintendo: [
        { name: "Замена стика Joy-Con (под ключ)", time: "30 мин", price: "от 1 400 ₽" },
        { name: "Замена разъема зарядки Type-C", time: "2 часа", price: "от 2 800 ₽" },
        { name: "Восстановление после залития", time: "1-3 дня", price: "от 3 500 ₽" }
    ]
};
// ОБНОВЛЕННАЯ ФУНКЦИЯ ОТОБРАЖЕНИЯ ПРАЙС-ЛИСТА С АНИМАЦИЕЙ
function renderPrices(platform) {
    const tableBody = document.getElementById('priceLists');
    tableBody.innerHTML = ''; // Очищаем старые строки

    // Перебираем массив услуг для выбранной платформы
    priceData[platform].forEach((item, index) => {
        // Создаем элемент строки таблицы в памяти
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.time}</td>
            <td>${item.price}</td>
        `;
        
        // Добавляем строку в таблицу
        tableBody.appendChild(row);

        // Запускаем появление с маленькой задержкой для каждой строчки
        setTimeout(() => {
            row.classList.add('row-visible');
        }, index * 100); // Первая строка через 0мс, вторая через 100мс, третья через 200мс
    });
}
// Навешиваем клики на кнопки-переключатели
const tabButtons = document.querySelectorAll('.tab-btn');

tabButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Убираем класс активной кнопки у всех
        tabButtons.forEach(btn => btn.classList.remove('active'));
        // Добавляем текущей кнопке класс active
        this.classList.add('active');
        
        // Получаем имя платформы из атрибута data-platform и обновляем таблицу
        const selectedPlatform = this.getAttribute('data-platform');
        renderPrices(selectedPlatform);
    });
});

// Запускаем отображение PlayStation по умолчанию при старте страницы
renderPrices('ps');
// АНИМАЦИЯ ПРИ ПРОКРУТКЕ (СКРОЛЛЕ)

// 1. Создаем специальный наблюдатель (Observer)
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        // Если элемент появился в зоне видимости экрана хотя бы на 15%
        if (entry.isIntersecting) {
            entry.target.classList.add('anim-show'); // Добавляем класс анимации
        }
    });
}, {
    threshold: 0.15 // Процент видимости элемента для срабатывания (15%)
});

// 2. Находим все скрытые элементы на странице и включаем для них слежку
const hiddenElements = document.querySelectorAll('.anim-hidden');
hiddenElements.forEach((el) => observer.observe(el));
// АНИМАЦИЯ ПЕРВОГО ЭКРАНА ПРИ ЗАГРУЗКЕ
window.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.classList.add('hero-active');
    }
});
javascript// ИДЕАЛЬНО ПЛАВНЫЙ СКРОЛЛ ДЛЯ МЕНЮ
document.querySelectorAll('header nav a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Отменяем мгновенный резкий переход браузера

        // Получаем id блока, к которому нужно прокрутить (например, #prices)
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            // Вычисляем позицию блока на странице с учетом высоты шапки
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - headerHeight;

            // Запускаем встроенный метод плавной прокрутки
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});