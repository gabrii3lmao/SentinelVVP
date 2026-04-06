<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

// Array centralizando todas as páginas da sua navegação
const navLinks = [
  {
    to: '/',
    icon: 'pi pi-objects-column',
    label: 'Visão Geral'
  },
  {
    to: '/projects',
    icon: 'pi pi-folder-open',
    label: 'Projetos'
  },
  {
    to: '/about',
    icon: 'pi pi-megaphone',
    label: 'Sobre'
  }
]
</script>

<template>
  <nav class="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
    <router-link
      v-for="link in navLinks"
      :key="link.to"
      :to="link.to"
      class="flex items-center gap-4 px-3 py-3 rounded-lg text-sl font-black transition-colors border border-transparent"
      active-class="bg-primary/10 text-primary border-primary/20"
      exact-active-class="bg-primary/20 text-primary border-primary/30"
      :class="[route.path === link.to ? '' : 'text-support hover:bg-support/5 hover:text-light']"
    >
      <i :class="link.icon" style="font-size: 1.3rem"></i>
      {{ link.label }}
    </router-link>
  </nav>
</template>
