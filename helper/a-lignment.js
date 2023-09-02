AFRAME.registerComponent('a-ligment', {
  schema: {
    north: { type: 'boolean', default: true },
    deviation: { type: 'number', default: 0 }
  },
  
  init: function () {
    const el = this.el;
    const data = this.data;
    
    // Popup-Fenster für Berechtigungsanforderung
    const permissionGranted = window.confirm("Darf diese Anwendung auf die Geräteausrichtung zugreifen?");
    
    if (permissionGranted) {
      if (window.DeviceOrientationEvent) {
        window.addEventListener("deviceorientation", function (event) {
          const alpha = event.alpha;
          
          if (data.north) {
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
