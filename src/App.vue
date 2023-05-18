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
        <li>
          <RouterLink to="/offres/bysurface100">Maison de plus de 100m2</RouterLink>
        </li>
        <li>
          <RouterLink to="/offres/bysurface/130"
            >Maison de plus de 130m2 (route dynamique)</RouterLink
          >
        </li>
        <li>
          <RouterLink to="/agents">Tous les agents</RouterLink>
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
