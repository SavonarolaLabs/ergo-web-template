<script lang="ts">
	import { assets } from '__sveltekit/paths';
	import { selected_wallet_ergo } from '../../store/store.js';
	import Layout from '../../routes/+layout.svelte';

	let boxes: Array<any> = [];
	async function loadWalletBoxes(wallet) {
		if (window.ergoConnector[wallet]?.isConnected) {
			boxes = await ergo.get_utxos();
		}
	}

	$: loadWalletBoxes($selected_wallet_ergo);
</script>

<div
	class="w-full flex flex-col gap-4 backdrop-blur-md bg-opacity-10 shadow-sm p-4 w-fit-content border rounded-md"
	style=""
>
	<h2 class="font-bold text-xl text-slate-100">WalletBoxesExample.svelte</h2>
	<div class="gap-4 grow w-full flex flex-wrap items-center justify-center">
		{#each boxes as box}
			<div class="bg-blue-200 p-2 bg-opacity-90 rounded-sm">
				<div>
					BoxID: <span class="text-xs">{box.boxId.substr(0,5)}...{box.boxId.substr(-5)}</span>
				</div>
				<div class="flex gap-2">
					<div>ERG:</div>
					<div>{box.value/10**9}</div>
				</div>	
				<div class="flex flex-wrap gap-2 items-center">
					<div>Tokens:</div>
				{#if box.assets.length > 0}
				<div class="flex flex-wrap gap-2 text-xs">
						{#each box.assets as asset}
							<a href="https://explorer.ergoplatform.com/en/token/{asset.tokenId}">
								<div class="text-white bg-blue-600 p-1 px-2 rounded-full">
									{#if asset.amount > 1}
										{ asset.amount}x
									{:else}
									NFT
									{/if}
									{asset.tokenId.substr(0,3)}...{asset.tokenId.substr(-3)}
								</div>
							</a>
						{/each}
					</div>
					{:else}
					[]
				{/if}

			</div>
			</div>
		{/each}
	</div>
</div>
