class Hough {
    constructor() {
        // Der Konstruktor könnte später für Initialisierungen genutzt werden.
    }

    // Einfache Hough-Transformation für Linien auf einem Canvas Context
    static applyToCanvasContext(ctx, width, height) {
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        const accumulator = {};

        const thetaStep = Math.PI / 180;

        // Hough-Transformation
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const i = (y * width + x) * 4;
                if (data[i] === 255) {
                    for (let theta = 0; theta < Math.PI; theta += thetaStep) {
                        const rho = x * Math.cos(theta) + y * Math.sin(theta);
                        const key = `${rho.toFixed(2)}_${theta.toFixed(2)}`;

                        accumulator[key] = (accumulator[key] || 0) + 1;
                    }
                }
            }
        }

        // Zeichne die detektierten Linien (dies ist ein sehr naiver Ansatz)
        ctx.strokeStyle = 'red';
        for (const [key, value] of Object.entries(accumulator)) {
            if (value > 50) {
                const [rho, theta] = key.split('_').map(Number);
                const x1 = rho * Math.cos(theta) - 1000 * Math.sin(theta);
                const y1 = rho * Math.sin(theta) + 1000 * Math.cos(theta);
                const x2 = rho * Math.cos(theta) + 1000 * Math.sin(theta);
                const y2 = rho * Math.sin(theta) - 1000 * Math.cos(theta);

                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            }
        }
    }
}