<template>
  <div class="page-layout" :class="{ 'no-sidebar': !auth.isLoggedIn }">
    <NavBar />
    <SideBar v-if="auth.isLoggedIn" />

    <main class="content-area fade-up">
      <!-- Create box (only if logged in) -->
      <div v-if="auth.isLoggedIn" class="create-box card" @click="router.push('/crear')">
        <div class="avatar">{{ initials }}</div>
        <div class="create-placeholder">Crear publicación</div>
        <div class="create-icons">
          <span>📄 Texto</span>
        </div>
      </div>

      <!-- Tabs -->
      <div class="tabs">
        <button
          v-for="tab in tabs" :key="tab.key"
          class="tab-btn"
          :class="{ active: activeTab === tab.key }"
          @click="activeTab = tab.key"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- ═══ CURSOS DISPONIBLES (solo visualización) ═══════════════ -->
      <div v-if="activeTab === 'cursos'">
        <div v-if="loading" class="loading-state">Cargando cursos...</div>
        <div v-else-if="cursosData.length === 0" class="empty-state">
          No hay cursos disponibles en este momento.
        </div>
        <div v-else class="items-grid">
          <div v-for="c in cursosData" :key="c.id" class="item-card card">
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

      <!-- ═══ CARRERAS DISPONIBLES (solo visualización) ═══════════════ -->
      <div v-if="activeTab === 'carreras'">
        <div v-if="loading" class="loading-state">Cargando Carreras...</div>
        <div v-else-if="carrerasData.length === 0" class = "empty-state">
          No hay carreras disponibles en este momento.
        </div>
        <div v-else class="items-grid">
          <div v-for="c in carrerasData" :key="c.id" class="item-card card">
            <div class="item-head">
              <span class="item-nameCurso">🎓 {{ c.nombre }}</span>
              <span class="tag">ID: {{ c.id }}</span>
            </div>
            <p v-if="c.descripcion" class="item-desc">{{ c.descripcion }}</p>
          </div>
        </div>
      </div>

      <!-- Feed -->
      <template v-if="activeTab !== 'cursos' && activeTab !== 'carreras'">
      <div v-if="loading" class="loading-state">Cargando...</div>

      <div v-else class="feed">
        <PostCard
          v-for="post in currentPosts"
          :key="post.id + activeTab"
          :post="post"
          :type="activeTab === 'blog' ? 'blog' : 'foro'"
          @vote="handleVote"
        />
        <div v-if="currentPosts.length === 0" class="empty-state">
          No hay publicaciones aún. ¡Sé el primero!
        </div>
      </div>
      </template>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { foroApi, blogApi, cursosDisponiblesApi, carrerasApi } from '@/services/api'
import NavBar from '@/components/NavBar.vue'
import SideBar from '@/components/SideBar.vue'
import PostCard from '@/components/PostCard.vue'

const router  = useRouter()
const auth    = useAuthStore()
const loading = ref(true)
const foroData = ref([])
const blogData = ref([])
const cursosData = ref([])
const carrerasData = ref([])

const tabs = [
  { key: 'todos',  label: 'Todos' },
  { key: 'foro',   label: '💬 Publicaciones' },
  { key: 'blog',   label: '📝 Blog / Artículos' },
  { key: 'cursos', label: '📚 Cursos' },
  { key: 'carreras', label: '🎓 Carreras'}
]
const activeTab = ref('todos')

const currentPosts = computed(() => {
  if (activeTab.value === 'foro') return foroData.value
  if (activeTab.value === 'blog') return blogData.value
  // Todos: mezclar por fecha
  return [...foroData.value.map(p => ({...p, _type:'foro'})),
          ...blogData.value.map(p => ({...p, _type:'blog'}))]
    .sort((a,b) => new Date(b.horaCreacion||b.hora_creacion) - new Date(a.horaCreacion||a.hora_creacion))
})

const initials = computed(() => {
  const u = auth.user
  if (!u) return '?'
  return ((u.nombre?.[0]||'') + (u.apellidos?.[0]||'')).toUpperCase()
})

