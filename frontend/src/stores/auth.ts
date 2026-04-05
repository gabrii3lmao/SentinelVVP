// stores/auth.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { AuthService } from '@/services/auth.services'
import type { LoginDTO, User } from '@/types/auth'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const user = ref<User | null>(null)

  const isAuthenticated = computed(() => !!token.value)

  async function authenticate(credentials: LoginDTO) {
    const data = await AuthService.login(credentials)

    token.value = data.token
    user.value = data.user

    localStorage.setItem('token', data.token)
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
  }

  return {
    token,
    user,
    isAuthenticated,
    authenticate,
    logout,
  }
})
