<script setup lang="ts">
import { allHousesByAgentId } from '@backend'
import MaisonCard from '@/components/MaisonCard.vue'
import type { MaisonResponse } from '@types'

const props = defineProps<{
  id: string
}>()
const unAgent = await allHousesByAgentId(props.id)
const maisonsListe: MaisonResponse[] = unAgent?.expand?.['maison(agent)'] ?? []
</script>
<template>
  <div>
    <h1 class="text-xl">Les maisons de l'agent : {{ unAgent.nomAgent }}</h1>
    <MaisonCard v-for="uneMaison of maisonsListe" v-bind="{ ...uneMaison }" />
  </div>
</template>
