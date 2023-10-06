<script lang="ts">
	// Component Imports
	import WalletBalanceExample from "$lib/basic/WalletBalanceExample.svelte";
	import NotificationsExample from "$lib/basic/NotificationsExample.svelte";
	import TransactionExample from "$lib/basic/TransactionExample.svelte";
	import MintNftExample from "$lib/basic/MintNftExample.svelte";
	import WalletBoxesExample from "$lib/basic/WalletBoxesExample.svelte";
	import FetchOracleBoxExample from "$lib/basic/FetchOracleBoxExample.svelte";
</script>
<!-- Main Page Content -->
<div class="main-page">
	<h1>Welcome to ErgoWebTemplate!</h1>

	<div class="components-grid">
		<WalletBalanceExample />
		<NotificationsExample />
		<TransactionExample />
		<MintNftExample />
		<FetchOracleBoxExample />
		<WalletBoxesExample />
	</div>
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
		margin: 0;
		padding: 0;
		align-items: center; /* Horizontally center the content */
	}

	.main-page {
		padding: 80px 4rem 2rem;  /* 80px padding at the top to make space for the header */
		background-image: url("https://bitmasks.io/landing/sushimobile.png");
		background-position: center;
		background-repeat: no-repeat;
		width: 100%;
		max-width: 1200px;
	}

	.main-page h1 {
		font-size: 5rem;
		font-weight: bold;
		margin: 0 0 2.5rem;
		text-align: center;
	}

	.components-grid {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 2rem;
	}
</style>
