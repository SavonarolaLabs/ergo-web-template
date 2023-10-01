<script lang="ts">
	import Modal from "./core/Modal.svelte";
    let showModal = false;
</script>

<button 
	on:click={() => (showModal = true)}
	class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
    Connect Wallet
</button>

<Modal bind:showModal>
	<h2>
		Ergo
	</h2>

	<div>
		Nautilus Wallet
	</div>
</Modal>