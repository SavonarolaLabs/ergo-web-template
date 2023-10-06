<script>
    // Import the notification utility for user feedback
    import { notifier } from "@beyonk/svelte-notifications";

    // Default message for the notification
    let message = 'hello kitty!'

    // Function to display a notification with the given message
    function notify() {
        notifier.success(message,1500);
    }
</script>

<!-- UI for the Notifications Example -->
<div class="flex flex-col gap-4 backdrop-blur-md bg-opacity-10 shadow-sm p-4 border rounded-md w-fit-content">
    <!-- Header title -->
    <h2 class="font-bold text-xl text-slate-100">NotificationsExample.svelte</h2>
    <!-- Input field and button container -->
    <div class="h-full flex items-end gap-2">
        <!-- Inner container for the input field and button -->
        <div class="w-full flex flex-col gap-4">
            <!-- Input field for the user to provide custom notification message -->
            <input class="p-2 text-slate-600" type="text" bind:value={message}>
            <!-- Button to trigger the notification -->
            <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                on:click={notify}>Test notification</button
            >
        </div>
    </div>
</div>
