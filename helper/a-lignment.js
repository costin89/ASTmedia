AFRAME.registerComponent('alignment', {
    init: function() {
        this.handleOrientation = this.handleOrientation.bind(this);
        this.adjustCompass = this.adjustCompass.bind(this);
        requestPermission();
        window.addEventListener('deviceorientation', this.handleOrientation, true);
    },
    remove: function() {
        window.removeEventListener('deviceorientation', this.handleOrientation);
    },
    handleOrientation: function(event) {
        var compassHeading = event.webkitCompassHeading || 360 - event.alpha;
        var windowOrientation = window.orientation || 0;
        var adjustedCompassHeading = this.adjustCompass(compassHeading, windowOrientation);
        var absoluteAngle = event.alpha;

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
            init();
        } else {
            alert('Berechtigung nicht erteilt');
        }
    } else {
        alert("Diese Anwendung muss auf den Kompass Ihres Geräts zugreifen. Bitte erlauben Sie den Zugriff, wenn Sie dazu aufgefordert werden.");
        init();
    }
}

function init() {
    if (window.DeviceOrientationEvent) {
        var scene = document.querySelector('a-scene');
        if (scene.hasLoaded) {
            console.log("Scene has loaded");
        } else {
            scene.addEventListener('loaded', function() {
                console.log("Scene has loaded");
            });
        }
    } else {
        document.getElementById("status").innerHTML = "Ihr Browser unterstützt keine Device Orientation Events.";
    }
}
