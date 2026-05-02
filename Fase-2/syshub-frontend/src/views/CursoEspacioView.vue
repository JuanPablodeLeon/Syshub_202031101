<template>
  <div class="page-layout">
    <NavBar />
    <SideBar />
    <main class="content-area fade-up">

      <div class="page-header">
        <h1 class="page-title">📚 Espacios de Curso</h1>
        <!-- Solo admin, catedrático o auxiliar pueden crear -->
        <button
          v-if="canCreate"
          class="btn btn-primary"
          @click="showForm = !showForm"
        >
          {{ showForm ? '✕ Cancelar' : '＋ Crear espacio' }}
        </button>
      </div>

      <!-- ═══ FORMULARIO CREAR ESPACIO ══════════════════════════ -->
      <div v-if="showForm && canCreate" class="card form-card fade-up">
        <h3 class="section-title">Nuevo espacio de curso</h3>

        <div class="form-row">
          <div class="form-group">
            <label>Curso disponible *</label>
            <select v-model.number="form.cursoDisponibleId">
              <option disabled value="">Selecciona un curso</option>
              <option v-for="c in cursos" :key="c.id" :value="c.id">
                {{ c.codigo }} — {{ c.nombre }} {{ c.carrera ? `(${c.carrera.nombre})` : '' }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>Sección *</label>
            <input v-model="form.seccion" type="text" placeholder="A, B, N1..." maxlength="10" />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Semestre *</label>
            <select v-model.number="form.semestre">
              <option :value="1">1er semestre</option>
              <option :value="2">2do semestre</option>
            </select>
          </div>
          <div class="form-group">
            <label>Año *</label>
            <input v-model.number="form.year" type="number" :min="2020" :max="2040" />
          </div>
        </div>

        <!-- Catedrático -->
        <div class="form-group">
          <label>Catedrático *</label>
          <div v-if="loadingCatedraticos" class="muted-text">Cargando catedráticos...</div>
          <select v-else v-model.number="form.catedraticoId">
            <option disabled value="">Selecciona un catedrático</option>
            <option v-for="u in catedraticos" :key="u.id" :value="u.id">
              {{ u.nombre }} {{ u.apellidos }} — {{ u.correo }}
            </option>
          </select>
        </div>

        <!-- Auxiliares (multi-selección) -->
        <div class="form-group">
          <label>Auxiliares (opcional)</label>
          <div v-if="loadingAuxiliares" class="muted-text">Cargando auxiliares...</div>
          <div v-else class="multi-select-wrap">
            <label
              v-for="u in auxiliares"
              :key="u.id"
              class="multi-select-item"
              :class="{ selected: form.auxiliarIds.includes(u.id) }"
              @click="toggleAuxiliar(u.id)"
            >
              <span class="ms-check">{{ form.auxiliarIds.includes(u.id) ? '✓' : '' }}</span>
              {{ u.nombre }} {{ u.apellidos }} — {{ u.correo }}
            </label>
            <p v-if="auxiliares.length === 0" class="muted-text">No hay auxiliares registrados</p>
          </div>
        </div>

        <p v-if="formError" class="error-msg">{{ formError }}</p>
        <div class="form-actions">
          <button class="btn btn-primary" @click="createEspacio" :disabled="formSaving">
            {{ formSaving ? 'Creando...' : 'Crear espacio' }}
          </button>
        </div>
      </div>

      <!-- ═══ LISTA DE ESPACIOS ═════════════════════════════════ -->
      <div v-if="loadingEspacios" class="loading-state">Cargando espacios...</div>

      <div v-else-if="espacios.length === 0" class="empty-state">
        No hay espacios de curso creados aún.
      </div>

      <div v-else class="espacios-grid">
        <div
          v-for="e in espacios"
          :key="e.id"
          class="espacio-card card"
          @click="openEspacio(e)"
          style="cursor:pointer"
        >
          <div class="espacio-head">
            <div class="espacio-title">
              <span class="espacio-codigo tag tag-blue">{{ e.cursoDisponible?.codigo }}</span>
              <span class="espacio-nombre">{{ e.cursoDisponible?.nombre }}</span>
            </div>
            <span class="tag">Sec. {{ e.seccion }}</span>
          </div>
          <div class="espacio-meta">
            <span class="tag">{{ e.semestre }}° sem. {{ e.year }}</span>
            <span class="tag tag-pink" v-if="e.cursoDisponible?.carrera">
              🎓 {{ e.cursoDisponible.carrera.nombre }}
            </span>
          </div>
          <div class="espacio-docente">
            👨‍🏫 {{ e.catedratico?.nombre }} {{ e.catedratico?.apellidos }}
          </div>
          <div class="espacio-aux" v-if="e.auxiliares?.length">
            🤝 {{ e.auxiliares.map(a => a.nombre).join(', ') }}
          </div>
        </div>
      </div>

      <!-- ═══ MODAL DETALLE + AGREGAR USUARIOS ═════════════════ -->
      <div v-if="selectedEspacio" class="reply-overlay" @click.self="selectedEspacio = null">
        <div class="reply-modal card modal-wide">
          <div class="modal-head">
            <div>
              <h3 class="modal-title">
                {{ selectedEspacio.cursoDisponible?.codigo }} —
                {{ selectedEspacio.cursoDisponible?.nombre }}
              </h3>
              <p class="modal-sub">
                Sección {{ selectedEspacio.seccion }} ·
                {{ selectedEspacio.semestre }}° sem. {{ selectedEspacio.year }}
              </p>
            </div>
            <button class="btn btn-ghost" @click="selectedEspacio = null">✕</button>
          </div>

          <!-- Tabs del modal -->
          <div class="modal-tabs">
            <button class="tab-btn" :class="{ active: modalTab === 'info' }"      @click="modalTab = 'info'">Info</button>
            <button class="tab-btn" :class="{ active: modalTab === 'estudiantes' }" @click="modalTab = 'estudiantes'">
              👥 Estudiantes ({{ selectedEspacio.estudiantes?.length ?? 0 }})
            </button>
            <button class="tab-btn" :class="{ active: modalTab === 'auxiliares' }"  @click="modalTab = 'auxiliares'">
              🤝 Auxiliares ({{ selectedEspacio.auxiliares?.length ?? 0 }})
            </button>
          </div>

          <!-- Info -->
          <div v-if="modalTab === 'info'" class="modal-info">
            <div class="info-row"><span class="info-label">Catedrático</span><span>{{ selectedEspacio.catedratico?.nombre }} {{ selectedEspacio.catedratico?.apellidos }}</span></div>
            <div class="info-row"><span class="info-label">Correo</span><span>{{ selectedEspacio.catedratico?.correo }}</span></div>
            <div class="info-row"><span class="info-label">Carrera</span><span>{{ selectedEspacio.cursoDisponible?.carrera?.nombre || '—' }}</span></div>
            <div class="info-row"><span class="info-label">Créditos</span><span>{{ selectedEspacio.cursoDisponible?.creditos ?? '—' }}</span></div>
          </div>

          <!-- Estudiantes -->
          <div v-if="modalTab === 'estudiantes'">
            <div v-if="canManage" class="add-user-row">
              <input
                v-model="addEstudianteCorreo"
                type="email"
                placeholder="correo@ejemplo.com"
                class="add-email-input"
                @keydown.enter.prevent="agregarEstudiante"
              />
              <button class="btn btn-primary btn-sm" @click="agregarEstudiante" :disabled="addingEst">
                {{ addingEst ? '...' : '+ Agregar' }}
              </button>
            </div>
            <p v-if="addEstError" class="error-msg">{{ addEstError }}</p>
            <p v-if="addEstOk"    class="success-msg">✔ Usuario agregado</p>

            <div v-if="selectedEspacio.estudiantes?.length === 0" class="muted-text" style="padding:16px 0">
              No hay estudiantes inscritos aún.
            </div>
            <div class="member-list">
              <div v-for="est in selectedEspacio.estudiantes" :key="est.id" class="member-item">
                <div class="member-avatar">{{ (est.nombre?.[0]||'?').toUpperCase() }}</div>
                <div class="member-info">
                  <p class="member-name">{{ est.nombre }} {{ est.apellidos }}</p>
                  <p class="member-email">{{ est.correo }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Auxiliares -->
          <div v-if="modalTab === 'auxiliares'">
            <div v-if="canManage" class="add-user-row">
              <input
                v-model="addAuxCorreo"
                type="email"
                placeholder="correo@ejemplo.com"
                class="add-email-input"
                @keydown.enter.prevent="agregarAuxiliar"
              />
              <button class="btn btn-primary btn-sm" @click="agregarAuxiliar" :disabled="addingAux">
                {{ addingAux ? '...' : '+ Agregar' }}
              </button>
            </div>
            <p v-if="addAuxError" class="error-msg">{{ addAuxError }}</p>
            <p v-if="addAuxOk"    class="success-msg">✔ Auxiliar agregado</p>

            <div v-if="selectedEspacio.auxiliares?.length === 0" class="muted-text" style="padding:16px 0">
              No hay auxiliares en este espacio aún.
            </div>
            <div class="member-list">
              <div v-for="aux in selectedEspacio.auxiliares" :key="aux.id" class="member-item">
                <div class="member-avatar aux">{{ (aux.nombre?.[0]||'?').toUpperCase() }}</div>
                <div class="member-info">
                  <p class="member-name">{{ aux.nombre }} {{ aux.apellidos }}</p>
                  <p class="member-email">{{ aux.correo }}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Toast -->
      <transition name="toast-fade">
        <div v-if="toast.visible" class="toast" :class="toast.type">{{ toast.msg }}</div>
      </transition>

    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { cursoEspaciosApi, cursosDisponiblesApi, usuariosApi } from '@/services/api'
import NavBar  from '@/components/NavBar.vue'
import SideBar from '@/components/SideBar.vue'

const auth = useAuthStore()

// ── Permisos ──────────────────────────────────────────────────
const rol = computed(() => auth.user?.rol?.nombre)
const canCreate = computed(() => ['admin', 'catedratico'].includes(rol.value))
const canManage = computed(() => ['admin', 'catedratico', 'auxiliar'].includes(rol.value))

// ── Form crear ────────────────────────────────────────────────
const showForm   = ref(false)
const formError  = ref('')
const formSaving = ref(false)
const form = ref({
  cursoDisponibleId: '',
  seccion:           '',
  semestre:          1,
  year:              new Date().getFullYear(),
  catedraticoId:     '',
  auxiliarIds:       [],
})

function toggleAuxiliar(id) {
  const idx = form.value.auxiliarIds.indexOf(id)
  if (idx === -1) form.value.auxiliarIds.push(id)
  else            form.value.auxiliarIds.splice(idx, 1)
}

// ── Datos de selects ──────────────────────────────────────────
const cursos            = ref([])
const catedraticos      = ref([])
const auxiliares        = ref([])
const loadingCatedraticos = ref(false)
const loadingAuxiliares   = ref(false)

// ── Espacios ──────────────────────────────────────────────────
const espacios        = ref([])
const loadingEspacios = ref(true)

// ── Modal detalle ─────────────────────────────────────────────
const selectedEspacio    = ref(null)
const modalTab           = ref('info')
const addEstudianteCorreo = ref('')
const addAuxCorreo       = ref('')
const addingEst          = ref(false)
const addingAux          = ref(false)
const addEstError        = ref('')
const addEstOk           = ref(false)
const addAuxError        = ref('')
const addAuxOk           = ref(false)

// ── Toast ─────────────────────────────────────────────────────
const toast = ref({ visible: false, msg: '', type: 'toast-ok' })
function showToast(msg, type = 'toast-ok') {
  toast.value = { visible: true, msg, type }
  setTimeout(() => { toast.value.visible = false }, 3000)
}

// ── Init ──────────────────────────────────────────────────────
onMounted(async () => {
  try {
    const [cRes, espaciosRes] = await Promise.all([
      cursosDisponiblesApi.getAll(),
      cursoEspaciosApi.getAll(),
    ])
    cursos.value   = cRes.data   || []
    espacios.value = espaciosRes.data || []
  } catch {}
  loadingEspacios.value = false

  // Cargar catedráticos y auxiliares en paralelo
  loadingCatedraticos.value = true
  loadingAuxiliares.value   = true
  try {
    const [catRes, auxRes] = await Promise.all([
      usuariosApi.getByRol('catedratico'),
      usuariosApi.getByRol('auxiliar'),
    ])
    catedraticos.value = catRes.data || []
    auxiliares.value   = auxRes.data || []
  } catch {}
  loadingCatedraticos.value = false
  loadingAuxiliares.value   = false
})

async function createEspacio() {
  if (!form.value.cursoDisponibleId || !form.value.seccion || !form.value.catedraticoId) {
    formError.value = 'Curso, sección y catedrático son obligatorios'; return
  }
  formSaving.value = true; formError.value = ''
  try {
    const { data } = await cursoEspaciosApi.create(form.value)
    espacios.value.unshift(data)
    form.value = { cursoDisponibleId: '', seccion: '', semestre: 1, year: new Date().getFullYear(), catedraticoId: '', auxiliarIds: [] }
    showForm.value = false
    showToast('Espacio creado exitosamente')
  } catch (e) {
    const msg = e?.response?.data?.message
    formError.value = Array.isArray(msg) ? msg.join(', ') : (msg || 'Error al crear')
  }
  formSaving.value = false
}

async function openEspacio(e) {
  try {
    const { data } = await cursoEspaciosApi.getOne(e.id)
    selectedEspacio.value = data
    modalTab.value = 'info'
    addEstError.value = ''; addEstOk.value = false
    addAuxError.value = ''; addAuxOk.value = false
  } catch {}
}

async function agregarEstudiante() {
  if (!addEstudianteCorreo.value.trim()) return
  addingEst.value = true; addEstError.value = ''; addEstOk.value = false
  try {
    const { data } = await cursoEspaciosApi.agregarEstudiante(selectedEspacio.value.id, addEstudianteCorreo.value.trim())
    selectedEspacio.value = data
    addEstOk.value = true
    addEstudianteCorreo.value = ''
  } catch (e) {
    const msg = e?.response?.data?.message
    addEstError.value = Array.isArray(msg) ? msg.join(', ') : (msg || 'No se pudo agregar')
  }
  addingEst.value = false
}

async function agregarAuxiliar() {
  if (!addAuxCorreo.value.trim()) return
  addingAux.value = true; addAuxError.value = ''; addAuxOk.value = false
  try {
    const { data } = await cursoEspaciosApi.agregarAuxiliar(selectedEspacio.value.id, addAuxCorreo.value.trim())
    selectedEspacio.value = data
    addAuxOk.value = true
    addAuxCorreo.value = ''
  } catch (e) {
    const msg = e?.response?.data?.message
    addAuxError.value = Array.isArray(msg) ? msg.join(', ') : (msg || 'No se pudo agregar')
  }
  addingAux.value = false
}
</script>

<style scoped>
.page-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
.page-title  { font-size: 22px; font-weight: 800; }

/* Form */
.form-card { max-width: 700px; margin-bottom: 24px; }
.form-actions { display: flex; justify-content: flex-end; margin-top: 16px; }
.multi-select-wrap { display: flex; flex-direction: column; gap: 4px; max-height: 180px; overflow-y: auto; border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 6px; background: var(--bg-hover); }
.multi-select-item { display: flex; align-items: center; gap: 8px; padding: 7px 10px; border-radius: 6px; cursor: pointer; font-size: 13px; color: var(--text-dim); transition: background .12s; }
.multi-select-item:hover { background: var(--bg-card); }
.multi-select-item.selected { background: rgba(224,36,94,.1); color: var(--text); }
.ms-check { width: 16px; text-align: center; color: var(--pink); font-weight: 700; }

/* Grid */
.espacios-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 14px; }
.espacio-card { display: flex; flex-direction: column; gap: 8px; transition: border-color .15s, transform .15s; }
.espacio-card:hover { border-color: var(--pink); transform: translateY(-2px); }
.espacio-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; }
.espacio-title { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; flex: 1; }
.espacio-nombre { font-size: 14px; font-weight: 700; }
.espacio-meta { display: flex; flex-wrap: wrap; gap: 6px; }
.espacio-docente { font-size: 12px; color: var(--text-muted); }
.espacio-aux { font-size: 12px; color: var(--text-muted); }

