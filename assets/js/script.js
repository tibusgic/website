/**
 * SITE VITRINE PREMIUM - CHAIST JEAN
 * Fichier JavaScript principal
 * Gestion des interactions, animations et fonctionnalités
 */

// ========================================
// VARIABLES GLOBALES
// ========================================
let isScrolling = false;
let currentSlide = 0;

// ========================================
// INITIALISATION AU CHARGEMENT
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// ========================================
// FONCTION D'INITIALISATION PRINCIPALE
// ========================================
function initializeApp() {
    // Masquer le loader après le chargement
    hideLoader();
    
    // Initialiser la navigation
    initializeNavigation();
    
    // Initialiser les animations au scroll
    initializeScrollAnimations();
    
    // Initialiser la galerie photos
    initializeGallery();
    
    // Initialiser le formulaire de contact
    initializeContactForm();
    
    // Initialiser les micro-interactions
    initializeMicroInteractions();
    
    // Initialiser le smooth scroll
    initializeSmoothScroll();
    
    console.log('🎉 Site Chaist Jean initialisé avec succès');
}

// ========================================
// GESTION DU LOADER
// ========================================
function hideLoader() {
    const loader = document.querySelector('.loading-overlay');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1000);
    }
}

// ========================================
// GESTION DE LA NAVIGATION
// ========================================
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');

    // Toggle menu mobile
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Fermer le menu lors du clic sur un lien
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Header au scroll
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(253, 252, 250, 0.98)';
            header.style.backdropFilter = 'blur(15px)';
        } else {
            header.style.background = 'rgba(253, 252, 250, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }

        // Masquer/afficher le header au scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Activer le lien correspondant à la section visible
    updateActiveNavLink();
    window.addEventListener('scroll', throttle(updateActiveNavLink, 100));
}