async function loadData() {
  loading.value = true
  try {
    const [fRes, bRes, cRes, carrerasRes] = await Promise.all([foroApi.getAll(), blogApi.getAll(), cursosDisponiblesApi.getAll(), carrerasApi.getAll()])
    foroData.value = (fRes.data || []).map(p => ({...p, miVoto: getUserVote('foro', p.id)}))
    blogData.value = (bRes.data || []).map(p => ({...p, miVoto: getUserVote('blog', p.id)}))
    cursosData.value = (cRes.data || []).map(p => ({...p, miVoto: getUserVote('cursos', p.id)}))
    carrerasData.value = (carrerasRes.data || []).map(p => ({...p, miVoto: getUserVote('carreras', p.id)}))
  } catch { /* silenciar */ }
  loading.value = false
}

function getVoteKey(type, id) {
  return `${type}_${id}`
}

function getUserVotes() {
  try { return JSON.parse(localStorage.getItem('syshub_votes') || '{}') } catch { return {} }
}

function getUserVote(type, id) {
  return getUserVotes()[getVoteKey(type, id)] || 0
}

function setUserVote(type, id, valor) {
  const votes = getUserVotes()
  votes[getVoteKey(type, id)] = valor
  localStorage.setItem('syshub_votes', JSON.stringify(votes))
}

async function handleVote(id, valor) {
  if (!auth.isLoggedIn) return router.push('/login')

  // 1. Buscar el post y determinar su tipo
  let post = null, type = ''
  if (activeTab.value === 'foro' || activeTab.value === 'todos') {
    post = foroData.value.find(p => p.id === id)
    if (post) type = 'foro'
  }
  if (!post && (activeTab.value === 'blog' || activeTab.value === 'todos')) {
    post = blogData.value.find(p => p.id === id)
    if (post) type = 'blog'
  }
  if (!post && activeTab.value === 'cursos') {
    post = cursosData.value.find(p => p.id === id)
    if (post) type = 'cursos'
  }
  if (!post && activeTab.value === 'carreras') {
    post = carrerasData.value.find(p => p.id === id)
    if (post) type = 'carreras'
  }
  if (!post) return

  // 2. Evitar voto duplicado
  const votoActual = getUserVote(type, id)
  if (votoActual === valor) return

  // 3. Ejecutar voto en la API correspondiente
  let response
  if (type === 'foro') response = await foroApi.votar(id, valor)
  else if (type === 'blog') response = await blogApi.votar(id, valor)
  else if (type === 'cursos') response = await cursosDisponiblesApi.votar(id, valor)
  else if (type === 'carreras') response = await carrerasApi.votar(id, valor)

  if (response) {
    post.cantValoracion = response.data.cantValoracion
    post.miVoto = valor
    setUserVote(type, id, valor)
  }
}

onMounted(loadData)
</script>

<style scoped>
.create-box {
  display: flex; align-items: center; gap: 12px;
  cursor: pointer; transition: border-color .18s;
  margin-bottom: 18px;
}
.create-box:hover { border-color: var(--pink); }
.create-placeholder {
  flex: 1; padding: 10px 14px;
  background: var(--bg-hover); border-radius: var(--radius-sm);
  color: var(--text-muted); font-size: 14px;
}
.create-icons { display: flex; gap: 10px; }
.create-icons span { font-size: 12px; color: var(--text-muted); cursor: pointer; padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border); }
.create-icons span:hover { border-color: var(--pink); color: var(--pink); }

.tabs { display: flex; gap: 4px; margin-bottom: 18px; border-bottom: 1px solid var(--border); padding-bottom: 0; }
.tab-btn {
  padding: 10px 18px; background: none; border: none;
  color: var(--text-muted); font-size: 13px; font-weight: 700;
  border-bottom: 2px solid transparent; margin-bottom: -1px;
  transition: all .18s; cursor: pointer;
}
.tab-btn.active { color: var(--pink); border-bottom-color: var(--pink); }
.tab-btn:hover { color: var(--text); }

.feed { display: flex; flex-direction: column; gap: 12px; }
.loading-state, .empty-state { text-align: center; color: var(--text-muted); padding: 60px 0; font-size: 14px; }
/* ── Estilos para la cuadrícula de cursos ── */
.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 12px;
}
.item-card {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.item-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}
.item-name {
  font-weight: 700;
  font-size: 15px;
}
.item-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
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
.tag-blue {
  background: rgba(0, 122, 255, 0.1);
  color: #007aff;
  border-color: rgba(0, 122, 255, 0.3);
}
.tag-pink {
  background: rgba(224, 36, 94, 0.08);
  color: var(--pink);
  border-color: rgba(224, 36, 94, 0.3);
}
</style>
