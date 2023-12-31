<script lang="ts">
    // Exported prop that dictates if the modal should be displayed
    export let showModal: boolean;

    // Reference to the HTMLDialogElement (the <dialog> tag in this case)
    let dialog: HTMLDialogElement;

    // Reactive statement: When `dialog` exists and `showModal` is true, show the modal
    $: if (dialog && showModal) dialog.showModal();
</script>

<!-- Dialog element with accessibility ignores for specific rules -->
<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div 
		class="backdrop-blur bg-opacity-10 shadow-sm"
		on:click|stopPropagation>
		<slot />
		<!-- svelte-ignore a11y-autofocus -->
		<div class="flex justify-end">
			<button 
				class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
				autofocus on:click={() => dialog.close()}>close</button>
		</div>
	</div>
</dialog>

<style>
	dialog {
		max-width: 32em;
		border-radius: 0.2em;
		border: none;
		padding: 0;
		backdrop-filter: blur(8px);
		background: rgba(255,255,255,0.2);
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
	}
</style>
