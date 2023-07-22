<template>
  <nav>
    <div class="container">
      <div class="columns is-vcentered">
        <div class="column is-narrow">
          <span class="nav-item">Source</span>
        </div>
        <div class="column is-narrow">
          <span class="nav-line"></span>
        </div>
        <div class="column is-narrow">
          <span class="nav-item">Prompt</span>
        </div>
      </div>
    </div>
  </nav>
</template>

<style>
nav {
  margin-top: 2rem;
}

.nav-item {
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
}

.nav-line {
  /* the element should appear as a horiztontal line */
  border-top: 1px solid #ddd;
  display: block;
  height: 0;
  width: 50px;
}
</style>
