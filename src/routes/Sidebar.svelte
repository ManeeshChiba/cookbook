<script lang="ts">
  import { page } from "$app/stores";
  import type { LookupObject } from "../types/lookupTypes";
  import { labelize } from "../utils";
  import SidebarItem from "./SidebarItem.svelte";

  import { onMount } from "svelte";
  let data;
  let recipes: string[] = [];
  let lookup: LookupObject = {};
  onMount(async () => {
    data = await fetch("/recipe").then((x) => x.json());
    recipes = data;
    lookup = window.lookup as LookupObject;
  });

  function isSelected(id: string) {
    return $page.url.pathname === `/${id}`;
  }
</script>

<div class="nav-section">
  <!-- App Icon here -->
  <h4>Recipes</h4>
  {#each recipes as recipe}
    <SidebarItem
      href="/{recipe}"
      name={labelize(recipe)}
      isActive={isSelected(recipe)}
      time={lookup[recipe]?.totalTimeMinutes}
    />
  {/each}
</div>

<style>
  .nav-section {
    display: flex;
    flex-direction: column;
    padding: var(--unit-2) var(--unit-1);
    &:first-of-type {
      padding-block-start: calc(var(--unit-2) * 2);
    }
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
