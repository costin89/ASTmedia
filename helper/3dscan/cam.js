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
        facingMode: { exact: "environment" }
      }
    };

    this.stream = await navigator.mediaDevices.getUserMedia(constraints);
    this.videoElement.srcObject = this.stream;
  }

  captureFrame() {
    this.context.drawImage(this.videoElement, 0, 0, this.canvasElement.width, this.canvasElement.height);
    return this.context.getImageData(0, 0, this.canvasElement.width, this.canvasElement.height);
  }
}
