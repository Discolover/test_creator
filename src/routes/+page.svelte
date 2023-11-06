<script lang="ts">
  export let form;
  import { enhance } from '$app/forms';

  function shake(node: Element, { duration }: {duration: number}) {
    return {
			duration,
			css: (t: number) => {
				return `
					transform: translateX(${Math.sin(Math.PI * 2 * t) * 0.3}rem);
          `
			}
		};
  }
</script>

<div class="flex items-center justify-center h-screen border bg-slate-100">
  <form use:enhance method="POST" class="grid bg-white border-black items-center gap-2 grid-cols-4 grid-rows-[7] text-xl text-slate-900 border-2 p-2">
    <div class="col-span-full font-semibold">
      ✅ Создайте свой тест
    </div>

    <hr class="border-black col-span-full"/>

    <label for="name" class="col-span-2 font-semibold ">
      название теста
    </label>
    <input required id="name" name="name" autocomplete="off" value={form?.name ? form?.name : ""} class="border border-slate-700 col-span-2 "/>

    <label for="password" class="col-span-2 font-semibold">
      пароль
    </label>
    <input required id="password" minlength=3 name="password" type="password" class="border border-slate-700 col-span-2 "/>

    <label for="passwordRepeat" class="col-span-2 font-semibold">
      повторите пароль
    </label>
    <input required id="passwordRepeat" minlength=3 name="passwordRepeat" type="password" class="border border-slate-700 col-span-2"/>

    {#if form?.error === 'passwordsNotMatch'}
      <span in:shake={{duration: 300}} class="text-red-600 text-sm col-span-full ">Пароли не совпадают</span>
    {/if}

    <button class="hover:bg-slate-300 hover:border-slate-800 mt-4 transition-colors justify-self-center p-1 border-2 border-slate-700  bg-slate-100 col-span-full">
      Создать Тест
    </button>

  </form>
</div>