AFRAME.registerComponent('a-comp', {
  init: function() {
    const el = this.el;
    
    console.log("Initialisierung der a-comp Komponente.");

    // Funktion zum Setzen der y-Rotation der Box
    const setRotation = (alpha) => {
      console.log("Setze Rotation: ", alpha);
      if (alpha !== null) {
        el.setAttribute('rotation', {y: alpha});
      }
    };

    // Funktion zur Anforderung der Berechtigung für DeviceOrientationEvent
    const requestPermission = async () => {
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        const permission = await DeviceOrientationEvent.requestPermission();
        console.log("Berechtigungsstatus: ", permission);
        return permission === 'granted';
      }
      console.log("Keine Berechtigungsanforderung erforderlich.");
      return true;
    };

    // Überprüfen, ob der Browser DeviceOrientationEvents unterstützt
    if ('DeviceOrientationEvent' in window) {
      console.log("DeviceOrientationEvent wird unterstützt.");
      
      requestPermission().then(granted => {
        if (granted) {
          console.log("Berechtigung erteilt.");
          const handler = (event) => {
            console.log("DeviceOrientationEvent gefeuert.");
            setRotation(event.alpha);
            window.removeEventListener('deviceorientation', handler);
          };
          window.addEventListener('deviceorientation', handler);
        } else {
          console.log("Berechtigung nicht erteilt.");
        }
      });
    } else {
      console.log("DeviceOrientationEvent wird nicht unterstützt.");
    }
  }
});
