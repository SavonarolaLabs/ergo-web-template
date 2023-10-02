<script>
	import WalletButton from '$lib/WalletButton.svelte';
</script>

<div
	class="fixed flex p-4 items-center w-full justify-between backdrop-blur bg-opacity-10 shadow-sm"
	style="height:77px;"
>
	<a href="/">
		<div class="text-white font-bold text-2xl">SampleApp</div>
	</a>
	<div>
		<WalletButton />
	</div>
</div>
