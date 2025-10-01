<template>
  <div class="min-h-screen flex flex-col items-center py-10">
    <h1 class="text-3xl font-bold text-white mb-6">Registrar Gasto</h1>

    <div class="bg-gray-900 p-6 rounded-xl shadow-lg text-white w-full max-w-md">
      <!-- Input monto -->
      <label class="block text-sm mb-2">Monto</label>
      <input
        v-model="monto"
        type="number"
        placeholder="Ej: 1500.50"
        class="w-full px-3 py-2 bg-gray-800 text-white rounded-md border border-gray-600
               focus:outline-none focus:ring-2 focus:ring-cyan-400"
      />

      <!-- Select categoría -->
      <label class="block text-sm mt-4 mb-2">Categoría</label>
      <select
        v-model="categoria"
        class="w-full px-3 py-2 bg-gray-800 text-white rounded-md border border-gray-600
               focus:outline-none focus:ring-2 focus:ring-cyan-400"
      >
        <option disabled value="">Seleccione una categoría</option>
        <option class="bg-gray-800 text-white" value="Comida">Comida</option>
        <option class="bg-gray-800 text-white" value="Transporte">Transporte</option>
        <option class="bg-gray-800 text-white" value="Vivienda">Vivienda</option>
        <option class="bg-gray-800 text-white" value="Otros">Otros</option>
      </select>

      <!-- Botón -->
      <BaseButton
        buttonLabel="Registrar gasto"
        class="mt-6 bg-cyan-400 hover:bg-cyan-500 text-black font-semibold"
        @click="registrar"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRegisStore } from "@/stores/RegisStore"
import BaseButton from "@/modules/components/BaseButton.vue"

const store = useRegisStore()

const monto = ref<number | null>(null)
const categoria = ref("")

async function registrar() {
  if (!monto.value || !categoria.value) {
    alert("Por favor, ingrese un monto y seleccione una categoría")
    return
  }
    // ahora coincide con la definición del store
  await store.agregarRegistro(Number(monto.value), categoria.value)
  monto.value = null
  categoria.value = ""
}

</script>
