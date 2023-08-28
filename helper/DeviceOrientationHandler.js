// script.js
document.addEventListener("DOMContentLoaded", function() {
    const alphaLabel = document.getElementById('alphaLabel');
    const betaLabel = document.getElementById('betaLabel');
    const gammaLabel = document.getElementById('gammaLabel');
    const requestPermissionButton = document.getElementById('requestPermission');

    function handleOrientation(event) {
        const alpha = event.alpha;
        const beta = event.beta;
        const gamma = event.gamma;

        alphaLabel.textContent = `Alpha: ${alpha}`;
        betaLabel.textContent = `Beta: ${beta}`;
        gammaLabel.textContent = `Gamma: ${gamma}`;
    }

    // Button-Event für die Erlaubnisanforderung
    requestPermissionButton.addEventListener('click', function() {
        // Erlaubnis anfordern, falls erforderlich (nur für iOS 13+)
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        window.addEventListener('deviceorientation', handleOrientation, true);
                    }
                })
                .catch(console.error);
        } else {
            // Für andere Browser einfach den Event-Listener hinzufügen
            window.addEventListener('deviceorientation', handleOrientation, true);
        }
    });
});
