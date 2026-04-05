<template>
  <div class="min-h-screen bg-dark flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-[#2a2a2a] border border-support/20 rounded-xl shadow-2xl p-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-light mb-2">Login</h1>
        <p class="text-support text-sm">Gerencie e monitore seus serviços em um só lugar.</p>
      </div>

      <div
        v-if="errorMessage"
        class="mb-4 px-4 py-2 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 text-sm"
      >
        {{ errorMessage }}
      </div>
      <form @submit.prevent="handleSubmit" class="space-y-6">
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
          <i
            v-if="isLoading"
            class="pi pi-spinner animate-spin -ml-1 mr-3 text-white"
            style="font-size: 1.25rem"
          ></i>
          Entrar
        </button>
      </form>
      <div class="mt-6 text-center">
        <router-link
          to="/register"
          class="text-sm text-secondary hover:text-support transition-colors"
        >
          Não possui uma conta? Cadastre-se
        </router-link>
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

const isLoading = ref(false)

const form = reactive({
  email: '',
  password: '',
})

const errorMessage = ref<string | null>(null)

const handleSubmit = async () => {
  isLoading.value = true
  try {
    await authStore.authenticate({
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
