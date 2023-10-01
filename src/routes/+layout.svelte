<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { reconnectErgoWallet } from '$lib/core/wallet';
	import { NotificationDisplay } from '@beyonk/svelte-notifications';
	import Navbar from '$lib/Navbar.svelte';

	onMount(async() => {
		await reconnectErgoWallet();
	});
</script>

<NotificationDisplay />
<Navbar />
<slot />
