<template>
  <aside class="sidebar" v-if="auth.isLoggedIn">
    <div class="sidebar-section">
      <RouterLink to="/" class="sidebar-link" :class="{ active: $route.path === '/' }">
        <span class="s-icon">🏠</span> Inicio
      </RouterLink>
    </div>

    <!-- Estudiante / Investigador -->
    <template v-if="['estudiante', 'investigador'].includes(auth.rolNombre)">
      <div class="sidebar-section">
        <p class="sidebar-heading">Tus Cursos</p>
        <RouterLink to="/cursos" class="sidebar-link" :class="{ active: $route.path === '/cursos' }">
          <span class="s-icon">📚</span> Cursos
        </RouterLink>
      </div>
    </template>

    <!-- Auxiliar -->
    <template v-if="auth.rolNombre === 'auxiliar'">
      <div class="sidebar-section">
        <p class="sidebar-heading">Auxiliatura</p>
        <RouterLink to="/cursos" class="sidebar-link" :class="{ active: $route.path === '/cursos' }">
          <span class="s-icon">📚</span> Espacios de curso
        </RouterLink>
      </div>
    </template>

    <!-- Catedrático -->
    <template v-if="auth.rolNombre === 'catedratico'">
      <div class="sidebar-section">
        <p class="sidebar-heading">Docencia</p>
        <RouterLink to="/cursos" class="sidebar-link" :class="{ active: $route.path === '/cursos' }">
          <span class="s-icon">📚</span> Mis cursos
        </RouterLink>
      </div>
    </template>

    <!-- Admin -->
    <template v-if="auth.rolNombre === 'admin'">
      <div class="sidebar-section">
        <RouterLink to="/admin" class="sidebar-link" :class="{ active: $route.path === '/admin' }">
          <span class="s-icon">🛡️</span> Administrador
        </RouterLink>
        <RouterLink to="/cursos" class="sidebar-link" :class="{ active: $route.path === '/cursos' }">
          <span class="s-icon">📚</span> Espacio Cursos
        </RouterLink>
              <div class="sidebar-section">
        <p class="sidebar-heading">Manual de Administrador</p>
        <RouterLink to="/usuario-manual" class="sidebar-link" :class="{ active: $route.path === '/usuario-manual' }">
          <span class="s-icon"></span> Usuarios
        </RouterLink>
                <RouterLink to="/reporte-manual" class="sidebar-link" :class="{ active: $route.path === '/reporte-manual' }">
          <span class="s-icon"></span> Reportes
        </RouterLink>
        <RouterLink to="/carrera-manual" class="sidebar-link" :class="{ active: $route.path === '/carrera-manual' }">
          <span class="s-icon"></span> Carreras
        </RouterLink>
        <RouterLink to="/curso-manual" class="sidebar-link" :class="{ active: $route.path === '/curso-manual' }">
          <span class="s-icon"></span> Cursos Espacio
        </RouterLink>
      </div>
      </div>
    </template>

      <div class="sidebar-section">
        <p class="sidebar-heading">Manual de Usuario</p>
        <RouterLink to="/interaccion" class="sidebar-link" :class="{ active: $route.path === '/interaccion' }">
          <span class="s-icon"></span> Interaccion
        </RouterLink>
        <RouterLink to="/publicacion" class="sidebar-link" :class="{ active: $route.path === '/publicacion' }">
          <span class="s-icon"></span> Publicacion
        </RouterLink>
        <template v-if="auth.rolNombre === 'admin' || auth.rolNombre === 'catedratico' || auth.rolNombre === 'auxiliar' || auth.rolNombre === 'investigador'">
        <RouterLink to="/articulo" class="sidebar-link" :class="{ active: $route.path === '/articulo' }">
          <span class="s-icon"></span> Blog/Articulo
        </RouterLink>
        </template>
        <template v-if="auth.rolNombre === 'admin' || auth.rolNombre === 'catedratico'">
        <RouterLink to="/curso-espacio" class="sidebar-link" :class="{ active: $route.path === '/curso-espacio' }">
          <span class="s-icon"></span> Curso-Espacio
        </RouterLink>
        </template>
        <RouterLink to="/ver-curso-espacio" class="sidebar-link" :class="{ active: $route.path === '/ver-curso-espacio' }">
          <span class="s-icon"></span> Ver Curso-Espacio
        </RouterLink>
      </div>

  </aside>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()
</script>

<style scoped>
.sidebar {
  grid-column: 1; grid-row: 2;
  padding: 20px 14px;
  border-right: 1px solid var(--border);
  position: sticky; top: 56px;
  height: calc(100vh - 56px);
  overflow-y: auto;
}
.sidebar-section { margin-bottom: 8px; }
.sidebar-heading { font-size: 10px; font-weight: 700; color: var(--text-muted); letter-spacing: 1px; text-transform: uppercase; padding: 10px 10px 4px; }
.sidebar-link { display: flex; align-items: center; gap: 10px; padding: 8px 10px; border-radius: var(--radius-sm); font-size: 14px; font-weight: 600; color: var(--text-dim); transition: all .15s; cursor: pointer; }
.sidebar-link:hover, .sidebar-link.active { background: var(--bg-hover); color: var(--text); }
.sidebar-link.active { color: var(--pink); }
.s-icon { font-size: 15px; }
</style>
