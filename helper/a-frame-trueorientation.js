AFRAME.registerComponent('a-trueorientation', {
  schema: {
    heading: {type: 'boolean', default: false},
    deviation: {type: 'number', default: 20}
  },

  init: function () {
    this.showPermissionPopup();
  },

  showPermissionPopup: function() {
    const popupHTML = `
      <div id="permission-popup" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); z-index: 1000; display: flex; justify-content: center; align-items: center;">
        <div style="background-color: white; padding: 20px; border-radius: 5px;">
          <p>Do you want to enable device orientation?</p>
          <button id="grant-permission">Yes</button>
          <button id="deny-permission">No</button>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', popupHTML);

    document.getElementById('grant-permission').addEventListener('click', async () => {
      const permissionStatus = await navigator.permissions.query({ name: 'orientation' });
      if (permissionStatus.state === 'granted') {
        this.setupOrientation();
      }
      document.getElementById('permission-popup').style.display = 'none';
    });

    document.getElementById('deny-permission').addEventListener('click', () => {
      console.log('Permission to access device orientation is not granted.');
      document.getElementById('permission-popup').style.display = 'none';
    });
  },

  setupOrientation: function() {
    let compassHeading = 0;

    window.addEventListener('deviceorientation', (event) => {
      const alpha = event.alpha;
      const gamma = event.gamma;
      const beta = event.beta;

      if (event.webkitCompassHeading) {
        compassHeading = event.webkitCompassHeading;
      } else {
        compassHeading = 360 - alpha;
      }

      let adjustedHeading = this.data.heading ? compassHeading - this.data.deviation : alpha;

      this.updateOrientation(adjustedHeading, beta, gamma);
    });
  },

  updateOrientation: function(headingOrAlpha, beta, gamma) {
    let screenOrientation = window.orientation || 0;

    let adjustedAlpha = headingOrAlpha;
    let adjustedBeta = beta;
    let adjustedGamma = gamma;

    if (screenOrientation === 90 || screenOrientation === -90) {
      adjustedAlpha = beta;
      adjustedBeta = -headingOrAlpha;
      adjustedGamma = gamma;
    }

    const quaternion = new THREE.Quaternion();
    const euler = new THREE.Euler(THREE.MathUtils.degToRad(adjustedBeta), THREE.MathUtils.degToRad(adjustedAlpha), -THREE.MathUtils.degToRad(adjustedGamma), 'YXZ');

    quaternion.setFromEuler(euler);
    this.el.object3D.quaternion.copy(quaternion);
  }
});