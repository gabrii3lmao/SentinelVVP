<template>
  <div class="max-w-7xl mx-auto space-y-6">
    <!-- Cards resumo -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-[#2a2a2a] border border-support/10 rounded-xl p-5 flex items-center gap-4">
        <div class="p-3 bg-primary/20 text-primary rounded-lg">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
        <div>
          <p class="text-sm text-support/70">Total de Monitores</p>
          <h2 class="text-2xl font-bold text-light">{{ domains.length }}</h2>
        </div>
      </div>

      <div class="bg-[#2a2a2a] border border-support/10 rounded-xl p-5 flex items-center gap-4">
        <div class="p-3 bg-green-500/20 text-green-400 rounded-lg">
          <!-- ícone -->
        </div>
        <div>
          <p class="text-sm text-support/70">Operacionais</p>
          <h2 class="text-2xl font-bold text-green-400">
            {{ domains.filter((d) => d.status === 'up').length }}
          </h2>
        </div>
      </div>

      <div class="bg-[#2a2a2a] border border-support/10 rounded-xl p-5 flex items-center gap-4">
        <div class="p-3 bg-red-500/20 text-red-400 rounded-lg">
          <!-- ícone -->
        </div>
        <div>
          <p class="text-sm text-support/70">Incidentes Ativos</p>
          <h2 class="text-2xl font-bold text-red-400">
            {{ domains.filter((d) => d.status === 'down').length }}
          </h2>
        </div>
      </div>
    </div>

    <!-- Lista -->
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-semibold text-light">Seus Serviços</h2>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      <StatusCard v-for="domain in domains" :key="domain.id" :domain="domain" />
    </div>
  </div>
</template>
<script setup lang="ts">
import StatusCard from '@/components/monitor/StatusCard.vue'
import type { Domain } from '@/types/domain'

// mock alinhado com seu backend
const domains: Domain[] = [
  {
    id: '1',
    userid: 'user1',
    url: 'https://api.meusite.com.br',
    status: 'up',
    checkInterval: 60,
    timeout: 5000,
    isActive: true,
    lastChecked: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    userid: 'user1',
    url: 'https://meusite.com.br',
    status: 'up',
    checkInterval: 60,
    timeout: 5000,
    isActive: true,
    lastChecked: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    userid: 'user1',
    url: 'https://pagamentos.meusite.com.br',
    status: 'down',
    checkInterval: 30,
    timeout: 3000,
    isActive: true,
    lastChecked: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    userid: 'user1',
    url: 'db-replica.internal',
    status: 'pending',
    checkInterval: 120,
    timeout: 7000,
    isActive: false,
    lastChecked: null,
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    userid: 'user1',
    url: 'https://api.meusite.com.br',
    status: 'up',
    checkInterval: 60,
    timeout: 5000,
    isActive: true,
    lastChecked: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
]
</script>
