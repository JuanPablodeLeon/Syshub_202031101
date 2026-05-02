import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authApi } from '@/services/api'

const ROLES_BLOG = ['admin', 'catedratico', 'auxiliar', 'investigador']

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('syshub_token') || null)
  const user  = ref(JSON.parse(localStorage.getItem('syshub_user') || 'null'))

  const isLoggedIn  = computed(() => !!token.value)
  const rolNombre   = computed(() => user.value?.rol?.nombre || null)
  const canCreateBlog = computed(() => ROLES_BLOG.includes(rolNombre.value))

  async function login(correo, password) {
    const { data } = await authApi.login({ correo, password })
    token.value = data.token
    localStorage.setItem('syshub_token', data.token)
    // decode JWT to get basic info, then fetch profile
    await fetchProfile()
    return data
  }

  async function fetchProfile() {
    try {
      const { data } = await authApi.profile()
      user.value = data
      localStorage.setItem('syshub_user', JSON.stringify(data))
    } catch {
      // token might be expired
    }
  }

  async function register(payload) {
    const { data } = await authApi.register(payload)
    return data
  }

  function logout() {
    token.value = null
    user.value  = null
    localStorage.removeItem('syshub_token')
    localStorage.removeItem('syshub_user')
  }

  return { token, user, isLoggedIn, rolNombre, canCreateBlog, login, logout, register, fetchProfile }
})
