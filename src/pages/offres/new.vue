<script setup lang="ts">
import type { MaisonRecord, MaisonResponse } from '@types'
import { ref } from 'vue'
import type { FormKitSchemaFormKit, FormKitNode } from '@formkit/core'
import { ajoutMaison } from "@backend";
import { useRouter } from 'vue-router';
import { ClientResponseError } from "pocketbase";

const router = useRouter()

type FormKitS<T> = FormKitSchemaFormKit & {
  name: keyof T
}
const nvlMaison = ref<MaisonResponse>()

// cette façon de faire garentie de ne pas se tromper de nom de champ
const schema: FormKitS<MaisonRecord>[] = [
  {
    name: 'nomMaison',
    $formkit: 'text',
    label: 'Nom de la maison'
  },
  {
    name: 'adresse',
    $formkit: 'text',
    label: 'Adresse'
  },
  {
    name: 'surface',
    $formkit: 'number',
    label: 'Surface'
  },
  {
    name: 'prix',
    $formkit: 'number',
    label: 'Prix',
    step: 1000
  },
  {
    name: 'nbChambres',
    $formkit: 'number',
    label: 'Nombre de chambres',
  },
  {
    name: 'nbSdb',
    $formkit: 'number',
    label: 'Nombre de salles de bain',
  },
  {
    name:'favori',
    $formkit: 'checkbox',
    label: 'Favori'
  }
]

async function submitForm(data: MaisonResponse, node?: FormKitNode<MaisonResponse>) {
  try {
    const record = await ajoutMaison(data)
    node?.setErrors([])
    router.push({ name: 'offres-id', params: { id: record.id } })
  } catch (error) {
    if (error instanceof ClientResponseError) {
      node?.setErrors([error.message])
    }
    console.error(error)
  } 
}
</script>
<template>
  <FormKit
    type="form"
    v-model="nvlMaison"
    submit-label="Ajouter une maison"
    @submit="submitForm"
    :config="{
      /* classes:generateClasses({})
      Voir /src/main.ts mais possible de styler ici */
    }"
  > 
  <!-- Les champs son défini dans le schéma et typés par TypeScript -->
    <FormKitSchema :schema="schema" />
</FormKit>
</template>
