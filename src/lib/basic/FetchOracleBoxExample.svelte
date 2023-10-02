<script lang="ts">
	import { onMount } from 'svelte';

	const ErgUsdOacleTokenId = '011d3364de07e5a26f0c4eef0852cddb387039a921b7154ef3cab22c6eda887f';

	function nautilusfFriendlyBox(box) {
		let newBox = JSON.parse(JSON.stringify(box));
		newBox.value = newBox.value.toString();
		if (newBox.assets === undefined) newBox.assets = [];
		for (let i = 0; i < newBox.assets.length; i++) {
			newBox.assets[i].amount = newBox.assets[i].amount.toString();
		}
		return newBox;
	}

	export async function fetchOracleBox() {
		const resp = await fetch(
			`https://api.ergoplatform.com/api/v1/boxes/unspent/byTokenId/${ErgUsdOacleTokenId}`
		);
		let data = await resp.json();
		let oracleBox = data.items[0];
		oracleBox = nautilusfFriendlyBox(oracleBox);
		return oracleBox;
	}

	let box;
	onMount(async () => {
		box = await fetchOracleBox();
		console.log(box);
	});
</script>

<div
	class="flex flex-col gap-4 backdrop-blur-md bg-opacity-10 shadow-sm p-4 w-fit-content border rounded-md"
	style=""
>
	<h2 class="font-bold text-xl text-slate-100">FetchOracleBoxExample.svelte</h2>
	<div class="gap-4 grow w-full flex flex-col items-center justify-center">
		{#if box}
			<div class="self-start">1 USD = <span class="font-bold">{box.additionalRegisters.R4.renderedValue}</span> nanoERG = {box.additionalRegisters.R4.renderedValue/10**9} ERG</div>
			<div class="self-start">1 ERG = 1/<span class="font-bold">{box.additionalRegisters.R4.renderedValue}</span> = {(1/(+box.additionalRegisters.R4.renderedValue/10**9)).toFixed(2)} USD</div>
			<div class="bg-blue-200 p-2 bg-opacity-90 rounded-sm">
				<div class="pl-2">
					BoxID: <span class="text-xs">{box.boxId.substr(0, 5)}...{box.boxId.substr(-5)}</span>
				</div>

				<div class="flex gap-2 pl-2">
					<div>ERG:</div>
					<div>{box.value / 10 ** 9}</div>
				</div>
				<div class="flex flex-wrap gap-2 items-center pl-2">
					<div>Tokens:</div>

					{#if box.assets.length > 0}
						<div class="flex flex-wrap gap-2 text-xs">
							{#each box.assets as asset}
								<a href="https://explorer.ergoplatform.com/en/token/{asset.tokenId}">
									<div class="text-white bg-blue-600 p-1 px-2 rounded-full">
										{#if asset.amount > 1}
											{asset.amount}x
										{:else}
											NFT
										{/if}
										{asset.tokenId.substr(0, 3)}...{asset.tokenId.substr(-3)}
									</div>
								</a>
							{/each}
						</div>
					{:else}
						[]
					{/if}
				</div>
				<fieldset class="border border-solid border-gray-700 px-2">
					<legend>Registers</legend>
					<!-- Your content here -->

				<div class="flex gap-2">
					<div>R4:</div>
					<div class="font-bold">{box?.additionalRegisters?.R4?.renderedValue}</div>
				</div>
				<div class="flex items-center gap-2">
					<div>R5:</div>
					<div class="text-xs">{box?.additionalRegisters?.R5?.renderedValue}</div>
				</div>
				<div class="flex items-center gap-2">
					<div>R6:</div>
					<div class="text-xs">{box?.additionalRegisters?.R6?.renderedValue}</div>
				</div>
			</fieldset>
			<div></div>
			</div>
		{/if}
	</div>
</div>
