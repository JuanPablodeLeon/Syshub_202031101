<template>
  <div class="page-layout">
    <NavBar />
    <SideBar />
    <main class="content-area fade-up">
      <div class="admin-header">
        <h1 class="admin-title">🛡️ Panel de Administración</h1>
        <div class="admin-tabs">
          <button class="tab-btn" :class="{ active: tab === 'usuarios' }" @click="tab = 'usuarios'">Usuarios</button>
          <button class="tab-btn" :class="{ active: tab === 'reportes' }" @click="tab = 'reportes'; loadReportes()">🚩 Reportes</button>
          <button class="tab-btn" :class="{ active: tab === 'carreras' }" @click="tab = 'carreras'">🎓 Carreras</button>
          <button class="tab-btn" :class="{ active: tab === 'cursos' }" @click="tab = 'cursos'; loadCursos()">📚 Cursos Disponibles</button>
        </div>
      </div>

      <!-- ═══ USUARIOS ═══════════════════════════════════════════ -->
      <div v-if="tab === 'usuarios'">
        <div v-if="loadingUsers" class="loading-state">Cargando usuarios...</div>
        <div v-else class="users-grid">
          <div v-for="u in usuarios" :key="u.id" class="user-card card">
            <div class="user-card-head">
              <div class="avatar">{{ initials(u) }}</div>
              <div class="user-info">
                <p class="user-name">{{ u.nombre }} {{ u.apellidos }}</p>
                <p class="user-email">{{ u.correo }}</p>
              </div>
              <div class="user-badges">
                <span class="tag" :class="u.rol?.nombre === 'admin' ? 'tag-pink' : 'tag-blue'">
                  {{ u.rol?.nombre || 'sin rol' }}
                </span>
                <span class="tag" :class="estadoClass(u.estadoPerfil?.nombre)">
                  {{ u.estadoPerfil?.nombre || '—' }}
                </span>
              </div>
            </div>
            <div class="user-card-actions">
              <button class="btn btn-ghost btn-sm" @click="startEdit(u)">✏️ Editar</button>
              <button
                class="btn btn-sm"
                :class="u.estadoPerfil?.nombre === 'suspendido' ? 'btn-success' : 'btn-warning'"
                @click="toggleSuspend(u)"
              >
                {{ u.estadoPerfil?.nombre === 'suspendido' ? '✅ Activar' : '🚫 Suspender' }}
              </button>
              <button class="btn btn-danger btn-sm" @click="deleteUser(u.id)">🗑️ Eliminar</button>
            </div>
          </div>
        </div>
      </div>

      <!-- ═══ REPORTES ══════════════════════════════════════════ -->
      <div v-if="tab === 'reportes'">
        <div v-if="loadingReportes" class="loading-state">Cargando reportes...</div>
        <div v-else-if="reportes.length === 0" class="card reports-empty">
          <p class="section-title">Reportes pendientes</p>
          <p class="muted-text">No hay reportes pendientes de revisión.</p>
        </div>
        <div v-else class="reportes-list">
          <div v-for="r in reportes" :key="r.id" class="reporte-card card">
            <div class="reporte-head">
              <span class="tag clickable" :class="r.tipo === 'blog' ? 'tag-pink' : 'tag-blue'" @click="goToReferencia(r)">
                {{ r.tipo === 'blog' ? '📝 Blog' : '💬 Foro' }} #{{ r.referenciaId }}
              </span>
              <span class="tag" :class="reporteEstadoClass(r.estado)">{{ r.estado }}</span>
              <span class="reporte-fecha">{{ formatDate(r.creadoEn) }}</span>
            </div>
            <p class="reporte-motivo">{{ r.motivo }}</p>
            <p class="reporte-autor">Reportado por: <strong>{{ r.reportadoPor?.correo }}</strong></p>
            <div v-if="r.estado === 'pendiente'" class="reporte-actions">
              <button class="btn btn-ghost btn-sm" @click="accionReporte(r.id, 'revisado')">✔ Revisado</button>
              <button class="btn btn-danger btn-sm" @click="accionReporte(r.id, 'descartado')">✕ Descartar</button>
            </div>
          </div>
        </div>
      </div>

            <!-- ═══ CARRERAS ══════════════════════════════════════════ -->
      <div v-if="tab === 'carreras'">
        <div class="section-toolbar">
          <button class="btn btn-primary btn-sm" @click="showCarreraForm = !showCarreraForm">
            {{ showCarreraForm ? '✕ Cancelar' : '＋ Nueva carrera' }}
          </button>
        </div>

        <!-- Formulario nueva carrera -->
        <div v-if="showCarreraForm" class="card form-card fade-up">
          <h3 class="section-title">Nueva Carrera</h3>
          <div class="form-group">
            <label>Nombre *</label>
            <input v-model="carreraForm.nombre" type="text" placeholder="Ej: Ingeniería en Sistemas" />
          </div>
          <div class="form-group">
            <label>Descripción</label>
            <textarea v-model="carreraForm.descripcion" rows="2" style="resize:vertical"></textarea>
          </div>
          <p v-if="carreraError" class="error-msg">{{ carreraError }}</p>
          <div class="modal-actions">
            <button class="btn btn-primary" @click="saveCarrera" :disabled="carreraSaving">
              {{ carreraSaving ? 'Guardando...' : 'Crear carrera' }}
            </button>
          </div>
        </div>

        <div v-if="loadingCarreras" class="loading-state">Cargando...</div>
        <div v-else class="items-grid">
          <div v-for="c in carreras" :key="c.id" class="item-card card">
            <div class="item-head">
              <span class="item-name">🎓 {{ c.nombre }}</span>
              <span class="tag">ID: {{ c.id }}</span>
            </div>
            <p v-if="c.descripcion" class="item-desc">{{ c.descripcion }}</p>
          </div>
        </div>
      </div>

      <!-- ═══ CURSOS DISPONIBLES ════════════════════════════════ -->
      <div v-if="tab === 'cursos'">
        <div class="section-toolbar">
          <button class="btn btn-primary btn-sm" @click="showCursoForm = !showCursoForm">
            {{ showCursoForm ? '✕ Cancelar' : '＋ Nuevo curso' }}
          </button>
        </div>

        <!-- Formulario nuevo curso -->
        <div v-if="showCursoForm" class="card form-card fade-up">
          <h3 class="section-title">Nuevo Curso Disponible</h3>
          <div class="form-row">
            <div class="form-group">
              <label>Nombre *</label>
              <input v-model="cursoForm.nombre" type="text" placeholder="Ej: Introducción a la Programación" />
            </div>
            <div class="form-group">
              <label>Código *</label>
              <input v-model="cursoForm.codigo" type="text" placeholder="Ej: IPC1" maxlength="20" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Créditos *</label>
              <input v-model.number="cursoForm.creditos" type="number" min="1" max="20" />
            </div>
            <div class="form-group">
              <label>Carrera *</label>
              <select v-model.number="cursoForm.carreraId">
                <option disabled value="">Selecciona una carrera</option>
                <option v-for="c in carreras" :key="c.id" :value="c.id">{{ c.nombre }}</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group checkbox-group">
              <label><input type="checkbox" v-model="cursoForm.obligatorio" /> Obligatorio</label>
            </div>
            <div class="form-group checkbox-group">
              <label><input type="checkbox" v-model="cursoForm.clar" /> CLAR</label>
            </div>
          </div>
          <div class="form-group">
            <label>Descripción</label>
            <textarea v-model="cursoForm.descripcion" rows="2" style="resize:vertical"></textarea>
          </div>
          <p v-if="cursoError" class="error-msg">{{ cursoError }}</p>
          <div class="modal-actions">
            <button class="btn btn-primary" @click="saveCurso" :disabled="cursoSaving">
              {{ cursoSaving ? 'Guardando...' : 'Crear curso' }}
            </button>
          </div>
        </div>

        <div v-if="loadingCursos" class="loading-state">Cargando...</div>
        <div v-else class="items-grid">
          <div v-for="c in cursos" :key="c.id" class="item-card card">
            <div class="item-head">
              <span class="item-name">📚 {{ c.nombre }}</span>
              <span class="tag tag-blue">{{ c.codigo }}</span>
            </div>
            <div class="item-meta">
              <span class="tag">{{ c.creditos }} créditos</span>
              <span class="tag" v-if="c.obligatorio">Obligatorio</span>
              <span class="tag" v-if="c.clar">CLAR</span>
              <span class="tag tag-pink" v-if="c.carrera">🎓 {{ c.carrera.nombre }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ═══ MODAL EDITAR USUARIO ══════════════════════════════ -->
      <div v-if="editingUser" class="reply-overlay" @click.self="editingUser = null">
        <div class="reply-modal card">
          <h3 class="section-title">✏️ Editar usuario</h3>

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

          <div class="form-row">
            <div class="form-group">
              <label>Rol</label>
              <select v-model.number="editForm.rolId">
                <option v-for="r in roles" :key="r.id" :value="r.id">{{ r.nombre }}</option>
              </select>
            </div>
            <div class="form-group">
              <label>Estado</label>
              <select v-model.number="editForm.estadoPerfilId">
                <option v-for="e in estados" :key="e.id" :value="e.id">{{ e.nombre }}</option>
              </select>
            </div>
          </div>

          <p v-if="editError" class="error-msg">{{ editError }}</p>
          <div class="modal-actions">
            <button class="btn btn-ghost" @click="editingUser = null">Cancelar</button>
            <button class="btn btn-primary" @click="saveUser" :disabled="editSaving">
              {{ editSaving ? 'Guardando...' : 'Guardar cambios' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Toast notificación -->
      <transition name="toast-fade">
        <div v-if="toast.visible" class="toast" :class="toast.type">{{ toast.msg }}</div>
      </transition>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usuariosApi, reportesApi, carrerasApi, cursosDisponiblesApi } from '@/services/api'
import NavBar from '@/components/NavBar.vue'
import SideBar from '@/components/SideBar.vue'
import { useRouter} from 'vue-router'

// Estado General
const tab = ref('usuarios')
const router = useRouter()

// Toast
const toast = ref({ visible: false, msg: '', type: 'toast-ok' })
function showToast(msg, type = 'toast-ok') {
  toast.value = { visible: true, msg, type }
  setTimeout(() => toast.value.visible = false, 3000)
}

//Roles y estados
const roles   = [
  { id: 1, nombre: 'admin' },
  { id: 2, nombre: 'estudiante' },
  { id: 3, nombre: 'auxiliar' },
  { id: 4, nombre: 'investigador' },
  { id: 5, nombre: 'catedratico'}
]

const estados = [
  { id: 1, nombre: 'activo' },
  { id: 2, nombre: 'inactivo' },
  { id: 4, nombre: 'suspendido' },
]

// Usuarios
const usuarios     = ref([])
const loadingUsers = ref(true)
const editingUser  = ref(null)
const editForm     = ref({ nombre: '', apellidos: '', rolId: 2, estadoPerfilId: 1 })
const editError    = ref('')
const editSaving   = ref(false)

function initials(u) {
  return ((u.nombre?.[0]||'') + (u.apellidos?.[0]||'')).toUpperCase()
}
function estadoClass(nombre) {
  if (nombre === 'activo')     return 'tag-green'
  if (nombre === 'suspendido') return 'tag-red'
  return ''
}

function startEdit(u) {
  editingUser.value = u
  editForm.value = {
    nombre:         u.nombre,
    apellidos:      u.apellidos,
    rolId:          u.rol?.id ?? 2,
    estadoPerfilId: u.estadoPerfil?.id ?? 1,
  }
  editError.value = ''
}

async function saveUser() {
  editSaving.value = true; editError.value = ''
  try {
    const updated = await usuariosApi.update(editingUser.value.id, editForm.value)
    const data = updated.data
    const idx = usuarios.value.findIndex(u => u.id === editingUser.value.id)
    if (idx !== -1) usuarios.value[idx] = data
    editingUser.value = null
    showToast('Usuario actualizado correctamente')
  } catch (e) {
    const msg = e?.response?.data?.message
    if (Array.isArray(msg)) editError.value = msg.join(', ')
    else editError.value = msg || 'Error al guardar'
  }
  editSaving.value = false
}

async function toggleSuspend(u) {
  const esSuspendido = u.estadoPerfil?.nombre === 'suspendido'
  const nuevoEstadoId = esSuspendido ? 1 : 3  // 1=activo, 3=suspendido
  try {
    const { data } = await usuariosApi.update(u.id, { estadoPerfilId: nuevoEstadoId })
    const idx = usuarios.value.findIndex(x => x.id === u.id)
    if (idx !== -1) usuarios.value[idx] = data
    showToast(esSuspendido ? 'Usuario activado' : 'Usuario suspendido')
  } catch (e) {
    showToast(e?.response?.data?.message || 'Error al cambiar estado', 'toast-err')
  }
}

async function deleteUser(id) {
  if (!confirm('¿Eliminar este usuario permanentemente?')) return
  try {
    await usuariosApi.remove(id)
    usuarios.value = usuarios.value.filter(u => u.id !== id)
    showToast('Usuario eliminado')
  } catch (e) {
    const msg = e?.response?.data?.message || 'Error al eliminar'
    showToast(Array.isArray(msg) ? msg.join(', ') : msg, 'toast-err')
  }
}

// ── Reportes ─────────────────────────────────────────────────
const reportes        = ref([])
const loadingReportes = ref(false)

function reporteEstadoClass(estado) {
  if (estado === 'pendiente')  return 'tag-red'
  if (estado === 'revisado')   return 'tag-green'
  return ''
}
function formatDate(d) {
  return d ? new Date(d).toLocaleDateString('es-GT', { day:'2-digit', month:'short', year:'numeric' }) : ''
}

async function loadReportes() {
  if (reportes.value.length) return
  loadingReportes.value = true
  try { const { data } = await reportesApi.getAll(); reportes.value = data || [] } catch {}
  loadingReportes.value = false
}

async function accionReporte(id, estado) {
  try {
    const { data } = await reportesApi.updateEstado(id, estado)
    const idx = reportes.value.findIndex(r => r.id === id)
    if (idx !== -1) reportes.value[idx] = data
    showToast(`Reporte marcado como ${estado}`)
  } catch {
    showToast('Error al actualizar reporte', 'toast-err')
  }
}

function goToReferencia(r){
  if (r.tipo === 'blog') {
    router.push(`/blog/${r.referenciaId}`)
  } else if (r.tipo === 'foro') {
    router.push(`/foro/${r.referenciaId}`)
  }
}

// ── Carreras ─────────────────────────────────────────────────
const carreras        = ref([])
const loadingCarreras = ref(false)
const showCarreraForm = ref(false)
const carreraForm     = ref({ nombre: '', descripcion: '' })
const carreraError    = ref('')
const carreraSaving   = ref(false)

async function loadCarreras() {
  loadingCarreras.value = true
  try { const { data } = await carrerasApi.getAll(); carreras.value = data || [] } catch {}
  loadingCarreras.value = false
}

async function saveCarrera() {
  if (!carreraForm.value.nombre.trim()) { carreraError.value = 'El nombre es obligatorio'; return }
  carreraSaving.value = true; carreraError.value = ''
  try {
    const { data } = await carrerasApi.create(carreraForm.value)
    carreras.value.push(data)
    carreraForm.value = { nombre: '', descripcion: '' }
    showCarreraForm.value = false
    showToast('Carrera creada exitosamente')
  } catch (e) {
    const msg = e?.response?.data?.message
    carreraError.value = Array.isArray(msg) ? msg.join(', ') : (msg || 'Error al crear')
  }
  carreraSaving.value = false
}

// ── Cursos Disponibles ────────────────────────────────────────
const cursos        = ref([])
const loadingCursos = ref(false)
const showCursoForm = ref(false)
const cursoForm     = ref({ nombre: '', codigo: '', creditos: 4, carreraId: '', obligatorio: true, clar: false, descripcion: '' })
const cursoError    = ref('')
const cursoSaving   = ref(false)

async function loadCursos() {
  if (cursos.value.length) return
  loadingCursos.value = true
  try { const { data } = await cursosDisponiblesApi.getAll(); cursos.value = data || [] } catch {}
  loadingCursos.value = false
}

async function saveCurso() {
  if (!cursoForm.value.nombre || !cursoForm.value.codigo || !cursoForm.value.carreraId) {
    cursoError.value = 'Nombre, código y carrera son obligatorios'; return
  }
  cursoSaving.value = true; cursoError.value = ''
  try {
    const { data } = await cursosDisponiblesApi.create(cursoForm.value)
    cursos.value.push(data)
    cursoForm.value = { nombre: '', codigo: '', creditos: 4, carreraId: '', obligatorio: true, clar: false, descripcion: '' }
    showCursoForm.value = false
    showToast('Curso creado exitosamente')
  } catch (e) {
    const msg = e?.response?.data?.message
    cursoError.value = Array.isArray(msg) ? msg.join(', ') : (msg || 'Error al crear')
  }
  cursoSaving.value = false
}

onMounted(async () => {
  try { const { data } = await usuariosApi.getAll(); usuarios.value = data || [] } catch {}
  loadingUsers.value = false
  await loadCarreras()
})
</script>

<style scoped>
.admin-header { margin-bottom: 24px; }
.admin-title { font-size: 24px; font-weight: 800; margin-bottom: 16px; }
.admin-tabs { display: flex; gap: 4px; border-bottom: 1px solid var(--border); flex-wrap: wrap; }
.tab-btn { padding: 10px 16px; background: none; border: none; color: var(--text-muted); font-size: 13px; font-weight: 700; border-bottom: 2px solid transparent; margin-bottom: -1px; cursor: pointer; transition: all .18s; }
.tab-btn.active { color: var(--pink); border-bottom-color: var(--pink); }
.tab-btn:hover { color: var(--text); }

/* Users */
.users-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px,1fr)); gap: 14px; }
.user-card { display: flex; flex-direction: column; gap: 12px; }
.user-card-head { display: flex; align-items: flex-start; gap: 12px; }
.user-info { flex: 1; }
.user-name { font-size: 14px; font-weight: 700; }
.user-email { font-size: 12px; color: var(--text-muted); font-family: var(--font-mono); }
.user-badges { display: flex; flex-direction: column; gap: 4px; align-items: flex-end; }
.user-card-actions { display: flex; gap: 6px; flex-wrap: wrap; }

