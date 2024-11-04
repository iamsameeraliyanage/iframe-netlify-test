const githubIframe = document.getElementById('github-iframe');

window.addEventListener('message', (event) => {
    // Verify origin to ensure message is from the trusted Vercel site
    if (event.origin === 'https://iframe-vercel-test.vercel.app') {
        if (event.data.action === 'request-data') {
            try {
                // Relay message to GitHub iframe with specified target origin
                githubIframe.contentWindow.postMessage(
                    { action: 'send-data' }, 
                    'https://iamsameeraliyanage.github.io'
                );
            } catch (error) {
                console.error("Failed to send message to GitHub iframe:", error);
            }
        }
    } else if (event.origin === 'https://iamsameeraliyanage.github.io') {
        // Relay data received from GitHub iframe back to Vercel site
        try {
            window.parent.postMessage(event.data, 'https://iframe-vercel-test.vercel.app');
        } catch (error) {
            console.error("Failed to send message back to Vercel site:", error);
        }
    } else {
        console.warn("Untrusted message origin:", event.origin);
    }
});
