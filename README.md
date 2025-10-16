# Casa Rural Carmen Luna — Sitio estático

Web estática HTML/CSS/JS para promocionar la Casa Rural Carmen Luna (Miñera de Luna, León).

## Contenidos principales
- **Inicio** (`index.html`): resumen de servicios, entorno y llamadas a la acción.
- **La casa** (`casa.html`): distribución por plantas, equipamiento y galería PhotoSwipe.
- **Historia** (`historia.html`): contexto del pueblo y la Reserva de la Biosfera de Omaña y Luna.
- **Entorno** (`entorno.html`): rutas, actividades, restaurantes y museos cercanos.
- **Tarifas** (`tarifas.html`): precios actualizados (400 € fin de semana / 150 € noche entre semana), calculadora orientativa y calendario de disponibilidad.
- **Contacto** (`contacto.html`): formulario Netlify, datos prácticos y cómo llegar.

## Desarrollo local
Abre `index.html` en el navegador o utiliza un servidor estático (Live Server en VSCode, `npx serve`, etc.) para manejar rutas relativas.

## Estructura
```
index.html, casa.html, historia.html, entorno.html, tarifas.html, contacto.html
assets/
  css/styles.css
  js/main.js, tarifas.js
  img/
```

## Checklist de seguridad y lanzamiento
- [x] **Metadatos**: `lang="es"`, descripción, OpenGraph y favicon definidos en todas las páginas.
- [x] **Formularios**: formulario de contacto protegido con honeypot (`netlify-honeypot`) y validaciones HTML5 básicas.
- [x] **Recursos externos**: solo CDNs de confianza (Google Fonts, PhotoSwipe). Añadir CSP estricta en el hosting si es posible.
- [x] **Accesibilidad**: estructura semántica (`<main>`, `<section>`, `<nav>`), textos alternativos en imágenes y contraste definido en `assets/css/styles.css`.
- [x] **Rendimiento**: `loading="lazy"` en imágenes, uso de `preconnect` para fuentes y ficheros CSS/JS minificados manualmente.
- [x] **SEO**: sitemap (`sitemap.xml`), `robots.txt`, `_headers` preparado para evitar indexación duplicada.
- [x] **Disponibilidad**: iframe de Google Calendar solo lectura (sin credenciales expuestas). Revisar permisos del calendario antes de publicar.
- [x] **Dominio/HTTPS**: configurar HTTPS obligatorio en el hosting (Netlify/Vercel) y redirección 301 a `www` o raíz según estrategia.
- [x] **Analítica opcional**: integrar (si procede) antes del cierre de `</body>` respetando normativa de cookies.

## Próximos pasos sugeridos
- Sustituir imágenes provisionales en `assets/img/` por fotografía optimizada (WebP/JPEG progresivo).
- Añadir aviso legal, política de privacidad y cookies enlazados desde el pie.
- Revisar el calendario compartido tras importar reservas existentes.
- Comprobar formularios tras desplegar (Netlify Forms o backend propio).
- Configurar backups/rollbacks en la plataforma de hosting.
