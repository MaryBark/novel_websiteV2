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

    // Инициализация дерева для творческого пути
    initWritingAccordion();


     const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdown = document.querySelector('.dropdown');
    
    // Обработчик для мобильных
    dropdownToggle.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            e.stopPropagation();
            dropdown.classList.toggle('active');
        }
    });
    
    // Закрытие при клике вне меню
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown') && window.innerWidth <= 768) {
            dropdown.classList.remove('active');
        }
    });
    
    // Для тач-устройств
    dropdownToggle.addEventListener('touchstart', function(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        }
    });

});

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

// Дерево творческого пути
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


// Инициализация интерактивной карты
function initInteractiveMap() {
    const mapImage = document.getElementById('mainMap');
    const mapOverlay = document.getElementById('mapOverlay');
    const legendItems = document.querySelectorAll('.legend-item[data-region]');
    const mapAreas = document.querySelectorAll('.map-area');
    const regionDescription = document.getElementById('regionDescription');
    
    // Данные регионов с описаниями
    const regionsData = {
        'miele': {
            name: 'Столица Мьеле',
            description: 'Столица Супериоры, центр политической и магической власти. Здесь расположен Дворец Хранителей и Великая Библиотека. Город построен вокруг древнего кристалла, питающего магические барьеры.',
            type: 'capital'
        },
        'roonmueffi': {
            name: 'Роонмюффи',
            description: 'Торговый город на перекрестке караванных путей. Известен своими ремесленными гильдиями и ежегодной ярмаркой магических артефактов.',
            type: 'city'
        },
        'hertaldean': {
            name: 'Лес Хертальдин',
            description: 'Древний магический лес, населенный эльфами и духами природы. Деревья здесь растут выше облаков, а в центре леса находится Источник Вечной Жизни.',
            type: 'forest'
        },
        'berginni': {
            name: 'Горы Бергинни',
            description: 'Самые высокие горы Супериоры. Здесь обитают драконы и горные тролли. В глубинах гор находятся древние рудники, где добывают магические кристаллы.',
            type: 'mountains'
        },
        'augur': {
            name: 'Аугур',
            description: 'Город предсказателей и астрологов. Здесь находится Обсерватория Судьбы, где маги читают будущее в звездах и энергетических потоках.',
            type: 'city'
        }
    };
    
    // Инициализация зума
    let currentScale = 1;
    let isDragging = false;
    let startX, startY;
    let translateX = 0, translateY = 0;
    
    // Функция для выделения региона
    function highlightRegion(regionId) {
        // Убираем выделение у всех
        legendItems.forEach(item => item.classList.remove('active'));
        mapAreas.forEach(area => {
            area.classList.remove('active');
            area.classList.remove('highlight');
        });
        
        // Выделяем выбранный регион
        const legendItem = document.querySelector(`.legend-item[data-region="${regionId}"]`);
        const mapArea = document.querySelector(`.map-area[data-region="${regionId}"]`);
        
        if (legendItem) legendItem.classList.add('active');
        if (mapArea) {
            mapArea.classList.add('active');
            mapArea.classList.add('highlight');
            
            // Центрируем карту на регионе (если нужно)
            const rect = mapArea.getBoundingClientRect();
            const containerRect = mapImage.getBoundingClientRect();
            
            const centerX = (rect.left + rect.width / 2 - containerRect.left) / currentScale;
            const centerY = (rect.top + rect.height / 2 - containerRect.top) / currentScale;
            
            // Плавная прокрутка к региону
            smoothScrollTo(centerX, centerY);
        }
        
        // Показываем описание региона
        if (regionsData[regionId]) {
            showRegionDescription(regionId);
        }
    }
    
    // Функция показа описания региона
    function showRegionDescription(regionId) {
        const region = regionsData[regionId];
        regionDescription.innerHTML = `
            <h4><i class="fas fa-info-circle"></i> ${region.name}</h4>
            <p>${region.description}</p>
            <div style="margin-top: 10px; font-size: 0.9rem; color: #e94560;">
                <i class="fas fa-tag"></i> Тип: ${getRegionType(region.type)}
            </div>
        `;
    }
    
    // Функция для получения читаемого типа региона
    function getRegionType(type) {
        const types = {
            'capital': 'Столица',
            'city': 'Город',
            'forest': 'Лес',
            'mountains': 'Горная цепь',
            'river': 'Река',
            'lake': 'Озеро'
        };
        return types[type] || type;
    }
    
    // Обработчики для элементов легенды
    legendItems.forEach(item => {
        item.addEventListener('click', function() {
            const regionId = this.getAttribute('data-region');
            highlightRegion(regionId);
        });
    });
    
    // Обработчики для областей на карте
    mapAreas.forEach(area => {
        area.addEventListener('click', function() {
            const regionId = this.getAttribute('data-region');
            highlightRegion(regionId);
        });
    });
    
    // Функции зума
    function zoomIn() {
        currentScale += 0.2;
        updateMapTransform();
    }
    
    function zoomOut() {
        if (currentScale > 0.5) {
            currentScale -= 0.2;
            updateMapTransform();
        }
    }
    
    function resetMap() {
        currentScale = 1;
        translateX = 0;
        translateY = 0;
        updateMapTransform();
        
        // Сбрасываем выделение
        legendItems.forEach(item => item.classList.remove('active'));
        mapAreas.forEach(area => {
            area.classList.remove('active');
            area.classList.remove('highlight');
        });
        
        // Сбрасываем описание
        regionDescription.innerHTML = `
            <h4><i class="fas fa-info-circle"></i> Информация о регионе</h4>
            <p>Нажмите на любой регион в легенде или на карте, чтобы увидеть подробное описание.</p>
        `;
    }
    
    function highlightAll() {
        mapAreas.forEach(area => {
            area.classList.add('highlight');
        });
    }
    
    function updateMapTransform() {
        mapImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentScale})`;
    }
    
    // Плавная прокрутка к точке
    function smoothScrollTo(x, y) {
        const targetX = -x * currentScale + window.innerWidth / 2;
        const targetY = -y * currentScale + window.innerHeight / 2;
        
        translateX = targetX;
        translateY = targetY;
        updateMapTransform();
    }
    
    // Drag & drop для карты
    mapImage.addEventListener('mousedown', startDrag);
    mapImage.addEventListener('touchstart', startDragTouch);
    
    function startDrag(e) {
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDrag);
        mapImage.style.cursor = 'grabbing';
    }
    
    function startDragTouch(e) {
        if (e.touches.length === 1) {
            isDragging = true;
            startX = e.touches[0].clientX - translateX;
            startY = e.touches[0].clientY - translateY;
            document.addEventListener('touchmove', dragTouch);
            document.addEventListener('touchend', stopDrag);
        }
    }
    
    function drag(e) {
        if (!isDragging) return;
        e.preventDefault();
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        updateMapTransform();
    }
    
    function dragTouch(e) {
        if (!isDragging || e.touches.length !== 1) return;
        e.preventDefault();
        translateX = e.touches[0].clientX - startX;
        translateY = e.touches[0].clientY - startY;
        updateMapTransform();
    }
    
    function stopDrag() {
        isDragging = false;
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('touchmove', dragTouch);
        document.removeEventListener('mouseup', stopDrag);
        document.removeEventListener('touchend', stopDrag);
        mapImage.style.cursor = 'grab';
    }
    
    // Добавляем функции в глобальную область видимости
    window.zoomIn = zoomIn;
    window.zoomOut = zoomOut;
    window.resetMap = resetMap;
    window.highlightAll = highlightAll;
    
    // Инициализация
    mapImage.style.cursor = 'grab';
    console.log('Интерактивная карта инициализирована');
}