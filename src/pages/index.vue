<script setup lang="ts">
import MaisonCard from '@/components/MaisonCard.vue'
import { allMaisonFavori } from '@backend'

const maisonsListe = await allMaisonFavori()
console.log(maisonsListe)
</script>

<template>
  <div>
    <!-- clone de uneMaison par { ...spread syntax } car sinon bug -->
    <MaisonCard v-for="uneMaison of maisonsListe" :v-key="uneMaison.id" v-bind="{ ...uneMaison }" />
  </div>
</template>
