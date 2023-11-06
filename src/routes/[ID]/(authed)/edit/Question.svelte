<script lang="ts">
    import MultipleResponse_v2 from './MultipleResponseQuestion.svelte'
    import MultipleChoice_v2 from './MultipleChoiceQuestion.svelte'
    import MatchingQuestion from './MatchingQuestion.svelte'
    // import { set } from "$lib/accumulator";
    import { createEventDispatcher, tick } from 'svelte';
    import { kinds } from '$lib/kinds';
    import { updated } from '$lib/state';
    export let question: QuestionType;

	const dispatch = createEventDispatcher();

    const kindToComponent: {[_ in Kind]: any} = {
        "multipleChoice": MultipleChoice_v2,
        "multipleResponse": MultipleResponse_v2,
        "matching": MatchingQuestion,
        "ordering": null,
        "trueOrFalse": null
    }

    let id = question._id;

</script>

<div class="flex lg:w-1/2 md:w-2/3 relative flex-col bg-slate-100 p-2 gap-y-1 border-1 rounded">
    <div class="grid grid-cols-5 grid-rows-2 gap-2 items-center">
        <label for="question_{id}" class="row-start-1 col-start-1 col-end-2">Вопрос</label>
        <input on:input={() => {$updated = $updated.add(question._id)}} name="question_{id}" id="question_{id}" bind:value={question.name} class="row-start-1 col-start-2 z-20 col-end-6 border hover:bg-slate-50"/>

        <label for="kind_{id}" class="row-start-2 col-start-1 col-end-2">Вид вопроса</label>
        
        <div class="row-start-2 col-start-2 col-end-6 border">{kinds.find((k) => k.id == question.kind)?.name}</div>
        <!--
        <input type="hidden" name="kind_{id}" value={question.kind}/>
        <select name="kind_{id}" id="kind_{id}" disabled value={question.kind} class="row-start-2 col-start-2 col-end-6 border">
            <option selected value="multipleChoice">один правильный ответ</option>
            <option value="multipleResponse">один или несколько правильных ответов</option>
            <option value="matching">сопоставление</option>
            <option value="sequence">последовательность</option>
        </select>
        -->
    </div>

    <svelte:component this={kindToComponent[question.kind]} bind:question></svelte:component>

    <button on:click={() => {dispatch("remove", {id: question._id})}} type="button" class="absolute hover:scale-125 transition-transform -right-6 bottom-1/2">
        <img src="/images/trash.svg" class="h-4 w-4 transition-all" alt="remove question"/>
    </button>

    <!--
    {#if show}
    <div class="flex flex-row-reverse items-center z-20 absolute gap-x-1 -right-3 -top-3">
        <button on:click={() => {dispatch("new_before")}} type="button" class="peer">
            <img src="/images/plus-square-fill.svg" class="h-4 w-4" alt="new question top"/>
        </button>
        <span class="opacity-0 p-1 transition-opacity bg-black text-slate-50 peer-hover:opacity-100 text-xs -left-36" >добавить новый вопрос сверху</span>
    </div>

    <div class="flex flex-row-reverse items-center z-20 absolute gap-x-1 -right-3 -bottom-3">
        <button on:click={() => {dispatch("new_after")}} type="button" class="peer">
            <img src="/images/plus-square-fill.svg" class="h-4 w-4" alt="new question bottom"/>
        </button>
        <span class="opacity-0 p-1 bg-black text-slate-50 peer-hover:opacity-100 transition-opacity peer-hover:visible text-xs -left-36" >добавить новый вопрос снизу</span>
    </div>

    {/if}
-->
</div>