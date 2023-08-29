// a-frame-compass.js
AFRAME.registerComponent('a-comp', {
  init: async function() {
    const el = this.el;

    // Funktion zum Setzen der y-Rotation der Box
    const setRotation = (alpha) => {
      if (alpha !== null) {
        el.setAttribute('rotation', {y: alpha});
      }
    };

    // Überprüfen, ob der Browser DeviceOrientationEvents unterstützt
    if ('DeviceOrientationEvent' in window) {
      // Für iOS 13 und höher
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        const permission = await DeviceOrientationEvent.requestPermission();
        if (permission === 'granted') {
          window.addEventListener('deviceorientation', (event) => {
            // Einmaligen Wert festlegen und dann den Event Listener entfernen
            setRotation(event.alpha);
            window.removeEventListener('deviceorientation', this);
          });
        }
      } else {
        // Für andere Browser/Versionen
        window.addEventListener('deviceorientation', (event) => {
          // Einmaligen Wert festlegen und dann den Event Listener entfernen
          setRotation(event.alpha);
          window.removeEventListener('deviceorientation', this);
        });
      }
    }
  }
});
