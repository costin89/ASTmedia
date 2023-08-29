// a-frame-compass.js
AFRAME.registerComponent('a-comp', {
  schema: {
    alpha: {type: 'number', default: 0}
  },
  init: async function() {
    const el = this.el;

    const setRotation = (alpha) => {
      if (alpha !== null) {
        el.setAttribute('rotation', {y: 360 - alpha});
        el.setAttribute('a-comp', 'alpha', alpha);
      }
    };

    if ('DeviceOrientationEvent' in window) {
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        const permission = await DeviceOrientationEvent.requestPermission();
        if (permission === 'granted') {
          window.addEventListener('deviceorientation', (event) => {
            setRotation(event.alpha);
          });
        }
      } else {
        window.addEventListener('deviceorientation', (event) => {
          setRotation(event.alpha);
        });
      }
    }
  }
});

AFRAME.registerComponent('alpha-text', {
  tick: function () {
    const boxEl = document.querySelector('[a-comp]');
    if (boxEl) {
      const alpha = boxEl.getAttribute('a-comp').alpha;
      this.el.setAttribute('value', `Alpha: ${alpha.toFixed(2)}°`);
    }
  }
});
