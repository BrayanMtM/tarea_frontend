// src/stores/RegisStore.ts
import { defineStore } from "pinia";
import api from "../services/api";

export interface Registro {
  id: number;
  monto: number;
  categoria: string;
  fecha: string;
  hora: string;
}

export const useRegisStore = defineStore("regisStore", {
  state: () => ({
    registros: [] as Registro[],
  }),

  actions: {
    async cargarRegistros() {
      try {
        const res = await api.get("/registros/");
        // asumo que tu API devuelve un array de registros
        this.registros = res.data;
      } catch (error) {
        console.error("Error cargando registros:", error);
      }
    },

    async agregarRegistro(monto: number, categoria: string) {
      try {
        const res = await api.post("/registros/", { monto, categoria });
        // agrega al inicio
        this.registros.unshift(res.data);
        return res.data;
      } catch (error) {
        console.error("Error creando registro:", error);
        throw error;
      }
    },

    async editarRegistro(id: number, nuevoRegistro: Partial<Registro>) {
      try {
        const res = await api.put(`/registros/${id}/`, nuevoRegistro);
        const idx = this.registros.findIndex((r) => r.id === id);
        if (idx !== -1) this.registros[idx] = res.data;
        return res.data;
      } catch (error) {
        console.error("Error editando registro:", error);
        throw error;
      }
    },

    async eliminarRegistro(id: number) {
      try {
        await api.delete(`/registros/${id}/`);
        this.registros = this.registros.filter((r) => r.id !== id);
      } catch (error) {
        console.error("Error eliminando registro:", error);
        throw error;
      }
    },
  },
});

