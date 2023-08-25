AFRAME.registerComponent('a-geotag', {
    schema: {
        lat: {type: 'number', default: 0},
        long: {type: 'number', default: 0},
        getLocation: {type: 'boolean', default: false}
    },

    init: function() {
        if (this.data.getLocation && 'geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setUserLocation(position);
                this.placeObject();
            });
        }
    },

    setUserLocation: function(position) {
        this.userLocation = {
            lat: position.coords.latitude,
            long: position.coords.longitude
        };
    },

    computeOffset: function(lat1, lon1, lat2, lon2) {
        const R = 6371e3; // Radius der Erde in Metern

        // Umwandlung von Breitengrad-Differenz in Entfernung in Metern
        const dy = (lat2 - lat1) * (Math.PI / 180) * R;

        // Umwandlung von Längengrad-Differenz in Entfernung in Metern
        const dx = (lon2 - lon1) * (Math.PI / 180) * R * Math.cos(lat1 * Math.PI / 180);

        return { x: dx, z: dy };
    },

    placeObject: function() {
        const offset = this.computeOffset(this.userLocation.lat, this.userLocation.long, this.data.lat, this.data.long);

        this.el.setAttribute('position', {x: offset.x, y: 0, z: -offset.z});
    }
});

AFRAME.registerPrimitive('a-geotag', {
    defaultComponents: {
        'a-geotag': {}
    },

    mappings: {
        'lat': 'a-geotag.lat',
        'long': 'a-geotag.long',
        'getlocation': 'a-geotag.getLocation'
    }
});
