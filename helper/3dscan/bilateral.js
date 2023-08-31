class Bilateral {
    constructor() {
        // Leerer Konstruktor
    }

    static spatialWeight(x, y, sigma) {
        return Math.exp(-(x*x + y*y) / (2 * sigma * sigma));
    }

    static intensityWeight(a, b, sigma) {
        let diff = a - b;
        return Math.exp(-(diff * diff) / (2 * sigma * sigma));
    }
    
    static applyToCanvasContext(ctx, width, height, spatialSigma, intensitySigma, windowSize = 5) {
        let imageData = ctx.getImageData(0, 0, width, height);
        let data = imageData.data;
        
        let grayScaleData = new Float32Array(width * height);
        
        for (let i = 0; i < data.length; i += 4) {
            let gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
            grayScaleData[i / 4] = gray;
        }
        
        this.applyFilter(grayScaleData, width, height, spatialSigma, intensitySigma, windowSize);
        
        for (let i = 0, j = 0; i < data.length; i += 4, j++) {
            data[i] = data[i + 1] = data[i + 2] = grayScaleData[j];
        }
        
        ctx.putImageData(imageData, 0, 0);
    }


    static applyFilter(data, width, height, spatialSigma, intensitySigma, windowSize = 5) {
        let halfWindowSize = Math.floor(windowSize / 2);
        let output = new Float32Array(data.length);

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let i = y * width + x;
                let centralIntensity = data[i];

                let weightedSum = 0;
                let normalization = 0;

                for (let dy = -halfWindowSize; dy <= halfWindowSize; dy++) {
                    for (let dx = -halfWindowSize; dx <= halfWindowSize; dx++) {
                        let newY = y + dy;
                        let newX = x + dx;

                        if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
                            let j = newY * width + newX;
                            let currentIntensity = data[j];

                            let spatialW = this.spatialWeight(dx, dy, spatialSigma);
                            let intensityW = this.intensityWeight(centralIntensity, currentIntensity, intensitySigma);

                            let weight = spatialW * intensityW;
                            weightedSum += weight * currentIntensity;
                            normalization += weight;
                        }
                    }
                }

                output[i] = weightedSum / normalization;
            }
        }

        // Kopieren Sie die Ausgabe zurück in das Originaldatenarray (optional)
        for (let i = 0; i < data.length; i++) {
            data[i] = output[i];
        }
    }
}