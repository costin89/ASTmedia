AFRAME.registerComponent('infoCard', {
    schema: {
        position: {type: 'vec3', default: '0 2 -3'},
        rotation: {type: 'vec3', default: '0 0 0'},
        mainPlaneColor: {type: 'color', default: '#253950'},
        leftPlaneColor: {type: 'color', default: '#52d5ef'},
        rightPlaneColor: {type: 'color', default: '#52d5ef'},
        stepTextValue: {type: 'string', default: 'Step:'},
        stepsTextValue: {type: 'string', default: '1'},
        titelTextValue: {type: 'string', default: 'der titel kommt hier rein'},
        mainTextValue: {type: 'string', default: '012345678901234567890123456789012\n ...'},
        counterTextValue: {type: 'string', default: '1/100'}
    },

    init: function() {
        const el = this.el;

        el.setAttribute('position', this.data.position);
        el.setAttribute('rotation', this.data.rotation);

        // Create mainPlane
        const mainPlane = document.createElement('a-plane');
        mainPlane.setAttribute('id', 'mainPlane');
        mainPlane.setAttribute('position', '0 0 0');
        mainPlane.setAttribute('material', `color: ${this.data.mainPlaneColor}; side: double; opacity: 1; visible: true`);
        mainPlane.setAttribute('scale', '2 1 1');
        el.appendChild(mainPlane);

        // Create texts and append to mainPlane
        const texts = ['stepText', 'stepsText', 'titelText', 'mainText', 'counterText'];
        const values = [this.data.stepTextValue, this.data.stepsTextValue, this.data.titelTextValue, this.data.mainTextValue, this.data.counterTextValue];
        texts.forEach((id, index) => {
            const textEl = document.createElement('a-text');
            textEl.setAttribute('id', id);
            textEl.setAttribute('value', values[index]);
            mainPlane.appendChild(textEl);
        });

        // Create leftPlane
        const leftPlane = document.createElement('a-plane');
        leftPlane.setAttribute('id', 'leftPlane');
        leftPlane.setAttribute('position', '-0.997 0.220 0.01');
        leftPlane.setAttribute('material', `color: ${this.data.leftPlaneColor}; side: double; opacity: 1; visible: true`);
        leftPlane.setAttribute('scale', '0.326 0.267 1');
        el.appendChild(leftPlane);

        // Create rightPlane
        const rightPlane = document.createElement('a-plane');
        rightPlane.setAttribute('id', 'rightPlane');
        rightPlane.setAttribute('position', '0.997 0.220 0.01');
        rightPlane.setAttribute('material', `color: ${this.data.rightPlaneColor}; side: double; opacity: 1; visible: true`);
        rightPlane.setAttribute('scale', '0.326 0.267 1');
        el.appendChild(rightPlane);
    }
});
