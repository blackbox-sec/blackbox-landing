# Arquitectura Modular - BlackBox Security

Esta carpeta contiene todos los archivos fuente organizados en una arquitectura modular escalable.

## 📂 Estructura de Carpetas

```
src/
├── css/                    # Estilos CSS modulares
│   ├── base/              # Estilos base
│   │   ├── reset.css      # Reset CSS
│   │   ├── variables.css  # Variables CSS
│   │   └── typography.css # Tipografía y estilos base
│   ├── components/        # Componentes reutilizables
│   │   ├── buttons.css    # Estilos de botones
│   │   ├── cards.css      # Tarjetas de servicios
│   │   ├── forms.css      # Formularios
│   │   ├── navigation.css # Navegación
│   │   └── terminal.css   # Terminal animado
│   ├── layout/            # Layouts principales
│   │   ├── footer.css     # Footer
│   │   ├── hero.css       # Sección hero
│   │   └── sections.css   # Secciones generales
│   ├── utils/             # Utilidades
│   │   ├── animations.css # Animaciones
│   │   ├── responsive.css # Media queries
│   │   └── utilities.css  # Clases de utilidad
│   └── main.css           # Archivo principal que importa todo
├── js/                     # JavaScript modular
│   ├── components/        # Componentes JavaScript
│   │   ├── animations.js  # Animaciones y efectos
│   │   ├── forms.js       # Manejo de formularios
│   │   ├── navigation.js  # Navegación y menú
│   │   └── terminal.js    # Terminal animado
│   ├── utils/             # Utilidades JavaScript
│   │   └── helpers.js     # Funciones de ayuda
│   └── main.js            # Archivo principal
└── assets/                # Assets estáticos
    ├── images/            # Imágenes
    ├── icons/             # Iconos
    └── fonts/             # Fuentes
```

## 🔧 Cómo Funciona

### CSS Modular

- **Base**: Contiene reset, variables y estilos fundamentales
- **Components**: Elementos reutilizables como botones, tarjetas, formularios
- **Layout**: Estructuras principales de página
- **Utils**: Animaciones, responsive design y utilidades

El archivo `main.css` importa todos los módulos en el orden correcto.

### JavaScript Modular

- **Components**: Funcionalidad específica de cada componente
- **Utils**: Funciones de utilidad reutilizables
- **Main**: Inicializador principal que coordina todo

Utiliza ES6 modules para importar/exportar funciones.

## 🚀 Ventajas de esta Arquitectura

### Escalabilidad
- Fácil agregar nuevos componentes
- Código organizado y mantenible
- Separación clara de responsabilidades

### Mantenimiento
- Cada módulo tiene una responsabilidad específica
- Fácil localizar y corregir problemas
- Testing individual de componentes

### Performance
- Carga solo lo necesario
- CSS y JS optimizados
- Posibilidad de lazy loading

### Colaboración
- Múltiples desarrolladores pueden trabajar en paralelo
- Estándares de código consistentes
- Fácil revisión de código

## 📝 Guías de Uso

### Agregar un Nuevo Componente CSS

1. Crear archivo en `src/css/components/nuevo-componente.css`
2. Agregar import en `src/css/main.css`
3. Documentar estilos con comentarios

### Agregar un Nuevo Componente JS

1. Crear archivo en `src/js/components/nuevo-componente.js`
2. Exportar función de inicialización
3. Importar e inicializar en `src/js/main.js`

### Modificar Variables CSS

Editar `src/css/base/variables.css` para cambios globales de colores, espaciado, etc.

## 🔄 Migración desde Archivo Único

El código anterior en archivos únicos (`styles.css`, `script.js`) ha sido:

1. **Dividido** en módulos lógicos
2. **Reorganizado** por funcionalidad
3. **Documentado** con comentarios claros
4. **Optimizado** para mejor performance

La funcionalidad permanece exactamente igual, solo está mejor organizada.

## 🛠️ Herramientas Recomendadas

- **Live Server**: Para desarrollo local
- **CSS Validator**: Validar CSS modular
- **ESLint**: Linting de JavaScript modules
- **Prettier**: Formateo consistente de código

Esta arquitectura está lista para crecer con tu proyecto. 🚀 