// Плавное появление элементов при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем класс fade-in всем элементам timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 200 * index); // Каждый следующий элемент появляется чуть позже
    });
    
    // Подсветка текущего года при прокрутке
    const years = document.querySelectorAll('.timeline-year');
    
    function highlightCurrentYear() {
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        
        years.forEach(year => {
            const yearRect = year.getBoundingClientRect();
            const yearTop = yearRect.top + window.scrollY;
            const yearBottom = yearRect.bottom + window.scrollY;
            
            if (scrollPosition > yearTop && scrollPosition < yearBottom) {
                // Подсвечиваем текущий год
                year.style.fontSize = '2.5rem';
                year.style.color = '#c17b5c';
                year.style.textShadow = '0 0 15px rgba(193, 123, 92, 0.5)';
                year.style.transition = 'all 0.4s ease';
                
                // Подсвечиваем родительский элемент
                const parent = year.closest('.timeline-item');
                parent.style.backgroundColor = '#fff4e8';
                parent.style.borderColor = '#c17b5c';
                parent.style.boxShadow = '0 5px 20px rgba(193, 123, 92, 0.25)';
            } else {
                // Возвращаем обычный стиль
                year.style.fontSize = '1.8rem';
                year.style.color = '#946b51';
                year.style.textShadow = 'none';
                
                const parent = year.closest('.timeline-item');
                parent.style.backgroundColor = '#fefcf9';
                parent.style.borderColor = '#ede7df';
                parent.style.boxShadow = 'none';
            }
        });
    }
    
    // Эффект "звездопада" из воспоминаний
    function createMemoryParticle() {
        const footnote = document.querySelector('.memory-footnote');
        if (!footnote) return;
        
        const particle = document.createElement('span');
        particle.innerHTML = '✧';
        particle.style.position = 'absolute';
        particle.style.color = '#d4b69a';
        particle.style.fontSize = '1.2rem';
        particle.style.pointerEvents = 'none';
        particle.style.userSelect = 'none';
        particle.style.zIndex = '10';
        particle.style.opacity = '0.7';
        particle.style.animation = 'floatParticle 4s linear forwards';
        
        // Случайная позиция
        const rect = footnote.getBoundingClientRect();
        const startX = rect.left + Math.random() * rect.width;
        const startY = rect.top + Math.random() * rect.height;
        
        particle.style.left = startX + 'px';
        particle.style.top = startY + 'px';
        
        document.body.appendChild(particle);
        
        // Удаляем частицу после анимации
        setTimeout(() => {
            particle.remove();
        }, 4000);
    }
    
    // Добавляем ключевые кадры для анимации
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0.7;
            }
            100% {
                transform: translateY(-100px) rotate(180deg);
                opacity: 0;
            }
        }
        
        @keyframes gentleGlow {
            0% {
                box-shadow: 0 0 5px rgba(193, 123, 92, 0.3);
            }
            50% {
                box-shadow: 0 0 25px rgba(193, 123, 92, 0.7);
            }
            100% {
                box-shadow: 0 0 5px rgba(193, 123, 92, 0.3);
            }
        }
        
        .memory-header h1 {
            animation: gentleGlow 3s infinite;
        }
        
        .timeline-item {
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .timeline-item:hover {
            transform: translateX(10px) scale(1.02);
            background: #fff9f2 !important;
            border-color: #b19682 !important;
            box-shadow: 0 10px 25px rgba(177, 150, 130, 0.3) !important;
        }
        
        .timeline-year {
            transition: all 0.3s ease;
        }
        
        .timeline-year:hover {
            transform: scale(1.2);
            color: #a55d3c !important;
            text-shadow: 0 0 20px rgba(165, 93, 60, 0.8) !important;
            cursor: default;
        }
        
        .photo-section {
            transition: all 0.5s ease;
        }
        
        .photo-section:hover {
            box-shadow: 0 15px 40px rgba(177, 150, 130, 0.25);
            transform: translateY(-5px);
        }
        
        .memory-footnote {
            position: relative;
            overflow: hidden;
        }
        
        .memory-footnote::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,245,235,0.4) 0%, transparent 70%);
            animation: rotateGradient 15s linear infinite;
            z-index: 1;
            pointer-events: none;
        }
        
        @keyframes rotateGradient {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
        
        .memory-footnote p, .memory-footnote small {
            position: relative;
            z-index: 2;
        }
        
        .bio-title {
            transition: all 0.3s ease;
        }
        
        .bio-title:hover {
            letter-spacing: 3px;
            color: #6b4f3f;
        }
        
        .bio-title:hover::before {
            transform: rotate(10deg) scale(1.2);
            transition: transform 0.3s ease;
        }
    `;
    document.head.appendChild(style);
    
    // Запускаем подсветку при прокрутке
    window.addEventListener('scroll', highlightCurrentYear);
    highlightCurrentYear(); // Запускаем сразу
    
    // Создаём "звёзды" каждые 2 секунды
    setInterval(createMemoryParticle, 2000);
    
    // Добавляем эффект при клике на год
    years.forEach(year => {
        year.addEventListener('click', function() {
            this.style.animation = 'gentleGlow 0.5s 3';
            setTimeout(() => {
                this.style.animation = '';
            }, 1500);
            
            // Создаём маленький праздник из частиц
            for (let i = 0; i < 8; i++) {
                setTimeout(() => {
                    createMemoryParticle();
                }, i * 100);
            }
        });
    });
    
    // Параллакс-эффект для заголовка
    window.addEventListener('mousemove', function(e) {
        const header = document.querySelector('.memory-header h1');
        const speed = 0.02;
        const x = (window.innerWidth / 2 - e.pageX) * speed;
        const y = (window.innerHeight / 2 - e.pageY) * speed;
        
        header.style.transform = `translate(${x}px, ${y}px)`;
    });
    
    // Счётчик дней с момента ухода
    function updateDaysCounter() {
        const deathDate = new Date(2004, 5, 27); // 27 июня 2004 (месяцы с 0)
        const today = new Date();
        
        const diffTime = today - deathDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        // Создаём или обновляем счётчик
        let counter = document.querySelector('.days-counter');
        if (!counter) {
            counter = document.createElement('div');
            counter.className = 'days-counter';
            counter.style.textAlign = 'center';
            counter.style.marginTop = '2rem';
            counter.style.fontSize = '1.1rem';
            counter.style.color = '#8b7a6b';
            counter.style.fontStyle = 'italic';
            counter.style.borderTop = '1px dashed #d4c9bf';
            counter.style.paddingTop = '1.5rem';
            document.querySelector('.container').appendChild(counter);
        }
        
        const years = Math.floor(diffDays / 365);
        const days = diffDays % 365;
        
        counter.innerHTML = `✨ Прошло ${years} years и ${days} дней, но память жива... ✨`;
    }
    
    updateDaysCounter();
});
