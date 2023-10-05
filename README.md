# Ergo Web Template

An efficient Svelte-based web template integrated with advanced features like a notification system, a modal component, and Ergo Wallet functionalities.

## 🛠️ Pre-requisites

Before you begin with the setup, ensure you have the following tools installed:

- **Git**: This is required to clone the repository. If not installed, you can download it from [git-scm.com](https://git-scm.com/).
- **npm**: Node Package Manager (npm) is essential for managing project dependencies. It comes bundled with Node.js. If you don't have it, download and install Node.js (which includes npm) from [nodejs.org](https://nodejs.org/).

## 🚀 Getting Started

Follow these steps to set up the project locally:

1. **Clone the repository**
   ```bash
   git clone https://github.com/SavonarolaLabs/ergo-web-template
   cd ergo-web-template
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run the Development Server**
   ```bash
   npm run dev
   ```
   This starts the server and automatically launches the application in your default browser.

## 📁 Key Files & Directories

Dive into the primary components housed in the [src/lib](src/lib) directory:

- **Notifications**: [src/lib/basic/NotificationsExample.svelte](src/lib/basic/NotificationsExample.svelte) demonstrates the implementation of the @beyonk/svelte-notifications package.
- **Modal Component**: [src/lib/common/Modal.svelte](src/lib/common/Modal.svelte) offers a reusable modal structure built with HTMLDialogElement.
- **Wallet Interactions**:
  - [src/lib/basic/WalletBoxesExample.svelte](src/lib/basic/WalletBoxesExample.svelte) – Display wallet's boxes.
  - [src/lib/basic/FetchOracleBoxExample.svelte](src/lib/basic/FetchOracleBoxExample.svelte) – Fetch details of the Oracle box.
  - [src/lib/basic/TransactionExample.svelte](src/lib/basic/TransactionExample.svelte) – Send Erg to a designated address.
  - [src/lib/basic/MintNftExample.svelte](src/lib/basic/MintNftExample.svelte) – Mint NFTs according to the EIP-004 protocol.

## FleetSDK Integration

This project comes with Fleet SDK, you can see more usage examples in their [documentation](https://fleet-sdk.github.io/docs/)

## 🔨 Build the Project

For a production-ready build:
```bash
npm run build
```
The built files will be located in the `build` directory.


## 📘 Additional Information

- **Build Pipeline**: This project utilizes Trunk. Configuration details are available in `.trunk/trunk.yaml`.
- **Dependencies**: `package-lock.json` ensures consistent dependency installation across setups.

For an in-depth understanding of Svelte applications, consult the [official Svelte documentation](https://svelte.dev/docs).
