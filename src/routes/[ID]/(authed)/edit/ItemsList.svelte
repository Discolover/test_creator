<script lang="ts">
	export let items: {_id: ID, name: string, order: number}[];
	import MoveButton from "./MoveButton.svelte";
    // import { accumulator, set } from "$lib/accumulator";
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let selected = -1

	function push(e: FocusEvent) {
		if (newOption.length > 0) {
			dispatch('push', {name: newOption});
			dispatch('update');
			newOption = ""
		}
	}

	let newOption = ""; 

	function upItem() {
		if (selected <= 0) {
			let item = items.shift()
			items = [...items, item!]
			selected = items.length - 1
			console.log(items)
		} else {
			let tmp = items[selected]
			items[selected] = items[selected - 1]
			items[selected - 1] = tmp
			--selected;
		}
		for (let i = 0; i < items.length; ++i) {
			items[i].order = i;
		}
		dispatch('update');
	}

	function downItem() {
		if (selected + 1 >= items.length) {
			let item = items.pop()
			items = [item!, ...items]
			selected = 0
		} else {
			let tmp = items[selected]
			items[selected] = items[selected + 1]
			items[selected + 1] = tmp
			++selected;
		}
		for (let i = 0; i < items.length; ++i) {
			items[i].order = i;
		}
		dispatch('update');
	}

	function input() {
		dispatch('update');
	}

	function remove(e: CustomEvent) {
		selected = -1;
		dispatch("update");
		dispatch("remove", e.detail);
	}
</script>

{#each items as item, i (item._id)}
  <div class="flex border p-1 bg-slate-200 transition-all relative justify-between gap-x-8 items-center {selected === i ? "bg-slate-400 border-black" : ""}">
	<slot index={i}/>
	<input on:input={input} name="option_{item._id}" bind:value={item.name}
		class="flex-auto border p-1"
	/>
	<MoveButton id={item._id} index={i} show={selected === i}
		on:close={() => {selected = -1}}
		on:click={() => {selected = i}} on:remove={remove} on:up={upItem} on:down={downItem}
	/>
  </div>
{/each}

<div class="p-1 flex border justify-between gap-x-8 items-center">
	<slot name="disabled"/>
    <input on:blur={push} placeholder="Добавить другой ответ" bind:value={newOption} class="flex-auto border p-1"/>
    <img class="invisible" alt="menu" src="/images/list.svg">
</div>

{#if newOption.length > 0}
<div class="p-1 flex border justify-between gap-x-8 items-center">
	<slot name="disabled"/>
    <input placeholder="Добавить другой ответ" class="flex-auto border p-1"/>
    <img class="invisible" alt="menu" src="/images/list.svg">
</div>
{/if}