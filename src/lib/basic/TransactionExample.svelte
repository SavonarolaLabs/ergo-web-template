<script lang="ts">
    // Import the notification utility for user feedback
    import { notifier } from '@beyonk/svelte-notifications';
    
    // Import necessary utilities from the Fleet SDK
    import {
        OutputBuilder,
        SAFE_MIN_BOX_VALUE,
        RECOMMENDED_MIN_FEE_VALUE,
        TransactionBuilder
    } from '@fleet-sdk/core';

    // Function to send a small amount of Erg to one's own address
	async function sendSomeErgToYourself() {
        // Set the amount in nanoErg (smallest unit)
		const amountInNanoErg = SAFE_MIN_BOX_VALUE;
        
        // Fetch own address
		const myOwnAddress = await ergo.get_change_address();
        
        // Set receiver as self (own address)
		const receiver = myOwnAddress;
        
        // Invoke the transaction function
		await sendErgTo(amountInNanoErg, receiver);
	}

    // Function to send a specified amount of Erg to a given receiver address
	async function sendErgTo(amount: bigint, receiver: string) {
        // Fetch the current blockchain height
		const height = await ergo.get_current_height();
        
        // Fetch available UTXOs (unspent transaction outputs)
		const utxos = await ergo.get_utxos();
        
        // Fetch own address
		const myAddress = await ergo.get_change_address();

        // Build the output for the transaction
		const output = new OutputBuilder(amount, receiver);
        
        // Construct, sign, and submit the transaction
		const unsignedMintTransaction = new TransactionBuilder(height)
			.from(utxos)
			.to(output)
			.sendChangeTo(myAddress)
			.payFee(RECOMMENDED_MIN_FEE_VALUE)
			.build()
			.toEIP12Object();
        const signedTranscation = await ergo.sign_tx(unsignedMintTransaction);
        const transactionId = await ergo.submit_tx(signedTranscation);
        
        // Notify the user of a successful transaction submission
        notifier.success("Transaction submitted!")
	}
</script>

<!-- UI for the Transaction Example -->
<div class="flex flex-col gap-4 backdrop-blur-md bg-opacity-10 shadow-sm p-4 w-fit-content  border rounded-md">
    <!-- Header title -->
	<h2 class="font-bold text-xl text-slate-100">TransactionExample.svelte</h2>
    
    <!-- Button container -->
	<div class="h-full flex items-end gap-2">
        <!-- Button to initiate the transaction process -->
		<button
			class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
			on:click={sendSomeErgToYourself}>Send 0.1 ERG to yourself</button
		>
	</div>
</div>
