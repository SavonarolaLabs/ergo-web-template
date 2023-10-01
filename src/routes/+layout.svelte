<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { selected_wallet_ergo } from '../store/store';
	import Navbar from '$lib/Navbar.svelte';

	onMount(() => {
		const walletName = localStorage.getItem('connected_ergo_wallet');
		if (walletName) {
			selected_wallet_ergo.set(walletName);
		}
	});
</script>

<Navbar />
<slot />
