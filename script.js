// Основная функция при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация адаптивного viewport для мобильных устройств
    initResponsiveViewport();
    
    // Инициализация мобильного меню
    initMobileMenu();
    
    // Инициализация плавной прокрутки
    initSmoothScroll();
    
    // Инициализация анимаций при скролле
    initScrollAnimations();
    
    // Инициализация параллакса
    initParallax();

    // Инициализация аккордеона для творческого пути
    initWritingAccordion();

    // Инициализация выпадающего меню
    initDropdownMenu();
});

// Функция инициализации выпадающего меню
function initDropdownMenu() {
    const dropdown = document.getElementById('additional-dropdown');
    const additionalButton = document.getElementById('additional-button');
    
    if (!dropdown || !additionalButton) {
        console.warn('Элементы выпадающего меню не найдены');
        return;
    }
    
    // Функция для проверки мобильного устройства
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    // Обработчик клика по кнопке "Дополнительно"
    function handleAdditionalClick(e) {
        if (!isMobile()) return;
        
        e.preventDefault();
        console.log('Клик по дополнительно');
        
        // Закрываем все другие открытые dropdown
        document.querySelectorAll('.dropdown').forEach(otherDropdown => {
            if (otherDropdown !== dropdown && otherDropdown.classList.contains('active')) {
                otherDropdown.classList.remove('active');
            }
        });
        
        // Переключаем текущий dropdown
        dropdown.classList.toggle('active');
    }
    
    // Обработчик клика вне dropdown
    function handleOutsideClick(e) {
        if (!isMobile()) return;
        
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    }
    
    // Обработчик клика внутри dropdown
    function handleDropdownClick(e) {
        if (!isMobile()) return;
        e.stopPropagation();
    }
    
    // Обработчик ресайза окна
    function handleResize() {
        if (!isMobile()) {
            dropdown.classList.remove('active');
        }
    }
    
    // Инициализация событий
    if (isMobile()) {
        additionalButton.addEventListener('click', handleAdditionalClick);
        document.addEventListener('click', handleOutsideClick);
        dropdown.addEventListener('click', handleDropdownClick);
    }
    
    // Слушатель ресайза
    window.addEventListener('resize', function() {
        // Удаляем старые обработчики
        additionalButton.removeEventListener('click', handleAdditionalClick);
        document.removeEventListener('click', handleOutsideClick);
        dropdown.removeEventListener('click', handleDropdownClick);
        
        // Добавляем новые обработчики в зависимости от размера экрана
        if (isMobile()) {
            additionalButton.addEventListener('click', handleAdditionalClick);
            document.addEventListener('click', handleOutsideClick);
            dropdown.addEventListener('click', handleDropdownClick);
        } else {
            dropdown.classList.remove('active');
        }
    });
}


// Адаптивный viewport для мобильных устройств
function initResponsiveViewport() {
    // Устанавливаем viewport для правильного отображения на мобильных устройствах
    const viewport = document.querySelector('meta[name="viewport"]');
    
    // Функция для обновления viewport
    function updateViewport() {
        const isMobile = window.innerWidth <= 768;
        const isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
        
        if (isMobile) {
            // Для мобильных устройств - фиксированная ширина и запрет масштабирования
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
        } else if (isTablet) {
            // Для планшетов - адаптивная ширина с возможностью масштабирования
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
        } else {
            // Для десктопов - стандартные настройки
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
        }
        
        // Динамическое обновление CSS переменных для адаптивности
        document.documentElement.style.setProperty('--viewport-width', window.innerWidth + 'px');
        document.documentElement.style.setProperty('--viewport-height', window.innerHeight + 'px');
    }
    
    // Обновляем при загрузке и изменении размера окна
    updateViewport();
    window.addEventListener('resize', updateViewport);
    window.addEventListener('orientationchange', function() {
        setTimeout(updateViewport, 100);
    });
    
    // Добавляем CSS переменные если их нет
    if (!document.documentElement.style.getPropertyValue('--viewport-width')) {
        document.documentElement.style.setProperty('--viewport-width', '100vw');
        document.documentElement.style.setProperty('--viewport-height', '100vh');
    }
}

