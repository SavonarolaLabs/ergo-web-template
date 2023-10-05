// Importing the "writable" function from "svelte/store" which allows for creating writable store values.
import { writable } from "svelte/store";

// Exporting a writable store for tracking the selected Ergo wallet.
// Initially, the selected wallet is set to an empty string indicating no wallet is selected.
export const selected_wallet_ergo = writable('');
