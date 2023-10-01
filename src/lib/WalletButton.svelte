<script lang="ts">
	import { notifier } from '@beyonk/svelte-notifications';
	import { selected_wallet_ergo } from '../store/store.js';
	import Modal from './core/Modal.svelte';
	let showModal = false;

	async function connectNautilusWallet() {
		showModal = false;
		await connectErgoWallet('nautilus');
	}
	async function connectErgoWallet(walletName: string) {
		if (walletName == $selected_wallet_ergo) {
			disconnectErgoWallet();
			return;
		} else if ($selected_wallet_ergo) {
			disconnectErgoWallet();
		}
		if (!window.ergoConnector[walletName]) {
			notifier.warning(`${walletName} not detected.`, 4000);
			return;
		}
		const isConnected = await connectWallet(walletName);
		if (isConnected) {
			selected_wallet_ergo.set(walletName);
			localStorage.setItem('connected_ergo_wallet', walletName);
		}
		return isConnected;
	}

	async function connectWallet(wallet) {
		if (!window.ergoConnector) {
			notifier.danger('Please install Nautilus Wallet', 4000);
			return false;
		}

		if (window.ergo) {
			return true;
		}

		let walletConnected;
		try {
			walletConnected = await ergoConnector[wallet].connect();
		} catch {
			walletConnected = false;
		}

		return walletConnected;
	}

	async function disconnectErgoWallet() {
		const wallet = $selected_wallet_ergo;
		selected_wallet_ergo.set('');

		localStorage.removeItem('connected_ergo_wallet');
		if (!window.ergoConnector) {
			return true;
		} else {
			await ergoConnector[wallet].disconnect();
		}
	}
</script>

{#if $selected_wallet_ergo}
	<button
		on:click={connectNautilusWallet}
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
			<div class="pl-1 uppercase font-bold text-slate-400">Ergo Wallets</div>
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
						on:click={connectNautilusWallet}
						class:grayscale={!window.ergoConnector['nautilus']}
						class="w-full flex justify-center items-center bg-white border-2 border-b-4 border-orange-900 text-black bg-green-100 rounded-md"
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
