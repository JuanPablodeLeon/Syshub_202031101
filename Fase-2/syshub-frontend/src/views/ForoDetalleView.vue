<template>
  <div class="page-layout" :class="{ 'no-sidebar': !auth.isLoggedIn }">
    <NavBar />
    <SideBar v-if="auth.isLoggedIn" />
    <main class="content-area fade-up">
      <div v-if="loading" class="loading-state">Cargando...</div>
      <template v-else-if="pub">
        <!-- Post -->
        <div class="card post-detail">
          <div class="post-meta">
            <span class="tag">💬 Publicacion</span>
            <span class="author">u/{{ pub.creador?.nombre }} {{ pub.creador?.apellidos }}</span>
            <span class="time">· {{ timeAgo(pub.horaCreacion) }}</span>
          </div>
          <h1 class="post-title">{{ pub.titulo }}</h1>
          <p class="post-body">{{ pub.descripcion }}</p>
          <div class="post-tags">
            <span v-for="t in pub.etiquetas" :key="t.id" class="tag">{{ t.nombre }}</span>
          </div>
          <div class="post-actions">
            <div class="vote-wrap">
              <button 
                class="vote-btn" 
                :class="{ 
                  'active-up': pub?.miVoto === 1, 
                  'disabled': auth.isLoggedIn && pub?.miVoto === 1 
                }"
                :disabled="auth.isLoggedIn && pub?.miVoto === 1"
                @click="vote(1)"
              >▲</button>
              <span class="vote-count">{{ pub.cantValoracion }}</span>
              <button 
                class="vote-btn down" 
                :class="{ 
                  'active-down': pub?.miVoto === -1, 
                  'disabled': auth.isLoggedIn && pub?.miVoto === -1 
                }"
                :disabled="auth.isLoggedIn && pub?.miVoto === -1"
                @click="vote(-1)"
              >▼</button>
            </div>
            <span class="comments-count">💬 {{ pub.respuestas?.length ?? 0 }}</span>
          </div>
        </div>

        <!-- Reply form -->
        <div v-if="auth.isLoggedIn" class="card reply-form">
          <p class="reply-title">Agregar comentario</p>
          <textarea v-model="newReply" rows="3" placeholder="Escribe tu respuesta..." maxlength="2000" style="resize:vertical"></textarea>
          <div style="display:flex;justify-content:flex-end;margin-top:10px">
            <button class="btn btn-primary" @click="submitReply(null)" :disabled="!newReply.trim()">
              Comentar
            </button>
          </div>
        </div>
        <div v-else class="card login-prompt">
          <RouterLink to="/login" class="auth-link">Inicia sesión</RouterLink> para comentar.
        </div>

        <!-- Replies thread -->
        <div class="replies-section">
          <p class="replies-heading">Comentarios ({{ pub.respuestas?.length ?? 0 }})</p>
          <ReplyThread
            v-for="r in topReplies"
            :key="r.id"
            :reply="r"
            :logged-in="auth.isLoggedIn"
            @reply="openReplyTo"
          />
        </div>
      </template>
    </main>

    <!-- Inline sub-reply modal -->
    <div v-if="replyingTo" class="reply-overlay" @click.self="replyingTo=null">
      <div class="reply-modal card">
        <p class="reply-title">Responder a <b>{{ replyingTo.creador?.nombre }}</b></p>
        <blockquote class="quote">{{ replyingTo.descripcion.slice(0,100) }}...</blockquote>
        <textarea v-model="subReplyText" rows="3" placeholder="Tu respuesta..." maxlength="2000"></textarea>
        <div class="modal-actions">
          <button class="btn btn-ghost" @click="replyingTo=null">Cancelar</button>
          <button class="btn btn-primary" @click="submitSubReply" :disabled="!subReplyText.trim()">Responder</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { foroApi } from '@/services/api'
import NavBar from '@/components/NavBar.vue'
import SideBar from '@/components/SideBar.vue'
import ReplyThread from '@/components/ReplyThread.vue'

const route   = useRoute()
const router  = useRouter()
const auth    = useAuthStore()
const pub     = ref(null)
const loading = ref(true)
const newReply   = ref('')
const replyingTo = ref(null)
const subReplyText = ref('')

const topReplies = computed(() =>
  (pub.value?.respuestas || []).filter(r => !r.padre)
)

