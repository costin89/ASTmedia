AFRAME.registerComponent('a-geotag', {
    schema: {
        lat: {type: 'number', default: 0},
        long: {type: 'number', default: 0},
        getLocation: {type: 'boolean', default: false}
    },

    init: function() {
        const el = this.el;

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

    haversineDistance: function(coords1, coords2) {
        function toRad(x) {
            return x * Math.PI / 180;
        }

        const R = 6371e3; // Radius der Erde in Metern

        const dLat = toRad(coords2.lat - coords1.lat);
        const dLong = toRad(coords2.long - coords1.long);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(toRad(coords1.lat)) * Math.cos(toRad(coords2.lat)) *
                  Math.sin(dLong / 2) * Math.sin(dLong / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        
        return R * c;
    },

    placeObject: function() {
        const distance = this.haversineDistance(this.userLocation, {lat: this.data.lat, long: this.data.long});

        if (distance <= 250) { // Wenn sich das Objekt in einem Umkreis von 250 Metern befindet
            this.el.setAttribute('visible', true);
            // Positionierung basierend auf der Distanz könnte hier verbessert werden, da wir momentan nur die direkte Distanz haben.
            // Für eine einfache Implementierung setzen wir jedoch die z-Koordinate (vorwärts/rückwärts) auf die Distanz:
            this.el.setAttribute('position', {x: 0, y: 0, z: -distance});
        } else {
            this.el.setAttribute('visible', false);
        }
    }
});
