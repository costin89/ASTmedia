class Canny {
    constructor() {
        // Constructor could be used for future initialization.
    }

    static gaussianBlur(data, width, height, sigma) {
        // Erzeugen des Gaußschen Kernels
        let kernel = [];
        let kernelSize = Math.ceil(6 * sigma);
        if (kernelSize % 2 === 0) kernelSize++;  // Der Kernel sollte eine ungerade Größe haben
        let halfKernelSize = Math.floor(kernelSize / 2);
        let sum = 0;
        
        for (let y = -halfKernelSize; y <= halfKernelSize; y++) {
            for (let x = -halfKernelSize; x <= halfKernelSize; x++) {
                let value = (1 / (2 * Math.PI * sigma ** 2)) * Math.exp(-(x ** 2 + y ** 2) / (2 * sigma ** 2));
                kernel.push(value);
                sum += value;
            }
        }
        
        // Normalisieren des Kernels
        for (let i = 0; i < kernel.length; i++) {
            kernel[i] /= sum;
        }
        
        // Anwendung des Gaußschen Kernels
        let output = new Array(data.length).fill(0);
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let i = y * width + x;
                let weightedSum = 0;
                
                for (let ky = -halfKernelSize; ky <= halfKernelSize; ky++) {
                    for (let kx = -halfKernelSize; kx <= halfKernelSize; kx++) {
                        let xi = x + kx;
                        let yi = y + ky;
                        
                        if (xi >= 0 && xi < width && yi >= 0 && yi < height) {
                            let j = yi * width + xi;
                            let k = (ky + halfKernelSize) * kernelSize + (kx + halfKernelSize);
                            weightedSum += data[j] * kernel[k];
                        }
                    }
                }
                
                output[i] = weightedSum;
            }
        }
        
        // Kopiere die Ausgabe zurück in das Originaldatenarray
        for (let i = 0; i < data.length; i++) {
            data[i] = output[i];
        }
    }

    static gradientIntensity(data, width, height) {
        // Initialisiere die Ausgabe für die Gradientenintensität und Richtung
        let gradient = new Array(data.length).fill(0);
        let theta = new Array(data.length).fill(0);
        
        for (let y = 1; y < height - 1; y++) {
            for (let x = 1; x < width - 1; x++) {
                let i = y * width + x;
                
                let topLeft = data[(y - 1) * width + (x - 1)];
                let topCenter = data[(y - 1) * width + x];
                let topRight = data[(y - 1) * width + (x + 1)];
                
                let middleLeft = data[y * width + (x - 1)];
                let middleRight = data[y * width + (x + 1)];
                
                let bottomLeft = data[(y + 1) * width + (x - 1)];
                let bottomCenter = data[(y + 1) * width + x];
                let bottomRight = data[(y + 1) * width + (x + 1)];
                
                // Sobel-Operator
                let gx = (topRight + 2 * middleRight + bottomRight) - (topLeft + 2 * middleLeft + bottomLeft);
                let gy = (bottomLeft + 2 * bottomCenter + bottomRight) - (topLeft + 2 * topCenter + topRight);
                
                // Gradientenintensität und Richtung
                let magnitude = Math.sqrt(gx * gx + gy * gy);
                let angle = Math.atan2(gy, gx);
                
                gradient[i] = magnitude;
                theta[i] = angle;
            }
        }
        
        return { gradient, theta };
    }

    static nonMaxSuppression(gradient, theta, width, height) {
        // Initialisieren der Ausgabedaten
        let suppressed = new Array(gradient.length).fill(0);
        
        for (let y = 1; y < height - 1; y++) {
            for (let x = 1; x < width - 1; x++) {
                let i = y * width + x;
                
                let angle = theta[i];
                if (angle < 0) angle += Math.PI;
                
                let prevPixel, nextPixel;
                
                // Bestimmen der Nachbarn in der Gradientenrichtung
                if (angle <= Math.PI / 8 || angle > 7 * Math.PI / 8) {
                    prevPixel = gradient[y * width + (x - 1)];
                    nextPixel = gradient[y * width + (x + 1)];
                } else if (angle <= 3 * Math.PI / 8) {
                    prevPixel = gradient[(y - 1) * width + (x + 1)];
                    nextPixel = gradient[(y + 1) * width + (x - 1)];
                } else if (angle <= 5 * Math.PI / 8) {
                    prevPixel = gradient[(y - 1) * width + x];
                    nextPixel = gradient[(y + 1) * width + x];
                } else {
                    prevPixel = gradient[(y - 1) * width + (x - 1)];
                    nextPixel = gradient[(y + 1) * width + (x + 1)];
                }
                
                // Nicht-Maximal-Unterdrückung
                if (gradient[i] >= prevPixel && gradient[i] >= nextPixel) {
                    suppressed[i] = gradient[i];
                } else {
                    suppressed[i] = 0;
                }
            }
        }
        
        return suppressed;
    }


    static edgeTracking(data, width, height, lowThreshold, highThreshold) {
        let output = new Array(data.length).fill(0);
        let visited = new Array(data.length).fill(false);
        
        function dfs(x, y) {
            if (x < 0 || x >= width || y < 0 || y >= height) return;
            let i = y * width + x;
            if (visited[i] || data[i] < lowThreshold) return;
            
            visited[i] = true;
            output[i] = data[i];
            
            dfs(x - 1, y);
            dfs(x + 1, y);
            dfs(x, y - 1);
            dfs(x, y + 1);
            dfs(x - 1, y - 1);
            dfs(x + 1, y + 1);
            dfs(x - 1, y + 1);
            dfs(x + 1, y - 1);
        }
        
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let i = y * width + x;
                if (!visited[i] && data[i] >= highThreshold) {
                    dfs(x, y);
                }
            }
        }
        
        return output;
    }

    static applyToCanvasContext(ctx, width, height) {
        let imageData = ctx.getImageData(0, 0, width, height);
        let data = imageData.data;
        
        // Step 1: Grayscale conversion (you could use a more sophisticated formula)
        let grayscale = [];
        for (let i = 0; i < data.length; i += 4) {
            let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            grayscale.push(avg);
        }

        // Step 2: Apply Gaussian blur
        this.gaussianBlur(grayscale, width, height, 1.4);
        
        // Step 3: Calculate the gradient intensity and direction
        let { gradient, theta } = this.gradientIntensity(grayscale, width, height);
        
        // Step 4: Apply non-maximum suppression
        let suppressed = this.nonMaxSuppression(gradient, theta, width, height);
        
        // Step 5: Perform edge tracking by hysteresis
        let edgeData = this.edgeTracking(suppressed, width, height, 20, 40);

        // Finally, apply the edge data back to the canvas
        for (let i = 0; i < edgeData.length; i++) {
            let val = edgeData[i];
            let j = i * 4;
            data[j] = data[j + 1] = data[j + 2] = val;
            data[j + 3] = 255; // Fully opaque
        }

        ctx.putImageData(imageData, 0, 0);
    }
}
