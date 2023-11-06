<script lang="ts">
    export let data;

    let questions = data.questions;
</script>

<form method="post" class="bg-slate-100 flex gap-y-5 text-xl flex-col items-center p-2">
    {#each questions as question }
    <div class="border-2 bg-white p-2 lg:w-1/2 md:w-2/3 w-full">
    {question.name}
    <hr/>
    {#if question.kind === "multipleChoice"}
    {#each question.options as option}
    <div class="flex gap-2">
        <input id={option._id} value={option._id} name={question._id} type="radio"/>
        <label for={option._id}>{option.name}</label>
    </div>
    {/each}
    {:else if question.kind === "multipleResponse"}
    {#each question.options as option}
    <div class="flex gap-2">
        <input id={option._id} value={option._id} name={question._id} type="checkbox"/>
        <label for={option._id}>{option.name}</label>
    </div>
    {/each}
    {:else if question.kind === "matching"}
    <div class="flex justify-around">
        <div class="p-2">
        {#each question.matching as item}
        <div class="flex gap-2">
            <select id={item._id} name={question._id}>
            <option value=""></option>
            {#each question.matched as _, i}
                <option value={`${item._id}=${i}`}>{i + 1}</option>
            {/each}
            </select>
            <label for={item._id}>{item.name}</label>
        </div>
        {/each}
        </div>

        <div class="p-2">
        {#each question.matched as item, i}
        <div class="flex gap-2">
            {i + 1}
            <lable>{item.name}</lable>
        </div>
        {/each}
        </div>
    </div>

    {/if}
    </div>
    {/each}

    <button class="border-2 p-1 hover:bg-slate-200 hover:border-slate-300 text-2xl rounded transition-colors bg-white ">
      Закончить
    </button>
</form>