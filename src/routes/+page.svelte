<script lang="ts">
	import NotificationsExample from "$lib/NotificationsExample.svelte";

</script>

<div class="grow p-4 main-page" style="padding-top:77px;">
	<h1 class="text-5xl font-bold mb-10 mt-5">Welcome to CrystalSwap!</h1>

	<NotificationsExample></NotificationsExample>
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
		color: #251e43;
	}
	.main-page{
		background-image: url("https://bitmasks.io/landing/sushimobile.png");
		background-position: center;
    	background-repeat: no-repeat;
	}
</style>
