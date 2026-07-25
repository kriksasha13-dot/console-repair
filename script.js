// Находим нужные элементы на странице
const modal = document.getElementById('orderModal');
const openBtn = document.querySelector('.cta-btn');
const closeBtn = document.querySelector('.close-btn');
const form = document.getElementById('repairForm');

// Открываем окно при клике на кнопку заявки
openBtn.addEventListener('click', function() {
    modal.style.display = 'flex'; // Меняем display, чтобы окно появилось
});

// Закрываем окно при клике на крестик
closeBtn.addEventListener('click', function() {
    modal.style.display = 'none'; // Скрываем окно
});

// Закрываем окно, если пользователь кликнул мимо окна (на темный фон)
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Обработка отправки формы
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Запрещаем странице перезагружаться
    alert('Спасибо! Ваша заявка успешно отправлена. Мы скоро свяжемся с вами.');
    modal.style.display = 'none'; // Закрываем окно после отправки
    form.reset(); // Очищаем поля формы
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

// Функция для отображения прайс-листа на экране
function renderPrices(platform) {
    const tableBody = document.getElementById('priceLists');
    tableBody.innerHTML = ''; // Очищаем старые строки

    // Перебираем массив услуг для выбранной платформы
    priceData[platform].forEach(item => {
        const row = `
            <tr>
                <td>${item.name}</td>
                <td>${item.time}</td>
                <td>${item.price}</td>
            </tr>
        `;
        tableBody.innerHTML += row; // Добавляем строку в таблицу
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