/**
 * Forms Component
 * Maneja formularios de contacto con validaciones de seguridad robustas
 */

import { showNotification } from '../utils/helpers.js';
import { 
    validateFormData, 
    sanitizeFormData, 
    checkRateLimit,
    sanitizeInput,
    validateName,
    validateEmail,
    validatePhone,
    validateConsultation 
} from '../utils/security.js';

// Error display utilities
function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest('.form-group');
    
    // Remove existing error
    const existingError = formGroup.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error styling
    field.classList.add('error');
    
    // Add error message
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    formGroup.appendChild(errorElement);
}

function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest('.form-group');
    
    // Remove error styling
    field.classList.remove('error');
    
    // Remove error message
    const existingError = formGroup.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

function clearAllErrors() {
    const errorFields = document.querySelectorAll('.form-group input.error, .form-group textarea.error');
    errorFields.forEach(field => {
        clearFieldError(field.id);
    });
}

// Real-time validation
function addRealTimeValidation() {
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const phoneField = document.getElementById('phone');
    const consultationField = document.getElementById('consultation');
    const consultationCount = document.getElementById('consultationCount');
    
    // Name validation
    if (nameField) {
        nameField.addEventListener('blur', function() {
            const value = this.value.trim();
            if (value && !validateName(value)) {
                showFieldError('name', 'El nombre debe tener entre 2 y 50 caracteres y solo contener letras, espacios, guiones y apostrofes.');
            } else {
                clearFieldError('name');
            }
        });
        
        nameField.addEventListener('input', function() {
            // Sanitize input in real time
            const sanitized = sanitizeInput(this.value);
            if (sanitized !== this.value) {
                this.value = sanitized;
            }
        });
    }
    
    // Email validation
    if (emailField) {
        emailField.addEventListener('blur', function() {
            const value = this.value.trim();
            if (value && !validateEmail(value)) {
                showFieldError('email', 'Por favor ingresa un email válido.');
            } else {
                clearFieldError('email');
            }
        });
        
        emailField.addEventListener('input', function() {
            const sanitized = sanitizeInput(this.value);
            if (sanitized !== this.value) {
                this.value = sanitized;
            }
        });
    }
    
    // Phone validation
    if (phoneField) {
        phoneField.addEventListener('blur', function() {
            const value = this.value.trim();
            if (value && !validatePhone(value)) {
                showFieldError('phone', 'El teléfono debe tener un formato válido.');
            } else {
                clearFieldError('phone');
            }
        });
        
        phoneField.addEventListener('input', function() {
            const sanitized = sanitizeInput(this.value);
            if (sanitized !== this.value) {
                this.value = sanitized;
            }
        });
    }
    
    // Consultation validation and character count
    if (consultationField && consultationCount) {
        consultationField.addEventListener('input', function() {
            const value = this.value;
            const length = value.length;
            
            // Update character count
            consultationCount.textContent = length;
            
            // Color coding for character count
            if (length > 2000) {
                consultationCount.style.color = 'var(--accent-color)';
            } else if (length > 1800) {
                consultationCount.style.color = 'var(--text-secondary)';
            } else {
                consultationCount.style.color = 'var(--primary-color)';
            }
            
            // Sanitize input
            const sanitized = sanitizeInput(value);
            if (sanitized !== value) {
                this.value = sanitized;
                consultationCount.textContent = sanitized.length;
            }
        });
        
        consultationField.addEventListener('blur', function() {
            const value = this.value.trim();
            if (value && !validateConsultation(value)) {
                showFieldError('consultation', 'La consulta debe tener entre 10 y 2000 caracteres y contener texto válido.');
            } else {
                clearFieldError('consultation');
            }
        });
    }
}

// Contact form handling
export function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    // Add real-time validation
    addRealTimeValidation();
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear all previous errors
        clearAllErrors();
        
        // Check rate limiting
        const rateLimitResult = checkRateLimit();
        if (!rateLimitResult.allowed) {
            showNotification(rateLimitResult.message, 'error');
            return;
        }
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Check honeypot
        if (formObject.website) {
            console.warn('Bot detected - honeypot field filled');
            showNotification('Error al enviar el formulario. Inténtalo de nuevo.', 'error');
            return;
        }
        
        // Remove honeypot from data
        delete formObject.website;
        
        // Sanitize form data
        const sanitizedData = sanitizeFormData(formObject);
        
        // Validate form data
        const validationResult = validateFormData(sanitizedData);
        
        if (!validationResult.isValid) {
            // Show specific field errors
            validationResult.errors.forEach(error => {
                if (error.includes('nombre')) {
                    showFieldError('name', error);
                } else if (error.includes('email')) {
                    showFieldError('email', error);
                } else if (error.includes('teléfono')) {
                    showFieldError('phone', error);
                } else if (error.includes('consulta')) {
                    showFieldError('consultation', error);
                } else {
                    showNotification(error, 'error');
                }
            });
            return;
        }
        
        // Additional security logging
        console.log('Form submission attempt:', {
            timestamp: new Date().toISOString(),
            fields: Object.keys(sanitizedData),
            lengths: Object.entries(sanitizedData).map(([key, value]) => `${key}: ${value.length}`),
            userAgent: navigator.userAgent.substring(0, 100)
        });
        
        // Show loading state
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            console.log('Secure form submitted:', sanitizedData);
            showNotification('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
            
            // Reset form
            contactForm.reset();
            document.getElementById('consultationCount').textContent = '0';
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            // Clear all errors
            clearAllErrors();
        }, 2000);
    });
}

// Initialize forms component
export function initForms() {
    initContactForm();
} 