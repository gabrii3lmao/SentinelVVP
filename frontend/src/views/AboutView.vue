<script setup lang="ts">
import FaqAccordion from '@/components/common/FaqAccordion.vue'

// Array de dados estáticos para alimentar os componentes
const faqs = [
  {
    question: 'Com que frequência meus sites são verificados?',
    answer:
      'Dependendo da sua configuração, os checks podem ser realizados a cada 1, 5 ou 15 minutos. Planos avançados permitem verificações em intervalos de até 30 segundos.',
  },
  {
    question: "O que é considerado um 'Downtime'?",
    answer:
      'Um downtime é registrado quando o nosso sistema recebe um código de status HTTP de erro (como 500, 502, 503) ou quando a requisição atinge o tempo limite (timeout) de 10 segundos sem resposta.',
  },
  {
    question: 'Posso monitorar APIs que exigem autenticação?',
    answer:
      'Sim! Na tela de cadastro do monitor, você pode definir Headers customizados (como Authorization: Bearer <token>) ou parâmetros de corpo para testar endpoints específicos da sua aplicação.',
  },
  {
    question: 'Os dados de histórico ficam salvos por quanto tempo?',
    answer:
      'Mantemos o registro detalhado de latência e incidentes por 30 dias para contas gratuitas e até 1 ano para contas premium. O percentual global de uptime é mantido permanentemente.',
  },
]
</script>

<template>
  <div class="max-w-5xl mx-auto space-y-12 pb-12">
    <header class="text-center space-y-4">
      <h1 class="text-3xl font-bold text-light">Sobre o UpMonitor</h1>
      <p class="text-support max-w-2xl mx-auto">
        Uma plataforma de monitoramento contínuo projetada para garantir que seus serviços, APIs e
        sites estejam sempre disponíveis para seus usuários.
      </p>
    </header>

    <section>
      <h2 class="text-xl font-semibold text-light mb-6 flex items-center gap-2">
        <i class="pi pi-search" style="font-size: 1.4rem;"></i>
        Como funciona?
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          class="bg-[#2a2a2a] border border-support/10 rounded-xl p-6 relative overflow-hidden group hover:border-primary/50 transition-colors"
        >
          <div
            class="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center text-primary mb-4"
          >
            <i class="pi pi-globe" style="font-size: 1.4rem;"></i>
          </div>
          <h3 class="text-lg font-medium text-light mb-2">1. Cadastre seus Endpoints</h3>
          <p class="text-sm text-support/70">
            Adicione as URLs das suas APIs, sites ou serviços de banco de dados. Nós começaremos a
            enviar requisições periódicas imediatamente.
          </p>
        </div>

        <div
          class="bg-[#2a2a2a] border border-support/10 rounded-xl p-6 relative overflow-hidden group hover:border-primary/50 transition-colors"
        >
          <div
            class="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center text-secondary mb-4"
          >
            <i class="pi pi-chart-bar" style="font-size: 1.4rem;"></i>
          </div>
          <h3 class="text-lg font-medium text-light mb-2">2. Coleta de Métricas</h3>
          <p class="text-sm text-support/70">
            Registramos o tempo de resposta (latência) e o código de status HTTP de cada requisição
            para montar um histórico preciso de uptime.
          </p>
        </div>

        <div
          class="bg-[#2a2a2a] border border-support/10 rounded-xl p-6 relative overflow-hidden group hover:border-primary/50 transition-colors"
        >
          <div
            class="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center text-red-400 mb-4"
          >
           <i class="pi pi-bell" style="font-size: 1.4rem;"></i>
          </div>
          <h3 class="text-lg font-medium text-light mb-2">3. Alertas e Incidentes</h3>
          <p class="text-sm text-support/70">
            Se um serviço parar de responder ou retornar erros 5xx, o sistema registra um incidente
            e altera o status do dashboard em tempo real.
          </p>
        </div>
      </div>
    </section>

    <hr class="border-support/10" />

    <section class="max-w-3xl mx-auto">
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold text-light">Perguntas Frequentes</h2>
        <p class="text-support mt-2">Tire suas dúvidas sobre o funcionamento da plataforma.</p>
      </div>

      <div class="space-y-3">
        <FaqAccordion
          v-for="(faq, index) in faqs"
          :key="index"
          :question="faq.question"
          :answer="faq.answer"
        />
      </div>
    </section>
  </div>
</template>
