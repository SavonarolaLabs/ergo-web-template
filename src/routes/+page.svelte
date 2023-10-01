<script lang="ts">
	import { NotificationDisplay, notifier } from '@beyonk/svelte-notifications';

	function notify() {
		notifier.success('Notifications work!');
	}
</script>

<NotificationDisplay />
<div class="grow p-4 main-page" style="padding-top:77px;">
	<h1 class="text-5xl font-bold mb-10 mt-5">Welcome to AnySwap!</h1>

	<button
		class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
		on:click={notify}>Test notification</button
	>
</div>

<style lang="postcss">
	:global(html) {
		background-color: #8bc6ec;
		background-image: linear-gradient(135deg, #8bc6ec 0%, #9599e2 100%);
		min-height: 100vh;
	}
	:global(body) {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}
	.main-page{
		background-image: url("https://bitmasks.io/landing/sushimobile.png");
		background-position: center;
    	background-repeat: no-repeat;
	}
</style>
