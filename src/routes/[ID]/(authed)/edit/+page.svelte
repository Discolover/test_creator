<script lang="ts">
  import { fade } from 'svelte/transition';
  import Question from "./Question.svelte";
  import { uuid } from "$lib/uuid.ts"
  import { page } from '$app/stores';
  import { removed, created, updated} from '$lib/state.ts';
  import { kinds } from '$lib/kinds.ts';
  import { examples } from '$lib/examples.ts';
  import {difference} from '$lib/set.ts';

  export let data;

  let questions: QuestionType[] = data.questions;
  
  async function save(e: MouseEvent) {
    $updated = difference(difference($updated, $created), $removed)

    let body = {
      remove: [...$removed],
      create: questions.filter((q) => $created.has(q._id)),
      update: questions.filter((q) => $updated.has(q._id))
    }

    const response = await fetch($page.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (response.ok) {
      console.log('Form submitted successfully!');
    } else {
      console.error('Form submission failed.');
    }

    $created.clear()
    $created = $created
    $removed.clear()
    $removed = $removed
    $updated.clear()
    $updated = $updated
  }

  function remove(e: CustomEvent) {
    console.assert('id' in e.detail)
    const id = e.detail.id
    questions = questions.filter((q) => q._id !== id)

    if ($created.has(id)) {
      $created.delete(id)
      $created = $created
    } else {
      $removed = $removed.add(id)
    }
  }

  function create(kind: Kind) {
    questions = [...questions, examples[kind]()]
    $created = $created.add(questions[questions.length - 1]._id)
  }

  $: console.log('removed', $removed)
  $: console.log('created', $created)
  $: console.log('updated', $updated)

</script>

<div class="flex gap-y-8 flex-col items-center mt-8 mb-48">
  {#each questions as question, i (question._id) }
    <Question on:remove={remove} {question}/>
  {/each}

  <div class="gap-1 flex-col flex  bg-slate-100 p-2">
    <button on:click={save} class="border-2 p-1 hover:bg-slate-200 hover:border-slate-300 rounded transition-colors bg-white ">
      Сохранить
    </button>
  </div>
</div>

<div class="fixed z-20 flex flex-col justify-around bottom-0 p-2 lg:w-1/2 h-40 md:w-2/3 w-full left-1/2 -translate-x-1/2 bg-slate-100">
  <div class="mb-1 ">
    добавить новый вопрос
    <hr class="border-neutral-700 border-2"/>
  </div>
  <div class="flex text-sm gap-4 overflow-x-auto items-stretch">
    {#each kinds as kind}
    <button on:click={() => {create(kind.id)}} class="hover:bg-slate-300 border-slate-400 transition-colors bg-slate-200 border-2 p-1 rounded">
      {kind.name}
    </button>
    {/each}
  </div>
</div>