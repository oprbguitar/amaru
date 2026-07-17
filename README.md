# AMARU AI

Sitio institucional de una sola página para **AMARU AI — Strategic Intelligence**, con una experiencia visual enfocada en soluciones estratégicas de inteligencia artificial para los sectores público y privado.

## Vista previa local

No requiere instalación ni compilación. Desde la raíz del proyecto, inicia cualquier servidor estático, por ejemplo:

```powershell
python -m http.server 4173
```

Luego abre `http://localhost:4173/`. Evita abrir `index.html` directamente para reproducir correctamente el entorno de GitHub Pages.

## Despliegue en GitHub Pages

El workflow `.github/workflows/deploy-pages.yml` publica automáticamente el sitio cuando se envían cambios a `main`. También puede ejecutarse manualmente desde **Actions → Deploy static site to GitHub Pages → Run workflow**.

En la configuración del repositorio, selecciona **Settings → Pages → Source: GitHub Actions**. Como todos los recursos usan rutas relativas, el sitio funciona bajo `https://oprbguitar.github.io/amaru/`.

## Estructura principal

- `index.html`: contenido semántico, SVG e información SEO.
- `styles.css`: diseño, composición responsive, texturas y animaciones.
- `script.js`: menú móvil, navegación activa, parallax y partículas.
- `assets/favicon.svg`: favicon vectorial.
- `.github/workflows/deploy-pages.yml`: despliegue automático.

## Actualizar enlaces

- Para cambiar la URL de AndesNova, reemplaza las dos apariciones de `https://www.andesnova.solutions/` en `index.html`.
- Para cambiar el correo de contacto, reemplaza `peru.labs.pe@gmail.com` en `index.html` (aparece en el botón de asesoría y en la sección de contacto).