/* Modal */
.reply-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.6); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 20px; }
.reply-modal { width: 100%; max-width: 600px; max-height: 80vh; overflow-y: auto; display: flex; flex-direction: column; gap: 14px; }
.modal-wide { max-width: 640px; }
.modal-head { display: flex; justify-content: space-between; align-items: flex-start; }
.modal-title { font-size: 17px; font-weight: 800; }
.modal-sub   { font-size: 13px; color: var(--text-muted); }
.modal-tabs  { display: flex; gap: 4px; border-bottom: 1px solid var(--border); }
.tab-btn { padding: 8px 14px; background: none; border: none; color: var(--text-muted); font-size: 12px; font-weight: 700; border-bottom: 2px solid transparent; margin-bottom: -1px; cursor: pointer; transition: all .15s; }
.tab-btn.active { color: var(--pink); border-bottom-color: var(--pink); }

/* Info */
.modal-info { display: flex; flex-direction: column; gap: 6px; }
.info-row { display: flex; gap: 14px; font-size: 13px; padding: 6px 0; border-bottom: 1px solid var(--border); }
.info-row:last-child { border-bottom: none; }
.info-label { font-weight: 700; color: var(--text-dim); min-width: 100px; }

/* Add user */
.add-user-row { display: flex; gap: 8px; margin-bottom: 8px; }
.add-email-input { flex: 1; height: 34px; }
.btn-sm { padding: 6px 12px; font-size: 12px; }