// Mettre à jour le lien actif dans la navigation
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.offsetHeight;
        
        if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}` || 
            (currentSection === '' && link.getAttribute('href') === '#accueil')) {
            link.classList.add('active');
        }
    });
}

// ========================================
// ANIMATIONS AU SCROLL
// ========================================
function initializeScrollAnimations() {
    // Observer pour les éléments à révéler
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer tous les éléments avec la classe scroll-reveal
    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });

    // Animation des compteurs si présents
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
}

// Animation des compteurs
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        element.textContent = Math.floor(current);
        
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// ========================================
// GALERIE PHOTOS
// ========================================
function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryItems.length === 0) return;

    // Créer la lightbox
    createLightbox();

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            openLightbox(index);
        });
    });
}

// Créer la structure de la lightbox
function createLightbox() {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-overlay"></div>
        <div class="lightbox-container">
            <button class="lightbox-close">&times;</button>
            <button class="lightbox-prev">&#8249;</button>
            <button class="lightbox-next">&#8250;</button>
            <img class="lightbox-image" src="" alt="">
            <div class="lightbox-caption"></div>
        </div>
    `;

    document.body.appendChild(lightbox);

    // Styles pour la lightbox
    const lightboxStyles = `
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            display: none;
            align-items: center;
            justify-content: center;
        }
        
        .lightbox-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(5px);
        }
        
        .lightbox-container {
            position: relative;
            max-width: 90vw;
            max-height: 90vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .lightbox-image {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            border-radius: 10px;
        }
        
        .lightbox-close,
        .lightbox-prev,
        .lightbox-next {
            position: absolute;
            background: rgba(255, 255, 255, 0.2);
            color: white;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            padding: 10px 15px;
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        
        .lightbox-close {
            top: -50px;
            right: -50px;
        }
        
        .lightbox-prev {
            left: -80px;
        }
        
        .lightbox-next {
            right: -80px;
        }
        
        .lightbox-close:hover,
        .lightbox-prev:hover,
        .lightbox-next:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: scale(1.1);
        }
        
        .lightbox-caption {
            position: absolute;
            bottom: -40px;
            left: 50%;
            transform: translateX(-50%);
            color: white;
            text-align: center;
            font-size: 1rem;
        }
        
        @media (max-width: 768px) {
            .lightbox-prev,
            .lightbox-next {
                font-size: 1.5rem;
                padding: 8px 12px;
            }
            
            .lightbox-prev {
                left: 10px;
            }
            
            .lightbox-next {
                right: 10px;
            }
            
            .lightbox-close {
                top: 10px;
                right: 10px;
            }
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = lightboxStyles;
    document.head.appendChild(styleSheet);

    // Événements de la lightbox
    const overlay = lightbox.querySelector('.lightbox-overlay');
    const close = lightbox.querySelector('.lightbox-close');
    const prev = lightbox.querySelector('.lightbox-prev');
    const next = lightbox.querySelector('.lightbox-next');

    overlay.addEventListener('click', closeLightbox);
    close.addEventListener('click', closeLightbox);
    prev.addEventListener('click', () => changeLightboxImage(-1));
    next.addEventListener('click', () => changeLightboxImage(1));

    // Navigation au clavier
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'flex') {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    changeLightboxImage(-1);
                    break;
                case 'ArrowRight':
                    changeLightboxImage(1);
                    break;
            }
        }
    });
}

// Ouvrir la lightbox
function openLightbox(index) {
    const lightbox = document.querySelector('.lightbox');
    const galleryItems = document.querySelectorAll('.gallery-item img');
    
    currentSlide = index;
    updateLightboxImage();
    
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Animation d'apparition
    setTimeout(() => {
        lightbox.style.opacity = '1';
    }, 10);
}

// Fermer la lightbox
function closeLightbox() {
    const lightbox = document.querySelector('.lightbox');
    
    lightbox.style.opacity = '0';
    setTimeout(() => {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
    }, 300);
}

// Changer d'image dans la lightbox
function changeLightboxImage(direction) {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    
    currentSlide += direction;
    
    if (currentSlide >= galleryItems.length) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = galleryItems.length - 1;
    }
    
    updateLightboxImage();
}

// Mettre à jour l'image dans la lightbox
function updateLightboxImage() {
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const galleryItems = document.querySelectorAll('.gallery-item img');
    
    if (galleryItems[currentSlide]) {
        lightboxImage.src = galleryItems[currentSlide].src;
        lightboxImage.alt = galleryItems[currentSlide].alt;
        lightboxCaption.textContent = galleryItems[currentSlide].alt;
    }
}

// ========================================
// FORMULAIRE DE CONTACT
// ========================================
function initializeContactForm() {
    const contactForms = document.querySelectorAll('.contact-form');
    
    contactForms.forEach(form => {
        form.addEventListener('submit', handleFormSubmission);
        
        // Validation en temps réel
        const inputs = form.querySelectorAll('.form-input, .form-textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearFieldError(input));
        });
    });
}

// Gestion de la soumission du formulaire
function handleFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Validation complète
    if (!validateForm(form)) {
        showNotification('Veuillez corriger les erreurs dans le formulaire.', 'error');
        return;
    }
    
    // Simulation d'envoi (à remplacer par votre logique d'envoi)
    showNotification('Envoi en cours...', 'info');
    
    setTimeout(() => {
        showNotification('Votre message a été envoyé avec succès !', 'success');
        form.reset();
    }, 2000);
}

// Validation d'un champ
function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const name = field.name;
    
    clearFieldError(field);
    
    // Champs requis
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'Ce champ est requis.');
        return false;
    }
    
    // Validation email
    if (type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Veuillez saisir une adresse email valide.');
            return false;
        }
    }
    
    // Validation téléphone
    if (name === 'telephone' && value) {
        const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
        if (!phoneRegex.test(value)) {
            showFieldError(field, 'Veuillez saisir un numéro de téléphone valide.');
            return false;
        }
    }
    
    return true;
}

// Validation complète du formulaire
function validateForm(form) {
    const fields = form.querySelectorAll('.form-input, .form-textarea');
    let isValid = true;
    
    fields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Afficher une erreur sur un champ
function showFieldError(field, message) {
    field.classList.add('error');
    
    let errorElement = field.parentNode.querySelector('.field-error');
    if (!errorElement) {
        errorElement = document.createElement('span');
        errorElement.className = 'field-error';
        field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
}

// Effacer l'erreur d'un champ
function clearFieldError(field) {
    field.classList.remove('error');
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// ========================================
// NOTIFICATIONS
// ========================================
function showNotification(message, type = 'info') {
    // Créer le conteneur de notifications s'il n'existe pas
    let container = document.querySelector('.notifications-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'notifications-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10001;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;
        document.body.appendChild(container);
    }
    
    // Créer la notification
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <span class="notification__message">${message}</span>
        <button class="notification__close">&times;</button>
    `;
    
    // Styles de la notification
    const notificationStyles = {
        info: { bg: '#3498db', color: 'white' },
        success: { bg: '#2ecc71', color: 'white' },
        error: { bg: '#e74c3c', color: 'white' },
        warning: { bg: '#f39c12', color: 'white' }
    };
    
    const style = notificationStyles[type];
    notification.style.cssText = `
        background: ${style.bg};
        color: ${style.color};
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        animation: slideInRight 0.3s ease-out;
        transform: translateX(100%);
        opacity: 0;
    `;
    
    // Ajouter les styles d'animation
    if (!document.querySelector('#notification-styles')) {
        const notifStyles = document.createElement('style');
        notifStyles.id = 'notification-styles';
        notifStyles.textContent = `
            @keyframes slideInRight {
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            .notification__close {
                background: none;
                border: none;
                color: inherit;
                font-size: 1.2rem;
                cursor: pointer;
                padding: 0;
                margin-left: 15px;
            }
        `;
        document.head.appendChild(notifStyles);
    }
    
    container.appendChild(notification);
    
    // Animation d'apparition
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 10);
    
    // Fermeture automatique
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Fermeture manuelle
    const closeBtn = notification.querySelector('.notification__close');
    closeBtn.addEventListener('click', () => removeNotification(notification));
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    notification.style.opacity = '0';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// ========================================
// MICRO-INTERACTIONS
// ========================================
function initializeMicroInteractions() {
    // Effet de ripple sur les boutons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', createRippleEffect);
    });
    
    // Parallax léger sur le hero
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', throttle(() => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            hero.style.transform = `translateY(${parallax}px)`;
        }, 10));
    }
    
    // Hover effect sur les cartes
    const cards = document.querySelectorAll('.accommodation-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Effet de ripple
function createRippleEffect(e) {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;
    
    // Ajouter l'animation CSS si elle n'existe pas
    if (!document.querySelector('#ripple-styles')) {
        const rippleStyles = document.createElement('style');
        rippleStyles.id = 'ripple-styles';
        rippleStyles.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyles);
    }
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// ========================================
// SMOOTH SCROLL
// ========================================
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// UTILITAIRES
// ========================================

// Fonction throttle pour optimiser les performances
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Fonction debounce
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Fonction pour détecter si un élément est visible
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ========================================
// GESTION DES ERREURS
// ========================================
window.addEventListener('error', function(e) {
    console.error('Erreur JavaScript:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Promise rejetée:', e.reason);
});

// ========================================
// EXPORT DES FONCTIONS (si module)
// ========================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeApp,
        showNotification,
        throttle,
        debounce
    };
}
