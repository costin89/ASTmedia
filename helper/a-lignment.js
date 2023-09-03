AFRAME.registerComponent('alignment', {
    schema: {
        north: {
            type: 'boolean',
            default: false
        }
    },
    init: function() {
        if (this.data.north) {
            requestPermission();
        }
        this.handleOrientation = this.handleOrientation.bind(this);
        this.adjustCompass = this.adjustCompass.bind(this);
        window.addEventListener('deviceorientation', this.handleOrientation, true);
    },
    remove: function() {
        window.removeEventListener('deviceorientation', this.handleOrientation);
    },
    handleOrientation: function(event) {
        var compassHeading = event.webkitCompassHeading || 360 - event.alpha;
        var windowOrientation = window.orientation || 0;
        var adjustedCompassHeading = this.adjustCompass(compassHeading, windowOrientation);

        this.el.setAttribute('rotation', {
            x: 0,
            y: adjustedCompassHeading,
            z: 0
        });
    },
    adjustCompass: function(compassHeading, windowOrientation) {
        var adjustedCompassHeading = compassHeading;
        if (windowOrientation === 90) {
            adjustedCompassHeading = (compassHeading - 90 + 360) % 360;
        } else if (windowOrientation === -90) {
            adjustedCompassHeading = (compassHeading + 90) % 360;
        }
        return adjustedCompassHeading;
    }
});

async function requestPermission() {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        const permission = await DeviceOrientationEvent.requestPermission();
        if (permission === 'granted') {
            console.log('Berechtigung erteilt');
        } else {
            console.log('Berechtigung nicht erteilt');
        }
    } else {
        console.log("Diese Anwendung muss auf den Kompass Ihres Geräts zugreifen. Bitte erlauben Sie den Zugriff, wenn Sie dazu aufgefordert werden.");
    }
}
