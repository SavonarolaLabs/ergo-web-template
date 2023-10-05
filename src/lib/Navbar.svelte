<script>
    // Import the WalletButton component from its location
	import WalletButton from '$lib/WalletButton.svelte';
</script>

<!-- The main container div with style and classes -->
<div
	class="z-10 fixed flex p-4 items-center w-full justify-between backdrop-blur bg-opacity-10 shadow-sm"
	style="height:77px;"
>
    <!-- Link that navigates to the home page of the application when clicked -->
	<a href="/">
		<!-- Branding or title for the application -->
		<div class="text-white font-bold text-2xl">SampleApp</div>
	</a>

    <!-- Container for the WalletButton component -->
	<div>
        <!-- Embed the WalletButton component -->
		<WalletButton />
	</div>
</div>
