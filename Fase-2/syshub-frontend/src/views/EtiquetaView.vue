<template>
  <div class="page-layout" :class="{ 'no-sidebar': !auth.isLoggedIn }">
    <NavBar />
    <SideBar v-if="auth.isLoggedIn" />

    <main class="content-area fade-up">
      <div v-if="loading" class="loading-state">Buscando contenido...</div>

      <template v-else-if="etiqueta">
        <div class="tag-header">
          <span class="tag-badge">🏷️ {{ etiqueta.nombre }}</span>
          <p class="tag-count">
            {{ total }} resultado{{ total !== 1 ? 's' : '' }}
          </p>
        </div>

        <!-- Tabs foro / blog -->
        <div class="tabs">
          <button class="tab-btn" :class="{ active: tab === 'todos' }"  @click="tab = 'todos'">Todos ({{ total }})</button>
          <button class="tab-btn" :class="{ active: tab === 'foro' }"   @click="tab = 'foro'">💬 Foro ({{ foro.length }})</button>
          <button class="tab-btn" :class="{ active: tab === 'blog' }"   @click="tab = 'blog'">📝 Blog ({{ blog.length }})</button>
        </div>

        <div v-if="currentList.length === 0" class="empty-state">
          No hay publicaciones con esta etiqueta todavía.
        </div>

        <div class="feed">
          <PostCard
            v-for="post in currentList"
            :key="post.id + post._tipo"
            :post="post"
            :type="post._tipo"
            @vote="handleVote"
          />
        </div>
      </template>

      <div v-else class="empty-state">Etiqueta no encontrada.</div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { etiquetasApi, foroApi, blogApi } from '@/services/api'
import NavBar   from '@/components/NavBar.vue'
import SideBar  from '@/components/SideBar.vue'
import PostCard from '@/components/PostCard.vue'

const route = useRoute()
const auth  = useAuthStore()

const loading  = ref(true)
const etiqueta = ref(null)
const foro     = ref([])
const blog     = ref([])
const tab      = ref('todos')

const total = computed(() => foro.value.length + blog.value.length)

const currentList = computed(() => {
  const f = foro.value.map(p => ({ ...p, _tipo: 'foro' }))
  const b = blog.value.map(p => ({ ...p, _tipo: 'blog' }))
  if (tab.value === 'foro') return f
  if (tab.value === 'blog') return b
  return [...f, ...b].sort((a, b) =>
    new Date(b.horaCreacion) - new Date(a.horaCreacion)
  )
})

async function load(id) {
  loading.value = true
  etiqueta.value = null; foro.value = []; blog.value = []
  try {
    const { data } = await etiquetasApi.getContenido(id)
    etiqueta.value = data.etiqueta
    foro.value     = data.foro  || []
    blog.value     = data.blog  || []
  } catch {}
  loading.value = false
}

async function handleVote(id, valor) {
  if (!auth.isLoggedIn) return
  const inForo = foro.value.some(p => p.id === id)
  if (inForo) {
    const { data } = await foroApi.votar(id, valor)
    const idx = foro.value.findIndex(p => p.id === id)
    if (idx !== -1) foro.value[idx] = { ...data, _tipo: 'foro' }
  } else {
    const { data } = await blogApi.votar(id, valor)
    const idx = blog.value.findIndex(p => p.id === id)
    if (idx !== -1) blog.value[idx] = { ...data, _tipo: 'blog' }
  }
}

onMounted(() => load(route.params.id))
watch(() => route.params.id, (id) => id && load(id))
</script>

<style scoped>
.tag-header { display: flex; align-items: center; gap: 14px; margin-bottom: 18px; flex-wrap: wrap; }
.tag-badge {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 16px; border-radius: 100px;
  background: rgba(224,36,94,.1); border: 1.5px solid rgba(224,36,94,.3);
  color: var(--pink); font-size: 18px; font-weight: 700;
}
.tag-count { font-size: 14px; color: var(--text-muted); }
.tabs { display: flex; gap: 4px; margin-bottom: 18px; border-bottom: 1px solid var(--border); }
.tab-btn { padding: 9px 16px; background: none; border: none; color: var(--text-muted); font-size: 13px; font-weight: 700; border-bottom: 2px solid transparent; margin-bottom: -1px; transition: all .18s; cursor: pointer; }
.tab-btn.active { color: var(--pink); border-bottom-color: var(--pink); }
.tab-btn:hover { color: var(--text); }
.feed { display: flex; flex-direction: column; gap: 12px; }
.loading-state, .empty-state { text-align: center; color: var(--text-muted); padding: 60px 0; font-size: 14px; }
</style>
