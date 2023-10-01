<script lang="ts">
	import { notifier } from '@beyonk/svelte-notifications';
	import { selected_wallet_ergo } from '../store/store.js';
	import Modal from './core/Modal.svelte';
	import { connectErgoWallet } from './core/wallet.js';
	let showModal = false;

	async function clickOnNautilusButton() {
		showModal = false;
		await connectErgoWallet('nautilus');
	}
</script>

{#if $selected_wallet_ergo}
	<button
		on:click={clickOnNautilusButton}
		class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
	>
		Disconnect
	</button>
{:else}
	<button
		on:click={() => (showModal = true)}
		class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
	>
		Connect Wallet
	</button>
{/if}

{#if showModal}
	<Modal bind:showModal>
		<div class="w-52 h-52">
			<div class="pl-1 uppercase font-bold text-slate-700">Ergo Wallets</div>
			<div class="w-full mt-6 mb-4">
				{#if !window.ergoConnector['nautilus']}
					<a
						href="https://chrome.google.com/webstore/detail/nautilus-wallet/gjlmehlldlphhljhpnlddaodbjjcchai"
						target="blank_"
						style="height:50px;"
						class="grayscale mb-2 p-1 w-full flex justify-center items-center bg-white border-2 border-b-4 border-orange-400 text-black bg-green-100 rounded-md hover:border-orange-900 hover:grayscale-0"
					>
						<div><span class="text-xs">Install</span> <span class="text-xs">Nautilus</span></div>
						<img
							style="height:1em;width:1em;margin-left:0.25em"
							src="/wallets/nautilus.svg"
							alt=""
						/></a
					>
				{:else}
					<button
						on:click={clickOnNautilusButton}
						class:grayscale={!window.ergoConnector['nautilus']}
						class="p-2 w-full flex justify-center items-center bg-white border-orange-900 text-black bg-green-100 rounded-md bg-opacity-30 hover:bg-opacity-80"
					>
						<div>
							{#if $selected_wallet_ergo == 'nautilus'}
								Disconnect
							{/if}
							Nautilus
						</div>
						<img style="height:2em;width:2em;" src="/wallets/nautilus.svg" alt="" />
					</button>
				{/if}
			</div>
		</div>
	</Modal>
{/if}
