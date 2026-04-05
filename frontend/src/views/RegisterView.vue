<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const isLoading = ref(false)

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const passwordMismatch = computed(() => {
  return (
    form.password !== '' && form.confirmPassword !== '' && form.password !== form.confirmPassword
  )
})

const errorMessage = ref<string | null>(null)

const handleRegister = async () => {
  if (passwordMismatch.value) return

  isLoading.value = true
  try {
    await authStore.register({
      name: form.name,
      email: form.email,
      password: form.password,
    })

    router.push({ name: 'dashboard' })
  } catch (error: any) {
    errorMessage.value =
      error?.response?.data?.message || 'Erro na autenticação. Verifique suas credenciais.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-dark flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-[#2a2a2a] border border-support/20 rounded-xl shadow-2xl p-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-light mb-2">Criar Conta</h1>
        <p class="text-support text-sm">Monitore seus serviços e receba alertas em tempo real.</p>
      </div>

      <div
        v-if="errorMessage"
        class="mb-4 px-4 py-2 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 text-sm"
      >
        {{ errorMessage }}
      </div>

      <form @submit.prevent="handleRegister" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-support mb-1">Nome Completo</label>
          <input
            v-model="form.name"
            type="text"
            required
            class="w-full bg-dark text-light border border-support/30 rounded-lg px-4 py-2.5 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
            placeholder="Ex: Pedro Pedreira"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-support mb-1">E-mail</label>
          <input
            v-model="form.email"
            type="email"
            required
            class="w-full bg-dark text-light border border-support/30 rounded-lg px-4 py-2.5 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
            placeholder="seu@email.com"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-support mb-1">Senha</label>
          <input
            v-model="form.password"
            type="password"
            required
            minlength="6"
            class="w-full bg-dark text-light border border-support/30 rounded-lg px-4 py-2.5 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-support mb-1">Confirmar Senha</label>
          <input
            v-model="form.confirmPassword"
            type="password"
            required
            class="w-full bg-dark text-light border border-support/30 rounded-lg px-4 py-2.5 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
            placeholder="••••••••"
          />
          <p v-if="passwordMismatch" class="text-red-400 text-xs mt-1">As senhas não coincidem.</p>
        </div>

        <button
          type="submit"
          :disabled="isLoading || passwordMismatch"
          class="w-full bg-primary hover:bg-[#154673] text-light font-medium py-2.5 rounded-lg transition-colors flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed mt-2"
        >
          <svg
            v-if="isLoading"
            class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Cadastrar e Acessar
        </button>
      </form>

      <div class="mt-6 text-center">
        <router-link
          to="/login"
          class="text-sm text-secondary hover:text-support transition-colors"
        >
          Já possui uma conta? Faça login
        </router-link>
      </div>
    </div>
  </div>
</template>
