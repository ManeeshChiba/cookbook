<script>
    import SidebarItem from "./SidebarItem.svelte";
</script>

<div class="nav-section">
    <h4>Recipes</h4>
    <SidebarItem href="#" name="Pancakes" />
    <SidebarItem href="#" name="Potatoe Curry" isActive />
    <SidebarItem href="#" name="Chicken Pot Pie" />
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
            letter-spacing: .5px;
            text-transform: uppercase;
            font-family: var(--font-body);
            font-weight: 700;
            margin-bottom: calc(var(--unit-1) /3);
            color: var(--gray-4);
        }
    }
</style>