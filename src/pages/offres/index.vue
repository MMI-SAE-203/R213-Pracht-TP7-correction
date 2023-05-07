<script setup lang="ts">
import MaisonCard from '@/components/MaisonCard.vue'
import { allMaisonsSorted } from '@/backend'

const maisonsListe = await allMaisonsSorted()
console.log(maisonsListe)
</script>

<template>
  <div>
    <h1 class="pb-8 text-xl">Toutes les offres</h1>
    <MaisonCard v-for="uneMaison of maisonsListe" :v-key="uneMaison.id" v-bind="{ ...uneMaison }" />
  </div>
</template>
