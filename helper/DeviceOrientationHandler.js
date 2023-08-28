class DeviceOrientationHandler {
  constructor() {
    this.alpha = 0;
    this.beta = 0;
    this.gamma = 0;
    this.permissionGranted = false;
  }

  async requestPermission() {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      const permission = await DeviceOrientationEvent.requestPermission();
      if (permission === 'granted') {
        this.permissionGranted = true;
        window.addEventListener("deviceorientation", this.handleOrientation.bind(this), true);
      }
    } else {
      // Für Browser, die keine Berechtigungen benötigen
      this.permissionGranted = true;
      window.addEventListener("deviceorientation", this.handleOrientation.bind(this), true);
    }
  }

  handleOrientation(event) {
    this.alpha = event.alpha;
    this.beta = event.beta;
    this.gamma = event.gamma;
  }
}
