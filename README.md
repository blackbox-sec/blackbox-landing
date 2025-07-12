# BlackBox Security - Landing Page para Empresa de Pentesting

Landing page profesional y moderna para empresa de pentesting web, desarrollada con HTML5, CSS3 y JavaScript vanilla.

## 🚀 Características

- **Diseño Moderno**: Interfaz dark tech con gradientes y efectos visuales
- **Responsive**: Totalmente adaptable a dispositivos móviles, tablets y desktop
- **Animaciones**: Efectos de scroll, parallax y transiciones suaves
- **Terminal Interactivo**: Simulación de terminal con comandos de pentesting
- **Formulario de Contacto**: Sistema de contacto con validación
- **SEO Optimizado**: Meta tags y estructura semántica
- **Performance**: Carga rápida y optimizada

## 🎨 Secciones Incluidas

- **Hero Section**: Presentación impactante con terminal animado
- **Servicios**: Pentesting Web, Auditoría de Seguridad, Análisis de Vulnerabilidades
- **Proceso**: Metodología de trabajo en 4 pasos
- **Nosotros**: Estadísticas y certificaciones
- **Contacto**: Formulario funcional e información de contacto

## 🛠️ Tecnologías Utilizadas

- HTML5 semántico
- CSS3 con variables personalizadas
- JavaScript ES6+
- Google Fonts (Inter, JetBrains Mono)
- Intersection Observer API
- CSS Grid y Flexbox

## 📂 Estructura del Proyecto

```
landing-hacking/
├── src/                     # Código fuente modular
│   ├── css/                # Estilos CSS organizados por módulos
│   │   ├── base/          # Variables, reset, tipografía
│   │   ├── components/    # Botones, formularios, navegación
│   │   ├── layout/        # Hero, secciones, footer
│   │   ├── utils/         # Animaciones, responsive, utilidades
│   │   └── main.css       # Archivo principal CSS
│   ├── js/                 # JavaScript modular
│   │   ├── components/    # Navegación, terminal, formularios
│   │   ├── utils/         # Funciones de utilidad
│   │   └── main.js        # Archivo principal JS
│   ├── assets/            # Assets estáticos
│   │   ├── images/        # Imágenes
│   │   ├── icons/         # Iconos
│   │   └── fonts/         # Fuentes
│   └── README.md          # Documentación de arquitectura
├── index.html             # Página principal
└── README.md              # Documentación general
```

### 🏗️ Arquitectura Modular

El proyecto utiliza una **arquitectura modular escalable**:

- **CSS Modular**: Dividido en base, componentes, layout y utilidades
- **JavaScript Modular**: ES6 modules con separación de responsabilidades  
- **Assets Organizados**: Imágenes, iconos y fuentes en carpetas específicas
- **Documentación**: README detallado para cada parte del proyecto

Ver `src/README.md` para más detalles sobre la arquitectura modular.

## 🚀 Cómo Usar

1. **Clonar o descargar** los archivos del proyecto
2. **Abrir** `index.html` en tu navegador web
3. **Personalizar** el contenido según tu empresa:
   - Cambiar nombre de la empresa en el HTML
   - Modificar colores en las variables CSS
   - Actualizar información de contacto
   - Añadir tu logo e imágenes

## 🎨 Personalización

### Colores
Edita las variables CSS en `styles.css`:

```css
:root {
    --primary-color: #00ff88;    /* Verde principal */
    --secondary-color: #0066cc;  /* Azul secundario */
    --accent-color: #ff6b35;     /* Naranja de acento */
    --dark-bg: #0a0a0a;          /* Fondo oscuro */
    --dark-surface: #1a1a1a;     /* Superficies */
    --dark-card: #2a2a2a;        /* Tarjetas */
}
```

### Contenido
- Modifica los textos en `index.html`
- Actualiza los servicios y precios
- Cambia la información de contacto
- Añade tu logo y favicon

### Formulario de Contacto
El formulario actualmente simula el envío. Para hacerlo funcional:

1. Configura un servicio backend
2. Modifica la función de envío en `script.js`
3. O integra con servicios como Formspree, Netlify Forms, etc.

## 📱 Responsive Design

La landing page es completamente responsive con breakpoints:
- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: 480px - 767px
- Small Mobile: <480px

## 🔧 Optimizaciones Incluidas

- **Lazy Loading**: Elementos se cargan según scroll
- **Debounced Scroll**: Eventos de scroll optimizados
- **Smooth Animations**: Transiciones fluidas
- **Mobile First**: Diseño pensado para móviles
- **Arquitectura Modular**: CSS y JS organizados para escalabilidad
- **ES6 Modules**: JavaScript modular con imports/exports
- **CSS Custom Properties**: Variables CSS para temas consistentes

## 🌐 Hosting Sugerido

Para subir tu landing page:

1. **GitHub Pages**: Gratuito para repositorios públicos
2. **Netlify**: Deployment automático desde Git
3. **Vercel**: Ideal para sitios estáticos
4. **Hosting tradicional**: Cualquier servidor web

## 📄 Licencia

Este proyecto es de código abierto. Puedes usar, modificar y distribuir libremente.

## 🤝 Contribuir

¿Encontraste un bug o tienes una mejora? 
1. Reporta el issue
2. Crea un pull request
3. Mejora la documentación

## 📧 Contacto

Para consultas sobre el proyecto o personalizaciones:
- Email: info@blackboxsecurity.com
- GitHub: [Tu perfil]

---

**Nota**: Recuerda actualizar toda la información de contacto y branding antes de usar en producción. 