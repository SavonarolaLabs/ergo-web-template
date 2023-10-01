<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { reconnectErgoWallet } from '$lib/core/wallet';
	import Navbar from '$lib/Navbar.svelte';

	onMount(async() => {
		await reconnectErgoWallet();
	});
</script>

<Navbar />
<slot />
