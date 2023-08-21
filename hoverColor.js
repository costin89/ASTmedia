 AFRAME.registerComponent('hoverColor', {
        init: function() {
            // Die Referenz des Elements, auf das die Komponente angewendet wird
            let el = this.el;

            el.classList.add('selectable');

            // Setze die Event-Listener für Raycaster-Interaktionen
            el.addEventListener('raycaster-intersected', function() {
                el.setAttribute('color', 'yellow');
            });

            el.addEventListener('raycaster-intersected-cleared', function() {
                el.setAttribute('color', 'blue');
            });
        }
    });
