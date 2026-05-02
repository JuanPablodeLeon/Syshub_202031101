<template>
  <div class="page-layout">
    <NavBar />
    <SideBar />
    <main class="content-area fade-up">

      <!-- Notificación usuario no encontrado / suspendido -->
      <div v-if="userNotFound" class="alert alert-err">
        ⚠️ Tu cuenta no existe o fue eliminada. Por favor inicia sesión nuevamente.
      </div>
      <div v-if="userSuspended" class="alert alert-warn">
        🚫 Tu cuenta está suspendida. No puedes crear publicaciones.
      </div>

      <div class="crear-card card">
        <h2 class="crear-title">Crear</h2>

        <!-- Type selector -->
        <div class="type-tabs">
          <button class="type-tab" :class="{ active: tipo === 'foro' }" @click="tipo = 'foro'">
            💬 Publicación
          </button>
          <button
            v-if="auth.canCreateBlog"
            class="type-tab"
            :class="{ active: tipo === 'blog' }"
            @click="tipo = 'blog'"
          >
            📝 Blog / Artículo
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="crear-form">
          <div class="form-group">
            <label>Título *</label>
            <input v-model="form.titulo" type="text" placeholder="¿Cómo instalar Java?" required maxlength="300" />
            <span class="char-count">{{ form.titulo.length }}/300</span>
          </div>

          <div class="form-group">
            <label>Descripción *</label>
            <textarea
              v-model="form.descripcion"
              :placeholder="tipo === 'blog' ? 'Escribe tu artículo...' : 'Describe tu publicación...'"
              rows="6"
              style="resize:vertical"
              required
              :maxlength="tipo === 'blog' ? 10000 : 2500"
            ></textarea>
            <span class="char-count">{{ form.descripcion.length }}/{{ tipo === 'blog' ? 10000 : 2500 }}</span>
          </div>

          <!-- Tags -->
          <div class="form-group">
            <label>Etiquetas</label>
            <div class="tags-input-wrap">
              <span
                v-for="tag in selectedTags"
                :key="tag.id ?? tag.nombre"
                class="tag"
                style="cursor:pointer"
                @click="removeTag(tag)"
              >{{ tag.nombre }} ✕</span>
              <div class="tags-search">
                <input
                  v-model="tagSearch"
                  type="text"
                  placeholder="Buscar o crear etiqueta..."
                  style="width:200px; height:28px; border-radius:100px; font-size:12px"
                  @input="filterTags"
                  @keydown.enter.prevent="handleTagEnter"
                />
                <div v-if="tagSearch && (filteredTags.length > 0 || tagSearch.trim())" class="tags-dropdown">
                  <div
                    v-for="t in filteredTags"
                    :key="t.id"
                    class="tag-option"
                    @click="addTag(t)"
                  >{{ t.nombre }}</div>
                  <!-- Opción crear nueva si no hay coincidencia exacta -->
                  <div
                    v-if="tagSearch.trim() && !filteredTags.find(t => t.nombre.toLowerCase() === tagSearch.trim().toLowerCase())"
                    class="tag-option tag-create"
                    @click="createAndAddTag"
                  >
                    ＋ Crear "{{ tagSearch.trim() }}"
                  </div>
                </div>
              </div>
            </div>
            <p class="hint-text">Presiona Enter o haz clic en "Crear" para agregar una nueva etiqueta</p>
          </div>

          <p v-if="error" class="error-msg">{{ error }}</p>

          <div class="form-actions">
            <RouterLink to="/" class="btn btn-ghost">Cancelar</RouterLink>
            <button type="submit" class="btn btn-primary" :disabled="loading || userSuspended">
              {{ loading ? 'Publicando...' : 'Publicar' }}
            </button>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { foroApi, blogApi, etiquetasApi } from '@/services/api'
import NavBar from '@/components/NavBar.vue'
import SideBar from '@/components/SideBar.vue'

const router  = useRouter()
const auth    = useAuthStore()
const tipo    = ref('foro')
const loading = ref(false)
const error   = ref('')

// Alertas de estado de cuenta
const userNotFound  = ref(false)
const userSuspended = ref(false)

const form = ref({ titulo: '', descripcion: '' })
const allTags      = ref([])
const selectedTags = ref([])
const tagSearch    = ref('')
const filteredTags = ref([])

onMounted(async () => {
  // Verificar estado del usuario
  if (auth.user?.estadoPerfil?.nombre === 'suspendido') {
    userSuspended.value = true
  }

  try {
    const { data } = await etiquetasApi.getAll()
    allTags.value = data || []
  } catch {}
})

function filterTags() {
  if (!tagSearch.value.trim()) { filteredTags.value = []; return }
  filteredTags.value = allTags.value.filter(
    t => t.nombre.toLowerCase().includes(tagSearch.value.toLowerCase())
      && !selectedTags.value.find(s => (s.id ?? s.nombre) === (t.id ?? t.nombre))
  ).slice(0, 6)
}