/* Members */
.member-list { display: flex; flex-direction: column; gap: 2px; }
.member-item { display: flex; align-items: center; gap: 10px; padding: 8px 4px; border-bottom: 1px solid var(--border); }
.member-item:last-child { border-bottom: none; }
.member-avatar { width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, var(--blue-mid), var(--pink)); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: #fff; flex-shrink: 0; }
.member-avatar.aux { background: linear-gradient(135deg, #ffc107, #ff9800); }
.member-info { flex: 1; }
.member-name  { font-size: 13px; font-weight: 600; }
.member-email { font-size: 11px; color: var(--text-muted); font-family: var(--font-mono); }

/* Misc */
.section-title { font-size: 13px; font-weight: 700; color: var(--text-dim); text-transform: uppercase; letter-spacing: .6px; margin-bottom: 12px; }
.muted-text  { font-size: 13px; color: var(--text-muted); }
.success-msg { color: #4caf50; font-size: 13px; }
.loading-state, .empty-state { text-align: center; color: var(--text-muted); padding: 60px 0; }

/* Toast */
.toast { position: fixed; bottom: 28px; right: 28px; z-index: 999; padding: 12px 20px; border-radius: var(--radius-sm); font-size: 13px; font-weight: 600; box-shadow: 0 4px 20px rgba(0,0,0,.4); }
.toast-ok  { background: rgba(76,175,80,.9);  color: #fff; }
.toast-err { background: rgba(224,36,94,.9);  color: #fff; }
.toast-fade-enter-active, .toast-fade-leave-active { transition: opacity .3s, transform .3s; }
.toast-fade-enter-from, .toast-fade-leave-to { opacity: 0; transform: translateY(10px); }
</style>
