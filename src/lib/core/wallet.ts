import { get } from "svelte/store";
import { selected_wallet_ergo } from "../../store/store.js"
import { notifier } from "@beyonk/svelte-notifications";

export async function connectErgoWallet(walletName: string) {
    if (walletName == get(selected_wallet_ergo)) {
        disconnectErgoWallet();
        return;
    } else if (get(selected_wallet_ergo)) {
        disconnectErgoWallet();
    }
    if (!window.ergoConnector[walletName]) {
        notifier.warning(`${walletName} not detected.`, 4000);
        return;
    }
    const isConnected = await connectWallet(walletName);
    if (isConnected) {
        selected_wallet_ergo.set(walletName);
        localStorage.setItem('connected_ergo_wallet', walletName);
    }
    return isConnected;
}

async function connectWallet(wallet) {
    if (!window.ergoConnector) {
        notifier.danger('Please install Nautilus Wallet', 4000);
        return false;
    }

    if (window.ergo) {
        return true;
    }

    let walletConnected;
    try {
        walletConnected = await ergoConnector[wallet].connect();
    } catch {
        walletConnected = false;
    }

    return walletConnected;
}

export async function disconnectErgoWallet() {
    const wallet = get(selected_wallet_ergo);
    selected_wallet_ergo.set('');

    localStorage.removeItem('connected_ergo_wallet');
    if (!window.ergoConnector) {
        return true;
    } else {
        await ergoConnector[wallet].disconnect();
    }
}

export async function reconnectErgoWallet() {
    const walletName = localStorage.getItem('connected_ergo_wallet');
    if (walletName) {
        selected_wallet_ergo.set(walletName);
    }
}