function addTag(t) {
  if (!selectedTags.value.find(s => (s.id ?? s.nombre) === (t.id ?? t.nombre))) {
    selectedTags.value.push(t)
  }
  tagSearch.value = ''
  filteredTags.value = []
}

function removeTag(t) {
  selectedTags.value = selectedTags.value.filter(s => (s.id ?? s.nombre) !== (t.id ?? t.nombre))
}

/** Crea la etiqueta en el backend y la agrega a selectedTags */
async function createAndAddTag() {
  const nombre = tagSearch.value.trim()
  if (!nombre) return
  // Si ya existe en allTags, solo agregar
  const existing = allTags.value.find(t => t.nombre.toLowerCase() === nombre.toLowerCase())
  if (existing) { addTag(existing); return }
  try {
    const { data } = await etiquetasApi.create({ nombre })
    allTags.value.push(data)
    addTag(data)
  } catch {
    // Si falla (ej: duplicado en DB), buscamos de nuevo
    try {
      const { data } = await etiquetasApi.getAll()
      allTags.value = data || []
      const found = allTags.value.find(t => t.nombre.toLowerCase() === nombre.toLowerCase())
      if (found) addTag(found)
    } catch {}
  }
}

function handleTagEnter() {
  const nombre = tagSearch.value.trim()
  if (!nombre) return
  const existing = allTags.value.find(t => t.nombre.toLowerCase() === nombre.toLowerCase())
  if (existing) addTag(existing)
  else createAndAddTag()
}

async function handleSubmit() {
  userNotFound.value = false
  error.value = ''
  loading.value = true

  // Crear etiquetas nuevas (sin id) antes de publicar
  const resolvedTags = []
  for (const tag of selectedTags.value) {
    if (tag.id) {
      resolvedTags.push(tag.id)
    } else {
      try {
        const { data } = await etiquetasApi.create({ nombre: tag.nombre })
        resolvedTags.push(data.id)
      } catch {
        const found = allTags.value.find(t => t.nombre.toLowerCase() === tag.nombre.toLowerCase())
        if (found) resolvedTags.push(found.id)
      }
    }
  }

  const payload = {
    titulo:      form.value.titulo,
    descripcion: form.value.descripcion,
    etiquetaIds: resolvedTags,
  }

  try {
    if (tipo.value === 'blog') await blogApi.create(payload)
    else                       await foroApi.create(payload)
    router.push('/')
  } catch (e) {
    const msg = e?.response?.data?.message || ''
    if (e?.response?.status === 404 || msg.toLowerCase().includes('no encontrado')) {
      userNotFound.value = true
    } else {
      error.value = Array.isArray(msg) ? msg.join(', ') : (msg || 'Error al publicar')
    }
  }
  loading.value = false
}
</script>

<style scoped>
.crear-card { max-width: 720px; }
.crear-title { font-size: 22px; font-weight: 800; margin-bottom: 18px; }
.type-tabs { display: flex; gap: 6px; margin-bottom: 24px; }
.type-tab {
  padding: 9px 20px; border-radius: var(--radius-sm);
  border: 1.5px solid var(--border); background: transparent;
  color: var(--text-dim); font-size: 13px; font-weight: 700;
  cursor: pointer; transition: all .15s;
}
.type-tab.active { border-color: var(--pink); color: var(--pink); background: rgba(224,36,94,.08); }
.type-tab:hover { border-color: var(--text-muted); color: var(--text); }
.crear-form { display: flex; flex-direction: column; gap: 20px; }
.char-count { font-size: 11px; color: var(--text-muted); text-align: right; margin-top: 2px; }
.hint-text  { font-size: 11px; color: var(--text-muted); margin-top: 4px; }
.tags-input-wrap {
  display: flex; flex-wrap: wrap; gap: 8px; align-items: center;
  padding: 10px; background: var(--bg-hover); border-radius: var(--radius-sm);
  border: 1.5px solid var(--border); min-height: 46px;
}
.tags-search { position: relative; }
.tags-dropdown {
  position: absolute; top: 32px; left: 0; z-index: 10;
  background: var(--bg-card); border: 1px solid var(--border);
  border-radius: var(--radius-sm); min-width: 200px; overflow: hidden;
}
.tag-option { padding: 8px 14px; font-size: 13px; cursor: pointer; }
.tag-option:hover { background: var(--bg-hover); color: var(--pink); }
.tag-create { color: var(--pink); font-style: italic; border-top: 1px solid var(--border); }
.form-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 4px; }

/* Alertas */
.alert { padding: 12px 16px; border-radius: var(--radius-sm); font-size: 13px; font-weight: 600; margin-bottom: 16px; }
.alert-err  { background: rgba(224,36,94,.15);  color: #e06090; border: 1px solid rgba(224,36,94,.3); }
.alert-warn { background: rgba(255,193,7,.12);  color: #ffc107; border: 1px solid rgba(255,193,7,.3); }
</style>
