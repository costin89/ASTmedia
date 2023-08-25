// seethrough-component.js by Alexander - Costin Ast
AFRAME.registerComponent('seethrough', {
    schema: {
        cam: {type: 'string', default: 'back'},
        enable: {type: 'boolean', default: false}
    },

    init: function() {
        this.video = document.createElement('video');
        this.video.setAttribute('autoplay', '');
        this.video.setAttribute('playsinline', '');
        this.videoCanvas = document.getElementById('videoCanvas');
        this.ctx = this.videoCanvas.getContext('2d');

        // Aktualisiert das Video-Canvas, wenn das Video spielt
        this.video.addEventListener('play', () => {
            this.tick = AFRAME.utils.throttleTick(this.tick, 33, this);  // 30 fps
        });
    },

    tick: function() {
        if (this.video.readyState >= 2) {  // Video-Daten sind verfügbar
            this.ctx.drawImage(this.video, 0, 0, this.videoCanvas.width, this.videoCanvas.height);
        }
    },

    update: function(oldData) {
        if (!this.data.enable) {
            return;
        }

        navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: this.data.cam === 'back' ? 'environment' : 'user'
            }
        }).then(stream => {
            this.video.srcObject = stream;
            this.video.play();
        }).catch(error => {
            console.error('Kamera-Zugriff fehlgeschlagen:', error);
        });
    }
});

