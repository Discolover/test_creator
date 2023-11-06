<script lang="ts">
    import ItemsList from "./ItemsList.svelte";
    import { updated } from "$lib/state";
    export let question: MultipleChoice;
    // import { set } from "$lib/accumulator";
    import { uuid } from "$lib/uuid";

    function change(index: number) {
        question.correct = question.options[index]._id;
        update()
    }

    function remove(e: CustomEvent) {
        console.assert('id' in e.detail)
        question.options = question.options.filter((o) => o._id !== e.detail.id);
    }

    function push(e: CustomEvent) {
        console.assert('name' in e.detail)
        question.options = [
            ...question.options,
            { name: e.detail.name, _id: uuid(), order: question.options.length }
        ]
    }

    function update() {
        $updated = $updated.add(question._id)
    }

</script>

<ItemsList on:update={update} on:push={push} on:remove={remove} bind:items={question.options} let:index>
    <input on:change={() => {change(index)}}
        checked={question.options[index]._id === question.correct} type="radio"
        name="multipleChoice_{question.options[index]._id}"
    />
    <input disabled slot="disabled" type="radio" name="multipleChoice"/>
</ItemsList>