<template>
  <div class="min-h-screen bg-dark flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-[#2a2a2a] border border-support/20 rounded-xl shadow-2xl p-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-light mb-2">
          {{ isLogin ? 'Bem-vindo de volta' : 'Criar Conta' }}
        </h1>
        <p class="text-support text-sm">Monitoramento de uptime simples e eficiente.</p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div v-if="!isLogin">
          <label class="block text-sm font-medium text-support mb-1">Nome</label>
          <input
            v-model="form.name"
            type="text"
            required
            class="w-full bg-dark text-light border border-support/30 rounded-lg px-4 py-2.5 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
            placeholder="Seu nome completo"
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
            class="w-full bg-dark text-light border border-support/30 rounded-lg px-4 py-2.5 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-primary hover:bg-secondary text-light font-medium py-2.5 rounded-lg transition-colors flex justify-center items-center disabled:opacity-70"
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
          {{ isLogin ? 'Entrar' : 'Cadastrar' }}
        </button>
      </form>

      <div class="mt-6 text-center">
        <button
          @click="toggleMode"
          type="button"
          class="text-sm text-secondary hover:text-support transition-colors"
        >
          {{ isLogin ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Faça login' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const isLogin = ref(true)
const isLoading = ref(false)

const form = reactive({
  name: '',
  email: '',
  password: '',
})

const toggleMode = () => {
  isLogin.value = !isLogin.value
  form.name = ''
  form.email = ''
  form.password = ''
}

const handleSubmit = async () => {
  isLoading.value = true
  try {
    if (isLogin.value) {
      await authStore.authenticate({ email: form.email, password: form.password })
    } else {
      // Implementar chamada de AuthService.register se necessário
      console.log('Registro efetuado:', form)
    }

    // Redireciona para o dashboard após sucesso
    router.push({ name: 'dashboard' })
  } catch (error) {
    alert('Erro na autenticação. Verifique suas credenciais.')
  } finally {
    isLoading.value = false
  }
}
</script>
