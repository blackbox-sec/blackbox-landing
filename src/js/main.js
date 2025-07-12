/**
 * BlackBox Security Landing Page - Main JavaScript
 * Archivo principal que inicializa todos los módulos
 */

// Import all components and utilities
import { initNavigation } from './components/navigation.js';
import { initTerminal } from './components/terminal.js';
import { initForms } from './components/forms.js';
import { initAnimations } from './components/animations.js';
import { initScrollToTopButton, preloadCriticalElements } from './utils/helpers.js';
import './utils/security.js'; // Security utilities

/**
 * Initialize the entire application
 */
function initApp() {
    // Initialize all components
    initNavigation();
    initTerminal();
    initForms();
    initAnimations();
    
    // Initialize utilities
    initScrollToTopButton();
    preloadCriticalElements();
    
            console.log('🚀 BlackBox Security Landing Page initialized successfully');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);

// Fallback initialization for older browsers
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
} 