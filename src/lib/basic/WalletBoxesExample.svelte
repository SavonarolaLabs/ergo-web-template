<script lang="ts">
    import { assets } from '__sveltekit/paths';
    import { selected_wallet_ergo } from '../../store/store.js';
    import Layout from '../../routes/+layout.svelte';
    let selectedBoxId = ""; // Variable to hold the selected box ID
    let boxes: Array<any> = []; // Variable to hold the list of boxes

    // Function to load the boxes associated with a given wallet
    async function loadWalletBoxes(wallet) {
        if (window.ergoConnector[wallet]?.isConnected) {
            boxes = await ergo.get_utxos();
            if (boxes.length > 0) {
                selectedBoxId = boxes[0].boxId; // Set the first box as selected
            }
        }
    }

    // Reactive statement: Load boxes whenever the selected wallet changes
    $: loadWalletBoxes($selected_wallet_ergo);
</script>

<div
    class="w-full flex flex-col gap-4 backdrop-blur-md bg-opacity-10 shadow-sm p-4 w-fit-content border rounded-md"
    style=""
>
    <h2 class="font-bold text-xl text-slate-100">WalletBoxesExample.svelte</h2>

    <select bind:value={selectedBoxId}>
        {#each boxes as box (box.boxId)}
            <option value={box.boxId}>{box.boxId}</option>
        {/each}
    </select>

    <div class="gap-4 grow w-full flex flex-wrap items-center justify-center">
        {#each boxes as box (box.boxId)}
            {#if box.boxId === selectedBoxId}
                <div class="bg-blue-200 p-2 bg-opacity-90 rounded-sm">
                    <div>
                        BoxID: <span class="text-xs">{box.boxId}</span>
                    </div>

                    <div class="flex gap-2">
                        <div>ERG:</div>
                        <div>{box.value/10**9}</div>
                    </div>
                    <!-- Display additional register details for the box -->

                    <div class="flex flex-wrap gap-2 items-center">
                        <div class="font-bold">Assets:</div>
                    </div>
                        {#if box.assets?.length > 0}
                            <table class="table-auto">
                                <thead>
                                    <tr>
                                        <th class="px-4 py-2">Amount</th>
                                        <th class="px-4 py-2">Token ID</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {#each box.assets as asset}
                                        <tr>
                                            <td class="border px-4 py-2">
                                                {asset.amount.length > 4 ? asset.amount.slice(0, 5) : asset.amount}
                                            </td>
                                            <td class="border px-4 py-2">
                                                <a href="https://explorer.ergoplatform.com/en/token/{asset.tokenId}">
                                                    {asset.tokenId.substr(0,3)}...{asset.tokenId.substr(-3)}
                                                </a>
                                            </td>
                                        </tr>
                                    {/each}
                                </tbody>
                            </table>
                        {:else}
                            []
                        {/if}
                    </div>
            {/if}
        {/each}
    </div>
</div>