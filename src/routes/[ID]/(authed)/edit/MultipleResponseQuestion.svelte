<script lang="ts">
    // import { set } from "$lib/accumulator";
    import { uuid } from "$lib/uuid";
    import ItemsList from "./ItemsList.svelte";
    import { updated } from "$lib/state";
    export let question: MultipleResponse;

    function change(index: number) {
        question.options[index].isCorrect = !question.options[index].isCorrect
        update();
    }

    function remove(e: CustomEvent) {
        console.assert('id' in e.detail)
        question.options = question.options.filter((o) => o._id !== e.detail.id);
    }

    function push(e: CustomEvent) {
        console.assert('name' in e.detail)
        question.options = [
            ...question.options,
            { 
                name: e.detail.name, 
                _id: uuid(), 
                order: question.options.length ,
                isCorrect: false
            }
        ]
    }

    function update() {
        $updated = $updated.add(question._id)
    }
</script>

<ItemsList on:update={update} on:push={push} on:remove={remove} bind:items={question.options} let:index>
    <input on:change={() => {change(index)}}
        checked={question.options[index].isCorrect} type="checkbox"
        name="multipleChoice_{question.options[index]._id}"
    />
    <input disabled slot="disabled" type="checkbox"/>
</ItemsList>