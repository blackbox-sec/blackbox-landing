// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Scroll reveal animations
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

// Add scroll reveal class to elements
document.addEventListener('DOMContentLoaded', () => {
    const elementsToReveal = document.querySelectorAll('.service-card, .process-step, .about-content, .contact-content');
    elementsToReveal.forEach(element => {
        element.classList.add('scroll-reveal');
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// Terminal typing animation
document.addEventListener('DOMContentLoaded', () => {
    const terminalCommands = [
        'nmap -sS -O target.com',
        'sqlmap -u "http://target.com" --dbs',
        'nikto -h target.com',
        'gobuster dir -u target.com -w wordlist.txt',
        'burpsuite --proxy=127.0.0.1:8080'
    ];
    
    const commandElement = document.querySelector('.terminal-line .command');
    const cursorElement = document.querySelector('.cursor');
    
    let currentCommandIndex = 0;
    let currentCharIndex = 0;
    let isTyping = false;
    
    function typeCommand() {
        if (isTyping) return;
        
        isTyping = true;
        const currentCommand = terminalCommands[currentCommandIndex];
        
        commandElement.textContent = '';
        
        const typeInterval = setInterval(() => {
            if (currentCharIndex < currentCommand.length) {
                commandElement.textContent += currentCommand[currentCharIndex];
                currentCharIndex++;
            } else {
                clearInterval(typeInterval);
                setTimeout(() => {
                    currentCommandIndex = (currentCommandIndex + 1) % terminalCommands.length;
                    currentCharIndex = 0;
                    isTyping = false;
                    setTimeout(typeCommand, 1000);
                }, 2000);
            }
        }, 100);
    }
    
    // Start typing animation after a delay
    setTimeout(typeCommand, 2000);
});

// Counter animation for stats
const animateCounters = () => {
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
};

// Trigger counter animation when stats section is visible
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

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Validate form
        if (!formObject.name || !formObject.email || !formObject.consultation) {
            showNotification('Por favor completa todos los campos obligatorios', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formObject.email)) {
            showNotification('Por favor ingresa un email válido', 'error');
            return;
        }
        
        // Show loading state
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            console.log('Form submitted:', formObject);
            showNotification('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    `;
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.background = 'linear-gradient(135deg, #00ff88, #0066cc)';
            break;
        case 'error':
            notification.style.background = 'linear-gradient(135deg, #ff6b35, #f9ca24)';
            break;
        default:
            notification.style.background = 'var(--dark-card)';
    }
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (hero && scrolled < hero.offsetHeight) {
        const rate = scrolled * -0.5;
        heroContent.style.transform = `translateY(${rate}px)`;
        heroVisual.style.transform = `translateY(${rate * 0.8}px)`;
    }
});

// Add hover effect to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Smooth scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    let scrollButton = document.querySelector('.scroll-to-top');
    
    if (scrollTop > 500) {
        if (!scrollButton) {
            scrollButton = document.createElement('button');
            scrollButton.className = 'scroll-to-top';
            scrollButton.innerHTML = '↑';
            scrollButton.onclick = scrollToTop;
            scrollButton.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: var(--gradient-primary);
                color: white;
                border: none;
                cursor: pointer;
                font-size: 20px;
                font-weight: bold;
                box-shadow: var(--shadow-lg);
                z-index: 1000;
                transition: all 0.3s ease;
                opacity: 0;
                transform: scale(0.8);
            `;
            document.body.appendChild(scrollButton);
        }
        
        scrollButton.style.opacity = '1';
        scrollButton.style.transform = 'scale(1)';
    } else if (scrollButton) {
        scrollButton.style.opacity = '0';
        scrollButton.style.transform = 'scale(0.8)';
    }
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to hero section
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroContent && heroVisual) {
        heroContent.classList.add('fade-in-up');
        setTimeout(() => {
            heroVisual.classList.add('fade-in-up');
        }, 200);
    }
    
    // Preload critical elements
    const criticalElements = document.querySelectorAll('img, .service-card, .process-step');
    criticalElements.forEach(element => {
        element.style.transition = 'all 0.3s ease';
    });
});

// Performance optimization: debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(() => {
    // Scroll-based animations and effects
    const scrolled = window.pageYOffset;
    
    // Update navbar
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.background = scrolled > 50 ? 
            'rgba(10, 10, 10, 0.98)' : 
            'rgba(10, 10, 10, 0.95)';
    }
    
    // Parallax effects
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
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler); 