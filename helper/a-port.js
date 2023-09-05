AFRAME.registerComponent('a-port', {
  schema: {
    active: { default: true }
  },

  init: function () {
    var el = this.el;
    var data = this.data;
    var self = this;

    // Eventlistener für den Trigger des Controllers hinzufügen
    el.addEventListener('triggerdown', function () {
      if (!data.active) return;

      var currentPosition = el.getAttribute('position');
      var targetPosition = /* Hier musst du bestimmen, wohin teleportiert werden soll, z.B. basierend auf der Blickrichtung oder einem festgelegten Ziel. */

      el.setAttribute('position', targetPosition);
    });
  }
});
