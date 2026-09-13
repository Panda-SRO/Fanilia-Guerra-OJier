# Repuesto Gerra Ojier

Sitio web y panel administrativo para **Repuesto Gerra Ojier** — repuestos y servicio automotriz (Chile).

## Qué incluye

`index.html` es un sitio completo (HTML + CSS + JS en un solo archivo):

- **Web pública**: inicio, catálogo de servicios con precios (CLP), galería de trabajos, cómo agendar y contacto con horarios. Botón de WhatsApp.
- **Panel de administración** (con login de Firebase):
  - Editar servicios (precio, foto, descripción) y galería de trabajos.
  - Datos del negocio (nombre, RUT, giro, dirección, teléfono) — se usan en la factura.
  - **Calendario de citas** con recordatorios: aviso por WhatsApp al cliente y descarga `.ics` (agenda la cita en el teléfono con alarma 1 día y 1 hora antes).
  - **Facturas / boletas** con **IVA 19%**, historial guardado, imprimir y exportar a PDF.

## Configuración pendiente

1. **Firebase** (base de datos): reemplazar el objeto `firebaseConfig` en `index.html` por el del proyecto de Firebase (crear en **Modo nativo / Edición estándar**). Mientras no se conecte, el sitio funciona en modo demostración (no guarda).
2. **Reglas de seguridad de Firestore**: lectura pública de servicios/galería/config; citas y facturas solo para administradores autenticados.
3. **Número de WhatsApp**: definir la constante `WA_NUMBER` en `index.html`.

## Publicar en GitHub Pages

Settings → Pages → Deploy from a branch → `main` / `root`.
