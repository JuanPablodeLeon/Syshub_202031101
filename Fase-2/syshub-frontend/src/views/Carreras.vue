<template>
  <div class="page-layout">
    <NavBar />
    <SideBar />
    <main class="content-area fade-up">
      <div class="help-wrapper">
        <h1 class="help-title">🎓 Carreras</h1>
        <p class="help-subtitle">
          En este espacio podrás crear carreras que luego se utilizarán al momento de
          crear espacios de cursos y al registrar usuarios.
        </p>

        <!-- Vista general -->
        <section class="help-section card">
          <h2 class="section-heading">📋 Vista general</h2>
          <p>
            En la pestaña <strong>Carreras</strong> del panel de administración verás una lista
            de todas las carreras existentes, con su nombre e identificador único.
          </p>
          <div class="img-placeholder">
            <span class="placeholder-icon">
                <img src="../resources/carrera1.png" width="600" height="200">
            </span>
          </div>
        </section>

        <!-- Cómo crear una carrera -->
        <section class="help-section card">
          <h2 class="section-heading">➕ Crear una nueva carrera</h2>
          <p>
            Para añadir una carrera, haz clic en el botón
            <span class="inline-code">＋ Nueva carrera</span>.
            Se desplegará un formulario sencillo con dos campos:
          </p>
          <ul class="help-list">
            <li>
              <strong>Nombre</strong> – <span class="text-muted">(obligatorio)</span><br>
              El nombre completo de la carrera (por ejemplo, "Ingeniería en Sistemas").
            </li>
            <li>
              <strong>Descripción</strong> – <span class="text-muted">(opcional)</span><br>
              Un breve texto descriptivo sobre la carrera.
            </li>
          </ul>
          <div class="img-placeholder">
            <span class="placeholder-icon">
                <img src="../resources/carrera2.png" width="500" height="300">
            </span>
          </div>
          <div class="help-note">
            ⚠️ <strong>Importante:</strong> una vez creada la carrera, <strong>no podrás editar</strong>
            ni el nombre ni la descripción. Verifica bien los datos antes de guardar.
          </div>
        </section>

        <!-- Uso posterior -->
        <section class="help-section card">
          <h2 class="section-heading">🔗 ¿Dónde se usan las carreras?</h2>
          <p>
            Las carreras que crees aquí aparecerán como opción al:
          </p>
          <ul class="help-list">
            <li>Registrar un nuevo usuario (selección de carreras).</li>
            <li>Crear un espacio de curso (asociar el curso a una carrera).</li>
            <li>Crear un curso disponible (asignarle una carrera).</li>
          </ul>
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
  margin-bottom: 12px;
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

/* ─── Nota de advertencia ─── */
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