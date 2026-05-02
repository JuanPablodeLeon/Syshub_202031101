<template>
  <div class="page-layout">
    <NavBar />
    <SideBar />
    <main class="content-area fade-up">
      <div class="help-wrapper">
        <h1 class="help-title">📝 Artículos / Blog</h1>

        <p class="help-subtitle">
          Para crear un artículo o entrada de blog sigue estos pasos (necesitas tener los
          permisos adecuados: <strong>admin, auxiliar, investigador o catedrático</strong>).
        </p>

        <!-- Paso 1: Acceder al formulario -->
        <section class="help-section card">
          <h2 class="section-heading">1️⃣ Acceder al formulario de creación</h2>
          <p>
            Si tienes los roles <span class="tag tag-blue">admin</span>,
            <span class="tag tag-blue">auxiliar</span>,
            <span class="tag tag-blue">investigador</span> o
            <span class="tag tag-blue">catedrático</span>, verás la opción
            <strong>"Crear artículo"</strong> en el menú o en un botón destacado.
          </p>
          <div class="img-placeholder">
            <span class="placeholder-icon">
                <img src="../resources/publicacion1.png" width="600" height="100">
            </span>
          </div>
        </section>

        <!-- Paso 2: Completar los campos -->
        <section class="help-section card">
          <h2 class="section-heading">2️⃣ Completa los campos</h2>
          <p>Te aparecerán tres campos, similares a una publicación, pero con una diferencia importante:</p>
          <ul class="help-list">
            <li>
              <strong>Título</strong> – <span class="text-muted">(obligatorio)</span><br>
              El tema o título principal del artículo.
            </li>
            <li>
              <strong>Descripción</strong> – <span class="text-muted">(obligatorio)</span><br>
              Aquí puedes extenderse más que en una publicación normal: el límite de caracteres es mayor, 
              lo que permite desarrollar ideas con más profundidad.
            </li>
            <li>
              <strong>Etiquetas</strong><br>
              Palabras clave que orientan a los lectores sobre el contenido. Igual que en las publicaciones, 
              puedes usar etiquetas existentes o crear nuevas, y el sistema te ofrecerá sugerencias mientras escribes.
            </li>
          </ul>

          <div class="img-placeholder">
            <span class="placeholder-icon">
                <img src="../resources/blog1.png" width="500" height="400">
            </span>
          </div>

          <div class="help-note">
            ✨ <strong>Diferencia clave:</strong> Los artículos/blog permiten una descripción 
            mucho más extensa que una publicación de foro estándar. Aprovéchalo para escribir 
            tutoriales, análisis o información detallada.
          </div>
        </section>

        <!-- Paso 3: Publicar -->
        <section class="help-section card">
          <h2 class="section-heading">3️⃣ ¡Publicar!</h2>
          <p>
            Una vez completados los campos, haz clic en el botón <strong>Publicar</strong>.
          </p>
          <div class="img-placeholder">
            <span class="placeholder-icon">
                <img src="../resources/blog2.png" width="700" height="200">
            </span>
          </div>
          <p>
            Tu artículo aparecerá en la sección de <strong>📝 Blog / Artículos</strong> de la 
            página de inicio, listo para que la comunidad lo lea, vote y comente.
          </p>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import SideBar from '@/components/SideBar.vue'
</script>

<style scoped>
/* ─── Contenedor principal ─── */
.help-wrapper {
  max-width: 780px;
  margin: 0 auto;
  padding: 24px 0;
}

.help-title {
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 8px;
  color: var(--text);
}

.help-subtitle {
  font-size: 16px;
  color: var(--text-muted);
  margin-bottom: 28px;
  line-height: 1.5;
}

/* ─── Tarjetas de sección ─── */
.help-section {
  padding: 24px;
  margin-bottom: 20px;
}

.section-heading {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 16px;
  color: var(--pink);
  display: flex;
  align-items: center;
  gap: 8px;
}

/* ─── Listas ─── */
.help-list {
  padding-left: 20px;
  margin: 12px 0;
  color: var(--text-dim);
  line-height: 1.8;
}

.help-list li {
  margin-bottom: 14px;
}

.text-muted {
  color: var(--text-muted);
  font-style: italic;
}

/* ─── Imagen placeholder ─── */
.img-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: 2px dashed var(--border);
  border-radius: var(--radius-sm);
  padding: 24px;
  margin: 12px 0 16px;
  background: var(--bg-hover);
  color: var(--text-muted);
  font-size: 14px;
  font-style: italic;
}

.placeholder-icon {
  font-size: 28px;
}

/* ─── Nota / consejo ─── */
.help-note {
  border-left: 4px solid var(--pink);
  padding: 12px 16px;
  margin: 16px 0 0;
  background: rgba(224, 36, 94, 0.08);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  font-size: 14px;
  color: var(--text-dim);
  line-height: 1.5;
}

/* ─── Tag (para roles) ─── */
.tag {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 100px;
  font-size: 11px;
  font-weight: 600;
  background: var(--bg-hover);
  color: var(--text-muted);
  border: 1px solid var(--border);
}
.tag-blue {
  background: rgba(0, 122, 255, 0.1);
  color: #007aff;
  border-color: rgba(0, 122, 255, 0.3);
}

/* ─── Responsivo ─── */
@media (max-width: 600px) {
  .help-wrapper {
    padding: 16px;
  }
  .help-section {
    padding: 16px;
  }
}
</style>