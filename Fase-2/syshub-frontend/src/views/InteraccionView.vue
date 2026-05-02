<template>
  <div class="page-layout">
    <NavBar />
    <SideBar />
    <main class="content-area fade-up">
      <div class="help-wrapper">
        <h1 class="help-title">📘 Interacción</h1>
        <p class="help-subtitle">
          Las opciones de interacción con una publicación o blog/artículo son las siguientes:
        </p>

        <!-- Tarjeta: Votar -->
        <section class="help-section card">
          <h2 class="section-heading">🗳️ Votar</h2>
          <p>Puedes votar de dos formas:</p>
          <ol class="help-list">
            <li>
              <strong>Desde la página de Inicio</strong>
              <div class="img-placeholder">
                <span class="placeholder-icon">
                    <img src="../resources/votar1.png" width="600" height="200">
                </span>
              </div>
            </li>
            <li>
              <strong>Accediendo a la publicación</strong>
              <ol class="sub-list">
                <li>En inicio escoges la publicación</li>
                <li>Ya dentro, usas los botones ▲ (+1) y ▼ (−1)</li>
              </ol>
              <div class="img-placeholder">
                <span class="placeholder-icon">
                    <img src="../resources/votar2.png" width="500" height="300">
                </span>
              </div>
            </li>
          </ol>
          <blockquote class="help-note">
            ⚠️ Solo puedes dar un voto <strong>+1</strong> o <strong>−1</strong> a la vez. No puedes dar +2 ni −2. El triángulo hacia arriba suma un voto positivo; el triángulo hacia abajo suma un voto negativo.
          </blockquote>
        </section>

        <!-- Tarjeta: Comentar -->
        <section class="help-section card">
          <h2 class="section-heading">💬 Comentar</h2>
          <p>Para comentar debes estar dentro de la publicación.</p>
          <div class="img-placeholder">
            <span class="placeholder-icon">
                    <img src="../resources/comentar1.png" width="600" height="300">
            </span>
          </div>
          <p>
            Una vez dentro, verás el espacio <strong>"Agregar comentario"</strong>. Escribe tu respuesta y haz clic en <strong>Comentar</strong>.
          </p>
          <div class="img-placeholder">
            <span class="placeholder-icon">
                                    <img src="../resources/comentar2.png" width="600" height="400">
            </span>
          </div>
          <p>
            Tu comentario aparecerá inmediatamente. Además, podrás responder a otros comentarios dentro del hilo.
          </p>
        </section>

        <!-- Tarjeta: Reportar -->
        <section class="help-section card">
          <h2 class="section-heading">🚩 Reportar</h2>
          <p>
            Solo puedes reportar <strong>Publicaciones</strong> y <strong>Blog/Artículos</strong> desde la página de inicio.
            Haz clic en el botón <span class="tag tag-pink">⛳ Reportar</span>.
          </p>
          <div class="img-placeholder">
            <span class="placeholder-icon">
                                    <img src="../resources/reportar1.png" width="600" height="200">
            </span>
          </div>
          <p>
            Aparecerá una ventana donde debes redactar el motivo del reporte (puedes cancelar si lo deseas).
          </p>
          <div class="img-placeholder">
            <span class="placeholder-icon">
                                    <img src="../resources/reportar2.png" width="500" height="300">

            </span>
          </div>
          <p>
            Una vez que escribas la razón, haz clic en <strong>Enviar Reporte</strong>. Los administradores lo verificarán.
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
  line-height: 1.6;
}

.help-list li {
  margin-bottom: 12px;
}

.sub-list {
  padding-left: 20px;
  margin-top: 8px;
  list-style-type: lower-alpha;
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

/* ─── Nota / advertencia ─── */
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

/* ─── Tag reutilizado ─── */
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
.tag-pink {
  background: rgba(224, 36, 94, 0.08);
  color: var(--pink);
  border-color: rgba(224, 36, 94, 0.3);
}

/* ─── Ajustes responsivos ─── */
@media (max-width: 600px) {
  .help-wrapper {
    padding: 16px;
  }
  .help-section {
    padding: 16px;
  }
}
</style>