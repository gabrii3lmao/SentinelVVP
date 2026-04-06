<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useDomainStore } from '@/stores/domainStore'
import DomainCard from '@/components/domain/StatusCard.vue'

const domainStore = useDomainStore()
const isRefreshing = ref(false)

const handleRefresh = async () => {
  if (isRefreshing.value) return

  isRefreshing.value = true
  try {
    await Promise.all([
      domainStore.fetchDomains(),
      new Promise((resolve) => setTimeout(resolve, 500)),
    ])
  } finally {
    isRefreshing.value = false
  }
}

onMounted(() => {
  domainStore.fetchDomains()
})
</script>

<template>
  <div class="max-w-7xl mx-auto space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-[#2a2a2a] border border-support/10 rounded-xl p-5 flex items-center gap-4">
        <div class="p-3 bg-primary/20 text-primary rounded-lg">
          <i class="pi pi-server" style="font-size: 1.8rem"></i>
        </div>
        <div>
          <p class="text-xm text-support/70">Total de Domínios</p>
          <h2 class="text-2xl font-bold text-light">{{ domainStore.totalDomains }}</h2>
        </div>
      </div>

      <div class="bg-[#2a2a2a] border border-support/10 rounded-xl p-5 flex items-center gap-4">
        <div class="p-3 bg-green-500/20 text-green-400 rounded-lg">
          <i class="pi pi-check-circle" style="font-size: 1.8rem"></i>
        </div>
        <div>
          <p class="text-xm text-support/70">Operacionais (Up)</p>
          <h2 class="text-2xl font-bold text-green-400">{{ domainStore.upDomains }}</h2>
        </div>
      </div>

      <div class="bg-[#2a2a2a] border border-support/10 rounded-xl p-5 flex items-center gap-4">
        <div class="p-3 bg-red-500/20 text-red-400 rounded-lg">
          <i class="pi pi-exclamation-triangle" style="font-size: 1.8rem"></i>
        </div>
        <div>
          <p class="text-xm text-support/70">Fora do Ar (Down)</p>
          <h2 class="text-2xl font-bold text-red-400">{{ domainStore.downDomains }}</h2>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-semibold text-light">Seus Domínios</h2>
      <button @click="handleRefresh" class="text-support hover:text-primary p-2" title="Atualizar">
        <i class="pi pi-refresh" style="animation-duration: 0.5s;" :class="{ 'animate-spin': isRefreshing }"></i>
      </button>
    </div>

    <div
      v-if="domainStore.isLoading && domainStore.domains.length === 0"
      class="flex justify-center py-12"
    >
      <i class="pi pi-spinner animate-spin text-3xl text-primary"></i>
    </div>

    <div
      v-else-if="domainStore.domains.length === 0"
      class="text-center py-16 bg-[#2a2a2a] border border-support/10 rounded-xl border-dashed"
    >
      <i class="pi pi-inbox text-6xl text-support/50 mb-3"></i>
      <h3 class="text-3xl font-medium text-light">Nenhum domínio monitorado</h3>
      <p class="text-support mt-1 text-lg">Adicione seu primeiro endpoint para começar.</p>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      <DomainCard v-for="domain in domainStore.domains" :key="domain.id" :domain="domain" />
    </div>
  </div>
</template>
