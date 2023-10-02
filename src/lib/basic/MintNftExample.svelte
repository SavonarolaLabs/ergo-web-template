<script lang="ts">
	import { notifier } from '@beyonk/svelte-notifications';
	import { stringToBytes } from '@scure/base';
	import {
		OutputBuilder,
		SAFE_MIN_BOX_VALUE,
		RECOMMENDED_MIN_FEE_VALUE,
		TransactionBuilder,
		SConstant,
		SColl,
		SByte
	} from '@fleet-sdk/core';

	let nftName = 'Bitmask #2';
	const nftDescription = 'Welcome to Ergo!';
	const ipfsImageLink = 'ipfs://bafkreibmcf5cthtdobzi6oveqwtobiocffmjv6q7m7xn5isfn6xcpgyfsa';
	const sha256 = '2c117a299e6370728f3aa485a6e0a1c229589afa1f67eedea2456fae279b0590';

	async function mintEip004Nft() {
		const height = await ergo.get_current_height();
		const utxos = await ergo.get_utxos();
		const myAddress = await ergo.get_change_address();

		const output = new OutputBuilder(SAFE_MIN_BOX_VALUE, myAddress)
			.mintToken({
				amount: '1',
				name: nftName
			})
			.setAdditionalRegisters(
				eip0004ArtworkRegisters(nftName, nftDescription, sha256, ipfsImageLink)
			);

		const unsignedMintTransaction = new TransactionBuilder(height)
			.from(utxos)
			.to(output)
			.sendChangeTo(myAddress)
			.payFee(RECOMMENDED_MIN_FEE_VALUE)
			.build()
			.toEIP12Object();
		const signedTranscation = await ergo.sign_tx(unsignedMintTransaction);
		const transactionId = await ergo.submit_tx(signedTranscation);
		notifier.success('Mint transaction submitted!', 1500);
	}

	// https://github.com/ergoplatform/eips/blob/master/eip-0004.md
	function eip0004ArtworkRegisters(name, description, sha256, url) {
		return {
			R4: SConstant(SColl(SByte, stringToBytes('utf8', name))),
			R5: SConstant(SColl(SByte, stringToBytes('utf8', description))),
			R6: SConstant(SColl(SByte, stringToBytes('utf8', '0'))),
			R7: '0e020101',
			R8: SConstant(SColl(SByte, stringToBytes('hex', sha256))),
			R9: SConstant(SColl(SByte, stringToBytes('utf8', url)))
		};
	}
</script>

<div
	class="flex flex-col gap-4 backdrop-blur-md bg-opacity-10 shadow-sm p-4 w-fit-content border rounded-md"
>
	<h2 class="font-bold text-xl text-slate-100">MintNftExample.svelte</h2>
	<div class="flex flex-col gap-2">
		<img src="zk_genesis_2.png" alt="" style="width:220px" />
		<input class="p-2 text-slate-600" type="text" bind:value={nftName} />
	</div>
	<div class="flex gap-2">
		<button
			class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
			on:click={mintEip004Nft}>Mint your NFT</button
		>
	</div>
</div>