// --- Helpers para localStorage de votos ---
function getUserVotes() {
  try {
    return JSON.parse(localStorage.getItem('syshub_votes') || '{}')
  } catch { return {} }
}

function getUserVote(postId) {
  return getUserVotes()[postId] || 0
}

function setUserVote(postId, valor) {
  const votes = getUserVotes()
  votes[postId] = valor
  localStorage.setItem('syshub_votes', JSON.stringify(votes))
}

async function load() {
  loading.value = true
  try {
    const res = await foroApi.getOne(route.params.id)
    pub.value = res.data
    // Asignar el voto actual desde localStorage (0 si no existe)
    pub.value.miVoto = getUserVote(route.params.id)
  } catch {}
  loading.value = false
}

async function vote(valor) {
  if (!auth.isLoggedIn) return router.push('/login')
  if (pub.value.miVoto === valor) return // Ya votó igual, evitar doble envío

  const { data } = await foroApi.votar(route.params.id, valor)
  pub.value.cantValoracion = data.cantValoracion
  pub.value.miVoto = valor                // actualiza el voto local
  setUserVote(route.params.id, valor)     // persiste en localStorage
}

async function submitReply(padreId) {
  if (!newReply.value.trim()) return
  await foroApi.addRespuesta(route.params.id, { descripcion: newReply.value, padreId })
  newReply.value = ''
  await load()
}

function openReplyTo(reply) { replyingTo.value = reply; subReplyText.value = '' }
async function submitSubReply() {
  await foroApi.addRespuesta(route.params.id, { descripcion: subReplyText.value, padreId: replyingTo.value.id })
  replyingTo.value = null
  await load()
}

function timeAgo(d) {
  if (!d) return ''
  const s = (Date.now() - new Date(d)) / 1000
  if (s < 60) return 'ahora'
  if (s < 3600) return `hace ${Math.floor(s/60)} min`
  if (s < 86400) return `hace ${Math.floor(s/3600)} h`
  return `hace ${Math.floor(s/86400)} días`
}

onMounted(load)
</script>

<style scoped>
/* (todo el CSS se mantiene igual, solo añade/quita estilos de los botones) */
.post-detail { margin-bottom: 16px; }
.post-meta { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--text-muted); margin-bottom: 12px; }
.author { color: var(--blue-lt); font-weight: 600; }
.post-title { font-size: 22px; font-weight: 800; margin-bottom: 12px; line-height: 1.3; }
.post-body { font-size: 15px; line-height: 1.7; color: var(--text-dim); margin-bottom: 14px; white-space: pre-wrap; }
.post-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px; }
.post-actions { display: flex; align-items: center; gap: 14px; }
.vote-wrap { display: flex; align-items: center; gap: 8px; background: var(--bg-hover); border-radius: 100px; padding: 5px 12px; border: 1px solid var(--border); }
.vote-btn { background: none; border: none; color: var(--text-muted); font-size: 13px; cursor: pointer; }
.vote-btn:hover:not(.disabled) { color: var(--pink); }
.vote-btn.down:hover:not(.disabled) { color: var(--blue-lt); }
.vote-btn.active-up { color: var(--pink); }
.vote-btn.active-down { color: var(--blue-lt); }
.vote-btn.disabled { opacity: 0.5; cursor: not-allowed; }
.vote-count { font-size: 14px; font-weight: 700; font-family: var(--font-mono); color: var(--text); min-width: 24px; text-align: center; }
.comments-count { font-size: 13px; color: var(--text-muted); }
.reply-form { margin-bottom: 16px; }
.reply-title { font-size: 13px; font-weight: 700; margin-bottom: 10px; color: var(--text-dim); }
.login-prompt { font-size: 14px; color: var(--text-muted); margin-bottom: 16px; }
.auth-link { color: var(--pink); font-weight: 600; }
.replies-section { margin-top: 8px; }
.replies-heading { font-size: 13px; font-weight: 700; color: var(--text-muted); letter-spacing: .5px; text-transform: uppercase; margin-bottom: 14px; }
.loading-state { text-align: center; padding: 60px 0; color: var(--text-muted); }
/* Sub-reply modal */
.reply-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.6); z-index: 200; display: flex; align-items: center; justify-content: center; }
.reply-modal { width: 100%; max-width: 520px; }
.quote { border-left: 3px solid var(--pink); padding-left: 12px; color: var(--text-muted); font-size: 13px; margin-bottom: 12px; }
.modal-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 12px; }
</style>