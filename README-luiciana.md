# Luiciana Salas - Link in Bio

Una página "link in bio" elegante y responsive para Luiciana Salas, creada con tecnologías modernas y optimizada para conversión.

## 🚀 Instalación y Uso Local

### Opción 1: HTML Puro (luiciana-index.html)
```bash
# Simplemente abrir el archivo en el navegador
open luiciana-index.html

# O servir con un servidor local
python -m http.server 8000
# Luego visitar: http://localhost:8000/luiciana-index.html
```

### Opción 2: Componente React/Next.js (LuicianaPage.tsx)
```bash
# Si estás en un proyecto Next.js con Tailwind
npm install
npm run dev

# Importar el componente
import LuicianaPage from './LuicianaPage'
```

## ✏️ Personalización

### Cambiar Textos y Enlaces
**HTML:** Editar directamente en `luiciana-index.html`
- Nombre: Línea ~66
- Bio: Línea ~67
- Enlaces sociales: Líneas ~91-180

**React:** Editar configuración en `LuicianaPage.tsx`
- `userConfig` (líneas 60-70): Datos personales
- `socialLinks` (líneas 8-56): Enlaces sociales

### Cambiar Colores
**HTML:** Modificar variables CSS en `:root` (líneas 30-32)
```css
--accent-color: #16A34A; /* Color principal */
--accent-hover: #15803D; /* Color hover */
```

**React:** Actualizar clases Tailwind
- `bg-green-600` → `bg-[tu-color]`
- `text-green-600` → `text-[tu-color]`

### Sustituir Imágenes
1. **Avatar**: Reemplazar `/avatar.jpg` con tu foto
2. **OG Image**: Reemplazar `/og.jpg` para redes sociales
3. **Favicon**: Reemplazar `/favicon.ico`

## 📤 Despliegue

### GitHub Pages
```bash
# 1. Subir archivos al repositorio
git add .
git commit -m "Add Luiciana link in bio page"
git push origin main

# 2. Ir a Settings → Pages
# 3. Seleccionar source: Deploy from branch → main
# 4. La página estará disponible en: https://tu-usuario.github.io/tu-repo/luiciana-index.html
```

### Vercel
```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Desplegar
vercel

# 3. Seguir las instrucciones en pantalla
# 4. Para HTML estático, asegúrate de que el archivo se llame index.html
```

**Configuración Vercel (vercel.json):**
```json
{
  "rewrites": [
    { "source": "/", "destination": "/luiciana-index.html" }
  ]
}
```

## ✅ Checklist Pre-Publicación

### Contenido
- [ ] Nombre y bio correctos
- [ ] Todos los enlaces funcionan
- [ ] Número SINPE correcto (64572209)
- [ ] WhatsApp URL exacta verificada
- [ ] Imágenes optimizadas (avatar, og-image)

### SEO y Metadatos
- [ ] Title tag personalizado
- [ ] Meta description optimizada
- [ ] Open Graph tags configurados
- [ ] Twitter Cards configurados
- [ ] Favicon añadido

### Funcionalidad
- [ ] Botón copiar SINPE funciona
- [ ] Toast notification aparece
- [ ] Enlaces abren en nueva pestaña
- [ ] Responsive en móvil/desktop
- [ ] Modo oscuro/claro funciona

### Performance y Accesibilidad
- [ ] Lighthouse Score >90 (Performance)
- [ ] Lighthouse Score >90 (Accessibility)
- [ ] Contraste AA cumplido
- [ ] Navegación por teclado funciona
- [ ] Screen readers compatible

### Seguridad
- [ ] Todos los enlaces externos tienen `rel="noopener noreferrer"`
- [ ] No hay información sensible expuesta
- [ ] HTTPS configurado en producción

## 📱 Características

### Diseño
- **Responsive**: Optimizado para móvil y desktop
- **Modo Oscuro**: Automático según preferencias del sistema
- **Glassmorphism**: Efectos visuales modernos
- **Accesibilidad**: Cumple estándares WCAG AA

### Funcionalidades
- **CTA Principal**: Botón WhatsApp destacado con mensaje prellenado
- **Enlaces Sociales**: Instagram, Facebook, Telegram, OnlyFans
- **SINPE Móvil**: Copia fácil del número de pago
- **Toast Notifications**: Feedback visual al copiar

### Optimizaciones
- **SEO**: Metadatos completos para redes sociales
- **Performance**: Sin dependencias externas en versión HTML
- **UX**: Microinteracciones y estados hover/focus

## 🔧 Tecnologías

### HTML Version
- HTML5 semántico
- CSS3 con variables y media queries
- JavaScript vanilla para interactividad
- SVG icons inline

### React Version
- TypeScript para type safety
- Tailwind CSS para styling
- React Hooks (useState)
- Componentes modulares

## 🎨 Guía de Estilo

### Colores
- **Acento**: #16A34A (Verde)
- **Modo Claro**: Blanco/Grises claros
- **Modo Oscuro**: Grises oscuros
- **Estados**: Hover más oscuro, Active más oscuro

### Tipografía
- **Familia**: system-ui, -apple-system, Segoe UI
- **Peso**: 400 (normal), 600 (semibold), 700 (bold)
- **Tamaños**: Escalados responsivamente

### Espaciado
- **Contenedor**: Max 480px, padding 24px/16px
- **Elementos**: Gap 12px-32px según importancia
- **Bordes**: 8px-12px border radius

## 📞 Soporte

Para dudas técnicas o modificaciones:
1. Revisar este README
2. Consultar comentarios en el código
3. Verificar configuración de enlaces y WhatsApp

---

**Nota**: Asegúrate de probar todos los enlaces antes de publicar, especialmente el enlace de WhatsApp con el mensaje prellenado específico.