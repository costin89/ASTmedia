// Registrieren Sie die seethrough-Komponente wie zuvor
AFRAME.registerComponent('seethrough', {
  schema: {
    vw: {type: 'number', default: 1280},
    vh: {type: 'number', default: 720},
    cam: {type: 'boolean', default: true},
    cammode: {type: 'string', default: 'back'}  // 'back' oder 'front'
  },

  init: function() {
    this.videoElement = document.createElement('video');
    this.videoElement.width = this.data.vw;
    this.videoElement.height = this.data.vh;
    this.videoElement.style.position = 'absolute';
    this.videoElement.style.zIndex = '1';

    document.body.appendChild(this.videoElement);

    if(this.data.cam) {
      this.getCameraStream();
    }
    // Setzen Sie den z-Index der A-Frame-Canvas
    const aframeCanvas = document.querySelector('canvas');
    if (aframeCanvas) {
      aframeCanvas.style.zIndex = '2';
    }
  },

  getCameraStream: function() {
    const constraints = {
      video: {
        width: { exact: this.data.vw },
        height: { exact: this.data.vh },
        facingMode: this.data.cammode
      }
    };

    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        this.videoElement.srcObject = stream;
        this.videoElement.play();
      })
      .catch((err) => {
        console.error('Error accessing the camera', err);
      });
  }
});

// Registrieren Sie das <a-seethrough> primitive
AFRAME.registerPrimitive('a-seethrough', {
  defaultComponents: {
    seethrough: {}
  },
  mappings: {
    vw: 'seethrough.vw',
    vh: 'seethrough.vh',
    cam: 'seethrough.cam',
    cammode: 'seethrough.cammode'
  }
});
