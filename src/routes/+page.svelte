<script lang="ts">
	import { NotificationDisplay, notifier } from '@beyonk/svelte-notifications';

	function notify() {
		notifier.success('Notifications work!');
	}
</script>

<NotificationDisplay />
<div class="p-4">
<h1 class="text-3xl font-bold mb-10" >Your next Ergo dApp!</h1>

<button 
class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
on:click={notify}>Show notification</button>
</div>
<style lang="postcss">
	:global(html) {
		background-color: #8BC6EC;
		background-image: linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%);
		height: 100vh;
	}
</style>
