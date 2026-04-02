# SentinelVVP

O **SentinelVVP** é um serviço de monitoramento de disponibilidade (uptime) e performance de serviços web.

A aplicação permite que usuários cadastrem URLs e endpoints para monitoramento contínuo, realizando verificações periódicas e detectando instabilidades ou quedas em tempo real.

## Principais Funcionalidades

- Monitoramento automático de serviços via HTTP ou PING  
- Medição de latência e tempo de resposta  
- Alertas em tempo real via Webhooks (ex: Discord, Telegram)  
- Dashboard com histórico de uptime e disponibilidade (SLA)  

## Arquitetura

O sistema é dividido em três partes principais:

- **Backend:** API REST responsável por autenticação, gerenciamento de usuários e monitores, além da orquestração das tarefas  
- **Worker:** Serviço dedicado ao processamento das verificações e coleta de métricas de performance  
- **Frontend:** Interface web para visualização dos dados, configuração de monitores e acompanhamento do sistema  

## Tecnologias

- **Backend:** Node.js (Express + TypeScript), PostgreSQL, Redis, BullMQ  
- **Worker:** C# (.NET)  
- **Frontend:** Vue 3 (Vite), Tailwind CSS, Chart.js / ApexCharts  

## Objetivo

O projeto busca aplicar conceitos de confiabilidade e escalabilidade, permitindo monitoramento preciso de serviços e fácil expansão através de processamento distribuído.