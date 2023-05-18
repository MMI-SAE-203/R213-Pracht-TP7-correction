<script setup lang="ts">
import { oneID } from '@backend'
import MaisonCard from '@/components/MaisonCard.vue'

const props = defineProps<{
  id: string
}>()
const uneMaison = await oneID(props.id)
</script>
<template>
  <div>
    <h1 class="text-xl">Une maison</h1>
    <MaisonCard v-bind="{ ...uneMaison }" />
  </div>
</template>
