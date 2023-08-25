// a-frame-geoar-component.js
AFRAME.registerComponent('a-geotag', {
    schema: {
        lat: {type: 'number', default: 0},
        long: {type: 'number', default: 0},
        getLocation: {type: 'boolean', default: false}
    },

    init: function() {
        this.userLocation = { latitude: null, longitude: null };
        this.watchId = null;
        
        if (this.data.getLocation) {
            if (!('geolocation' in navigator)) {
                console.warn('Geolocation API nicht verfügbar.');
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => this.onLocationUpdate(position),
                (err) => console.warn('Fehler beim Abrufen der Geolocation: ', err),
                {enableHighAccuracy: true}
            );
        }
    },

    onLocationUpdate: function(position) {
        this.userLocation.latitude = position.coords.latitude;
        this.userLocation.longitude = position.coords.longitude;
        console.log("Aktuelle Position: ", this.userLocation); // Zum Debuggen
        
        this.watchId = navigator.geolocation.watchPosition(
            (position) => this.onLocationUpdate(position),
            (err) => console.warn('Fehler beim Abrufen der Geolocation: ', err),
            {enableHighAccuracy: true}
        );

        this.updateObjectPosition();
    },

    updateObjectPosition: function() {
        const distance = this.getDistanceFromLatLonInM(this.data.lat, this.data.long, this.userLocation.latitude, this.userLocation.longitude);
        console.log("Entfernung zum Ziel: ", distance); // Zum Debuggen

        this.el.setAttribute('visible', distance <= 250);
    },

    getDistanceFromLatLonInM: function(lat1, lon1, lat2, lon2) {
        var R = 6371; // Erdradius in km
        var dLat = this.deg2rad(lat2-lat1);
        var dLon = this.deg2rad(lon2-lon1); 
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        return R * c * 1000; // Entfernung in Metern
    },

    deg2rad: function(deg) {
        return deg * (Math.PI/180);
    },

    remove: function() {
        if (this.watchId !== null) {
            navigator.geolocation.clearWatch(this.watchId);
        }
    }
});

AFRAME.registerPrimitive('a-geotag', {
    defaultComponents: {
        'a-geotag': {}
    },
  
    mappings: {
        lat: 'a-geotag.lat',
        long: 'a-geotag.long',
        getlocation: 'a-geotag.getLocation'
    }
});
