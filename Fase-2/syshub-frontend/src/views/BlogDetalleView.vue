<template>
  <div class="page-layout" :class="{ 'no-sidebar': !auth.isLoggedIn }">
    <NavBar />
    <SideBar v-if="auth.isLoggedIn" />
    <main class="content-area fade-up">
      <div v-if="loading" class="loading-state">Cargando...</div>
      <template v-else-if="article">
        <div class="card post-detail">
          <div class="post-meta">
            <span class="tag tag-pink">📝 Blog</span>
            <span class="author">{{ article.creador?.nombre }} {{ article.creador?.apellidos }}</span>
            <span class="time">· {{ timeAgo(article.horaCreacion) }}</span>
          </div>
          <h1 class="post-title">{{ article.titulo }}</h1>
          <div class="post-tags">
            <span v-for="t in article.etiquetas" :key="t.id" class="tag">{{ t.nombre }}</span>
          </div>
          <p class="post-body">{{ article.descripcion }}</p>
          <div class="post-actions">
            <div class="vote-wrap">
              <button class="vote-btn" @click="vote(1)">▲</button>
              <span class="vote-count">{{ article.cantValoracion }}</span>
              <button class="vote-btn down" @click="vote(-1)">▼</button>
            </div>
            <span class="comments-count">💬 {{ article.respuestas?.length ?? 0 }}</span>
          </div>
        </div>

        <div v-if="auth.isLoggedIn" class="card reply-form">
          <p class="reply-title">Agregar comentario</p>
          <textarea v-model="newReply" rows="3" placeholder="Escribe tu comentario..." maxlength="2000" style="resize:vertical"></textarea>
          <div style="display:flex;justify-content:flex-end;margin-top:10px">
            <button class="btn btn-primary" @click="submitReply" :disabled="!newReply.trim()">Comentar</button>
          </div>
        </div>
        <div v-else class="card login-prompt">
          <RouterLink to="/login" class="auth-link">Inicia sesión</RouterLink> para comentar.
        </div>

        <div class="replies-section">
          <p class="replies-heading">Comentarios ({{ article.respuestas?.length ?? 0 }})</p>
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
import { blogApi } from '@/services/api'
import NavBar from '@/components/NavBar.vue'
import SideBar from '@/components/SideBar.vue'
import ReplyThread from '@/components/ReplyThread.vue'

const route   = useRoute()
const router  = useRouter()
const auth    = useAuthStore()
const article = ref(null)
const loading = ref(true)
const newReply    = ref('')
const replyingTo  = ref(null)
const subReplyText = ref('')

const topReplies = computed(() =>
  (article.value?.respuestas || []).filter(r => !r.padre)
)

async function load() {
  loading.value = true
  try {
    article.value = (await blogApi.getOne(route.params.id)).data
    article.value.miVoto = getUserVote(route.params.id)
  } catch {}
  loading.value = false
}

async function vote(valor) {
  if (!auth.isLoggedIn) return router.push('/login')
  if (article.value.miVoto === valor) return  // ya votó igual

  const { data } = await blogApi.votar(route.params.id, valor)
  article.value.cantValoracion = data.cantValoracion
  article.value.miVoto = valor
  setUserVote(route.params.id, valor)
}

async function submitReply() {
  await blogApi.addRespuesta(route.params.id, { descripcion: newReply.value })
  newReply.value = ''
  await load()
}

function openReplyTo(r) { replyingTo.value = r; subReplyText.value = '' }
async function submitSubReply() {
  await blogApi.addRespuesta(route.params.id, { descripcion: subReplyText.value, padreId: replyingTo.value.id })
  replyingTo.value = null
  await load()
}

function getUserVotes() {
  try { return JSON.parse(localStorage.getItem('syshub_votes') || '{}') } catch { return {} }
}

function getUserVote(postId) {
  return getUserVotes()[`blog_${postId}`] || 0
}

function setUserVote(postId, valor) {
  const votes = getUserVotes()
  votes[`blog_${postId}`] = valor
  localStorage.setItem('syshub_votes', JSON.stringify(votes))
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
.post-detail { margin-bottom: 16px; }
.post-meta { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--text-muted); margin-bottom: 12px; }
.author { color: var(--pink); font-weight: 600; }
.post-title { font-size: 24px; font-weight: 800; margin-bottom: 12px; line-height: 1.3; }
.post-body { font-size: 15px; line-height: 1.8; color: var(--text-dim); white-space: pre-wrap; margin-top: 14px; }
.post-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px; }
.post-actions { display: flex; align-items: center; gap: 14px; margin-top: 16px; }
.vote-wrap { display: flex; align-items: center; gap: 8px; background: var(--bg-hover); border-radius: 100px; padding: 5px 12px; border: 1px solid var(--border); }
.vote-btn { background: none; border: none; color: var(--text-muted); font-size: 13px; cursor: pointer; }
.vote-btn:hover { color: var(--pink); }
.vote-btn.down:hover { color: var(--blue-lt); }
.vote-count { font-size: 14px; font-weight: 700; font-family: var(--font-mono); color: var(--text); min-width: 24px; text-align: center; }
.comments-count { font-size: 13px; color: var(--text-muted); }
.reply-form { margin-bottom: 16px; }
.reply-title { font-size: 13px; font-weight: 700; margin-bottom: 10px; color: var(--text-dim); }
.login-prompt { font-size: 14px; color: var(--text-muted); margin-bottom: 16px; }
.auth-link { color: var(--pink); font-weight: 600; }
.replies-section { margin-top: 8px; }
.replies-heading { font-size: 13px; font-weight: 700; color: var(--text-muted); letter-spacing: .5px; text-transform: uppercase; margin-bottom: 14px; }
.loading-state { text-align: center; padding: 60px 0; color: var(--text-muted); }
.reply-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.6); z-index: 200; display: flex; align-items: center; justify-content: center; }
.reply-modal { width: 100%; max-width: 520px; }
.quote { border-left: 3px solid var(--pink); padding-left: 12px; color: var(--text-muted); font-size: 13px; margin-bottom: 12px; }
.modal-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 12px; }
</style>
