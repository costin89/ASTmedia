AFRAME.registerComponent('holo-card', {
  schema: {
    position: { type: 'vec3', default: '0 2 -3' },
    orientation: { type: 'vec3', default: '0 0 0' },
    mainPlaneColor: { type: 'color', default: '#253950' },
    leftPlaneColor: { type: 'color', default: '#52d5ef' },
    rightPlaneColor: { type: 'color', default: '#52d5ef' },
    stepsTextValue: { type: 'string', default: '1' },
    titelTextValue: { type: 'string', default: 'der titel kommt hier rein' },
    mainTextValue: { type: 'string', default: 'Default Main Text' },
    counterTextValue: { type: 'string', default: '1/100' }
  },

  init: function() {
      var el = this.el;
  
      el.setAttribute('position', this.data.position);
      el.setAttribute('rotation', this.data.orientation);
  
      // Main plane
      var mainPlane = document.createElement('a-plane');
      mainPlane.setAttribute('id', 'mainPlane');
      mainPlane.setAttribute('position', '0 0 0');
      mainPlane.setAttribute('rotation', '0 0 0');
      mainPlane.setAttribute('scale', '2 1 1');
      mainPlane.setAttribute('material', `color: ${this.data.mainPlaneColor}; side: double; opacity: 1; visible: true;`);
      
      el.appendChild(mainPlane);
  
      // Text elements
      const texts = [
        { id: 'stepsText', value: this.data.stepsTextValue, position: '-0.310 0.282 0' },
        { id: 'titelText', value: this.data.titelTextValue, position: '-0.385 0.200 0' },
        { id: 'mainText', value: this.data.mainTextValue, position: '-0.385 0.100 0', attributes: { width: '1.5', baseline: 'top', letterSpacing: '-0.17', lineHeight: '50', wrapCount: '38.1' } },
        { id: 'counterText', value: this.data.counterTextValue, position: '-0.385 -0.420 0' }
      ];
  
      texts.forEach(textData => {
        var textEl = document.createElement('a-text');
        textEl.setAttribute('id', textData.id);
        textEl.setAttribute('value', textData.value);
        textEl.setAttribute('position', textData.position);
        textEl.setAttribute('scale', '0.597 1 1');
        textEl.setAttribute('anchor', 'left');
        textEl.setAttribute('width', '1');
        textEl.setAttribute('color', '#52d5ef');
        textEl.setAttribute('material', 'side: double; visible: true;');
        
        // Add any additional attributes
        if(textData.attributes) {
          for(const attr in textData.attributes) {
            textEl.setAttribute(attr, textData.attributes[attr]);
          }
        }
  
        mainPlane.appendChild(textEl);
      });
  
      // Left plane
      var leftPlane = document.createElement('a-plane');
      leftPlane.setAttribute('id', 'leftPlane');
      leftPlane.setAttribute('position', '-0.997 0.220 0.01');
      leftPlane.setAttribute('rotation', '0 0 0');
      leftPlane.setAttribute('scale', '0.326 0.267 1');
      leftPlane.setAttribute('material', `color: ${this.data.leftPlaneColor}; side: double; opacity: 1; visible: true;`);
      leftPlane.setAttribute('hoverColor', 'color: red');
      el.appendChild(leftPlane);
  
      // Right plane
      var rightPlane = document.createElement('a-plane');
      rightPlane.setAttribute('id', 'rightPlane');
      rightPlane.setAttribute('position', '0.997 0.220 0.01');
      rightPlane.setAttribute('rotation', '0 0 0');
      rightPlane.setAttribute('scale', '0.326 0.267 1');
      rightPlane.setAttribute('material', `color: ${this.data.rightPlaneColor}; side: double; opacity: 1; visible: true;`);
      rightPlane.setAttribute('hoverColor', 'color: red');
      el.appendChild(rightPlane);
    }
  });

AFRAME.registerPrimitive('a-holoCard', {
  defaultComponents: {
    'holo-card': {}
  },
  
  mappings: {
    position: 'holo-card.position',
    orientation: 'holo-card.orientation',
    mainPlaneColor: 'holo-card.mainPlaneColor',
    leftPlaneColor: 'holo-card.leftPlaneColor',
    rightPlaneColor: 'holo-card.rightPlaneColor',
    stepsTextValue: 'holo-card.stepsTextValue',
    titelTextValue: 'holo-card.titelTextValue',
    mainTextValue: 'holo-card.mainTextValue',
    counterTextValue: 'holo-card.counterTextValue'
  }
});

