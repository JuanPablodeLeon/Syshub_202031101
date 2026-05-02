<template>
  <nav class="navbar">
    <div class="nav-left">
      <RouterLink to="/" class="brand">
        <span class="brand-icon">⬡</span>
        <span class="brand-name">syshub</span>
      </RouterLink>

      <!-- Search -->
      <div class="search-wrap" ref="searchRef">
        <span class="search-icon">🔍</span>
        <input
          v-model="searchQ"
          type="text"
          placeholder="Buscar por etiqueta..."
          class="search-input"
          @input="onSearchInput"
          @focus="showDropdown = true"
          @keydown.escape="closeSearch"
          @keydown.enter.prevent="selectFirst"
          autocomplete="off"
        />
        <button v-if="searchQ" class="search-clear" @click="clearSearch">✕</button>

        <!-- Dropdown de etiquetas -->
        <div v-if="showDropdown && filteredTags.length > 0" class="search-dropdown">
          <div
            v-for="tag in filteredTags"
            :key="tag.id"
            class="search-option"
            @mousedown.prevent="goToTag(tag)"
          >
            <span class="search-option-icon">🏷️</span>
            <span class="search-option-name">{{ tag.nombre }}</span>
          </div>
        </div>
        <div v-else-if="showDropdown && searchQ.trim() && filteredTags.length === 0" class="search-dropdown">
          <div class="search-no-result">Sin resultados para "{{ searchQ }}"</div>
        </div>
      </div>
    </div>

    <div class="nav-right">
      <button class="nav-btn" @click="handleCreate" title="Crear">
        <span class="nav-btn-icon">+</span>
      </button>
      <button class="nav-btn" @click="handlePerfil" title="Perfil">
        <div v-if="auth.isLoggedIn" class="avatar-sm">{{ initials }}</div>
        <span v-else class="nav-btn-icon">👤</span>
      </button>
      <button v-if="auth.isLoggedIn" class="nav-btn logout-btn" @click="auth.logout(); router.push('/')">
        Salir
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { etiquetasApi } from '@/services/api'

const router = useRouter()
const auth   = useAuthStore()

const searchQ      = ref('')
const showDropdown = ref(false)
const allTags      = ref([])
const searchRef    = ref(null)

const initials = computed(() => {
  const u = auth.user
  if (!u) return '?'
  return ((u.nombre?.[0] || '') + (u.apellidos?.[0] || '')).toUpperCase()
})

const filteredTags = computed(() => {
  const q = searchQ.value.trim().toLowerCase()
  if (!q) return allTags.value.slice(0, 8) // mostrar las primeras al abrir
  return allTags.value.filter(t => t.nombre.toLowerCase().includes(q)).slice(0, 8)
})

onMounted(async () => {
  try {
    const { data } = await etiquetasApi.getAll()
    allTags.value = data || []
  } catch {}
  document.addEventListener('click', handleOutsideClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleOutsideClick)
})

function handleOutsideClick(e) {
  if (searchRef.value && !searchRef.value.contains(e.target)) {
    showDropdown.value = false
  }
}

function onSearchInput() {
  showDropdown.value = true
}

function closeSearch() {
  showDropdown.value = false
}

function clearSearch() {
  searchQ.value = ''
  showDropdown.value = false
}

function selectFirst() {
  if (filteredTags.value.length > 0) goToTag(filteredTags.value[0])
}

function goToTag(tag) {
  showDropdown.value = false
  searchQ.value = ''
  router.push(`/etiqueta/${tag.id}`)
}

function handleCreate() {
  if (!auth.isLoggedIn) return router.push('/login')
  router.push('/crear')
}
function handlePerfil() {
  if (!auth.isLoggedIn) return router.push('/login')
  router.push('/perfil')
}
</script>

<style scoped>
.navbar {
  position: sticky; top: 0; z-index: 100;
  grid-column: 1 / -1;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 20px; height: 56px;
  background: rgba(13,13,15,.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}
.nav-left { display: flex; align-items: center; gap: 14px; flex: 1; }
.brand { display: flex; align-items: center; gap: 8px; font-weight: 800; font-size: 18px; white-space: nowrap; }
.brand-icon { font-size: 22px; color: var(--pink); }
.brand-name { color: var(--text); letter-spacing: -0.5px; }

/* Search */
.search-wrap { position: relative; max-width: 380px; width: 100%; }
.search-icon { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); font-size: 13px; color: var(--text-muted); pointer-events: none; }
.search-input { padding-left: 34px; padding-right: 28px; background: var(--bg-hover); border-color: transparent; height: 34px; border-radius: 100px; width: 100%; }
.search-input:focus { border-color: var(--pink); }
.search-clear { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; color: var(--text-muted); font-size: 11px; cursor: pointer; padding: 2px 4px; }
.search-clear:hover { color: var(--pink); }

.search-dropdown {
  position: absolute; top: calc(100% + 6px); left: 0; right: 0; z-index: 200;
  background: var(--bg-card); border: 1px solid var(--border);
  border-radius: var(--radius-sm); overflow: hidden;
  box-shadow: 0 8px 32px rgba(0,0,0,.5);
}
.search-option {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 14px; cursor: pointer; transition: background .12s;
}
.search-option:hover { background: var(--bg-hover); }
.search-option-icon { font-size: 14px; flex-shrink: 0; }
.search-option-name { font-size: 13px; font-weight: 600; color: var(--text); }
.search-no-result { padding: 12px 14px; font-size: 13px; color: var(--text-muted); text-align: center; }

/* Nav right */
.nav-right { display: flex; align-items: center; gap: 8px; }
.nav-btn { width: 36px; height: 36px; border-radius: 50%; background: var(--bg-hover); border: 1px solid var(--border); color: var(--text); font-size: 18px; display: flex; align-items: center; justify-content: center; transition: all .18s; }
.nav-btn:hover { border-color: var(--pink); color: var(--pink); }
.nav-btn-icon { line-height: 1; }
.avatar-sm { width: 28px; height: 28px; border-radius: 50%; background: linear-gradient(135deg, var(--pink), var(--blue-mid)); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: #fff; }
.logout-btn { width: auto; padding: 0 12px; border-radius: 6px; font-size: 12px; font-weight: 700; }
</style>
