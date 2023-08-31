class Gray {
    constructor() {
        // Konstruktor könnte später für Initialisierungen genutzt werden
    }

    // Transformiert ein Canvas Context in Graustufen
    static applyToCanvasContext(ctx, width, height) {
        // Hole die Bilddaten vom Canvas
        let imageData = ctx.getImageData(0, 0, width, height);
        let data = imageData.data;

        // Iteriere durch jeden Pixel und ändere ihn zu Grau
        for (let i = 0; i < data.length; i += 4) {
            let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i]     = avg; // Rot
            data[i + 1] = avg; // Grün
            data[i + 2] = avg; // Blau
        }

        // Setze die geänderten Bilddaten zurück auf den Canvas
        ctx.putImageData(imageData, 0, 0);
    }
}