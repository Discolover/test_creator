<script lang="ts">
  // export let form;

  export let data;

  const name = data.name;
  let value = ""
</script>

<div class="flex items-center justify-center h-screen border bg-slate-100">

  <form method="POST" class="grid lg:w-1/3 bg-green border-black bg-white items-center
        gap-2 grid-cols-6 grid-rows-4 text-xl text-slate-900 border-2 p-2">

    <div class="col-span-full font-semibold">
      Тест:
    </div>
    <div class="col-span-full font-semibold">
      {name}
    </div>

    <hr class=" col-span-full border-black "/>

    <label for="username" class="col-span-2 font-semibold ">
      Ваше имя
    </label>
    <input required id="username" name="username" autocomplete="off" {value}
        class="col-span-4 border border-slate-700"
    />

    <button class="hover:bg-slate-300 hover:border-slate-800 col-span-full mt-4 transition-colors justify-self-center p-1 border-2 border-slate-700  bg-slate-100 ">
      Пройти тест
    </button>

  </form>
</div>