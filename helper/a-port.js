AFRAME.registerComponent('a-port', {
  schema: {
    active: { default: true },
    maxDistance: { type: 'number', default: 5 },
    collisionEntities: { type: 'string', default: '.collidable' }
  },

  init: function () {
    var el = this.el;
    var data = this.data;
    var self = this;

    this.raycaster = new THREE.Raycaster();

    el.addEventListener('triggerdown', function () {
      if (!data.active) return;

      var currentPosition = el.getAttribute('position');
      var cameraEl = el.sceneEl.camera.el;
      var direction = new THREE.Vector3();

      cameraEl.object3D.getWorldDirection(direction);
      self.raycaster.set(currentPosition, direction);

      var intersections = self.raycaster.intersectObjects(el.sceneEl.querySelectorAll(data.collisionEntities), true);

      if (intersections.length > 0 && intersections[0].distance <= data.maxDistance) {
        var targetPosition = intersections[0].point;
        el.setAttribute('position', targetPosition);
      }
    });
  }
});
