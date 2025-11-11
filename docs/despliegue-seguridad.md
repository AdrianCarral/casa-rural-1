# Checklist de despliegue y seguridad

Esta guía resume los puntos revisados para el nuevo contenido de Casa Rural Carmen Luna y los aspectos a comprobar antes de la publicación en producción.

## Seguridad y cumplimiento

- **HTTPS obligatorio**: el sitio está preparado para forzar HTTPS mediante la cabecera `Strict-Transport-Security` definida en `_headers`. Verifica que el dominio final tenga un certificado TLS válido y renueva automáticamente (Let's Encrypt o proveedor).
- **Cabeceras endurecidas**: `_headers` incluye CSP, HSTS, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` y `X-Content-Type-Options`. Confirma tras el despliegue que la CDN/hosting aplica exactamente estas cabeceras y ajusta la CSP si se añaden nuevos recursos externos (por ejemplo, servicios de analítica o widgets adicionales).
- **Formularios**: el formulario de contacto usa Netlify Forms (`data-netlify="true"`). Activa el antispam (honeypot ya configurado) y añade reCAPTCHA o control adicional si detectas envíos maliciosos. Revisa que las notificaciones y el almacenamiento cumplan con RGPD.
- **Embeds externos**: el iframe de Google Calendar está permitido en la CSP (`frame-src`). Mantén el enlace actualizado y revisa periódicamente los permisos de Google Calendar.
- **Privacidad**: actualmente no se instalan cookies ni scripts de terceros (analítica, píxeles). Si se añaden en el futuro, actualiza el aviso de cookies/privacidad y amplía la CSP y el consentimiento explícito.
- **Textos legales**: se incluyen páginas de Aviso legal, Privacidad y Cookies enlazadas desde el pie. Antes del lanzamiento, completa los datos obligatorios del titular (nombre completo, NIF/CIF y nº de registro turístico) y revisa que la política de cookies coincida con los servicios activos.
- **Backups y versiones**: conserva copias de la carpeta estática y utiliza control de versiones (Git) antes de cada cambio.

## Contenido y distribución

- **Información verificada**: se ha actualizado la distribución de la casa (habitación con baño privado, dormitorio triple, dormitorio doble y hall-mirador acristalado), la política de tarifas (400 € fin de semana, 150 €/noche entre semana, festivos, Navidad y Semana Santa con precio de fin de semana) y los recursos locales (restaurantes, museos, balneario).
- **Calendario**: el calendario embebido es solo de consulta. Para reservas, mantén sincronizadas las fechas bloqueadas y revisa la visualización en dispositivos móviles.
- **Datos de contacto**: valida que los teléfonos, dirección de email de respuesta y enlaces de WhatsApp estén actualizados antes de hacer público el sitio.
- **Multimedia**: las imágenes actuales son provisionales. Sustitúyelas por las definitivas optimizadas (peso inferior a 300 KB si es posible) y añade `alt` descriptivos acordes.
- **Idiomas**: el contenido está en español. Si se publica versión en otros idiomas, duplica las páginas o integra i18n cuidando SEO (etiquetas `hreflang`).

## Rendimiento y accesibilidad

- **Carga de fuentes**: únicamente se cargan fuentes de Google Fonts necesarias (Lora e Inter). Comprueba el impacto en Lighthouse tras el despliegue.
- **Imágenes responsivas**: todas las imágenes usan `loading="lazy"`. Añade versiones WebP/JPEG optimizadas para producción.
- **Metadatos**: revisar `meta description`, Open Graph y `sitemap.xml` antes del lanzamiento. Actualiza `robots.txt` si se requiere indexación personalizada.
- **Accesibilidad**: los encabezados siguen jerarquía lógica y los botones tienen texto descriptivo. Tras subir el contenido final, pasa una auditoría rápida (Wave o Lighthouse) para detectar contrastes, etiquetas y navegación con teclado.

## Operativa tras el lanzamiento

- **Monitoring**: habilita registros o alertas básicas del hosting para detectar caídas o errores 4xx/5xx.
- **Proceso de reservas**: define protocolo de respuesta (SLAs, plantillas de email) para solicitudes recibidas por el formulario o WhatsApp.
- **Mantenimiento**: programa revisiones trimestrales para actualizar tarifas, disponibilidad, teléfonos y enlaces externos.

> Marca cada punto como completado durante el despliegue para asegurar una publicación sin sorpresas.
