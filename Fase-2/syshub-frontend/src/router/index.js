import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  { path: '/',          name: 'Home',      component: () => import('@/views/HomeView.vue') },
  { path: '/login',     name: 'Login',     component: () => import('@/views/LoginView.vue') },
  { path: '/register',  name: 'Register',  component: () => import('@/views/RegisterView.vue') },
  { path: '/crear',     name: 'Crear',     component: () => import('@/views/CrearView.vue'),    meta: { requiresAuth: true } },
  { path: '/perfil',    name: 'Perfil',    component: () => import('@/views/PerfilView.vue'),   meta: { requiresAuth: true } },
  { path: '/admin',     name: 'Admin',     component: () => import('@/views/AdminView.vue'),    meta: { requiresAuth: true, role: 'admin' } },
  { path: '/foro/:id',  name: 'ForoDetalle', component: () => import('@/views/ForoDetalleView.vue') },
  { path: '/blog/:id',  name: 'BlogDetalle', component: () => import('@/views/BlogDetalleView.vue') },
  { path: '/etiqueta/:id',  name: 'Etiqueta',     component: () => import('@/views/EtiquetaView.vue') },
  { path: '/cursos',        name: 'CursoEspacio', component: () => import('@/views/CursoEspacioView.vue'), meta: { requiresAuth: true } },
  { path: '/interaccion', name: 'Interaccion', component: () => import('@/views/InteraccionView.vue')},
  { path: '/publicacion', name: 'Publicacion', component: () => import('@/views/PublicacionView.vue')},
  { path: '/articulo', name: 'Articulo', component: () => import('@/views/BlogView.vue')},
  { path: '/curso-espacio', name: 'CrusoEspacio', component: () => import('@/views/CursoEspacio.vue')},
  { path: '/ver-curso-espacio', name: 'VerCrusoEspacio', component: () => import('@/views/VerCursosEspacio.vue')},
  { path: '/usuario-manual', name: 'UsuarioManual', component: () => import('@/views/UsuariosView.vue')},
  { path: '/reporte-manual', name: 'ReporteManual', component: () => import('@/views/Reportes.vue')},
  { path: '/carrera-manual', name: 'CarreraManual', component: () => import('@/views/Carreras.vue')},
  { path: '/curso-manual', name: 'CursoManual', component: () => import('@/views/CursosTutorial.vue')},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isLoggedIn) return { name: 'Login' }
  if (to.meta.role && auth.rolNombre !== to.meta.role) return { name: 'Home' }
})

export default router
