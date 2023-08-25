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
        // Canvas-Größe an Videoauflösung anpassen unter Berücksichtigung von devicePixelRatio
        const pixelRatio = window.devicePixelRatio || 1;
        
        this.videoCanvas.width = this.video.videoWidth * pixelRatio;
        this.videoCanvas.height = this.video.videoHeight * pixelRatio;

        // Das Video in der erhöhten Auflösung zeichnen
        this.ctx.drawImage(this.video, 0, 0, this.videoCanvas.width, this.videoCanvas.height);

        // Stellen Sie sicher, dass der Canvas in CSS immer noch die Größe des Videos hat
        this.videoCanvas.style.width = `${this.video.videoWidth}px`;
        this.videoCanvas.style.height = `${this.video.videoHeight}px`;
    }
}


    update: function(oldData) {
        if (!this.data.enable) {
            return;
        }

        navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: this.data.cam === 'back' ? 'environment' : 'user',
                width: { ideal: 1280 },
                height: { ideal: 720 }
            }
        }).then(stream => {
            this.video.srcObject = stream;
            this.video.play();
        }).catch(error => {
            console.error('Kamera-Zugriff fehlgeschlagen:', error);
        });
    }
});
