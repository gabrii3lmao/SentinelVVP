<script setup lang="ts">
import { computed } from 'vue'
import type { Domain } from '@/types/domain'

const props = defineProps<{
  domain: Domain
}>()

const statusStyles = computed(() => {
  switch (props.domain.status) {
    case 'up':
      return {
        text: 'Online',
        bgClass: 'bg-green-500/10 border-green-500/20 text-green-400',
        dotClass: 'bg-green-400 animate-pulse',
      }
    case 'down':
      return {
        text: 'Offline',
        bgClass: 'bg-red-500/10 border-red-500/20 text-red-400',
        dotClass: 'bg-red-400 animate-ping',
      }
    case 'pending':
    default:
      return {
        text: 'Pendente',
        bgClass: 'bg-support/10 border-support/20 text-support',
        dotClass: 'bg-support',
      }
  }
})

function formatDate(date: string) {
  return new Date(date).toLocaleString()
}
</script>

<template>
  <div
    class="bg-[#2a2a2a] border border-support/10 rounded-xl p-5 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-200 group"
  >
    <!-- Header -->
    <div class="flex justify-between items-start mb-4 pb-4 border-b border-support/10">
      <div class="flex-1 min-w-0 pr-4">
        <h3
          class="text-lg font-semibold text-light truncate group-hover:text-secondary transition-colors"
        >
          {{ domain.url }}
        </h3>

        <span class="text-sm text-support/70 block mt-0.5 truncate"> ID: {{ domain.id }} </span>
      </div>

      <div
        class="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border"
        :class="statusStyles.bgClass"
      >
        <span class="w-2 h-2 rounded-full" :class="statusStyles.dotClass"></span>
        {{ statusStyles.text }}
      </div>
    </div>

    <!-- Info básica -->
    <div class="grid grid-cols-2 gap-4">
      <div class="flex flex-col">
        <span class="text-xs uppercase tracking-wider text-support/60 mb-1"> Intervalo </span>
        <span class="text-xl font-medium text-light"> {{ domain.checkInterval }}s </span>
      </div>

      <div class="flex flex-col">
        <span class="text-xs uppercase tracking-wider text-support/60 mb-1"> Timeout </span>
        <span class="text-xl font-medium text-light"> {{ domain.timeout }}ms </span>
      </div>
    </div>

    <!-- Última verificação -->
    <div class="mt-4 text-sm text-support/70">
      Última verificação:
      <span class="text-light">
        {{ domain.lastChecked ? formatDate(domain.lastChecked) : 'Nunca' }}
      </span>
    </div>

    <!-- Barra simples de status -->
    <div
      class="mt-5 flex gap-0.5 h-6 rounded overflow-hidden opacity-80 group-hover:opacity-100 transition-opacity"
    >
      <div
        v-for="i in 24"
        :key="i"
        class="flex-1 cursor-help"
        :class="
          domain.status === 'down'
            ? 'bg-red-500/80 hover:bg-red-400'
            : domain.status === 'up'
              ? 'bg-green-500/80 hover:bg-green-400'
              : 'bg-gray-500/50'
        "
        :title="`Hora ${i}`"
      ></div>
    </div>
  </div>
</template>
