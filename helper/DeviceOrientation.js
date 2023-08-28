// script.js
document.addEventListener("DOMContentLoaded", function() {
    const alphaLabel = document.getElementById('alphaLabel');
    const betaLabel = document.getElementById('betaLabel');
    const gammaLabel = document.getElementById('gammaLabel');
    const requestPermissionButton = document.getElementById('requestPermission');

    let deviceOrientation = {
        alpha: 0,
        beta: 0,
        gamma: 0,
        hasPermission: false
    };
    
    // Rest des Codes bleibt gleich, aber aktualisieren Sie handleOrientation
    function handleOrientation(event) {
        deviceOrientation.alpha = event.alpha;
        deviceOrientation.beta = event.beta;
        deviceOrientation.gamma = event.gamma;
    }

    // Button-Event für die Erlaubnisanforderung
    requestPermissionButton.addEventListener('click', function() {
        // Erlaubnis anfordern, falls erforderlich (nur für iOS 13+)
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
                .then(permissionState => {
                    // Aktualisieren Sie den Teil, in dem die Berechtigung erteilt wird
                    if (permissionState === 'granted') {
                        deviceOrientation.hasPermission = true;
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
