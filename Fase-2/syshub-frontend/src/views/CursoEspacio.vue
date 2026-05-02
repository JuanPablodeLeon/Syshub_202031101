<template>
  <div class="page-layout">
    <NavBar />
    <SideBar />
    <main class="content-area fade-up">
      <div class="help-wrapper">
        <h1 class="help-title">🏫 Creación de Espacio Cursos</h1>

        <p class="help-subtitle">
          Aprende cómo crear y gestionar un espacio de curso para tu clase, 
          asignar estudiantes y auxiliares.
        </p>

        <!-- Paso 1: Acceder a Mis Cursos -->
        <section class="help-section card">
          <h2 class="section-heading">1️⃣ Dirígete a "Mis Cursos"</h2>
          <p>
            En la barra lateral o en el menú de navegación, haz clic en la sección 
            <strong>Mis Cursos</strong>.
          </p>
          <div class="img-placeholder">
            <span class="placeholder-icon">
                <img src="../resources/curso7.png" width="200" height="50">
            </span>
          </div>
        </section>

        <!-- Paso 2: Vista general y opción de crear -->
        <section class="help-section card">
          <h2 class="section-heading">2️⃣ Explora los espacios existentes o crea uno nuevo</h2>
          <p>
            Una vez dentro, verás una lista de los espacios de curso que ya existen 
            (si eres catedrático o administrador). También encontrarás un botón para crear 
            un nuevo espacio.
          </p>
          <div class="img-placeholder">
            <span class="placeholder-icon">
                <img src="../resources/curso1.png" width="500" height="200">
            </span>
          </div>
        </section>

        <!-- Paso 3: Formulario de creación -->
        <section class="help-section card">
          <h2 class="section-heading">3️⃣ Completa el formulario de creación</h2>
          <p>Te aparecerán los siguientes campos obligatorios y opcionales:</p>
          <ul class="help-list">
            <li>
              <strong>Seleccionar curso</strong> – <span class="text-muted">(obligatorio)</span><br>
              Elige uno de los cursos disponibles en el sistema (los que ya existen en el catálogo). 
              Solo se muestran los cursos existentes.
            </li>
            <li>
              <strong>Sección</strong><br>
              Identificador de la sección (por ejemplo, "A", "B", "Única").
            </li>
            <li>
              <strong>Semestre</strong><br>
              El semestre en que se imparte: <strong>1ro</strong> o <strong>2do</strong>.
            </li>
            <li>
              <strong>Año</strong><br>
              El año académico (ej. 2026).
            </li>
            <li>
              <strong>Catedrático</strong> – <span class="text-muted">(obligatorio, solo uno)</span><br>
              Selecciona al profesor responsable de entre los catedráticos registrados en el sistema. 
              Solo puedes elegir uno.
            </li>
            <li>
              <strong>Auxiliares</strong> – <span class="text-muted">(opcional)</span><br>
              Puedes agregar auxiliares ingresando sus correos electrónicos. Si no necesitas 
              auxiliares en ese momento, puedes dejarlo vacío.
            </li>
          </ul>

          <div class="img-placeholder">
            <span class="placeholder-icon">
                <img src="../resources/curso2.png" width="500" height="300">
            </span>
          </div>
        </section>

        <!-- Paso 4: Visualización del espacio creado -->
        <section class="help-section card">
          <h2 class="section-heading">4️⃣ Así se verá el espacio creado</h2>
          <p>
            Después de guardar, el nuevo espacio aparecerá en tu lista de "Mis Cursos" con 
            sus datos básicos. Al hacer clic sobre él, accederás a su vista detallada.
          </p>
          <div class="img-placeholder">
            <span class="placeholder-icon">
                <img src="../resources/curso1.png" width="500" height="200">
            </span>
          </div>
        </section>

        <!-- Paso 5: Gestión interna del curso -->
        <section class="help-section card">
          <h2 class="section-heading">5️⃣ Dentro del espacio: Info, Estudiantes y Auxiliares</h2>
          <p>
            Una vez dentro del espacio, encontrarás tres pestañas o secciones:
          </p>
          <ul class="help-list">
            <li>
              <strong>Info</strong><br>
              Muestra los datos generales del curso (nombre, código, créditos, catedrático, etc.).
              <div class="img-placeholder">
                <span class="placeholder-icon">
                <img src="../resources/curso4.png" width="700" height="300">
                </span>
              </div>
            </li>
            <li>
              <strong>Estudiantes</strong><br>
              Puedes agregar estudiantes escribiendo sus correos electrónicos. 
              Se añadirán automáticamente al espacio.
              <div class="img-placeholder">
                <span class="placeholder-icon">
                <img src="../resources/curso5.png" width="600" height="300">
                </span>
              </div>
            </li>
            <li>
              <strong>Auxiliares</strong><br>
              Similar a estudiantes, pero para agregar (o modificar) auxiliares. 
              Útil si no asignaste ninguno durante la creación inicial.
              <div class="img-placeholder">
                <span class="placeholder-icon">
                <img src="../resources/curso6.png" width="600" height="300">
                </span>
              </div>
            </li>
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