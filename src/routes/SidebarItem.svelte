<script lang="ts">
  let { href = "#", name = "", isActive = false, time = undefined } = $props();
  function getTimeUnit(time?: number) {
    if (time) {
      return time > 60 ? "hrs" : "mins";
    }
    return null;
  }
  let timeUnit = getTimeUnit(time as number);
  let timeValue = (time as number) > 60 ? Math.round((time as number) / 60).toFixed(2) : time;
</script>

<a {href} data-active={isActive} aria-current={isActive ? "page" : undefined}>
  <span class="name-block">
    <span class="icon"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="800"
        height="800"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="#000"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 17h6m-6-3h6M13.0004 3.00087C12.9048 3 12.7974 3 12.6747 3H8.2002c-1.12011 0-1.68058 0-2.1084.21799-.37633.19174-.68207.49748-.87381.87381C5 4.51962 5 5.08009 5 6.2002v11.6c0 1.1201 0 1.6799.21799 2.1077.19174.3763.49748.6826.87381.8743C6.51921 21 7.079 21 8.19694 21h7.60616c1.1179 0 1.6769 0 2.1043-.2178.3763-.1917.6831-.498.8748-.8743C19 19.4805 19 18.9215 19 17.8036V9.32568c0-.12266-.0001-.23015-.001-.32568m-5.9986-5.99913c.2854.00261.4653.0132.6378.0546.2041.04899.3997.12979.5786.23945.2018.12365.375.29689.7207.64258l3.1255 3.12548c.3459.34591.5179.51838.6416.72021.1096.17895.1907.37407.2397.57814.0414.17246.0521.35321.0547.63867m-5.9986-5.99913L13 5.80021c0 1.1201 0 1.67994.218 2.10776.1917.37633.4975.68251.8738.87426C14.5192 9 15.079 9 16.1969 9h2.8021"
        />
      </svg></span
    >
    <span class="text">{name}</span>
  </span>
  {#if time}
    <span title="{timeValue}{timeUnit}">
      <span class="pill">
        <svg
          class="pill-icon"
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
        {timeValue}
        {timeUnit}</span
      >
    </span>
  {/if}
</a>

<style>
  a {
    padding: calc(var(--unit-1) / 4);
    text-decoration: none;
    background-color: var(--gray-1);
    color: var(--gray-4);
    border-radius: calc(var(--unit-1) / 4);
    display: flex;
    justify-content: space-between;
    align-items: center;

    & span {
      display: flex;
      align-items: center;
    }

    & .name-block {
      display: flex;
      gap: calc(var(--unit-1) / 4);
    }

    & .icon {
      width: var(--unit-2);
      height: var(--unit-2);
      opacity: 0.5;

      & svg {
        display: block;
        width: 100%;
        height: auto;
      }
    }

    & .pill {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: calc((var(--unit-1) / 5) * 3);
      height: var(--unit-1);
      background: var(--gray-4);
      padding: 3px 4px;
      border-radius: 4px;
      line-height: 1;
      color: var(--gray-1);
      gap: calc(var(--unit-1) / 6);
      & .pill-icon {
        display: block;
        width: calc(var(--unit-1) - 4px);
        height: auto;
      }
    }

    &[data-active="true"] {
      background: var(--gray-2);
      color: var(--text);

      & .icon {
        opacity: 1;
      }

      & .pill {
        background: var(--orange);
      }
    }
  }
</style>
