<template>
  <div class="auth-page">
    <div class="auth-split">
      <!-- Left branding -->
      <div class="auth-brand">
        <div class="brand-glow"></div>
        <div class="brand-content">
          <div class="big-icon">⬡</div>
          <h1 class="brand-title">syshub</h1>
          <p class="brand-sub">Ecosistema de conocimiento académico</p>
          <div class="brand-badges">
            <span class="badge">Proyectos</span>
            <span class="badge">Foros</span>
            <span class="badge">Artículos</span>
          </div>
        </div>
        <p class="brand-footer">CUNOC · USAC · 2026</p>
      </div>

      <!-- Right form -->
      <div class="auth-form-wrap fade-up">
        <h2 class="form-title">Iniciar sesión</h2>
        <p class="form-sub">Bienvenido de nuevo</p>

        <form @submit.prevent="handleLogin" class="auth-form">
          <div class="form-group">
            <label>Correo</label>
            <input v-model="correo" type="email" placeholder="tu@correo.com" required />
          </div>
          <div class="form-group">
            <label>Contraseña</label>
            <input v-model="password" type="password" placeholder="••••••••" required />
          </div>

          <p v-if="error" class="error-msg">{{ error }}</p>

          <button type="submit" class="btn btn-primary submit-btn" :disabled="loading">
            {{ loading ? 'Ingresando...' : 'Iniciar sesión' }}
          </button>
        </form>

        <div class="auth-links">
          <RouterLink to="/register" class="auth-link">Registrarse</RouterLink>
          <span class="sep">·</span>
          <a href="#" class="auth-link">Recuperar contraseña</a>
        </div>

        <p class="cics-tag"><a href="https://cics.cunoc.edu.gt/estudiantes/">CicsApp</a></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth   = useAuthStore()
const correo   = ref('')
const password = ref('')
const error    = ref('')
const loading  = ref(false)

async function handleLogin() {
  error.value   = ''
  loading.value = true
  try {
    await auth.login(correo.value, password.value)
    router.push('/')
  } catch (e) {
    error.value = e?.response?.data?.message || 'Credenciales incorrectas'
  }
  loading.value = false
}
</script>

<style scoped>
.auth-page { min-height: 100vh; display: flex; align-items: stretch; }
.auth-split { display: grid; grid-template-columns: 1fr 1fr; width: 100%; }

/* Brand left */
.auth-brand {
  position: relative; overflow: hidden;
  background: linear-gradient(145deg, #0d0d0f 0%, var(--blue) 60%, var(--pink-dim) 100%);
  display: flex; flex-direction: column; justify-content: space-between;
  padding: 48px 40px;
}
.brand-glow {
  position: absolute; width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(224,36,94,.3) 0%, transparent 70%);
  top: 50%; left: 50%; transform: translate(-50%,-50%);
  pointer-events: none;
}
.brand-content { position: relative; z-index: 1; }
.big-icon { font-size: 64px; margin-bottom: 12px; }
.brand-title { font-size: 52px; font-weight: 800; color: #fff; letter-spacing: -2px; }
.brand-sub { color: rgba(255,255,255,.65); font-size: 16px; margin: 8px 0 28px; }
.brand-badges { display: flex; flex-wrap: wrap; gap: 8px; }
.badge { padding: 5px 14px; border-radius: 100px; background: rgba(255,255,255,.12); color: rgba(255,255,255,.8); font-size: 12px; font-weight: 700; }
.brand-footer { color: rgba(255,255,255,.35); font-size: 12px; font-family: var(--font-mono); }

/* Form right */
.auth-form-wrap {
  display: flex; flex-direction: column; justify-content: center;
  padding: 64px 56px; background: var(--bg-card);
}
.form-title { font-size: 28px; font-weight: 800; margin-bottom: 4px; }
.form-sub { color: var(--text-muted); font-size: 14px; margin-bottom: 32px; }
.auth-form { display: flex; flex-direction: column; gap: 18px; }
.submit-btn { width: 100%; justify-content: center; padding: 13px; font-size: 14px; margin-top: 6px; }
.auth-links { display: flex; align-items: center; gap: 8px; margin-top: 20px; font-size: 13px; }
.auth-link { color: var(--pink); font-weight: 600; }
.auth-link:hover { text-decoration: underline; }
.sep { color: var(--text-muted); }
.cics-tag { margin-top: auto; padding-top: 40px; color: var(--text-muted); font-size: 11px; font-family: var(--font-mono); text-align: right; }

@media (max-width: 768px) {
  .auth-split { grid-template-columns: 1fr; }
  .auth-brand { display: none; }
  .auth-form-wrap { padding: 40px 28px; }
}
</style>
