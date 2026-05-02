<template>
  <div class="auth-page">
    <div class="auth-split">
      <div class="auth-brand">
        <div class="brand-glow"></div>
        <div class="brand-content">
          <div class="big-icon">⬡</div>
          <h1 class="brand-title">syshub</h1>
          <p class="brand-sub">Únete a la comunidad académica</p>
        </div>
        <p class="brand-footer">CUNOC · USAC · 2026</p>
      </div>

      <div class="auth-form-wrap fade-up">
        <h2 class="form-title">Crear cuenta</h2>
        <p class="form-sub">Completa tu información</p>

        <form @submit.prevent="handleRegister" class="auth-form">
          <div class="form-row">
            <div class="form-group">
              <label>Nombre *</label>
              <input v-model="form.nombre" type="text" placeholder="Juan" required />
            </div>
            <div class="form-group">
              <label>Apellidos *</label>
              <input v-model="form.apellidos" type="text" placeholder="Pérez" required />
            </div>
          </div>

          <div class="form-group">
            <label>Correo *</label>
            <input v-model="form.correo" type="email" placeholder="tu@correo.com" required />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Contraseña *</label>
              <input v-model="form.password" type="password" placeholder="••••••••" required minlength="8" />
            </div>
            <div class="form-group">
              <label>Confirmar *</label>
              <input v-model="confirm" type="password" placeholder="••••••••" required />
            </div>
          </div>

          <div class="form-group">
            <label>Carreras</label>
            <div v-if="loadingCarreras" class="muted-text">Cargando carreras...</div>
            <div v-else class="carreras-grid">
              <label
                v-for="c in carreras"
                :key="c.id"
                class="carrera-chip"
                :class="{ selected: form.carrerasIds.includes(c.id) }"
              >
                <input type="checkbox" :value="c.id" v-model="form.carrerasIds" style="display:none" />
                {{ c.nombre }}
              </label>
            </div>
          </div>

          <div class="form-group">
            <label>Descripción</label>
            <textarea v-model="form.description" placeholder="Cuéntanos sobre ti..." rows="2" style="resize:vertical"></textarea>
          </div>

          <p v-if="error" class="error-msg">{{ error }}</p>
          <p v-if="success" class="success-msg">¡Cuenta creada! Redirigiendo...</p>

          <button type="submit" class="btn btn-primary submit-btn" :disabled="loading">
            {{ loading ? 'Creando cuenta...' : 'Crear Cuenta' }}
          </button>
        </form>

        <div class="auth-links">
          <span class="muted-text">¿Ya tienes cuenta?</span>
          <RouterLink to="/login" class="auth-link">Iniciar sesión</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { carrerasApi } from '@/services/api'

const router = useRouter()
const auth   = useAuthStore()

const form = ref({ nombre:'', apellidos:'', correo:'', password:'', description:'', carrerasIds:[] })
const confirm       = ref('')
const carreras      = ref([])
const loadingCarreras = ref(true)
const loading = ref(false)
const error   = ref('')
const success = ref(false)

onMounted(async () => {
  try { const { data } = await carrerasApi.getAll(); carreras.value = data || [] }
  catch { /* ignore */ }
  loadingCarreras.value = false
})

async function handleRegister() {
  error.value = ''
  if (form.value.password !== confirm.value) { error.value = 'Las contraseñas no coinciden'; return }
  loading.value = true
  try {
    await auth.register(form.value)
    success.value = true
    setTimeout(() => router.push('/login'), 1200)
  } catch (e) {
    error.value = e?.response?.data?.message || 'Error al crear la cuenta'
  }
  loading.value = false
}
</script>

<style scoped>
.auth-page { min-height: 100vh; display: flex; }
.auth-split { display: grid; grid-template-columns: 1fr 1.4fr; width: 100%; }
.auth-brand {
  position: relative; overflow: hidden;
  background: linear-gradient(145deg, #0d0d0f, var(--blue) 60%, var(--pink-dim) 100%);
  display: flex; flex-direction: column; justify-content: space-between; padding: 48px 40px;
}
.brand-glow {
  position: absolute; width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(224,36,94,.3), transparent 70%);
  top: 50%; left: 50%; transform: translate(-50%,-50%); pointer-events: none;
}
.brand-content { position: relative; z-index: 1; }
.big-icon { font-size: 64px; }
.brand-title { font-size: 52px; font-weight: 800; color: #fff; letter-spacing: -2px; }
.brand-sub { color: rgba(255,255,255,.65); font-size: 16px; margin: 8px 0; }
.brand-footer { color: rgba(255,255,255,.35); font-size: 12px; font-family: var(--font-mono); }
.auth-form-wrap {
  display: flex; flex-direction: column; justify-content: center;
  padding: 48px 56px; background: var(--bg-card); overflow-y: auto;
}
.form-title { font-size: 28px; font-weight: 800; margin-bottom: 4px; }
.form-sub { color: var(--text-muted); font-size: 14px; margin-bottom: 28px; }
.auth-form { display: flex; flex-direction: column; gap: 16px; }
.carreras-grid { display: flex; flex-wrap: wrap; gap: 8px; }
.carrera-chip {
  padding: 6px 14px; border-radius: 100px; cursor: pointer;
  border: 1.5px solid var(--border); font-size: 12px; font-weight: 600;
  color: var(--text-dim); transition: all .15s; user-select: none;
}
.carrera-chip.selected { border-color: var(--pink); color: var(--pink); background: rgba(224,36,94,.08); }
.carrera-chip:hover { border-color: var(--text-muted); }
.submit-btn { width: 100%; justify-content: center; padding: 13px; font-size: 14px; margin-top: 4px; }
.auth-links { display: flex; align-items: center; gap: 8px; margin-top: 16px; font-size: 13px; }
.auth-link { color: var(--pink); font-weight: 600; }
.muted-text { color: var(--text-muted); font-size: 13px; }
.success-msg { color: #4caf50; font-size: 13px; }
@media (max-width: 768px) {
  .auth-split { grid-template-columns: 1fr; }
  .auth-brand { display: none; }
  .auth-form-wrap { padding: 32px 24px; }
}
</style>
