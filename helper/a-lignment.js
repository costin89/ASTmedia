AFRAME.registerComponent('a-lignment', {
    schema: {
        north: {
            type: 'boolean',
            default: true
        },
        deviation: {
            type: 'number',
            default: 0
        }
    },

    init: function() {
        const el = this.el;
        const data = this.data;

        // Popup für Berechtigungsanforderung
        const permissionGranted = window.confirm("Darf diese Anwendung auf die Geräteausrichtung zugreifen?");

        if (permissionGranted) {
            if (window.DeviceOrientationEvent) {
                window.addEventListener("deviceorientation", function(event) {
                    const alpha = event.alpha;

                    // Ausgabe des Kompasskurses
                    if (alpha !== null) {
                        console.log("Kompasskurs:", alpha);
                    } else {
                        console.log("Kompasskurs nicht verfügbar");
                    }

                    if (data.north && alpha !== null) {
                        const adjustedAlpha = alpha + data.deviation;
                        el.object3D.rotation.y = THREE.Math.degToRad(360 - adjustedAlpha);
                    }
                }, true);
            } else {
                console.log("Ihr Gerät unterstützt keine Geräteorientierung.");
            }
        } else {
            console.log("Berechtigung nicht erteilt.");
        }
    }
});
