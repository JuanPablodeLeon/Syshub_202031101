import axios from 'axios'

const api = axios.create({
  baseURL: '/api/v1',
  headers: { 'Content-Type': 'application/json' },
})

// Attach JWT token on every request if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('syshub_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})


// ── Auth ─────────────────────────────────────────────────────
export const authApi = {
  login:    (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  profile:  ()     => api.get('/auth/profile'),
}

// ── Publicaciones Foro ────────────────────────────────────────
export const foroApi = {
  getAll:          ()          => api.get('/publicaciones-foro'),
  getOne:          (id)        => api.get(`/publicaciones-foro/${id}`),
  create:          (data)      => api.post('/publicaciones-foro', data),
  votar:           (id, valor) => api.patch(`/publicaciones-foro/${id}/votar`, { valor }),
  addRespuesta:    (id, data)  => api.post(`/publicaciones-foro/${id}/respuestas`, data),
  update:          (id, data)  => api.patch(`/publicaciones-foro/${id}`, data),
  remove:          (id)        => api.delete(`/publicaciones-foro/${id}`),
}

// ── Blog Artículos ────────────────────────────────────────────
export const blogApi = {
  getAll:          ()          => api.get('/blog-articulos'),
  getOne:          (id)        => api.get(`/blog-articulos/${id}`),
  create:          (data)      => api.post('/blog-articulos', data),
  votar:           (id, valor) => api.patch(`/blog-articulos/${id}/votar`, { valor }),
  addRespuesta:    (id, data)  => api.post(`/blog-articulos/${id}/respuestas`, data),
  update:          (id, data)  => api.patch(`/blog-articulos/${id}`, data),
  remove:          (id)        => api.delete(`/blog-articulos/${id}`),
}

// ── Carreras ──────────────────────────────────────────────────
export const carrerasApi = {
  getAll:  ()         => api.get('/carreras'),
  create:  (data)     => api.post('/carreras', data),
  update:  (id, data) => api.patch(`/carreras/${id}`, data),
  remove:  (id)       => api.delete(`/carreras/${id}`),
}

// ── Cursos Disponibles ────────────────────────────────────────
export const cursosDisponiblesApi = {
  getAll:  ()         => api.get('/cursos-disponibles'),
  create:  (data)     => api.post('/cursos-disponibles', data),
  update:  (id, data) => api.patch(`/cursos-disponibles/${id}`, data),
  remove:  (id)       => api.delete(`/cursos-disponibles/${id}`),
}

// ── Etiquetas ─────────────────────────────────────────────────
export const etiquetasApi = {
  getAll:  () => api.get('/etiquetas'),
  create:  (data) => api.post('/etiquetas', data),
  getContenido: (id) => api.get(`/etiquetas/${id}/contenido`)
}

// ── Usuarios (admin) ──────────────────────────────────────────
export const usuariosApi = {
  getAll:          ()         => api.get('/usuarios'),
  getOne:          (id)       => api.get(`/usuarios/${id}`),
  getByRol:        (rolNombre)   => api.get(`/usuarios/rol/${rolNombre}`),
  update:          (id, data) => api.patch(`/usuarios/${id}`, data),
  remove:          (id)       => api.delete(`/usuarios/${id}`),
  getActividades:  (id)          => api.get(`/usuarios/${id}/actividades`),
}

// Actividades
export const actividadesApi = {
  getByUsuario: (id) => api.get(`/actividades/usuario/${id}`),
}

// ── Reportes ──────────────────────────────────────────────────
export const reportesApi = {
  getAll:        ()                   => api.get('/reportes'),
  create:        (data)               => api.post('/reportes', data),
  updateEstado:  (id, estado)         => api.patch(`/reportes/${id}/estado`, { estado }),
}

// ── Curso Espacios ────────────────────────────────────────────
export const cursoEspaciosApi = {
  getAll:             ()         => api.get('/curso-espacios'),
  getOne:             (id)       => api.get(`/curso-espacios/${id}`),
  create:             (data)     => api.post('/curso-espacios', data),
  update:             (id, data) => api.patch(`/curso-espacios/${id}`, data),
  remove:             (id)       => api.delete(`/curso-espacios/${id}`),
  getByDocente:       (userId)   => api.get(`/curso-espacios/docente/${userId}`),
  getByEstudiante:    (userId)   => api.get(`/curso-espacios/estudiante/${userId}`),
  agregarEstudiante:  (id, correo) => api.post(`/curso-espacios/${id}/agregar-estudiante`, { correo }),
  agregarAuxiliar:    (id, correo) => api.post(`/curso-espacios/${id}/agregar-auxiliar`, { correo }),
}

export default api
