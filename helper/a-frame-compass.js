// a-frame-compass.js
AFRAME.registerComponent('a-comp', {
  schema: {
    alpha: {type: 'number', default: 0},
    beta: {type: 'number', default: 0},
    gamma: {type: 'number', default: 0}
  },
  init: async function() {
    const el = this.el;

    const setRotation = (alpha, beta, gamma) => {
      let correctedAlpha = alpha;
      const orientation = window.orientation;
      if (orientation === 90 || orientation === -90) {
        correctedAlpha = (alpha + 90) % 360;
      }
      if (correctedAlpha !== null) {
        el.setAttribute('rotation', {y: 360 - correctedAlpha});
        el.setAttribute('a-comp', {alpha: correctedAlpha, beta, gamma});
      }
    };

    if ('DeviceOrientationEvent' in window) {
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        const permission = await DeviceOrientationEvent.requestPermission();
        if (permission === 'granted') {
          window.addEventListener('deviceorientation', (event) => {
            setRotation(event.alpha, event.beta, event.gamma);
          });
        }
      } else {
        window.addEventListener('deviceorientation', (event) => {
          setRotation(event.alpha, event.beta, event.gamma);
        });
      }
    }
  }
});

AFRAME.registerComponent('alpha-text', {
  tick: function () {
    const boxEl = document.querySelector('[a-comp]');
    if (boxEl) {
      const {alpha, beta, gamma} = boxEl.getAttribute('a-comp');
      this.el.setAttribute('value', `Alpha: ${alpha.toFixed(2)}°\nBeta: ${beta.toFixed(2)}°\nGamma: ${gamma.toFixed(2)}°`);
    }
  }
});
