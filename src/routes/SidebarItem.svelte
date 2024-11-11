<script>
  let { href = "#", name = "", isActive = false } = $props();
</script>

<a {href} data-active={isActive} aria-current={isActive ? "page" : undefined}>
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
</a>

<style>
  a {
    padding: calc(var(--unit-1) / 4);
    text-decoration: none;
    background-color: var(--gray-1);
    color: var(--gray-4);
    border-radius: calc(var(--unit-1) / 4);
    display: flex;
    gap: calc(var(--unit-1) / 4);
    flex: var(--unit-1) auto;

    & span {
      display: block;
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

    &[data-active="true"] {
      background: var(--gray-2);
      color: var(--text);

      & .icon {
        opacity: 1;
      }
    }
  }
</style>
