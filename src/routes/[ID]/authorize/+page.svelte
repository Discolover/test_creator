<script lang="ts">
  //export let form;
</script>

<div class="flex items-center justify-center h-screen border bg-slate-100">
  <form method="POST" class="grid bg-white border-black items-center gap-2 grid-cols-4 grid-rows-[7] text-xl text-slate-900 border-2 p-2">
    <div class="col-span-full">Введите администраторские реквизиты</div>
    <hr class="border-black col-span-full"/>

    <label for="name" class="col-span-2 font-semibold ">
      название теста
    </label>
    <input required id="name" name="name" autocomplete="off" class="border border-slate-700 col-span-2 "/>

    <label for="password" class="col-span-2 font-semibold">
      пароль
    </label>
    <input required id="password" minlength=3 name="password" type="password" class="border border-slate-700 col-span-2 "/>

    <button class="hover:bg-slate-300 hover:border-slate-800 mt-4 transition-colors justify-self-center p-1 border-2 border-slate-700  bg-slate-100 col-span-full">
      Вход
    </button>

  </form>
</div>