// stores/auth.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { AuthService } from '@/services/auth.services'
import type { LoginDTO, RegisterDTO, User } from '@/types/auth'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const user = ref<User | null>(null)

  const isAuthenticated = computed(() => !!token.value)

  async function authenticate(credentials: LoginDTO) {
    const data = await AuthService.login(credentials)

    token.value = data.token
    user.value = data.user

    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
  }

  async function register(data: RegisterDTO) {
    const response = await AuthService.register(data)

    token.value = response.token
    user.value = response.user

    localStorage.setItem('token', response.token)
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return {
    token,
    user,
    isAuthenticated,
    authenticate,
    logout,
    register
  }
})
