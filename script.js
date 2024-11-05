const githubIframe = document.getElementById('github-iframe');
const communicationLog = document.getElementById('communication-log');

window.addEventListener('message', (event) => {
    if (event.origin === 'https://iframe-vercel-test.vercel.app') {
        if (event.data.action === 'initiate-payment') {
            const paymentData = event.data.data;

            // Log the received payment data
            communicationLog.innerHTML += `<br>Netlify: Request data from Bank: ${JSON.stringify(paymentData)}`;

            // Relay message to GitHub iframe with the payment data after 5 seconds
            setTimeout(() => {
                try {
                    githubIframe.contentWindow.postMessage(
                        { action: 'process-payment', data: paymentData }, 
                        'https://iamsameeraliyanage.github.io'
                    );
                } catch (error) {
                    console.error("Failed to send message to GitHub iframe:", error);
                }
            }, 5000);
        }
    } else {
        console.warn("Untrusted message origin:", event.origin);
    }
});

// Listen for messages from GitHub iframe
window.addEventListener('message', (event) => {
    if (event.origin === 'https://iamsameeraliyanage.github.io') {
        // Log the bank response received after 5 seconds
        communicationLog.innerHTML += `<br>Netlify: Bank response received: ${JSON.stringify(event.data)}`;
        setTimeout(() => { 
            // Relay payment status back to Vercel site
            try {
                window.parent.postMessage(event.data, 'https://iframe-vercel-test.vercel.app');
            } catch (error) {
                console.error("Failed to send message back to Vercel site:", error);
            }
        }, 5000);
    } else {
        console.warn("Untrusted message origin:", event.origin);
    }
});
