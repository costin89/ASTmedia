class Cam {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        
        // Größe des Canvas an den Bildschirm anpassen
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
            this.video = document.createElement('video');
            this.video.srcObject = stream;
            this.video.play();
            
            // Startet das Rendern des Canvas, sobald das Video spielbereit ist
            this.video.onloadedmetadata = (e) => {
                this.updateCanvas();
            };
        }).catch((err) => {
            console.log("An error occurred: " + err);
        });
    }

    updateCanvas() {
        // Das Kamerabild auf den Canvas zeichnen
        this.ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
        
        // Anwendung der Graustufen-Transformation
        Gray.applyToCanvasContext(this.ctx, this.canvas.width, this.canvas.height);
        
        // Anwendung des bilateralen Filters
        Bilateral.applyToCanvasContext(this.ctx, this.canvas.width, this.canvas.height, 5, 50);

        // Anwendung des Blurs
        //Blur.applyToCanvasContext(this.ctx, this.canvas.width, this.canvas.height, 2);

        // Anwendung von Canny Edge Detection
        Canny.applyToCanvasContext(this.ctx, this.canvas.width, this.canvas.height);

        // Anwendung der Hough-Transformation
        //Hough.applyToCanvasContext(this.ctx, this.canvas.width, this.canvas.height);

        // Erneut aufrufen, um das nächste Frame zu rendern
        requestAnimationFrame(() => this.updateCanvas());
    }
}
