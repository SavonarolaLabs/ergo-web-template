// Import necessary dependencies and store
import { get } from "svelte/store";
import { selected_wallet_ergo } from "../../store/store.js"
import { notifier } from "@beyonk/svelte-notifications";

// Function to connect to the Ergo Wallet
export async function connectErgoWallet(walletName: string) {
    // Check if the current wallet is already connected
    if (walletName == get(selected_wallet_ergo)) {
        disconnectErgoWallet(); // Disconnect if it is
        return;
    } 
    // Check if another wallet is connected
    else if (get(selected_wallet_ergo)) {
        disconnectErgoWallet(); // Disconnect the other wallet
    }

    // Check if the desired wallet is present
    if (!window.ergoConnector[walletName]) {
        notifier.warning(`${walletName} not detected.`, 4000);
        return;
    }

    // Attempt to connect to the wallet
    const isConnected = await connectWallet(walletName);
    if (isConnected) {
        // Set the current connected wallet and save it to local storage
        selected_wallet_ergo.set(walletName);
        localStorage.setItem('connected_ergo_wallet', walletName);
    }

    return isConnected;
}

// Internal function to handle the actual connection to the wallet
async function connectWallet(wallet) {
    // Check if the Ergo Connector is installed
    if (!window.ergoConnector) {
        notifier.danger('Please install Nautilus Wallet', 4000);
        return false;
    }

    if (window.ergo) {
        return true;
    }

    let walletConnected;
    try {
        // Try connecting to the wallet
        walletConnected = await ergoConnector[wallet].connect();
    } catch {
        // Handle any connection error
        walletConnected = false;
    }

    return walletConnected;
}

// Function to disconnect from the Ergo Wallet
export async function disconnectErgoWallet() {
    const wallet = get(selected_wallet_ergo);

    // Reset the current connected wallet and remove from local storage
    selected_wallet_ergo.set('');
    localStorage.removeItem('connected_ergo_wallet');

    // Disconnect from the wallet if Ergo Connector is available
    if (!window.ergoConnector) {
        return true;
    } else {
        await ergoConnector[wallet].disconnect();
    }
}

// Function to attempt reconnecting to the previously connected Ergo Wallet
export async function reconnectErgoWallet() {
    // Get the wallet name from local storage
    const walletName = localStorage.getItem('connected_ergo_wallet');
    if (walletName) {
        try{
            // Attempt to connect
            await ergoConnector[walletName].connect();
            selected_wallet_ergo.set(walletName);
        }catch{
            // Handle any connection errors
        }
    }
}
