<script setup lang="ts">
import Sidebar from '@/components/layout/SideBar.vue'
</script>

<template>
  <div class="flex h-screen bg-dark text-light overflow-hidden font-sans">
    <Sidebar />

    <main class="flex-1 flex flex-col min-w-0 bg-dark">
      <router-view name="topbar"></router-view>

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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
