// seethrough-component.js by Alexander - Costin Ast
AFRAME.registerComponent('seethrough', {
    schema: {
        type: 'string', // 'front' oder 'back'
        default: 'back'
    },

    init: function() {
        this.video = document.createElement('video');
        this.video.setAttribute('autoplay', true);
        this.video.setAttribute('playsinline', true); // wichtig für iOS
        document.body.appendChild(this.video); // fügt das Video-Element zum DOM hinzu

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
        this.video.srcObject = stream;
        const videoTexture = new THREE.VideoTexture(this.video);

        this.el.setObject3D('mesh', new THREE.Mesh(
            new THREE.PlaneBufferGeometry(2, 2),
            new THREE.MeshBasicMaterial({ map: videoTexture })
        ));
    }
});
