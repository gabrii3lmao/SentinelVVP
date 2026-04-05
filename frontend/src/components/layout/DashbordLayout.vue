<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <div class="flex h-screen bg-dark text-light overflow-hidden font-sans">
    <aside
      class="w-64 bg-[#1a1a1a] border-r border-support/10 flex flex-col transition-all duration-300"
    >
      <div class="h-16 flex items-center px-6 border-b border-support/10">
        <div class="flex items-center gap-4">
          <div class="w-5 h-5 animate-pulse group">
            <i
              class="pi pi-slack text-[1.5rem] transition-transform duration-300 group-hover:rotate-180"
            ></i>
          </div>
          <span class="text-3xl font-bold tracking-tight">
            Sentinel<span class="text-secondary">VVP</span>
          </span>
        </div>
      </div>

      <nav class="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        <router-link
          to="/"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sl font-medium transition-colors"
          active-class="bg-primary/10 text-primary border border-primary/20"
          exact-active-class="bg-primary/20 text-primary border border-primary/30"
          :class="[$route.path === '/' ? '' : 'text-support hover:bg-support/5 hover:text-light']"
        >
          <i class="pi pi-objects-column" style="font-size: 1.3rem"></i>
          Visão Geral
        </router-link>
      </nav>

      <div class="p-4 border-t border-support/10 bg-[#151515]">
        <div class="flex items-center justify-between">
          <div class="flex flex-col truncate pr-2">
            <span class="text-sm font-medium truncate">{{
              authStore.user?.name || 'Usuário'
            }}</span>
            <span class="text-xs text-support truncate">{{ authStore.user?.email }}</span>
          </div>

          <button
            @click="handleLogout"
            class="p-3 text-support hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
            title="Sair"
          >
            <i class="pi pi-sign-out" style="font-size: 1.2rem"></i>
          </button>
        </div>
      </div>
    </aside>

    <main class="flex-1 flex flex-col min-w-0 bg-dark">
      <header class="h-16 flex items-center justify-between px-8 border-b border-support/10">
        <h1 class="text-lg font-semibold text-light">Dashboard de Status</h1>

        <div class="flex items-center gap-4">
          <button
            class="bg-primary hover:bg-secondary text-light px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-primary/20"
          >
            + Novo Monitor
          </button>
        </div>
      </header>

      <div class="flex-1 overflow-auto p-8">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Transição suave entre páginas internas */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
