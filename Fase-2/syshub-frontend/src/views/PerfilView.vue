<template>
  <div class="page-layout">
    <NavBar />
    <SideBar />
    <main class="content-area fade-up">

      <!-- Header perfil -->
      <div class="profile-header card">
        <div class="profile-avatar">{{ initials }}</div>
        <div class="profile-info">
          <h2 class="profile-name">{{ auth.user?.nombre }} {{ auth.user?.apellidos }}</h2>
          <p class="profile-role">
            <span class="tag tag-pink">{{ auth.user?.rol?.nombre || 'Usuario' }}</span>
            <span class="tag tag-green" v-if="auth.user?.estadoPerfil?.nombre === 'activo'">activo</span>
            <span class="tag tag-red"   v-else-if="auth.user?.estadoPerfil?.nombre === 'suspendido'">suspendido</span>
            <span class="tag"           v-else-if="auth.user?.estadoPerfil?.nombre">{{ auth.user.estadoPerfil.nombre }}</span>
          </p>
          <p class="profile-correo">{{ auth.user?.correo }}</p>
          <p v-if="auth.user?.description" class="profile-desc">{{ auth.user?.description }}</p>
        </div>
        <button class="btn btn-ghost edit-btn" @click="editing = !editing">
          {{ editing ? 'Cancelar' : '✏️ Editar perfil' }}
        </button>
      </div>

      <!-- Formulario edición -->
      <div v-if="editing" class="card edit-form fade-up">
        <h3 class="section-title">Editar perfil</h3>
        <form @submit.prevent="saveProfile" class="form-grid">
          <div class="form-row">
            <div class="form-group">
              <label>Nombre</label>
              <input v-model="editForm.nombre" type="text" />
            </div>
            <div class="form-group">
              <label>Apellidos</label>
              <input v-model="editForm.apellidos" type="text" />
            </div>
          </div>
          <div class="form-group">
            <label>Descripción</label>
            <textarea v-model="editForm.description" rows="3" style="resize:vertical"></textarea>
          </div>
          <p v-if="saveError" class="error-msg">{{ saveError }}</p>
          <p v-if="saveOk" class="success-msg">¡Perfil actualizado!</p>
          <div style="display:flex;justify-content:flex-end">
            <button type="submit" class="btn btn-primary" :disabled="saving">
              {{ saving ? 'Guardando...' : 'Guardar cambios' }}
            </button>
          </div>
        </form>
      </div>

      <!-- Carreras -->
      <div class="card section-card" v-if="auth.user?.carreras?.length">
        <h3 class="section-title">Carreras</h3>
        <div class="carreras-list">
          <span v-for="c in auth.user.carreras" :key="c.id" class="tag">{{ c.nombre }}</span>
        </div>
      </div>

      <!-- Actividad reciente -->
      <div class="card section-card">
        <div class="activity-header">
          <h3 class="section-title">Actividad reciente</h3>
          <button v-if="!actividadLoaded" class="btn btn-ghost btn-sm" @click="loadActividad" :disabled="loadingActividad">
            {{ loadingActividad ? 'Cargando...' : 'Cargar actividad' }}
          </button>
          <button v-else class="btn btn-ghost btn-sm" @click="loadActividad">↺ Actualizar</button>
        </div>

        <div v-if="loadingActividad" class="loading-state">Cargando actividad...</div>

        <div v-else-if="actividadLoaded && actividades.length === 0" class="empty-activity">
          No hay actividad registrada aún.
        </div>

        <div v-else-if="actividades.length" class="activity-feed">
          <div v-for="a in actividades" :key="a.id" class="activity-item">
            <span class="activity-icon">{{ accionIcon(a.tipoAccion) }}</span>
            <div class="activity-body">
              <p class="activity-desc">
                <strong>{{ accionLabel(a.tipoAccion) }}</strong>
                <span v-if="a.detalle" class="activity-detail"> — {{ a.detalle }}</span>
              </p>
              <p class="activity-time">{{ timeAgo(a.creadoEn) }}</p>
            </div>
          </div>
        </div>

        <div v-else-if="actividadError" class="empty-activity" style="color: #e06090">
          {{ actividadError }}
        </div>
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { usuariosApi, actividadesApi } from '@/services/api'
import NavBar from '@/components/NavBar.vue'
import SideBar from '@/components/SideBar.vue'

const auth = useAuthStore()
const editing   = ref(false)
const saving    = ref(false)
const saveError = ref('')
const saveOk    = ref(false)

const editForm = ref({
  nombre:      auth.user?.nombre      || '',
  apellidos:   auth.user?.apellidos   || '',
  description: auth.user?.description || '',
})

const initials = computed(() => {
  const u = auth.user
  if (!u) return '?'
  return ((u.nombre?.[0] || '') + (u.apellidos?.[0] || '')).toUpperCase()
})