/* Tags color extras */
.tag-green { background: rgba(76,175,80,.18); color: #81c784; border-color: rgba(76,175,80,.3); }
.tag-red   { background: rgba(224,36,94,.15); color: #e06090; border-color: rgba(224,36,94,.3); }

/* Botones extra */
.btn-sm { padding: 6px 12px; font-size: 12px; }
.btn-danger  { background: rgba(224,36,94,.15); color: var(--pink); border: 1px solid rgba(224,36,94,.3); }
.btn-danger:hover { background: rgba(224,36,94,.25); }
.btn-warning { background: rgba(255,193,7,.12); color: #ffc107; border: 1px solid rgba(255,193,7,.3); }
.btn-warning:hover { background: rgba(255,193,7,.22); }
.btn-success { background: rgba(76,175,80,.12); color: #81c784; border: 1px solid rgba(76,175,80,.3); }
.btn-success:hover { background: rgba(76,175,80,.22); }

/* Reportes */
.reportes-list { display: flex; flex-direction: column; gap: 12px; }
.reporte-card { display: flex; flex-direction: column; gap: 8px; }
.reporte-head { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.reporte-fecha { font-size: 11px; color: var(--text-muted); margin-left: auto; }
.reporte-motivo { font-size: 14px; color: var(--text-dim); padding: 8px; background: var(--bg-hover); border-radius: var(--radius-sm); }
.reporte-autor { font-size: 12px; color: var(--text-muted); }
.reporte-actions { display: flex; gap: 8px; }
.reports-empty { text-align: center; padding: 48px; }
.tag.clickable { cursor: pointer;}

/* Carreras / Cursos */
.section-toolbar { margin-bottom: 16px; }
.form-card { margin-bottom: 20px; max-width: 640px; }
.items-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px,1fr)); gap: 12px; }
.item-card { display: flex; flex-direction: column; gap: 8px; }
.item-head { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.item-name { font-size: 14px; font-weight: 700; flex: 1; }
.item-desc { font-size: 13px; color: var(--text-dim); }
.item-meta { display: flex; flex-wrap: wrap; gap: 6px; }
.checkbox-group label { display: flex; align-items: center; gap: 6px; font-size: 13px; cursor: pointer; }

/* Modal */
.section-title { font-size: 14px; font-weight: 700; color: var(--text-dim); text-transform: uppercase; letter-spacing: .6px; margin-bottom: 14px; }
.muted-text { color: var(--text-muted); font-size: 14px; }
.loading-state { text-align: center; padding: 48px; color: var(--text-muted); }
.reply-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.6); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 20px; }
.reply-modal { width: 100%; max-width: 520px; }
.modal-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 16px; }

/* Toast */
.toast { position: fixed; bottom: 28px; right: 28px; z-index: 999; padding: 12px 20px; border-radius: var(--radius-sm); font-size: 13px; font-weight: 600; box-shadow: 0 4px 20px rgba(0,0,0,.4); }
.toast-ok  { background: rgba(76,175,80,.9);  color: #fff; }
.toast-err { background: rgba(224,36,94,.9);  color: #fff; }
.toast-fade-enter-active, .toast-fade-leave-active { transition: opacity .3s, transform .3s; }
.toast-fade-enter-from, .toast-fade-leave-to { opacity: 0; transform: translateY(10px); }
</style>
