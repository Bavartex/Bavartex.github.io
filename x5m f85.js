document.addEventListener('DOMContentLoaded', () => {
    
    const backBtn = document.querySelector('.fa-circle-chevron-left');
    if (backBtn) {
        backBtn.style.cursor = 'pointer'; 
        
        backBtn.addEventListener('click', () => {
            window.history.back(); 
            
        });
    }

    const mainImage = document.getElementById('mainImage');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const thumbnails = document.querySelectorAll('.thumbnail');

    if (!mainImage || thumbnails.length === 0) return;

    let currentIndex = 0;

    function updateGallery(index) {
        if (index < 0) {
            currentIndex = thumbnails.length - 1;
        } else if (index >= thumbnails.length) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }

        const activeThumbImg = thumbnails[currentIndex].querySelector('img');
        const newSrc = activeThumbImg.getAttribute('src');

        mainImage.style.opacity = '0.5';
        setTimeout(() => {
            mainImage.setAttribute('src', newSrc);
            mainImage.style.opacity = '1';
        }, 150);

        thumbnails.forEach(t => t.classList.remove('active'));
        thumbnails[currentIndex].classList.add('active');

        thumbnails[currentIndex].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => updateGallery(currentIndex - 1));
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => updateGallery(currentIndex + 1));
    }

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            updateGallery(index);
        });
    });

    updateGallery(0);
});