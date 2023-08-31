class Blur {
    constructor() {
        // Konstruktor könnte später für Initialisierungen genutzt werden
    }

    // Einfache Box-Blur Funktion für Canvas Context
    static applyToCanvasContext(ctx, width, height, radius = 2) {
        let imageData = ctx.getImageData(0, 0, width, height);
        let pixels = imageData.data;
        let newPixels = new Uint8ClampedArray(pixels.length);
        
        // Kopiere Originalpixel in newPixels
        newPixels.set(pixels);
        
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let i = (y * width + x) * 4;
                
                let sumRed = 0, sumGreen = 0, sumBlue = 0, count = 0;
                
                // Loop über Nachbarschaftspixel
                for (let dx = -radius; dx <= radius; dx++) {
                    for (let dy = -radius; dy <= radius; dy++) {
                        let x1 = Math.min(width - 1, Math.max(0, x + dx));
                        let y1 = Math.min(height - 1, Math.max(0, y + dy));
                        let j = (y1 * width + x1) * 4;

                        sumRed += pixels[j];
                        sumGreen += pixels[j + 1];
                        sumBlue += pixels[j + 2];
                        
                        count++;
                    }
                }

                // Setze den Durchschnitt der Summe als neuen Pixelwert
                newPixels[i]     = sumRed / count;
                newPixels[i + 1] = sumGreen / count;
                newPixels[i + 2] = sumBlue / count;
            }
        }

        // Ersetze die alten Pixel durch die neuen Pixel
        imageData.data.set(newPixels);
        ctx.putImageData(imageData, 0, 0);
    }
}