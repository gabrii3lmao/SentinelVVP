import api from '.'
import type { Domain, DomainLog, CreateDomainDTO } from '@/types/Domain'

export const domainsApi = {
  create: (domain: CreateDomainDTO) => api.post('/domains', domain),
  getAll: () => api.get<Domain[]>('/domains'),
  update: (id: string, domain: CreateDomainDTO) => api.put(`/domains/${id}`, domain),
  delete: (id: string) => api.delete(`/domains/${id}`),
  getLogs: (id: string) => api.get<DomainLog[]>(`/domains/${id}/logs`),
}
