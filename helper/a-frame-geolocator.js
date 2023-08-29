// a-frame-geolocator.js
AFRAME.registerComponent('geo-locator', {
  schema: {
    latitude: { type: 'number', default: 0.0 },
    longitude: { type: 'number', default: 0.0 },
    deviation: { type: 'number', default: 0.0 }
  },

  init: function() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        this.onGeoSuccess.bind(this),
        this.onGeoError.bind(this),
        {
          enableHighAccuracy: true
        }
      );
    } else {
      console.warn("Geolocation is not available in this browser.");
    }
  },

  onGeoSuccess: function(position) {
    const userLat = position.coords.latitude;
    const userLong = position.coords.longitude;
    const targetLat = this.data.latitude;
    const targetLong = this.data.longitude;

    const distance = this.computeHaversineDistance(userLat, userLong, targetLat, targetLong);
    let heading = this.computeHeading(userLat, userLong, targetLat, targetLong) - this.data.deviation;
    const coords = this.convertToAFrameCoords(distance, heading);

    this.el.object3D.position.set(coords.x, 0, coords.z);
  },

  onGeoError: function(error) {
    console.warn('Geolocation error: ', error);
  },

  computeHaversineDistance: function(lat1, lon1, lat2, lon2) {
    const R = 6371000; // Earth radius in meters
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);

    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
  },

  computeHeading: function(lat1, lon1, lat2, lon2) {
    const dLon = this.toRadians(lon2 - lon1);
    const y = Math.sin(dLon) * Math.cos(this.toRadians(lat2));
    const x = Math.cos(this.toRadians(lat1)) * Math.sin(this.toRadians(lat2)) - Math.sin(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) * Math.cos(dLon);
    return this.toDegrees(Math.atan2(y, x));
  },

  toRadians: function(degrees) {
    return degrees * (Math.PI / 180);
  },

  toDegrees: function(radians) {
    return radians * (180 / Math.PI);
  },

  convertToAFrameCoords: function(distance, heading) {
    const x = distance * Math.sin(this.toRadians(heading));
    const z = distance * Math.cos(this.toRadians(heading));
    return { x: x, z: -z };
  }
});

AFRAME.registerPrimitive('a-geo', {
  defaultComponents: {
    'a-geo-comp': {}
  }
});
