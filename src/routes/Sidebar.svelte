<script lang="ts">
  import { page } from "$app/stores";
  import type { RecipeResponse } from "../types/types";
  import { labelize } from "../utils";
  import SidebarItem from "./SidebarItem.svelte";

  import { onMount } from "svelte";
  let data;
  let grouppedRecipes: RecipeResponse = {};

  onMount(async () => {
    data = await fetch("/recipe").then((x) => x.json());
    grouppedRecipes = data;
  });

  function isSelected(id: string) {
    return $page.url.pathname === `/${id}`;
  }
</script>

{#each Object.keys(grouppedRecipes) as course}
  <div class="nav-section">
    <h4>{course}</h4>
    {#if grouppedRecipes[course]}
      {#each Object.keys(grouppedRecipes[course]) as recipe}
        <SidebarItem
          href="/{recipe}"
          name={labelize(recipe)}
          isActive={isSelected(recipe)}
          time={grouppedRecipes[course][recipe].totalTimeMinutes}
        />
      {/each}
    {/if}
  </div>
{/each}

<style>
  .nav-section {
    display: flex;
    flex-direction: column;
    padding: calc(var(--unit-1) / 2) var(--unit-1);
    /* &:first-of-type {
      padding-block-start: calc(var(--unit-2) * 2);
    } */
    & h4 {
      font-size: 12px;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      font-family: var(--font-body);
      font-weight: 700;
      margin-bottom: calc(var(--unit-1) / 3);
      color: var(--gray-4);
    }
  }
</style>
