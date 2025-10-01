<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import NavBar from '@/components/ui/NavBar.vue'

const route = useRoute()

// Computada para mostrar/ocultar la barra según la ruta
const mostrarNavbar = computed(() => route.path !== '')
</script>

<template>
  <div class="min-h-screen bg-[#b0b7c0] text-white">
    <!-- Solo se muestra si no estamos en /login -->
    <NavBar v-if="mostrarNavbar" />
    <RouterView />
  </div>
</template>
