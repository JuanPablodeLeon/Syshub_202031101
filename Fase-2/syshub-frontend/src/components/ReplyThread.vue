<template>
  <div class="reply-thread">
    <div class="reply-item">
      <div class="reply-avatar avatar">
        {{ initials(reply.creador) }}
      </div>
      <div class="reply-body">
        <div class="reply-meta">
          <span class="reply-author">{{ reply.creador?.nombre }} {{ reply.creador?.apellidos }}</span>
          <span class="reply-time">· {{ timeAgo(reply.creadoEn) }}</span>
          <span class="reply-votes">▲ {{ reply.cantValoracion }}</span>
        </div>
        <p class="reply-text">{{ reply.descripcion }}</p>
        <div class="reply-actions">
          <button class="reply-btn" v-if="loggedIn" @click="emit('reply', reply)">↩ Responder</button>
        </div>

        <!-- Nested sub-replies -->
        <div v-if="reply.subRespuestas?.length" class="sub-replies">
          <ReplyThread
            v-for="sub in reply.subRespuestas"
            :key="sub.id"
            :reply="sub"
            :logged-in="loggedIn"
            @reply="emit('reply', $event)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ reply: Object, loggedIn: Boolean })
const emit  = defineEmits(['reply'])

function initials(u) {
  if (!u) return '?'
  return ((u.nombre?.[0]||'') + (u.apellidos?.[0]||'')).toUpperCase()
}
function timeAgo(d) {
  if (!d) return ''
  const s = (Date.now() - new Date(d)) / 1000
  if (s < 60) return 'ahora'
  if (s < 3600) return `hace ${Math.floor(s/60)} min`
  if (s < 86400) return `hace ${Math.floor(s/3600)} h`
  return `hace ${Math.floor(s/86400)} días`
}
</script>

<style scoped>
.reply-thread { padding-left: 0; }
.reply-item { display: flex; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--border); }
.reply-item:last-child { border-bottom: none; }
.reply-body { flex: 1; }
.reply-meta { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
.reply-author { font-size: 13px; font-weight: 700; color: var(--blue-lt); }
.reply-time { font-size: 11px; color: var(--text-muted); }
.reply-votes { font-size: 11px; color: var(--text-muted); margin-left: auto; font-family: var(--font-mono); }
.reply-text { font-size: 14px; color: var(--text-dim); line-height: 1.6; white-space: pre-wrap; }
.reply-actions { margin-top: 6px; }
.reply-btn { background: none; border: none; font-size: 12px; color: var(--text-muted); cursor: pointer; padding: 4px 8px; border-radius: 4px; transition: color .15s; }
.reply-btn:hover { color: var(--pink); }
.sub-replies { margin-top: 8px; border-left: 2px solid var(--border); padding-left: 16px; }
</style>
