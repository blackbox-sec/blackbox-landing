/**
 * Animations Component
 * Maneja scroll reveals, parallax y otras animaciones
 */

import { debounce } from '../utils/helpers.js';

// Scroll reveal animations
export function initScrollReveal() {
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    scrollRevealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// Add scroll reveal class to elements
export function initScrollRevealElements() {
    const elementsToReveal = document.querySelectorAll('.service-card, .process-step, .about-content, .contact-content');
    elementsToReveal.forEach(element => {
        element.classList.add('scroll-reveal');
    });
}

// Counter animation for stats
export function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target') || counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (counter.textContent.includes('+')) {
                    counter.textContent = Math.floor(current) + '+';
                } else if (counter.textContent.includes('%')) {
                    counter.textContent = Math.floor(current) + '%';
                } else if (counter.textContent.includes('/')) {
                    counter.textContent = Math.floor(current) + '/7';
                } else {
                    counter.textContent = Math.floor(current);
                }
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = counter.textContent.includes('+') ? target + '+' : 
                                   counter.textContent.includes('%') ? target + '%' : 
                                   counter.textContent.includes('/') ? '24/7' : target;
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when stats section is visible
export function initStatsAnimation() {
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }
}

// Parallax effect for hero section
export function initParallaxEffect() {
    const debouncedScrollHandler = debounce(() => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero && scrolled < hero.offsetHeight) {
            const heroContent = document.querySelector('.hero-content');
            const heroVisual = document.querySelector('.hero-visual');
            
            if (heroContent && heroVisual) {
                const rate = scrolled * -0.3;
                heroContent.style.transform = `translateY(${rate}px)`;
                heroVisual.style.transform = `translateY(${rate * 0.8}px)`;
            }
        }
    }, 16);

    window.addEventListener('scroll', debouncedScrollHandler);
}

// Add hover effect to service cards
export function initServiceCardsHover() {
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize fade-in animation for hero section
export function initHeroAnimations() {
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroContent && heroVisual) {
        heroContent.classList.add('fade-in-up');
        setTimeout(() => {
            heroVisual.classList.add('fade-in-up');
        }, 200);
    }
}

// Initialize all animations
export function initAnimations() {
    initScrollRevealElements();
    initScrollReveal();
    initStatsAnimation();
    initParallaxEffect();
    initServiceCardsHover();
    initHeroAnimations();
} 