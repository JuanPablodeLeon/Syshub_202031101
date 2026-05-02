<template>
  <div class="page-layout">
    <NavBar />
    <SideBar />
    <main class="content-area fade-up">
      <div class="help-wrapper">
        <h1 class="help-title">📚 Cursos Disponibles</h1>
        <p class="help-subtitle">
          En este espacio podrás crear los cursos disponibles que luego se utilizarán al
          momento de crear espacios de cursos.
        </p>

        <!-- Vista general -->
        <section class="help-section card">
          <h2 class="section-heading">📋 Vista general</h2>
          <p>
            En la pestaña <strong>Cursos Disponibles</strong> del panel de administración
            verás una cuadrícula con todos los cursos existentes, mostrando su nombre,
            código, créditos y otros detalles.
          </p>
          <div class="img-placeholder">
            <span class="placeholder-icon">
                <img src="../resources/cursodis1.png" width="500" height="300">
            </span>
          </div>
        </section>

        <!-- Campos del formulario -->
        <section class="help-section card">
          <h2 class="section-heading">➕ Crear un nuevo curso</h2>
          <p>
            Al hacer clic en <span class="inline-code">＋ Nuevo curso</span> se desplegará
            un formulario con los siguientes campos:
          </p>
          <ul class="help-list">
            <li>
              <strong>Nombre *</strong><br>
              Nombre completo del curso (por ejemplo, "Introducción a la Programación").
            </li>
            <li>
              <strong>Código *</strong><br>
              Código identificador del curso (por ejemplo, "IPC1").
            </li>
            <li>
              <strong>Créditos *</strong><br>
              Número de créditos académicos (valor numérico).
            </li>
            <li>
              <strong>Carrera *</strong><br>
              Lista desplegable con todas las carreras previamente creadas en el sistema.
              Debes seleccionar una.
            </li>
            <li>
              <strong>Obligatorio</strong><br>
              Casilla de verificación que indica si el curso es obligatorio en la malla curricular.
            </li>
            <li>
              <strong>CLAR</strong><br>
              Casilla de verificación que indica si el curso otorga créditos CLAR.
            </li>
            <li>
              <strong>Descripción</strong> – <span class="text-muted">(opcional)</span><br>
              Texto breve con información adicional sobre el curso.
            </li>
          </ul>
          <div class="img-placeholder">
            <span class="placeholder-icon">
                <img src="../resources/cursodis2.png" width="500" height="300">
            </span>
          </div>
          <div class="help-note">
            ⚠️ <strong>Importante:</strong> una vez creado el curso, <strong>no podrás editarlo</strong>.
            Asegúrate de revisar bien todos los datos antes de guardar.
          </div>
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