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
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
        active-class="bg-primary/10 text-primary border border-primary/20"
        exact-active-class="bg-primary/20 text-primary border border-primary/30"
        :class="[$route.path === '/' ? '' : 'text-support hover:bg-support/5 hover:text-light']"
      >
        <i class="pi pi-objects-column" style="font-size: 1.3rem"></i>
        Visão Geral
      </router-link>

      <router-link
        to="/about"
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
        active-class="bg-primary/10 text-primary border border-primary/20"
        exact-active-class="bg-primary/20 text-primary border border-primary/30"
        :class="[
          $route.path === '/about' ? '' : 'text-support hover:bg-support/5 hover:text-light',
        ]"
      >
        <i class="pi pi-megaphone" style="font-size: 1.3rem"></i>
        About
      </router-link>
    </nav>

    <div class="p-4 border-t border-support/10 bg-[#151515]">
      <div class="flex items-center justify-between">
        <div class="flex flex-col truncate pr-2">
          <span class="text-sm font-medium truncate">{{ authStore.user?.name || 'Usuário' }}</span>
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
</template>
