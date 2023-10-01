<script lang="ts">
	import { NotificationDisplay, notifier } from '@beyonk/svelte-notifications';

	function notify() {
		notifier.success('Notifications work!');
	}
</script>

<NotificationDisplay />
<div></div>
<h1 class="text-3xl font-bold" >Hello world!</h1>

<button on:click={notify}>Show notification</button>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.300);
	}
</style>
