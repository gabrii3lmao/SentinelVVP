<script setup lang="ts">
import { useRoute } from 'vue-router';

defineProps<{
  to: string;
  icon: string;
  label: string;
}>();

const route = useRoute();
</script>

<template>
  <router-link
    :to="to"
    class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
    active-class="bg-primary/10 text-primary border border-primary/20"
    exact-active-class="bg-primary/20 text-primary border border-primary/30"
    :class="[route.path === to ? '' : 'text-support hover:bg-support/5 hover:text-light']"
  >
    <i :class="icon" style="font-size: 1.3rem"></i>
    {{ label }}
  </router-link>
</template>
