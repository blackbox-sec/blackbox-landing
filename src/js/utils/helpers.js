/**
 * Helper Utilities
 * Funciones de utilidad reutilizables
 */

// Performance optimization: debounce scroll events
export function debounce(func, wait) {
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

// Notification system
export function showNotification(message, type = 'info') {
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

// Smooth scroll to top functionality
export function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button
export function initScrollToTopButton() {
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
}

// Preload critical elements
export function preloadCriticalElements() {
    const criticalElements = document.querySelectorAll('img, .service-card, .process-step');
    criticalElements.forEach(element => {
        element.style.transition = 'all 0.3s ease';
    });
} 