async function saveProfile() {
  saveError.value = ''; saveOk.value = false; saving.value = true
  try {
    await usuariosApi.update(auth.user.id, editForm.value)
    await auth.fetchProfile()
    saveOk.value = true; editing.value = false
  } catch (e) {
    saveError.value = e?.response?.data?.message || 'Error al guardar'
  }
  saving.value = false
}

// ── Actividad ─────────────────────────────────────────────────
const actividades      = ref([])
const loadingActividad = ref(false)
const actividadLoaded  = ref(false)
const actividadError   = ref('')

async function loadActividad() {
  loadingActividad.value = true
  actividadError.value   = ''
  try {
    // Usar el endpoint dedicado /actividades/usuario/:id
    const { data } = await actividadesApi.getByUsuario(auth.user.id)
    actividades.value = Array.isArray(data) ? data : []
    actividadLoaded.value = true
  } catch (e) {
    actividadError.value = e?.response?.data?.message || 'No se pudo cargar la actividad'
    actividades.value    = []
    actividadLoaded.value = true
  }
  loadingActividad.value = false
}

const ACCION_LABELS = {
  foro_creado:          'Publicó en el foro',
  blog_creado:          'Publicó un artículo',
  respuesta_creada:     'Comentó en una publicación',
  reporte_enviado:      'Reportó una publicación',
  perfil_editado:       'Actualizó su perfil',
  curso_espacio_creado: 'Creó un espacio de curso',
  estudiante_agregado:  'Agregó un estudiante',
}
const ACCION_ICONS = {
  foro_creado:          '💬',
  blog_creado:          '📝',
  respuesta_creada:     '↩️',
  reporte_enviado:      '🚩',
  perfil_editado:       '👤',
  curso_espacio_creado: '📚',
  estudiante_agregado:  '👤',
}

function accionLabel(tipo) { return ACCION_LABELS[tipo] || tipo }
function accionIcon(tipo)  { return ACCION_ICONS[tipo]  || '⚡' }

function timeAgo(dateStr) {
  if (!dateStr) return ''
  const diff = (Date.now() - new Date(dateStr)) / 1000
  if (diff < 60)    return 'hace un momento'
  if (diff < 3600)  return `hace ${Math.floor(diff / 60)} min`
  if (diff < 86400) return `hace ${Math.floor(diff / 3600)} h`
  return `hace ${Math.floor(diff / 86400)} días`
}
</script>

<style scoped>
.profile-header { display: flex; align-items: flex-start; gap: 20px; margin-bottom: 16px; }
.profile-avatar { width: 72px; height: 72px; border-radius: 50%; flex-shrink: 0; background: linear-gradient(135deg, var(--pink), var(--blue-mid)); display: flex; align-items: center; justify-content: center; font-size: 26px; font-weight: 800; color: #fff; }
.profile-info { flex: 1; }
.profile-name { font-size: 22px; font-weight: 800; margin-bottom: 6px; }
.profile-role { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 6px; }
.profile-correo { font-size: 13px; color: var(--text-muted); font-family: var(--font-mono); }
.profile-desc { font-size: 14px; color: var(--text-dim); margin-top: 6px; }
.edit-btn { align-self: flex-start; margin-left: auto; white-space: nowrap; }
.edit-form { margin-bottom: 16px; }
.form-grid { display: flex; flex-direction: column; gap: 16px; }
.section-card { margin-bottom: 16px; }
.section-title { font-size: 14px; font-weight: 700; color: var(--text-dim); text-transform: uppercase; letter-spacing: .6px; margin-bottom: 14px; }
.carreras-list { display: flex; flex-wrap: wrap; gap: 8px; }
.success-msg { color: #4caf50; font-size: 13px; }
.tag-green { background: rgba(76,175,80,.18); color: #81c784; border-color: rgba(76,175,80,.3); }
.tag-red   { background: rgba(224,36,94,.15); color: #e06090; border-color: rgba(224,36,94,.3); }
.btn-sm { padding: 5px 11px; font-size: 12px; }
.activity-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
.activity-header .section-title { margin-bottom: 0; }
.loading-state, .empty-activity { text-align: center; color: var(--text-muted); padding: 24px 0; font-size: 13px; }
.activity-feed { display: flex; flex-direction: column; }
.activity-item { display: flex; gap: 12px; align-items: flex-start; padding: 10px 0; border-bottom: 1px solid var(--border); }
.activity-item:last-child { border-bottom: none; }
.activity-icon { font-size: 18px; flex-shrink: 0; margin-top: 1px; }
.activity-body { flex: 1; }
.activity-desc { font-size: 13px; color: var(--text); margin-bottom: 2px; }
.activity-detail { color: var(--text-muted); }
.activity-time { font-size: 11px; color: var(--text-muted); }
</style>
