import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { domainsApi } from '@/services/domains.api' // Ajuste o path se necessário
import type { Domain, CreateDomainDTO } from '@/types/domain'

export const useDomainStore = defineStore('domain', () => {
  const domains = ref<Domain[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const totalDomains = computed(() => domains.value.length)
  const upDomains = computed(() => domains.value.filter((d) => d.status === 'up').length)
  const downDomains = computed(() => domains.value.filter((d) => d.status === 'down').length)

  async function fetchDomains() {
    isLoading.value = true
    error.value = null
    try {
      const response = await domainsApi.getAll()
      // Se sua API retorna os dados direto no axios, response.data
      domains.value = response.data
    } catch (e: any) {
      error.value = 'Falha ao carregar domínios.'
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  async function addDomain(data: CreateDomainDTO) {
    try {
      const response = await domainsApi.create(data)

      await fetchDomains()
    } catch (e: any) {
      console.error('Erro ao adicionar domínio', e)
      throw e
    }
  }

  return {
    domains,
    isLoading,
    error,
    totalDomains,
    upDomains,
    downDomains,
    fetchDomains,
    addDomain,
  }
})
