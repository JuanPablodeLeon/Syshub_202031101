<template>
  <div class="page-layout">
    <NavBar />
    <SideBar />
    <main class="content-area fade-up">
      <div class="help-wrapper">
        <h1 class="help-title">📄 Publicaciones</h1>

        <p class="help-subtitle">
          Para crear una publicación sigue estos pasos:
        </p>

        <!-- Paso 1: Acceder al formulario -->
        <section class="help-section card">
          <h2 class="section-heading">1️⃣ Acceder al formulario de creación</h2>
          <div class="img-placeholder">
            <span class="placeholder-icon">
                <img src="../resources/publicacion1.png" width="600" height="100">
            </span>
          </div>
          <p>
            Dirígete a la página de <strong>Inicio</strong> y haz clic en el cuadro 
            <span class="inline-code">Crear publicación</span> o en el enlace correspondiente 
            de la barra de navegación.
          </p>
        </section>

        <!-- Paso 2: Completar los campos -->
        <section class="help-section card">
          <h2 class="section-heading">2️⃣ Completa los campos</h2>
          <p>Te aparecerán tres campos principales:</p>
          <ul class="help-list">
            <li>
              <strong>Título</strong> – <span class="text-muted">(obligatorio)</span><br>
              Aquí escribes el tema o la razón principal de tu publicación.
            </li>
            <li>
              <strong>Descripción</strong> – <span class="text-muted">(obligatorio)</span><br>
              Desarrolla tu idea, pregunta o contenido. Puedes explayarte tanto como desees.
            </li>
            <li>
              <strong>Etiquetas</strong><br>
              Palabras clave que ayudan a los demás a identificar de qué trata tu publicación. 
              Puedes usar etiquetas existentes o crear nuevas; el sistema te sugerirá opciones mientras escribes.
            </li>
          </ul>

          <div class="img-placeholder">
            <span class="placeholder-icon">
                <img src="../resources/publicacion2.png" width="600" height="400">
            </span>
          </div>

          <div class="help-note">
            💡 <strong>Consejo:</strong> Las etiquetas mejoran la visibilidad de tu publicación. 
            Usa términos descriptivos como "programación", "matemáticas", "ayuda", etc.
          </div>
        </section>

        <!-- Paso 3: Publicar -->
        <section class="help-section card">
          <h2 class="section-heading">3️⃣ ¡Publicar!</h2>
          <p>
            Una vez que hayas completado el título, la descripción y las etiquetas deseadas,
            haz clic en el botón <strong>Publicar</strong>. 
          </p>
          <div class="img-placeholder">
            <span class="placeholder-icon">
                <img src="../resources/publicacion3.png" width="600" height="200">
            </span>
          </div>
          <p>
            Tu publicación aparecerá inmediatamente en la página de inicio y estará disponible 
            para que todos los usuarios la vean, voten y comenten.
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

.inline-code {
  background: var(--bg-hover);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 13px;
  font-family: var(--font-mono);
  color: var(--pink);
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