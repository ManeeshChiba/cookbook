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
    metadata?: Record<string, string>;
  }

  let data: DataProps;
  let id: string = $page.params.id;
  let stepsArray: string[] = [];
  let totalTimeMinutes = null;

  function getTimeUnit(time?: number) {
    if (time) {
      return time > 60 ? "hrs" : "mins";
    }
    return null;
  }
  let timeUnit: string | null = null;
  let timeValue: string | null = null;

  async function populateData(id: string) {
    data = await getRecipe(id);
    stepsArray = stepsToText(data.steps);
    totalTimeMinutes = collectTimes(data.steps);
    timeUnit = getTimeUnit(totalTimeMinutes as number);
    timeValue =
      (totalTimeMinutes as number) > 60
        ? Math.round((totalTimeMinutes as number) / 60)
        : totalTimeMinutes;
  }

  async function getRecipe(id: string) {
    return await fetch(`/recipe/${id}`).then((x) => x.json());
  }

  function collectTimes(steps: any[]) {
    return steps
      .flatMap((step: any) => step)
      .filter((step: { type: string }) => step.type == "timer")
      .map((step: { units: any; quantity: any }) => {
        switch (step.units) {
          case "min":
          case "minute":
          case "minutes":
            return parseInt(`${step.quantity}`);
          case "hrs":
          case "hour":
          case "hours":
            return parseInt(`${step.quantity}`) * 60;
          default:
            return parseInt(`${step.quantity}`);
        }
      })
      .reduce((partialSum: any, a: any) => partialSum + a, 0);
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
    <header>
      <h1>{labelize(id)}</h1>
      <div class="time-block">
        <svg
          class="time-icon"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Calendar / Clock">
            <path
              id="Vector"
              d="M12 7V12H17M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
        </svg>
        {timeValue}{timeUnit}
      </div>
    </header>
    <div class="mise-en-place">
      <div class="ingredients">
        <h3>Ingredients</h3>
        <ul>
          {#if data?.ingredients}
            {#each data.ingredients as ingredient}
              <li>
                {#if ingredient.quantity !== "some"}
                  {ingredient.quantity}
                  {#if ingredient.units === "pinch"}
                    &nbsp;{ingredient.units}
                  {:else}
                    {ingredient.units}
                  {/if}
                {/if}
                {labelize(ingredient.name)}
              </li>
            {/each}
          {/if}
        </ul>
      </div>
    </div>
    <div class="bottom-block">
      <div class="method">
        <h3>Method</h3>
        <ol>
          {#each stepsArray as step}
            {#if step.includes("HEADING:")}
              <h4>{step.replace("HEADING:", "")}</h4>
            {:else}
              <li>{step}</li>
            {/if}
          {/each}
        </ol>
      </div>
      {#if data?.metadata?.Notes}
        <div class="notes">
          <h3>Notes</h3>
          <ul>
            <li>Here is one note</li>
            <li>And another is one note</li>
            <li>Look one more note</li>
            <!-- {#each data.metadata.Notes as cookware}
              <li>{cookware.quantity} {labelize(cookware.name)}</li>
            {/each} -->
          </ul>
        </div>
      {/if}
    </div>
  </article>
</section>

<style>
  article {
    max-width: 90ch;
    margin: calc(var(--unit-2) * 2) auto 0;
    padding: 0 calc(var(--unit-3) * 1) var(--unit-3);
  }

  .mise-en-place {
    margin-top: var(--unit-1);
    margin-bottom: var(--unit-2);
  }

  .method {
    max-width: 60ch;
  }

  .ingredients {
    & ul {
      column-count: 3;
      column-gap: var(--unit-1);
    }
  }

  .notes {
    margin: var(--unit-1) 0;
    & ul {
      list-style-type: circle;
    }
  }

  header {
    margin-bottom: var(--unit-2);
    border-bottom: 1px solid var(--gray-2);
    padding-bottom: var(--unit-1);
  }

  .time-block {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: calc(var(--unit-1) - 2px);
    color: var(--gray-4);
    & .time-icon {
      display: block;
      max-height: calc(var(--unit-1) - 2px);
      width: auto;
    }
  }

  h1 {
    font-size: 2.25rem;
  }

  h3 {
    font-size: 1.25rem;
    margin-bottom: var(--unit-1);
  }
  h4 {
    margin-block: var(--unit-1);
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
    margin-inline-start: calc(var(--half) * -1);
    padding: var(--half);
    border-radius: var(--half);

    &:hover,
    &:focus,
    &:active {
      cursor: pointer;
      background: color-mix(in srgb, var(--orange), white 90%);
    }
  }
</style>
