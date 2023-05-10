# Composant avec paramètre

Nécessite Vue 3.3 encore en bêta. Si erreur à l'installation des dépendances, faire :

```
npm install --force
```

# Travail TP2

[Travail TP3](#Travail%20TP3) plus bas

## PocketBase

Copier le dossier `pocketbase` fait (en R214 | Système d'information) dans ce projet.

### Générations des types des tables PocketBase

Utilise [PocketBase typegen](typegen). Dans le terminal, faire :

```
npx pocketbase-typegen --db ./pocketbase/pb_data/data.db --out ./src/pocketbase-types.ts
```

Ou, comme le script a été ajouté au [`package.json`](./package.json#L13) :

```
npm run typegen
```

[typegen]: https://github.com/patmood/pocketbase-typegen#quickstart

### Importation manuelle des données

#### La variable :

Lancer manuellement (F5) le `backend.mjs` qui devrait afficher dans la console la liste des `maisons`.

Dans le `<script setup>` de [`/src/App.vue`](/src/App.vue), ajoutez :

```ts
const maisonsListe = /* coller ici le tableau d'objet */
```

#### Le type :

Toujours dans `App.vue` :

- Ajouter l'import du type `MaisonResponse` depuis `@/pocketbase-types` (idem CM/TD).
- Spécifier le type `maisonsListe` :
  ```ts
  const maisonsListe:MaisonResponse[] = /* ... */
  ```
- Vérifiez que l'éditeur ne signale pas d'erreurs.
  - Supprimer la propriété `expand`
  - Remplacer la valeur `"maison"` de la propriété `"collectionName"` par : `Collections.Maison`
    - Vérifier que l'import de `Collections` a bien été ajouté

## Le composant `MaisonCard.vue`

### Code du composant

Faire le fichier [`/src/components/MaisonCard.vue`](/src/components/MaisonCard.vue)\
Prendre modèle sur le CM/TD [`PersonneCard.vue`](https://github.com/ppierre/vue-base-tailwind/tree/vue3.3-test-personne#composant-avec-param%C3%A9tre)

Pour le code du template, vous pouvez utiliser un des plugins Figma suivants :

- [Inspect - Export to HTML, React, Tailwin](https://www.figma.com/community/plugin/1049994768493726219) : donne un code HTML/Tailwind à coller dans `<template>`. Juste remplacer les textes par les interpolations (eg. `{{ maProp }}`)
- [AutoHTML](https://www.figma.com/community/plugin/1077172952654000760) : Fait un composant (choisir Vue et Taillwind en option). Mais pas en TypeScript, ni avec les types de PocketBase.

Pour les `props` du composant `MaisonCard`, bien utiliser le type générer automatiquement de PocketBase : `MaisonRecord` à importer de `/src/pocketbase-types.ts`.

Le code suivant doit fonctionner (s'assurer d'avoir au minimum `"vue": "^3.3.0-beta.5",` dans le `package.json`) :

```ts
import type { MaisonResponse } from '@/pocketbase-types'

const props: MaisonResponse = defineProps<MaisonResponse>()
```

Avant Vue 3.3 il fallait recopier le type :

```ts
const props = defineProps<{
  nomMaison: string
  prix: number
  images: string[]
  nbChambres: number
  nbSdb: number
  adresse: string
  surface: number
  favori: boolean
  id: string
  created: string
  updated: string
  collectionId: string
  collectionName: string
}>()
```

Rq. pour colorier le coeur si "favoris" : entourer le `<path>` du code suivant :

```html
<g :class="{ 'fill-red-400': favori }">
  <path ... />
</g>
```

On utilise la syntaxe de ["binding" des classes CSS par un objet][bindClass].

### Tester le composant

Dans le `<template>` de `App.vue`, ajouter :

```html
<MaisonCard v-bind="maisonsListe[0]" />
```

(Vérifiez que l'import du composant a été automatiquement ajouté.)

## Afficher les données

Afficher toutes les maisons avec un `v-for`comme [vu en CM/TD][CM-boucle-objet]

[CM-boucle-objet]: https://github.com/ppierre/vue-base-tailwind/tree/vue3.3-test-personne#usage-dans-une-boucle

## Afficher les images

Vous pouvez tester le code suivant ([PocketBase file url][pb-file-url]) :

- Remomer `backend.mjs` en `backend.ts` et exporter `pb`
- Le fichier `/src/components/MaisonCard.vue`

  ```html
  <script setup lang="ts">
    import { pb } from '@/backend'
    import type { MaisonResponse } from '@/pocketbase-types'

    // bug MaisonResponse
    const props: MaisonResponse = defineProps<MaisonResponse>()

    const img0 = props.images[0]
    // si pas d'image (undefined) garde undefined
    const urlImg0 = img0 && pb.getFileUrl(props, img0, { thumb:
  </script>
  ```

Il faut que :

- le client PocketBase soit installé (`npm i pocketbase`)
- le backend PocketBase soit lancé.
- le ficher `/src/backend.*` exporte `pb`

Attention si vous avez plusieurs images, utiliser `props.img[0]` , `props.img[1]` ...

## Si vous avez fini :

Afficher plusieurs fois la liste de `Maison` avec différent traitement :

- [`sort`][sort] : trier
- [`slice`][slice] : partie
- [`filter`][filter]: filtrer
- [`map`][map] : transformer
- ...

Exemple :

```js
const maisonsDePlusde100M2 = maisonsListe.filter(
  maison => /* teste si la superficie de `maison` est > 100 */
)
```

[sort]: https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
[slice]: https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
[filter]: https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
[map]: https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/map
[pb-file-url]: https://pocketbase.io/docs/files-handling/#file-url
[bindClass]: https://vuejs.org/guide/essentials/class-and-style.html#binding-to-objects

# Travail TP3

Mise à jour du code pour Vue Router / Vite Plugin Pages

- Quitter le serveur de développent (Vite) si nécessaire.
- Remplacer les fichiers par ceux fournis sur Moodle
  - `/src/main.ts` : Initialise Vue Router avec les `pages` générer par le Plugin Vite Pages.
  - `/env.d.ts` : Ajout TypeScript du Plugin Vite Pages
  - `/package.json` : Ajout packets `"vue-router"` et `"vite-plugin-pages"`
    - refaire dans le terminal : `npm i -f`
  - `/vite.config.ts` : Initialise le Plugin Pages dans
    le serveur Vite
  - `/README.md` : Les consignes qui sont mises à jour.

## La page d'accueil `/src/pages/index.vue`

- Copier `/src/App.vue` en `/src/pages/index.vue` et ne gardez que le contenu affichant la liste des maisons.
- Remplacer `/src/App.vue` par le code suivant :

  ```html
  <script setup lang="ts">
    //
  </script>

  <template>
    <header>
      <h1 class="text-4xl">Test avec "router"</h1>
    </header>

    <main>
      <!-- Suspense sera utile pour charger les données (await) -->
      <Suspense>
        <!-- Affiche la page -->
        <RouterView />
      </Suspense>
    </main>
  </template>
  ```

  Testez

## Chargement des données

Reprendre le `backend.ts` fait sous forme de fonstions.

Dans `/src/pages/index.vue`, remplacez le tableau par l'appel de la fonction de `/src/backend.ts` chargeant toutes les "offres" :

```ts
import { allMaisonsSorted } from '@/backend'

const maisonsListe = await allMaisonsSorted()
```

Et remplacer `v-bind="uneMaison"` par `v-bind="{ ...uneMaison }"` dans le template :

```html
<!-- clone de uneMaison par { ...spread syntax } car sinon bug -->
<MaisonCard v-for="uneMaison of maisonsListe" :v-key="uneMaison.id" v-bind="{ ...uneMaison }" />
```

A noter, faire un `await` dans `<script setup>` ne fonctionne que car l'on a mit <[RouterView]> dans un <[Suspense]>

[RouterView]: https://router.vuejs.org/guide/#router-view
[Suspense]: https://vuejs.org/guide/built-ins/suspense.html

Testez en allant à l'URL : http://localhost:5173/offres

**Important :** Apprenez à affichers les routes dans Vue DevTools (demandez).

## Menu de navigation

Pour les liens il est préferable d'utiliser le composant <[RouterLink]>

[RouterLink]: https://router.vuejs.org/api/interfaces/RouterLinkProps.html

Ajouter le menu dans `/src/App.vue` :

```html
<nav>
  <ul>
    <li>
      <RouterLink to="/">Accueil</RouterLink>
    </li>
    <li>
      <RouterLink to="/offres">Toutes les offres</RouterLink>
    </li>
  </ul>
</nav>
```

## Intro au paramétres de "routes"

Copier `/src/pages/offres/index.vue` en `/src/pages/offres/bySurface100.vue`.

Et remplacer dedans `allMaisonsSorted()` par `bySurface(100)`. (Ne pas oublier l'import.)

Ajouter un lien au menu pour la page.

### Si vous avez le temps

Renommer `bySurface100.vue` en `bySurface/[surface].vue`. C'est une [route dynamique][routesDynamiques].

Et utiliser la `props` recue (`string`) dans l'appel de `bySurface` aprés l'avoir convertie en nombre (`number`).

```ts
const props = defineProps<{ surface: string }>()
```

Testez en allant (par exemple) à l'URL : http://localhost:5173/offres/bysurface/130

[routesDynamiques]: https://github.com/hannoeru/vite-plugin-pages#dynamic-routes
