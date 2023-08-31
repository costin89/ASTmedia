class Webcam {
  constructor(videoElement, canvasElement) {
    this.videoElement = videoElement;
    this.canvasElement = canvasElement;
    this.context = this.canvasElement.getContext('2d');
    this.stream = null;
  }

  async init() {
    const constraints = {
      video: {
        facingMode: { exact: "environment" },
        width: {
          min: 1280,
          max: 1920,
        },
        height: {
          min: 720,
          max: 1080
        }
      }
    };

    this.stream = await navigator.mediaDevices.getUserMedia(constraints);
    this.videoElement.srcObject = this.stream;
  }

  captureFrame() {
    this.context.drawImage(this.videoElement, 0, 0, this.canvasElement.width, this.canvasElement.height);
    return this.context.getImageData(0, 0, this.canvasElement.width, this.canvasElement.height);
  }
  
  adjustVideoSize() {
    const aspectRatio = this.videoElement.videoWidth / this.videoElement.videoHeight;
    this.videoElement.height = this.canvasElement.height;
    this.videoElement.width = Math.round(this.canvasElement.height * aspectRatio);
    this.canvasElement.width = this.videoElement.width; // Stellen Sie sicher, dass der Canvas die gleiche Größe wie das Video hat
  }
}
