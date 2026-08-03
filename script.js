// ==========================================================================
// УПРАВЛЕНИЕ МОДАЛЬНЫМ ОКНОМ (ИСПРАВЛЕНО ЧЕРЕЗ ID)
// ==========================================================================
const modal = document.getElementById('orderModal');
const openBtn = document.getElementById('mainOrderBtn'); // Ищем строго по ID
const closeBtn = document.querySelector('.close-btn');
const form = document.getElementById('repairForm');

// Открываем окно при клике на главную кнопку
if (openBtn) {
    openBtn.addEventListener('click', function() {
        modal.classList.add('modal-visible');
    });
}

// Закрываем окно при клике на крестик
if (closeBtn) {
    closeBtn.addEventListener('click', function() {
        modal.classList.remove('modal-visible');
    });
}

// Закрываем окно при клике на темный фон вокруг формы
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.classList.remove('modal-visible');
    }
});

// ==========================================================================
// НАДЕЖНАЯ ОТПРАВКА ФОРМЫ НА ПОЧТУ
// ==========================================================================
if (form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Останавливаем перезагрузку

        const data = new FormData(form);

        fetch(form.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                alert('Спасибо! Ваша заявка успешно отправлена. Мы скоро свяжемся с вами.');
                modal.classList.remove('modal-visible');
                form.reset();
            } else {
                alert('Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз.');
            }
        }).catch(error => {
            alert('Ошибка сети. Проверьте подключение к интернету.');
        });
    });
}

// ==========================================================================
// АНИМАЦИЯ ПЕРВОГО ЭКРАНА ПРИ ЗАГРУЗКЕ
// ==========================================================================
window.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.classList.add('hero-active');
    }
});

// ==========================================================================
// АНИМАЦИЯ ОСТАЛЬНЫХ БЛОКОВ ПРИ СКРОЛЛЕ
// ==========================================================================
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('anim-show');
        }
    });
}, {
    threshold: 0.15
});

const hiddenElements = document.querySelectorAll('.anim-hidden');
hiddenElements.forEach((el) => observer.observe(el));

// ==========================================================================
// ИДЕАЛЬНО ПЛАВНЫЙ СКРОЛЛ ДЛЯ МЕНЮ
// ==========================================================================
document.querySelectorAll('header nav a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();

        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================================================
// ПЕРЕКЛЮЧЕНИЕ ТАБЛИЦЫ ЦЕН
// ==========================================================================
const priceData = {
    ps: [
        { name: "Чистка + замена термопасты (PS4/PS5)", time: "1 час", price: "от 2 500 ₽" },
        { name: "Ремонт стика геймпада DualSense/DualShock", time: "40 мин", price: "1 500 ₽" },
        { name: "Замена разъема HDMI", time: "2 часа", price: "3 500 ₽" }
    ],
    xbox: [
        { name: "Чистка + замена термопасты (Xbox One/Series)", time: "1 час", price: "от 2 300 ₽" },
        { name: "Устранение дрифта стика геймпада Xbox", time: "40 мин", price: "1 400 ₽" },
        { name: "Ремонт блока питания", time: "1-2 дня", price: "от 3 000 ₽" }
    ],
    nintendo: [
        { name: "Замена стика Joy-Con (под ключ)", time: "30 мин", price: "1 200 ₽" },
        { name: "Замена разъема зарядки Type-C", time: "2 часа", price: "2 800 ₽" },
        { name: "Восстановление после залития", time: "1-3 дня", price: "от 3 500 ₽" }
    ]
};

function renderPrices(platform) {
    const tableBody = document.getElementById('priceLists');
    if (!tableBody) return;
    tableBody.innerHTML = '';

    priceData[platform].forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.time}</td>
            <td>${item.price}</td>
        `;
        tableBody.appendChild(row);

        setTimeout(() => {
            row.classList.add('row-visible');
        }, index * 100);
    });
}

const tabButtons = document.querySelectorAll('.tab-btn');
tabButtons.forEach(button => {
    button.addEventListener('click', function() {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        const selectedPlatform = this.getAttribute('data-platform');
        renderPrices(selectedPlatform);
    });
});

renderPrices('ps');