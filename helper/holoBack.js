AFRAME.registerPrimitive('a-holoBack', {
  defaultComponents: {
    geometry: {primitive: 'box', depth: '100', height: '100', width: '100'},
    material: {color: 'black', side: 'double', roughness: '1'}
  },
  mappings: {
    // Hier können Sie Attribute hinzufügen, die auf Komponenten gemappt werden sollen. 
    // Zum Beispiel könnten Sie `width` auf `geometry.width` abbilden, damit Sie die Breite direkt als Attribut angeben können.
  }
});
