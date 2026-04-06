<script setup lang="ts">

</script>

<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold">Meus Projetos</h1>
    <p class="text-support">Aqui estão os projetos que você está monitorando.</p>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Exemplo de cartão de projeto -->
      <div
        v-for="project in [1, 2, 3]"
        :key="project"
        class="bg-[#2a2a2a] border border-support/10 rounded-xl p-5 hover:border-primary/50 transition-all duration-200 group relative"
      >
        <h2 class="text-lg font-semibold text-light mb-2">Projeto {{ project }}</h2>
        <p class="text-support mb-4">Descrição breve do projeto e seus objetivos.</p>
        <a
          href="#"
          class="text-primary hover:underline absolute bottom-4 right-4 text-sm"
        >
          Ver detalhes
        </a>
      </div>
    </div>
  </div>
</template>
