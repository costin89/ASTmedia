// Datei: a-frame-geoar-component.js

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
            this.askForLocationPermission();
        }
    },

    askForLocationPermission: function() {
        const component = this;
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                component.setUserLocation(position.coords.latitude, position.coords.longitude);
                component.startWatchingLocation();
            });
        } else {
            console.warn('Geolocation API not available in this browser.');
        }
    },

    setUserLocation: function(lat, long) {
        this.userLocation.latitude = lat;
        this.userLocation.longitude = long;
        this.updateObjectPosition();
    },

    startWatchingLocation: function() {
        const component = this;
        this.watchId = navigator.geolocation.watchPosition(function(position) {
            component.setUserLocation(position.coords.latitude, position.coords.longitude);
        });
    },

    updateObjectPosition: function() {
        const distance = this.getDistanceFromLatLonInM(this.data.lat, this.data.long, this.userLocation.latitude, this.userLocation.longitude);
        if (distance <= 250) {
            // Objekt sichtbar machen
            this.el.setAttribute('visible', true);
            // Position des Objekts basierend auf Distanz und Richtung aktualisieren...
            // Hier kann eine komplexere Umrechnung notwendig sein, um den Ort korrekt in der AR-Szene zu positionieren.
        } else {
            this.el.setAttribute('visible', false);
        }
    },

    getDistanceFromLatLonInM: function(lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius der Erde in km
        var dLat = this.deg2rad(lat2-lat1);
        var dLon = this.deg2rad(lon2-lon1); 
        var a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distanz in km
        return d * 1000; // Distanz in m
    },

    deg2rad: function(deg) {
        return deg * (Math.PI/180)
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
