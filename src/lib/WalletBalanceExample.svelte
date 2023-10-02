<script lang="ts">
	import { selected_wallet_ergo } from '../store/store.ts';


	let balanceInNanoErg = '0';
	let balanceErg = '0.00';
	async function loadBlance(wallet){
		//console.log("load balance")
		if(window.ergoConnector[wallet]?.isConnected){
			balanceInNanoErg = await ergo.get_balance();
			balanceErg = ((+balanceInNanoErg)/10**9).toFixed(2)
		}
	}

	$: loadBlance($selected_wallet_ergo)
</script>

<div
	class="flex flex-col gap-4 backdrop-blur-md bg-opacity-10 shadow-sm p-4 w-fit-content border rounded-md"
	style="min-width:300px"
>
<h2 class="font-bold text-xl text-slate-100">WalletBalanceExample.svelte</h2>

	<div class="grow w-full flex flex-col items-center justify-center">
		Wallet Balance:
		<span class="text-7xl font-bold">{balanceErg} Σ</span><br>
	</div>
</div>