// Мобильное меню
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            // Блокируем скролл при открытом меню на мобильных устройствах
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Закрытие меню при клике на ссылку
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Закрытие меню при клике вне его
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.nav-container') && !event.target.closest('#hamburger')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Закрытие меню при изменении ориентации устройства
        window.addEventListener('orientationchange', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
}

// Плавная прокрутка
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link, .cta-button');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Проверяем, является ли ссылка якорем
            if (href && href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Закрываем мобильное меню если оно открыто
                    const navMenu = document.getElementById('nav-menu');
                    const hamburger = document.getElementById('hamburger');
                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        hamburger.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                }
            }
        });
    });
}

// Анимации при скролле
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            }
        });
    }, observerOptions);

    // Анимируем элементы
    const animatedElements = document.querySelectorAll(
        'section, .about-card, .character-hero, .character-villain, .world-card, .feature-item'
    );
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        observer.observe(element);
    });
}

// Параллакс эффект
function initParallax() {
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Аккордеон для творческого пути
function initWritingAccordion() {
    const writingHeaders = document.querySelectorAll('.writing-header');
    
    writingHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isOpen = content.classList.contains('open');
            
            // Закрываем все открытые элементы
            document.querySelectorAll('.writing-content.open').forEach(openContent => {
                openContent.classList.remove('open');
            });
            document.querySelectorAll('.writing-header.active').forEach(activeHeader => {
                activeHeader.classList.remove('active');
            });
            
            // Открываем текущий, если был закрыт
            if (!isOpen) {
                content.classList.add('open');
                this.classList.add('active');
            }
        });
    });
}

// Адаптивная обработка изображений для мобильных устройств
function optimizeImagesForMobile() {
    const images = document.querySelectorAll('img');
    const isMobile = window.innerWidth <= 768;
    
    images.forEach(img => {
        if (isMobile) {
            // Для мобильных устройств добавляем атрибуты для оптимизации
            img.setAttribute('loading', 'lazy');
            img.setAttribute('decoding', 'async');
        }
        
        // Обработка ошибок загрузки изображений
        img.addEventListener('error', function() {
            this.alt = 'Изображение не загружено';
            console.warn('Не удалось загрузить изображение:', this.src);
        });
    });
}

// Оптимизация для мобильных устройств
function initMobileOptimizations() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        document.documentElement.classList.add('mobile-device');
        
        // Оптимизация касаний
        document.addEventListener('touchstart', function() {}, { passive: true });
        
        // Предотвращение масштабирования при двойном тапе
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function(event) {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, { passive: false });
    }
}

// Защита от ошибок
window.addEventListener('error', function(e) {
    console.log('Произошла ошибка:', e.error);
});

// Оптимизация для мобильных устройств
if ('ontouchstart' in window) {
    document.documentElement.classList.add('touch-device');
    initMobileOptimizations();
}

// Инициализация оптимизации изображений
optimizeImagesForMobile();
window.addEventListener('resize', optimizeImagesForMobile);

// Предотвращение быстрых множественных кликов
function preventMultipleClicks(element, timeout = 1000) {
    let lastClick = 0;
    
    element.addEventListener('click', function(e) {
        const now = Date.now();
        if (now - lastClick < timeout) {
            e.preventDefault();
            e.stopPropagation();
        }
        lastClick = now;
    });
}

// Применяем ко всем CTA кнопкам
document.querySelectorAll('.cta-button').forEach(btn => {
    preventMultipleClicks(btn);
});

// Дополнительные обработчики для улучшения пользовательского опыта на мобильных устройствах
window.addEventListener('load', function() {
    // Убедимся, что все ресурсы загружены перед показом контента
    document.body.classList.add('loaded');
    
    // Инициализация Service Worker для кэширования (если нужно)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(console.error);
    }
});