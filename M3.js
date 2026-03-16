document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Кнопка "Назад" (Стрелка влево в хедере)
    // ==========================================
    const backBtn = document.querySelector('.fa-circle-chevron-left');
    if (backBtn) {
        // Меняем курсор на указатель, чтобы было понятно, что это кнопка
        backBtn.style.cursor = 'pointer'; 
        
        backBtn.addEventListener('click', () => {
            // Возвращает на предыдущую страницу в истории браузера
            window.history.back(); 
            
            // Если ты хочешь, чтобы кнопка всегда вела на главную (например, index.html),
            // удали строку выше и раскомментируй строку ниже:
            // window.location.href = 'index.html';
        });
    }

    // ==========================================
    // 2. Логика Галереи (Стрелки и Миниатюры)
    // ==========================================
    const mainImage = document.getElementById('mainImage');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const thumbnails = document.querySelectorAll('.thumbnail');

    // Если на странице нет галереи, прерываем скрипт, чтобы не было ошибок
    if (!mainImage || thumbnails.length === 0) return;

    let currentIndex = 0; // Текущий индекс картинки

    // Функция обновления главной картинки и подсветки миниатюры
    function updateGallery(index) {
        // Зацикливание: если индекс меньше 0, идем в конец. Если больше последней - идем в начало.
        if (index < 0) {
            currentIndex = thumbnails.length - 1;
        } else if (index >= thumbnails.length) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }

        // Берем src у картинки внутри нужной миниатюры
        const activeThumbImg = thumbnails[currentIndex].querySelector('img');
        const newSrc = activeThumbImg.getAttribute('src');

        // Плавно меняем главную картинку (через небольшое исчезновение)
        mainImage.style.opacity = '0.5';
        setTimeout(() => {
            mainImage.setAttribute('src', newSrc);
            mainImage.style.opacity = '1';
        }, 150); // 150мс - время анимации

        // Убираем класс active у всех миниатюр
        thumbnails.forEach(t => t.classList.remove('active'));
        // Добавляем класс active выбранной миниатюре
        thumbnails[currentIndex].classList.add('active');

        // Автоматическая прокрутка ленты миниатюр, чтобы активная всегда была в зоне видимости
        thumbnails[currentIndex].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
    }

    // Обработчики кликов по стрелкам
    if (prevBtn) {
        prevBtn.addEventListener('click', () => updateGallery(currentIndex - 1));
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => updateGallery(currentIndex + 1));
    }

    // Обработчики кликов по миниатюрам
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            updateGallery(index);
        });
    });

    // Инициализация: при загрузке страницы подгружаем первую картинку в главное окно
    // (Полезно, если в HTML src главной картинки оставлен пустым)
    updateGallery(0);
});