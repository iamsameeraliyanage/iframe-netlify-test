const githubIframe = document.getElementById('github-iframe');

window.addEventListener('message', (event) => {
    if (event.origin === 'https://iframe-vercel-test.vercel.app') {
        if (event.data.action === 'initiate-payment') {
            const paymentData = event.data.data;

            // Log the received payment data
            console.log('Received payment data:', paymentData);

            // Relay message to GitHub iframe with the payment data
            try {
                githubIframe.contentWindow.postMessage(
                    { action: 'process-payment', data: paymentData }, 
                    'https://iamsameeraliyanage.github.io'
                );
            } catch (error) {
                console.error("Failed to send message to GitHub iframe:", error);
            }
        }
    } else {
        console.warn("Untrusted message origin:", event.origin);
    }
});

// Listen for messages from GitHub iframe
window.addEventListener('message', (event) => {
    if (event.origin === 'https://iamsameeraliyanage.github.io') {
        // Relay payment status back to Vercel site
        try {
            window.parent.postMessage(event.data, 'https://iframe-vercel-test.vercel.app');
        } catch (error) {
            console.error("Failed to send message back to Vercel site:", error);
        }
    } else {
        console.warn("Untrusted message origin:", event.origin);
    }
});
