<template>
  <div class="min-h-screen flex flex-col items-center py-10">
    <h1 class="text-3xl font-bold text-white mb-6">Gastos Registrados</h1>

    <!-- Totales -->
    <div class="flex flex-col md:flex-row gap-6 mb-8 w-full max-w-4xl justify-between">
      <!-- Totales por categoría -->
      <div class="bg-gray-900 p-4 rounded-xl shadow-lg text-white flex-1">
        <h2 class="text-xl font-bold mb-2">Totales por categoría</h2>
        <ul class="space-y-1">
          <li v-for="(total, categoria) in totalesPorCategoria" :key="categoria">
            {{ categoria }}:
            <span class="text-green-400 font-semibold">
              $ {{ total.toLocaleString("es-CO") }}
            </span>
          </li>
        </ul>
      </div>

      <!-- Total general -->
      <div
        class="bg-gray-900 p-4 rounded-xl shadow-lg text-green-400 font-bold text-xl flex items-center justify-center flex-1"
      >
        Total General: $ {{ totalGeneral.toLocaleString("es-CO") }}
      </div>
    </div>

    <!-- Lista de registros -->
    <div class="w-full max-w-2xl flex flex-col gap-4">
      <div
        v-for="registro in registrosOrdenados"
        :key="registro.id"
        class="bg-gray-900 text-white p-4 rounded-xl shadow-md flex flex-col gap-2"
      >
        <span class="text-green-400 font-bold text-lg">
          $ {{ Number(registro.monto).toLocaleString("es-CO") }}
        </span>
        <span class="text-sm">Categoría: {{ registro.categoria }}</span>
        <span class="text-sm">{{ registro.fecha }} {{ registro.hora }}</span>

        <div class="flex gap-2">
          <BaseButton
            buttonLabel="Editar"
            class="bg-yellow-500 hover:bg-yellow-600 text-black"
            @click="editRegistro(registro)"
          />
          <BaseButton
            buttonLabel="Eliminar"
            class="bg-red-600 hover:bg-red-700 text-white"
            @click="deleteRegistro(registro.id)"
          />
        </div>
      </div>
    </div>

    <!-- Modal de edición -->
    <div
      v-if="editando"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div class="bg-gray-900 text-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">Editar Registro</h2>

        <!-- Monto -->
        <BaseInput
          inputLabel="Monto"
          inputType="number"
          inputName="monto"
          v-model="formData.monto"
          placeholder="Escribe el monto"
          :inputError="errors.monto"
        />

        <!-- Categoría -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Categoría</label>
          <select
            v-model="formData.categoria"
            class="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-cyan-400"
          >
            <option disabled value="">Seleccione una categoría</option>
            <option v-for="cat in categorias" :key="cat" :value="cat">
              {{ cat }}
            </option>
          </select>
          <span v-if="errors.categoria" class="text-red-400 text-sm">
            {{ errors.categoria }}
          </span>
        </div>

        <!-- Botones -->
        <div class="mt-4 flex justify-end gap-2">
          <BaseButton
            buttonLabel="Cancelar"
            class="bg-gray-600 hover:bg-gray-700 text-white"
            @click="cancelEdit"
          />
          <BaseButton buttonLabel="Actualizar" @click="handleUpdate" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, computed } from "vue"
import { useRegisStore } from "@/stores/RegisStore"
import BaseButton from "@/modules/components/BaseButton.vue"
import BaseInput from "@/modules/components/BaseInput.vue"

const store = useRegisStore()

onMounted(() => {
  store.cargarRegistros()
})

// categorías
const categorias = ["Comida", "Transporte", "Vivienda", "Otros"]

// lista ordenada
const registrosOrdenados = computed(() =>
  [...store.registros].sort((a, b) => b.id - a.id)
)

// totales
const totalGeneral = computed(() =>
  store.registros.reduce((acc, r) => acc + Number(r.monto), 0)
)

const totalesPorCategoria = computed(() => {
  const totales: Record<string, number> = {}
  store.registros.forEach((r) => {
    if (!totales[r.categoria]) totales[r.categoria] = 0
    totales[r.categoria] += Number(r.monto)
  })
  return totales
})

// edición
const editando = ref(false)
const editId = ref<number | null>(null)

const formData = reactive({
  monto: 0,
  categoria: "",
})

const errors = reactive({
  monto: "",
  categoria: "",
})

function deleteRegistro(id: number) {
  store.eliminarRegistro(id)
  if (editId.value === id) cancelEdit()
}

function editRegistro(registro: any) {
  editando.value = true
  editId.value = registro.id
  formData.monto = registro.monto
  formData.categoria = registro.categoria
}

function handleUpdate() {
  let valid = true
  if (!formData.monto) {
    errors.monto = "El monto es requerido"
    valid = false
  } else {
    errors.monto = ""
  }
  if (!formData.categoria) {
    errors.categoria = "La categoría es requerida"
    valid = false
  } else {
    errors.categoria = ""
  }

  if (!valid) return

  if (editId.value !== null) {
    store.editarRegistro(editId.value, {
      monto: Number(formData.monto),
      categoria: formData.categoria,
    })
    cancelEdit()
  }
}

function cancelEdit() {
  editando.value = false
  editId.value = null
  formData.monto = 0
  formData.categoria = ""
}
</script>
