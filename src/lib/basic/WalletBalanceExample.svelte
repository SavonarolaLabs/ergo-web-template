<script lang="ts">
    // Import the selected wallet from the store
    import { selected_wallet_ergo } from '../../store/store.js';

    // Default values for wallet balance
    let balanceInNanoErg = '0';  // Balance in the smallest unit
    let balanceErg = '0.00';     // Balance in readable format

    // Function to load the balance for the given wallet
    async function loadBlance(wallet) {
        // Uncomment the next line for debugging purposes
        // console.log("load balance")
        
        // Check if the connector for the specified wallet is connected
        if(window.ergoConnector[wallet]?.isConnected) {
            // Fetch balance from Ergo in NanoErg
            balanceInNanoErg = await ergo.get_balance();

            // Convert the balance to readable format and fix to two decimal places
            balanceErg = ((+balanceInNanoErg) / 10**9).toFixed(2)
        }
    }

    // Reactive statement: Load balance whenever the selected wallet changes
    $: loadBlance($selected_wallet_ergo)
</script>

<!-- UI for displaying the Wallet Balance -->
<div
    class="flex flex-col gap-4 backdrop-blur-md bg-opacity-10 shadow-sm p-4 w-fit-content border rounded-md"
    style="min-width:300px"
>
    <!-- Header title -->
    <h2 class="font-bold text-xl text-slate-100">WalletBalanceExample.svelte</h2>

    <!-- Display area for the wallet balance -->
    <div class="grow w-full flex flex-col items-center justify-center">
        Wallet Balance:
        <!-- Display the balance in a larger font -->
        <span class="text-7xl font-bold">{balanceErg} Σ</span><br>
    </div>
</div>
