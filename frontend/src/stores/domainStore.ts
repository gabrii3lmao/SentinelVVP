import { defineStore } from 'pinia'
import { domainsApi } from '@/api/domains.api'
import type { Domain, CreateDomainDTO } from '@/types/Domain'

export const useDomainStore = defineStore('domains', {
  state: () => ({
    domains: [] as Domain[],
    isLoading: false,
    error: null as string | null
  }),

  getters: {
    // Exemplo: Mostrar quantos sites estão UP no topo do Dashboard
    onlineCount: (state) => state.domains.filter(d => d.status === 'up').length,
    totalCount: (state) => state.domains.length
  },

  actions: {
    async fetchDomains() {
      this.isLoading = true
      this.error = null
      try {
        const { data } = await domainsApi.getAll()
        this.domains = data
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Erro ao carregar domínios'
      } finally {
        this.isLoading = false
      }
    },

    async addDomain(payload: CreateDomainDTO) {
      try {
        const { data } = await domainsApi.create(payload)
        this.domains.push(data) // Atualiza a lista na hora sem Refresh!
      } catch (err: any) {
        throw err.response?.data?.message || 'Erro ao criar domínio'
      }
    },

    async removeDomain(id: string) {
      try {
        await domainsApi.delete(id)
        this.domains = this.domains.filter(d => d.id !== id)
      } catch (err: any) {
        console.error('Erro ao deletar:', err)
      }
    }
  }
})
