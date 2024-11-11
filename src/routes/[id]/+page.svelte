<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { navigating } from "$app/stores";
  import {
    labelize,
    stepsToText,
    type CookwareStep,
    type IngredientStep,
    type Step
  } from "../../utils";
  $: if ($navigating) onNavigate();

  interface DataProps {
    ingredients: IngredientStep[];
    steps: Array<Step[]>;
    cookwares: CookwareStep[];
  }

  let data: DataProps;
  let id: string = $page.params.id;
  let stepsArray: string[] = [];

  async function populateData(id: string) {
    data = await getRecipe(id);
    stepsArray = stepsToText(data.steps);
  }

  async function getRecipe(id: string) {
    return await fetch(`/recipe/${id}`).then((x) => x.json());
  }

  onMount(async () => {
    id = $page.params.id;
    populateData(id);
  });

  function onNavigate() {
    if ($navigating) {
      id = ($navigating?.to?.params && $navigating?.to?.params.id) ?? "";
      if (id) {
        populateData(id);
      }
    }
  }
</script>

<section>
  <article>
    <h1>{labelize(id)}</h1>
    <div class="mise-en-place">
      <div class="ingredients">
        <h3>Ingredients</h3>
        <ul>
          {#if data?.ingredients}
            {#each data.ingredients as ingredient}
              <li>{labelize(ingredient.name)} ({ingredient.quantity} {ingredient.units})</li>
            {/each}
          {/if}
        </ul>
      </div>
      <div class="cookware">
        <h3>Cookware</h3>
        <ul>
          {#if data?.cookwares}
            {#each data.cookwares as cookware}
              <li>{cookware.quantity} {labelize(cookware.name)}</li>
            {/each}
          {/if}
        </ul>
      </div>
    </div>
    <h3>Method</h3>
    <ol>
      {#each stepsArray as step}
        <li>{step}</li>
      {/each}
    </ol>
  </article>
</section>

<style>
  article {
    max-width: 60ch;
    margin: calc(var(--unit-2) * 2) auto 0;
    padding: 0 var(--unit-1) var(--unit-3);
  }

  .mise-en-place {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--unit-1);
    margin-top: var(--unit-1);
    margin-bottom: var(--unit-2);
  }

  h1 {
    font-size: 2.25rem;
    margin-bottom: var(--unit-2);
  }

  h3 {
    font-size: 1.25rem;
    margin-bottom: var(--unit-1);
  }
  ol,
  ul {
    padding: 0;
    list-style-position: inside;
  }
  ul {
    list-style-type: none;
  }
  li {
    font-family: var(--font-headings);
    margin-bottom: var(--unit-1);
  }

  ul li {
    margin-bottom: calc(var(--unit-1) / 2);
  }

  ol li {
    --half: calc(var(--unit-1) / 2);
    margin: calc(var(--half) * -1) 0;
    padding: var(--half);
    border-radius: var(--half);

    &:hover {
      cursor: pointer;
      background: color-mix(in srgb, var(--orange), white 90%);
    }
  }
</style>
