<script>
	import { notifier } from "@beyonk/svelte-notifications";

    let message = 'hello kitty!'
	function notify() {
		notifier.success(message,1500);
	}
</script>

<div class="flex flex-col gap-4 backdrop-blur bg-opacity-10 shadow-sm p-4 border rounded-md w-fit-content">
    <h2 class="font-bold text-xl text-slate-100">NotificationsExample.svelte</h2>
    <div class="flex gap-2">
        <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            on:click={notify}>Test notification</button
        >
        <input class="p-2" type="text" bind:value={message}>
    </div>
</div>