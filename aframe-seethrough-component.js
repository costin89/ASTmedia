// seethrough-component.js by Alexander - Costin Ast
AFRAME.registerComponent('seethrough', {
    schema: {
        type: 'string', // 'front' oder 'back'
        default: 'back'
    },

    init: function() {
        this.setupCamera();
    },

    setupCamera: function() {
        const constraints = {
            video: {
                facingMode: this.data === 'front' ? 'user' : 'environment'
            }
        };

        navigator.mediaDevices.getUserMedia(constraints)
            .then(stream => {
                this.setupCameraStream(stream);
            })
            .catch(err => {
                console.error('Fehler beim Zugriff auf die Kamera:', err);
            });
    },

    setupCameraStream: function(stream) {
        const video = document.createElement('video');
        video.setAttribute('autoplay', '');
        video.setAttribute('playsinline', ''); // Wichtig für iOS

        video.srcObject = stream;
        video.play();

        const videoTexture = new THREE.VideoTexture(video);
        this.el.setObject3D('mesh', new THREE.Mesh(
            new THREE.PlaneBufferGeometry(2, 2),
            new THREE.MeshBasicMaterial({ map: videoTexture })
        ));
    }
});
