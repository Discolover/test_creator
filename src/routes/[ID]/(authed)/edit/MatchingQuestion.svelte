<script lang="ts">
    import { updated } from "$lib/state";
    import { uuid } from "$lib/uuid";
    import ItemsList from "./ItemsList.svelte";
    export let question: Matching;

    function change(e: Event, index: number) {
        if (e.target === null) {
            return
        }
        let target: HTMLSelectElement = e.target as HTMLSelectElement
        question.matching[index].matches = parseInt(target.value)
        update();
    }

    function remove(e: CustomEvent) {
        console.assert('id' in e.detail)
        question.matched = question.matched.filter((o) => o._id !== e.detail.id);
        question.matching = question.matching.filter((o) => o._id !== e.detail.id);
    }

    function pushMatching(e: CustomEvent) {
        console.assert('name' in e.detail)
        question.matching = [
            ...question.matching,
            { 
                name: e.detail.name,
                _id: uuid(),
                matches: 0,
                order: question.matching.length
            }
        ]
    }

    function pushMatched(e: CustomEvent) {
        console.assert('name' in e.detail)
        question.matched = [
            ...question.matched,
            { 
                name: e.detail.name,
                _id: uuid(),
                order: question.matched.length 
            }
        ]
    }

    function update() {
        $updated = $updated.add(question._id)
    }

</script>

<ItemsList on:update={update} on:push={pushMatching} on:remove={remove} bind:items={question.matching} let:index>
    <select on:change={(e) => {change(e, index)}} name="matching-{question._id}">
    {#each question.matched as _, i}
        <option selected={question.matching[index].matches === i}
            value="{i}">{i + 1}
        </option>
    {/each}
    </select>

    <select slot="disabled" class="invisible">
        <option value="">0</option>
    </select>
</ItemsList>

<hr class="border-2 border-neutral-600"/>

<ItemsList on:update={() => {$updated = $updated.add(question._id)}} on:push={pushMatched} on:remove={remove} bind:items={question.matched} let:index>
    <div>{index + 1}</div>
    <div slot="disabled" class="invisible">0</div>
</ItemsList>