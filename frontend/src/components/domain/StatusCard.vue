<script setup lang="ts">
import { computed } from 'vue'
import type { Domain } from '@/types/domain'

const props = defineProps<{
  domain: Domain
}>()

const statusBadge = computed(() => {
  if (!props.domain.isActive) {
    return {
      text: 'Inativo',
      class: 'bg-support/10 text-support border-support/20',
      dot: 'bg-support',
    }
  }

  switch (props.domain.status) {
    case 'up':
      return {
        text: 'Online',
        class: 'bg-green-500/10 text-green-400 border-green-500/20',
        dot: 'bg-green-400 animate-pulse',
      }
    case 'down':
      return {
        text: 'Offline',
        class: 'bg-red-500/10 text-red-400 border-red-500/20',
        dot: 'bg-red-400 animate-ping',
      }
    case 'pending':
    default:
      return {
        text: 'Verificando...',
        class: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
        dot: 'bg-yellow-400 animate-pulse',
      }
  }
})

const formattedLastCheck = computed(() => {
  if (!props.domain.lastChecked) return 'Aguardando 1ª checagem'
  return new Date(props.domain.lastChecked).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
})
</script>

<template>
  <div
    class="bg-[#2a2a2a] border border-support/10 rounded-xl p-5 hover:border-primary/50 transition-all duration-200 group relative"
  >
    <div class="flex justify-between items-start mb-4 pb-4 border-b border-support/10">
      <div class="flex-1 min-w-0 pr-4">
        <a
          :href="domain.url"
          target="_blank"
          class="text-lg font-semibold text-light hover:text-secondary truncate block transition-colors"
        >
          {{ domain.url }}
        </a>
        <span class="text-xs text-support/70 mt-1 block">
          Adicionado em: {{ new Date(domain.createdAt).toLocaleDateString('pt-BR') }}
        </span>
      </div>

      <div
        class="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border"
        :class="statusBadge.class"
      >
        <span class="w-2 h-2 rounded-full" :class="statusBadge.dot"></span>
        {{ statusBadge.text }}
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div class="flex flex-col">
        <span class="text-xs uppercase tracking-wider text-support/60 mb-1">Intervalo</span>
        <span class="text-lg font-medium text-light">
          {{ domain.checkInterval }} <span class="text-xs text-support/60">seg</span>
        </span>
      </div>

      <div class="flex flex-col">
        <span class="text-xs uppercase tracking-wider text-support/60 mb-1">Timeout</span>
        <span class="text-lg font-medium text-light">
          {{ domain.timeout }} <span class="text-xs text-support/60">ms</span>
        </span>
      </div>
    </div>

    <div
      class="mt-4 pt-4 border-t border-support/10 flex justify-between items-center text-xs text-support/70"
    >
      <span>Último check: {{ formattedLastCheck }}</span>

      <button class="hover:text-primary transition-colors flex items-center gap-1">
        <i class="pi pi-history"></i> Logs
      </button>
    </div>
  </div>
</template>
