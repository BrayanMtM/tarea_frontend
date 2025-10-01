// import { defineStore } from 'pinia'

// export interface Registro {
//   id: number
//   monto: number
//   categoria: string
//   fecha: string
//   hora: string
// }

// export const useRegisStore = defineStore('regisStore', {
//   state: () => ({
//     registros: [] as Registro[],
//     nextId: 1, // contador para IDs
//   }),

//   actions: {
//     agregarRegistro(monto: string | number, categoria: string) {
//       const fechaActual = new Date()
//       const fecha = fechaActual.toLocaleDateString('es-CO')
//       const hora = fechaActual.toLocaleTimeString('es-CO', {
//         hour: '2-digit',
//         minute: '2-digit',
//       })

//       this.registros.push({
//         id: this.nextId++,
//         monto: Number(monto),
//         categoria,
//         fecha,
//         hora,
//       })
//     },

//     editarRegistro(id: number, nuevoRegistro: Partial<Registro>) {
//       const index = this.registros.findIndex((r) => r.id === id)
//       if (index !== -1) {
//         this.registros[index] = {
//           ...this.registros[index],
//           ...nuevoRegistro,
//         }
//       }
//     },

//     eliminarRegistro(id: number) {
//       this.registros = this.registros.filter((r) => r.id !== id)
//     },
//   },
// })



import { defineStore } from 'pinia'
import axios from 'axios'

export interface Registro {
  id: number
  monto: number
  categoria: string
  fecha: string
  hora: string
}

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: { 'Content-Type': 'application/json' },
})

export const useRegisStore = defineStore('regisStore', {
  state: () => ({
    registros: [] as Registro[],
  }),

  actions: {
    async cargarRegistros() {
      try {
        const res = await api.get('/registros/')
        this.registros = res.data
      } catch (error) {
        console.error('Error cargando registros:', error)
      }
    },

    async agregarRegistro(monto: number, categoria: string) {
      try {
        const res = await api.post('/registros/', { monto, categoria })
        // agrega al inicio
        this.registros.unshift(res.data)
      } catch (error) {
        console.error('Error creando registro:', error)
      }
    },

    async editarRegistro(id: number, nuevoRegistro: Partial<Registro>) {
      try {
        const res = await api.put(`/registros/${id}/`, nuevoRegistro)
        const idx = this.registros.findIndex(r => r.id === id)
        if (idx !== -1) this.registros[idx] = res.data
      } catch (error) {
        console.error('Error editando registro:', error)
      }
    },

    async eliminarRegistro(id: number) {
      try {
        await api.delete(`/registros/${id}/`)
        this.registros = this.registros.filter(r => r.id !== id)
      } catch (error) {
        console.error('Error eliminando registro:', error)
      }
    },
  },
})
