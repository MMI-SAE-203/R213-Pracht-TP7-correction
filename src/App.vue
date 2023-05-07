<script setup lang="ts">
//
</script>

<template>
  <header>
    <h1 class="text-4xl">Test</h1>
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
  </header>

  <main class="pt-8">
    <Suspense>
      <RouterView />
    </Suspense>
  </main>
</template>
