// a-frame-geolocator.js
AFRAME.registerPrimitive('a-geo', {
  defaultComponents: {
    'a-geo-comp': {}
  },
});

AFRAME.registerComponent('a-geo-comp', {
  schema: {
    latitude: {type: 'number', default: 0.0},
    longitude: {type: 'number', default: 0.0},
    deviation: {type: 'number', default: 0.0},
    gps: {type: 'boolean', default: false} // Add gps property
  },

  init: function() {
    if (this.data.gps) { // Check if gps="true"
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(this.onGeoSuccess.bind(this), this.onGeoError.bind(this), {
          enableHighAccuracy: true
        });
      } else {
        console.warn('Geolocation is not available in this browser');
      }
    }
  },

  onGeoSuccess: function(position) {
    const userLat = position.coords.latitude;
    const userLong = position.coords.longitude;
    const targetLat = this.data.latitude;
    const targetLong = this.data.longitude;

    const distance = this.computeHaversineDistance(userLat, userLong, targetLat, targetLong);
    let heading = this.computeHeading(userLat, userLong, targetLat, targetLong);

    heading -= this.toRadians(this.data.deviation);

    const aFrameCoords = this.convertHeadingToAFrameCoordinates(distance, heading);
    this.el.setAttribute('position', aFrameCoords);
  },

  onGeoError: function(error) {
    console.warn('Geolocation error', error);
  },

  computeHaversineDistance: function(lat1, lon1, lat2, lon2) {
    const R = 6371000;
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  },

  computeHeading: function(lat1, lon1, lat2, lon2) {
    const dLon = this.toRadians(lon2 - lon1);
    const lat1R = this.toRadians(lat1);
    const lat2R = this.toRadians(lat2);

    const y = Math.sin(dLon) * Math.cos(lat2R);
    const x = Math.cos(lat1R) * Math.sin(lat2R) -
              Math.sin(lat1R) * Math.cos(lat2R) * Math.cos(dLon);
    return Math.atan2(y, x);
  },

  convertHeadingToAFrameCoordinates: function(distance, heading) {
    const x = distance * Math.sin(heading);
    const z = distance * Math.cos(heading);
    return {x: x, y: 0, z: -z};
  },

  toRadians: function(angle) {
    return angle * (Math.PI / 180);
  }
});
