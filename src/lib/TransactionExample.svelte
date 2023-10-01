<script lang="ts">
	import { notifier } from '@beyonk/svelte-notifications';
	import {
		OutputBuilder,
		SAFE_MIN_BOX_VALUE,
		RECOMMENDED_MIN_FEE_VALUE,
		TransactionBuilder
	} from '@fleet-sdk/core';
	async function sendSomeErgToYourself() {
		const amountInNanoErg = SAFE_MIN_BOX_VALUE;
		const myOwnAddress = await ergo.get_change_address();
		const receiver = myOwnAddress;
		await sendErgTo(amountInNanoErg, receiver);
	}

	async function sendErgTo(amount: bigint, receiver: string) {
		const height = await ergo.get_current_height();
		const utxos = await ergo.get_utxos();
		const myAddress = await ergo.get_change_address();

		const output = new OutputBuilder(amount, receiver);
		const unsignedMintTransaction = new TransactionBuilder(height)
			.from(utxos)
			.to(output)
			.sendChangeTo(myAddress)
			.payFee(RECOMMENDED_MIN_FEE_VALUE)
			.build()
			.toEIP12Object();
        const signedTranscation = await ergo.sign_tx(unsignedMintTransaction)
        const transactionId = await ergo.submit_tx(signedTranscation);
        notifier.success("Transaction submitted!")
	}
</script>

<div class="flex flex-col gap-4 backdrop-blur bg-opacity-10 shadow-sm p-4 w-fit-content  border rounded-md">
	<h2 class="font-bold text-xl text-slate-100">TransactionExample.svelte</h2>
	<div class="flex gap-2">
		<button
			class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
			on:click={sendSomeErgToYourself}>Send 0.1 ERG to yourself</button
		>
	</div>
</div>
