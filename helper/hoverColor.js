 AFRAME.registerComponent('hoverColor', {
        schema: {
            color: {type: 'color', default: 'yellow'}
        },

        init: function() {
            let el = this.el;
            let data = this.data; // Referenz auf die Komponenten-Daten

            el.classList.add('selectable');

            el.addEventListener('raycaster-intersected', function() {
                el.setAttribute('color', data.color);
            });

            el.addEventListener('raycaster-intersected-cleared', function() {
                el.setAttribute('color', 'blue');
            });
        }
    });
