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
      if (alpha !== null) {
        el.setAttribute('rotation', {y: 360 - alpha});
        el.setAttribute('a-comp', {alpha, beta, gamma});
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
