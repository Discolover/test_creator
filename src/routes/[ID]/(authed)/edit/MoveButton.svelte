<script lang="ts">
    import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
    export let show = false
    export let index: number;
    export let id: ID;
</script>

{#if show}
<button on:click type="button" class="invisible hover:bg-slate-200 p-1">
        <img alt="menu" src="/images/list.svg">
</button>
<div class="right-0 z-10 absolute flex border p-1 border-black bg-slate-400">
    <button type="button" on:click={() => {dispatch("remove", {index, id})}} class="hover:bg-slate-200 rounded">
        <img alt="remove" src="/images/trash.svg">
    </button>
    <button type="button" on:click={() => {dispatch("up")}} class="hover:bg-slate-200 pb-2 rounded">
        <img alt="up" src="/images/arrow-up.svg">
    </button>
    <button type="button" on:click={() => {dispatch("down")}} class="hover:bg-slate-200 pt-2 rounded">
        <img alt="down" src="/images/arrow-down.svg">
    </button>
    <button on:click={() => {dispatch("close")}} class="hover:bg-slate-300 rounded">
        <img src="/images/x.svg" alt="close" class="fill-slate-200"/>
    </button>
</div>
{:else}
    <button on:click type="button" class="hover:bg-slate-200">
        <img class="" alt="menu" src="/images/list.svg">
    </button>
{/if}