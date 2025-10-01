<template>
  <div>
    <label :for="props.inputName" class="block text-white font-semibold text-sm">
      {{ props.inputLabel }}
    </label>
    <div class="mt-2">
      <input
        v-if="!props.options"
        :type="props.inputType"
        :name="props.inputName"
        :id="props.inputName"
        :placeholder="props.placeholder"
        :value="props.modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :class="[
          'block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-white text-white',
          props.inputError ? 'ring-red-500' : 'focus:ring-gray-600',
        ]"
      />

      <select
        v-else
        :name="props.inputName"
        :id="props.inputName"
        :value="props.modelValue"
        @change="$emit('update:modelValue', $event.target.value)"
        :class="[
          'block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800 text-white',
          props.inputError ? 'ring-red-500' : 'focus:ring-gray-600',
        ]"
      >
        <option value="" disabled selected>Selecciona una opción</option>
        <option v-for="(option, index) in props.options" :key="index" :value="option">
          {{ option }}
        </option>
      </select>
    </div>

    <label v-if="inputError" class="pt-1 block text-red-500 text-sm">{{ props.inputError }}</label>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  inputLabel: {
    type: String,
    default: 'Input Name',
  },
  inputName: {
    type: String,
    default: 'input name',
  },
  inputType: {
    type: String,
    default: 'text',
  },
  showDes: {
    type: Boolean,
    default: false,
  },
  inputDes: {
    type: String,
    default: 'Descripcion',
  },
  placeholder: {
    type: String,
    default: '',
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  inputError: {
    type: String,
  },
  options: {
    type: Array as () => string[] | undefined,
    default: undefined,
  },
})
</script>
