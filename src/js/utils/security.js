/**
 * Security Utilities
 * Funciones para sanitización y validación de datos de entrada
 */

// Sanitización de HTML para prevenir XSS
export function sanitizeHTML(str) {
    if (!str || typeof str !== 'string') return '';
    
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
}

// Sanitización de entrada removiendo caracteres peligrosos
export function sanitizeInput(input) {
    if (!input || typeof input !== 'string') return '';
    
    return input
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove scripts
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/javascript:/gi, '') // Remove javascript: protocol
        .replace(/on\w+\s*=/gi, '') // Remove event handlers
        .replace(/data:/gi, '') // Remove data: protocol
        .replace(/vbscript:/gi, '') // Remove vbscript: protocol
        .trim();
}

// Validación avanzada de email
export function validateEmail(email) {
    if (!email || typeof email !== 'string') return false;
    
    // Regex más estricta para emails
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    // Validaciones adicionales
    const isValidFormat = emailRegex.test(email);
    const hasValidLength = email.length >= 5 && email.length <= 254;
    const hasValidLocalPart = email.split('@')[0].length <= 64;
    const noConsecutiveDots = !/\.\./.test(email);
    const noStartEndDots = !/^\./.test(email) && !/\.$/.test(email);
    
    return isValidFormat && hasValidLength && hasValidLocalPart && noConsecutiveDots && noStartEndDots;
}

// Validación de nombre
export function validateName(name) {
    if (!name || typeof name !== 'string') return false;
    
    const sanitizedName = sanitizeInput(name);
    
    // Solo letras, espacios, guiones y apostrofes
    const nameRegex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s'\-]{2,50}$/;
    
    return nameRegex.test(sanitizedName) && 
           sanitizedName.length >= 2 && 
           sanitizedName.length <= 50 &&
           !/^\s+$/.test(sanitizedName); // No solo espacios
}

// Validación de teléfono
export function validatePhone(phone) {
    if (!phone || typeof phone !== 'string') return true; // Opcional
    
    const sanitizedPhone = phone.replace(/\s/g, ''); // Remover espacios
    
    // Formato internacional básico
    const phoneRegex = /^[+]?[\d\s\-\(\)]{8,20}$/;
    
    return phoneRegex.test(sanitizedPhone) && sanitizedPhone.length >= 8 && sanitizedPhone.length <= 20;
}

// Validación de consulta/mensaje
export function validateConsultation(consultation) {
    if (!consultation || typeof consultation !== 'string') return false;
    
    const sanitizedConsultation = sanitizeInput(consultation);
    
    // Longitud mínima y máxima
    const hasValidLength = sanitizedConsultation.length >= 10 && sanitizedConsultation.length <= 2000;
    
    // No solo espacios o caracteres especiales
    const hasValidContent = /[a-zA-ZÀ-ÿ\u00f1\u00d1]/.test(sanitizedConsultation);
    
    // Detección de patrones sospechosos
    const suspiciousPatterns = [
        /<script/gi,
        /javascript:/gi,
        /onclick=/gi,
        /onerror=/gi,
        /onload=/gi,
        /eval\(/gi,
        /document\.cookie/gi,
        /window\.location/gi,
        /alert\(/gi,
        /confirm\(/gi,
        /prompt\(/gi
    ];
    
    const hasSuspiciousContent = suspiciousPatterns.some(pattern => pattern.test(consultation));
    
    return hasValidLength && hasValidContent && !hasSuspiciousContent;
}

// Detección de spam básica
export function detectSpam(data) {
    const spamIndicators = [
        /\b(?:viagra|cialis|casino|lottery|winner|congratulations|prize|urgent|act now|limited time|click here|free money|earn money|work from home|lose weight|diet pills)\b/gi,
        /\b(?:http|https|www\.)[^\s]{10,}/gi, // URLs largas
        /(.)\1{10,}/g, // Caracteres repetidos
        /[A-Z]{20,}/g, // Muchas mayúsculas seguidas
        /[!@#$%^&*()]{5,}/g, // Muchos símbolos seguidos
    ];
    
    const allText = Object.values(data).join(' ').toLowerCase();
    
    return spamIndicators.some(pattern => pattern.test(allText));
}

// Rate limiting básico (client-side)
const submissionTracker = {
    attempts: 0,
    lastAttempt: 0,
    maxAttempts: 3,
    windowMs: 60000 // 1 minuto
};

export function checkRateLimit() {
    const now = Date.now();
    
    // Reset counter si ha pasado la ventana de tiempo
    if (now - submissionTracker.lastAttempt > submissionTracker.windowMs) {
        submissionTracker.attempts = 0;
    }
    
    // Verificar si excede el límite
    if (submissionTracker.attempts >= submissionTracker.maxAttempts) {
        const remainingTime = Math.ceil((submissionTracker.windowMs - (now - submissionTracker.lastAttempt)) / 1000);
        return {
            allowed: false,
            message: `Demasiados intentos. Intenta de nuevo en ${remainingTime} segundos.`
        };
    }
    
    // Incrementar contador
    submissionTracker.attempts++;
    submissionTracker.lastAttempt = now;
    
    return { allowed: true };
}

// Validación completa del formulario
export function validateFormData(formData) {
    const errors = [];
    
    // Validar nombre
    if (!validateName(formData.name)) {
        errors.push('El nombre debe tener entre 2 y 50 caracteres y solo contener letras, espacios, guiones y apostrofes.');
    }
    
    // Validar email
    if (!validateEmail(formData.email)) {
        errors.push('Por favor ingresa un email válido.');
    }
    
    // Validar teléfono (opcional)
    if (formData.phone && !validatePhone(formData.phone)) {
        errors.push('El teléfono debe tener un formato válido.');
    }
    
    // Validar consulta
    if (!validateConsultation(formData.consultation)) {
        errors.push('La consulta debe tener entre 10 y 2000 caracteres y contener texto válido.');
    }
    
    // Detectar spam
    if (detectSpam(formData)) {
        errors.push('El contenido del formulario contiene elementos no permitidos.');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

// Sanitizar todos los datos del formulario
export function sanitizeFormData(formData) {
    return {
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email),
        phone: sanitizeInput(formData.phone),
        consultation: sanitizeInput(formData.consultation)
    };
} 