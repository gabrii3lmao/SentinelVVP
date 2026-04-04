export type Domain = {
  id: string
  userid: string
  url: string
  checkInterval: number
  timeout: number
  status: 'up' | 'down' | 'pending' | null
  isActive: boolean
  lastChecked: string | null
  createdAt: string
}

export type CreateDomainDTO = {
  url: string
  checkInterval: number
  timeout: number
}

export type DomainLog = {
  id: string
  domainId: string
  statusCode: number
  responseTime: number
  errorMessage: string | null
  isSuccess: boolean
  createdAt: string
}
