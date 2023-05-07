<script setup lang="ts">
import MaisonCard from '@/components/MaisonCard.vue'
import { allMaisonsFavori } from '@/backend'

const maisonsListe = await allMaisonsFavori()
console.log(maisonsListe)
</script>

<template>
  <div>
    <!-- clone de uneMaison par { ...spread syntax } car sinon bug -->
    <MaisonCard v-for="uneMaison of maisonsListe" :v-key="uneMaison.id" v-bind="{ ...uneMaison }" />
  </div>
</template>
