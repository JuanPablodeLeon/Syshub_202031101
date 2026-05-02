<template>
  <div class="page-layout">
    <NavBar />
    <SideBar />
    <main class="content-area fade-up">
      <div class="help-wrapper">
        <h1 class="help-title">👥 Usuarios</h1>
        <p class="help-subtitle">
          Desde esta sección podrás moderar a todos los usuarios registrados en la plataforma.
        </p>

        <!-- Vista general -->
        <section class="help-section card">
          <h2 class="section-heading">📋 Vista general</h2>
          <p>
            En la pestaña <strong>Usuarios</strong> del panel de administración verás una cuadrícula 
            con todos los usuarios actuales. Cada tarjeta muestra el nombre, correo, rol y estado 
            del perfil.
          </p>
          <div class="img-placeholder">
            <span class="placeholder-icon">
                <img src="../resources/usuario1.png" width="500" height="300">
            </span>
          </div>
        </section>

        <!-- Acciones por usuario -->
        <section class="help-section card">
          <h2 class="section-heading">⚙️ Acciones por usuario</h2>
          <p>
            Para cada usuario dispones de tres botones principales:
          </p>
          <ul class="help-list">
            <li>
              <strong>✏️ Editar</strong>
              <p>Permite modificar los siguientes campos:</p>
              <ul class="sub-list">
                <li><strong>Nombre</strong></li>
                <li><strong>Apellidos</strong></li>
                <li>
                  <strong>Rol</strong> – puedes asignar uno de los siguientes:
                  <div class="tags-container">
                    <span class="tag tag-blue">admin</span>
                    <span class="tag tag-blue">estudiante</span>
                    <span class="tag tag-blue">auxiliar</span>
                    <span class="tag tag-blue">investigador</span>
                    <span class="tag tag-blue">catedrático</span>
                  </div>
                </li>
                <li>
                  <strong>Estado</strong> – elige entre:
                  <div class="tags-container">
                    <span class="tag tag-green">activo</span>
                    <span class="tag tag-orange">inactivo</span>
                    <span class="tag tag-red">suspendido</span>
                  </div>
                  <p class="help-note">
                    ⚠️ Los usuarios con estado <strong>inactivo</strong> o <strong>suspendido</strong> 
                    no podrán iniciar sesión hasta que un administrador los devuelva a <strong>activo</strong>.
                  </p>
                </li>
              </ul>
            </li>

            <li>
              <strong>🚫 Suspender</strong>
              <p>
                Cambia el estado del usuario a <strong>suspendido</strong> con un solo clic, 
                sin necesidad de entrar al formulario de edición. Para reactivarlo, 
                vuelve a presionar el botón (ahora se mostrará como "Activar").
              </p>
            </li>

            <li>
              <strong>🗑️ Eliminar</strong>
              <p>
                Elimina permanentemente al usuario de la plataforma. Esta acción <strong>no se puede deshacer</strong>. 
                Asegúrate de querer borrarlo antes de confirmar.
              </p>
            </li>
          </ul>
          <div class="img-placeholder">
            <span class="placeholder-icon">
                <img src="../resources/usuario2.png" width="500" height="300">
            </span>
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

.help-list > li {
  margin-bottom: 18px;
}

.sub-list {
  padding-left: 20px;
  margin-top: 8px;
  list-style-type: circle;
  color: var(--text-dim);
}

.sub-list li {
  margin-bottom: 6px;
}

/* ─── Etiquetas de roles/estados ─── */
.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 8px 0;
}

.tag {
  display: inline-block;
  padding: 2px 10px;
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

.tag-green {
  background: rgba(76, 175, 80, 0.18);
  color: #81c784;
  border-color: rgba(76, 175, 80, 0.3);
}

.tag-orange {
  background: rgba(255, 152, 0, 0.15);
  color: #ffb74d;
  border-color: rgba(255, 152, 0, 0.3);
}

.tag-red {
  background: rgba(224, 36, 94, 0.15);
  color: #e06090;
  border-color: rgba(224, 36, 94, 0.3);
}

/* ─── Nota de advertencia ─── */
.help-note {
  border-left: 4px solid var(--pink);
  padding: 12px 16px;
  margin: 12px 0 0;
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
  margin: 16px 0;
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