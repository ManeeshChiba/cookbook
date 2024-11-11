<script lang="ts">
  import Header from "./Header.svelte";
  import Sidebar from "./Sidebar.svelte";
  import "../reset.css";
  import "../app.css";

  let { children } = $props();
</script>

<div class="app">
  <!-- <Header /> -->

  <main class="layout">
    <nav>
      <Sidebar />
    </nav>
    <section>{@render children()}</section>
  </main>

  <!-- <footer>
    <p>
      visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to learn about SvelteKit
    </p>
  </footer> -->
</div>

<style>
  .layout {
    display: grid;
    grid-template-columns: 300px auto;
    grid-template-rows: 1fr;
    min-height: 100dvh;

    & nav {
      background: var(--gray-1);
      height: 100dvh;
      overflow: scroll;
    }
    & section {
      height: 100dvh;
      overflow: scroll;
    }
  }
</style>
