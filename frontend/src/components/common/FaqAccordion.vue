<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  question: string
  answer: string
}>()

const isOpen = ref(false)

const toggle = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div
    class="border border-support/10 rounded-lg bg-[#2a2a2a] overflow-hidden transition-colors hover:border-support/30"
  >
    <button
      @click="toggle"
      class="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
    >
      <span class="font-medium text-light">{{ question }}</span>
      <svg
        class="w-5 h-5 text-secondary transform transition-transform duration-300"
        :class="{ 'rotate-180': isOpen }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <div
      class="grid transition-all duration-300 ease-in-out"
      :class="isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
    >
      <div class="overflow-hidden">
        <div class="px-6 pb-4 text-sm text-support/80 leading-relaxed">
          {{ answer }}
        </div>
      </div>
    </div>
  </div>
</template>
