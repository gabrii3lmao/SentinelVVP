import api from './index'
import type { LoginDTO, RegisterDTO, AuthResponse } from '@/types/auth'

export const AuthService = {
  async login(data: LoginDTO): Promise<AuthResponse> {
    const res = await api.post<AuthResponse>('/auth/login', data)
    return res.data
  },

  async register(data: RegisterDTO): Promise<AuthResponse> {
    const res = await api.post<AuthResponse>('/auth/register', data)
    return res.data
  },
}
