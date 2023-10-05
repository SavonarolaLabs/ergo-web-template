<script lang="ts">
    // Import necessary modules and components
	import { notifier } from '@beyonk/svelte-notifications';
	import { selected_wallet_ergo } from '../store/store.js';
	import Modal from './common/Modal.svelte';
	import { connectErgoWallet } from './common/wallet.js';

    // Local state to control whether the modal is shown
	let showModal = false;

    // Async function to handle the logic when the Nautilus button is clicked
	async function clickOnNautilusButton() {
		showModal = false;
		await connectErgoWallet('nautilus');
	}
</script>

<!-- Check if a wallet is selected -->
{#if $selected_wallet_ergo}
    <!-- If a wallet is selected, show the Disconnect button -->
	<button
		on:click={clickOnNautilusButton}
		class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
	>
		Disconnect
	</button>
{:else}
    <!-- If no wallet is selected, show the Connect Wallet button that, when clicked, triggers the modal -->
	<button
		on:click={() => (showModal = true)}
		class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
	>
		Connect Wallet
	</button>
{/if}

<!-- Check if the modal should be shown based on the state of showModal -->
{#if showModal}
    <!-- Display the Modal component. Content within the Modal tag is what will be shown within the modal. -->
	<Modal bind:showModal>
		<div class="w-52 h-52">
			<div class="pl-1 uppercase font-bold text-slate-700">Ergo Wallets</div>
			<div class="w-full mt-6 mb-4">
                <!-- Check if the ergoConnector object exists and if it has the 'nautilus' property -->
				{#if !window.ergoConnector || !window.ergoConnector['nautilus']}
                    <!-- If not, show the link to install the Nautilus wallet -->
					<a
						href="https://chrome.google.com/webstore/detail/nautilus-wallet/gjlmehlldlphhljhpnlddaodbjjcchai"
						target="blank_"
						style="height:50px;"
						class="p-2 w-full flex justify-center items-center bg-white border-orange-900 text-black bg-green-100 rounded-md bg-opacity-30 hover:bg-opacity-80"
					>
						<div>Install Nautilus</div>
						<img style="height:2em;width:2em;" src="/wallets/nautilus.svg" alt="" />
					</a>
				{:else}
                    <!-- If ergoConnector does have 'nautilus', show the button to manage Nautilus connection -->
					<button
						on:click={clickOnNautilusButton}
						class:grayscale={!window.ergoConnector['nautilus']}
						class="p-2 w-full flex justify-center items-center bg-white border-orange-900 text-black bg-green-100 rounded-md bg-opacity-30 hover:bg-opacity-80"
					>
						<div>
                            <!-- If the currently selected wallet is 'nautilus', show 'Disconnect'. Otherwise, show 'Nautilus' -->
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
