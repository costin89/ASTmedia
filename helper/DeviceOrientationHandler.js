class DeviceOrientationHandler {
  constructor() {
    this.alpha = 0;
    this.beta = 0;
    this.gamma = 0;
    this.permissionGranted = false;
  }

  async requestPermission() {
    if (window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        const permission = await DeviceOrientationEvent.requestPermission();
        if (permission === 'granted') {
          this.permissionGranted = true;
          window.addEventListener('deviceorientation', this.handleOrientation.bind(this));
        }
      } catch (error) {
        console.error('Permission denied:', error);
      }
    } else {
      // Für Browser, die keine Berechtigungen benötigen
      this.permissionGranted = true;
      window.addEventListener('deviceorientation', this.handleOrientation.bind(this));
    }
  }

  handleOrientation(event) {
    this.alpha = event.alpha;
    this.beta = event.beta;
    this.gamma = event.gamma;
  }
}

const deviceOrientationHandler = new DeviceOrientationHandler();
document.getElementById('requestPermissionButton').addEventListener('click', () => deviceOrientationHandler.requestPermission());
