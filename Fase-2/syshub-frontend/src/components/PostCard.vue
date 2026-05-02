<template>
  <div class="post-card-wrapper">
    <RouterLink :to="detailRoute" class="post-card card fade-up">
      <div class="post-meta">
        <span class="post-type" :class="type === 'blog' ? 'tag-pink' : ''">
          {{ type === 'blog' ? '📝 Blog' : '💬 Publicacion' }}
        </span>
        <span class="post-author">u/{{ post.creador?.nombre }} {{ post.creador?.apellidos }}</span>
        <span class="post-time">· {{ timeAgo(post.horaCreacion || post.hora_creacion) }}</span>
      </div>

      <h3 class="post-title">{{ post.titulo }}</h3>
      <p class="post-desc">{{ truncate(post.descripcion, 180) }}</p>

      <div class="post-tags">
        <span v-for="tag in post.etiquetas?.slice(0, 4)" :key="tag.id" class="tag">
          {{ tag.nombre }}
        </span>
      </div>

      <div class="post-footer">
        <div class="vote-wrap">
          <button class="vote-btn" @click.prevent="emit('vote', post.id, 1)">▲</button>
          <span class="vote-count">{{ post.cantValoracion }}</span>
          <button class="vote-btn down" @click.prevent="emit('vote', post.id, -1)">▼</button>
        </div>
        <span class="post-comments">💬 {{ post.respuestas?.length ?? 0 }} comentarios</span>

        <!-- Botón reportar (solo logueados) -->
        <button
          v-if="auth.isLoggedIn"
          class="report-btn"
          :class="{ reported: reportSent }"
          @click.prevent="openReport"
          :title="reportSent ? 'Reportado' : 'Reportar publicación'"
        >
          🚩 {{ reportSent ? 'Reportado' : 'Reportar' }}
        </button>
      </div>
    </RouterLink>

    <!-- Modal reporte -->
    <div v-if="showReportModal" class="reply-overlay" @click.self="showReportModal = false">
      <div class="reply-modal card" @click.stop>
        <h3 class="modal-title">🚩 Reportar publicación</h3>
        <p class="modal-sub">Cuéntanos el motivo del reporte</p>
        <textarea
          v-model="reportMotivo"
          rows="4"
          placeholder="Describe el problema con esta publicación..."
          maxlength="500"
          style="resize:vertical; width:100%"
        ></textarea>
        <p class="char-hint">{{ reportMotivo.length }}/500</p>
        <p v-if="reportError" class="error-msg">{{ reportError }}</p>
        <div class="modal-actions">
          <button class="btn btn-ghost" @click="showReportModal = false">Cancelar</button>
          <button class="btn btn-primary" @click="submitReport" :disabled="!reportMotivo.trim() || reportLoading">
            {{ reportLoading ? 'Enviando...' : 'Enviar reporte' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { reportesApi } from '@/services/api'

const props = defineProps({ post: Object, type: String })
const emit  = defineEmits(['vote'])
const auth  = useAuthStore()

const detailRoute = props.type === 'blog'
  ? `/blog/${props.post.id}`
  : `/foro/${props.post.id}`

// ── Reporte ───────────────────────────────────────────────────
const showReportModal = ref(false)
const reportMotivo    = ref('')
const reportError     = ref('')
const reportLoading   = ref(false)
const reportSent      = ref(false)

function openReport() {
  if (!auth.isLoggedIn) return
  reportMotivo.value = ''
  reportError.value  = ''
  showReportModal.value = true
}

async function submitReport() {
  if (!reportMotivo.value.trim()) return
  reportLoading.value = true; reportError.value = ''
  try {
    await reportesApi.create({
      tipo:         props.type === 'blog' ? 'blog' : 'foro',
      referenciaId: props.post.id,
      motivo:       reportMotivo.value.trim(),
    })
    reportSent.value      = true
    showReportModal.value = false
  } catch (e) {
    reportError.value = e?.response?.data?.message || 'Error al enviar reporte'
  }
  reportLoading.value = false
}

// ── Helpers ───────────────────────────────────────────────────
function truncate(str, n) { return str?.length > n ? str.slice(0, n) + '…' : str }

function timeAgo(dateStr) {
  if (!dateStr) return ''
  const diff = (Date.now() - new Date(dateStr)) / 1000
  if (diff < 60)    return 'ahora'
  if (diff < 3600)  return `hace ${Math.floor(diff / 60)} min`
  if (diff < 86400) return `hace ${Math.floor(diff / 3600)} h`
  return `hace ${Math.floor(diff / 86400)} días`
}
</script>

<style scoped>
.post-card-wrapper { position: relative; }
.post-card { display: flex; flex-direction: column; gap: 10px; transition: border-color .18s, transform .18s; }
.post-card:hover { border-color: var(--pink); transform: translateY(-2px); }
.post-meta { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--text-muted); flex-wrap: wrap; }
.post-type { font-size: 11px; padding: 2px 8px; border-radius: 100px; background: var(--blue); color: var(--blue-lt); }
.post-author { color: var(--blue-lt); font-weight: 600; }
.post-title { font-size: 17px; font-weight: 700; color: var(--text); line-height: 1.3; }
.post-desc { font-size: 13px; color: var(--text-dim); line-height: 1.5; }
.post-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.post-footer { display: flex; align-items: center; gap: 16px; margin-top: 4px; flex-wrap: wrap; }
.vote-wrap { display: flex; align-items: center; gap: 6px; background: var(--bg-hover); border-radius: 100px; padding: 4px 10px; border: 1px solid var(--border); }
.vote-btn { background: none; border: none; color: var(--text-muted); font-size: 12px; cursor: pointer; line-height: 1; transition: color .15s; }
.vote-btn:hover { color: var(--pink); }
.vote-btn.down:hover { color: var(--blue-lt); }
.vote-count { font-size: 13px; font-weight: 700; color: var(--text); font-family: var(--font-mono); min-width: 20px; text-align: center; }
.post-comments { font-size: 12px; color: var(--text-muted); display: flex; align-items: center; gap: 4px; }

/* Botón reporte */
.report-btn {
  margin-left: auto; font-size: 11px; font-weight: 600;
  background: none; border: 1px solid var(--border);
  border-radius: 100px; padding: 3px 10px;
  color: var(--text-muted); cursor: pointer; transition: all .15s;
}
.report-btn:hover { border-color: #ffc107; color: #ffc107; }
.report-btn.reported { color: var(--pink); border-color: var(--pink); }

/* Modal */
.reply-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.6); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 20px; }
.reply-modal { width: 100%; max-width: 460px; display: flex; flex-direction: column; gap: 10px; }
.modal-title { font-size: 16px; font-weight: 800; }
.modal-sub   { font-size: 13px; color: var(--text-muted); }
.char-hint   { font-size: 11px; color: var(--text-muted); text-align: right; margin-top: -6px; }
.modal-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 6px; }
</style>
