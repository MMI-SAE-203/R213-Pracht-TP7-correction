<script setup lang="ts">
import MaisonCard from '@/components/MaisonCard.vue'
import { allAgents } from '@backend'

const agentsListe = await allAgents()
console.log(agentsListe)
</script>

<template>
  <div>
    <h1 class="pb-8 text-xl">Tous les agents</h1>
    <ul>
      <li v-for="unAgent of agentsListe" :v-key="unAgent.id" v-bind="{ ...unAgent }">
        <RouterLink
          :to="{
            name: 'agents-id',
            params: {
              id: unAgent.id
            }
          }"
          class="text-red-400 hover:text-red-600"
        >
          {{ unAgent.nomAgent }}
        </RouterLink>
      </li>
    </ul>
  </div>
</template>
