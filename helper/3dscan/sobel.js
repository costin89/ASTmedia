class SobelFilter {
  static applyFilter(context, imageData) {
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    const grayscale = [];

    // Zu Graustufen konvertieren
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      grayscale.push(avg);
    }

    const sobelData = [];
    const sobelOperatorX = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
    const sobelOperatorY = [-1, -2, -1, 0, 0, 0, 1, 2, 1];

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let px = (y * width + x);
        let gx = 0;
        let gy = 0;

        for (let cy = -1; cy <= 1; cy++) {
          for (let cx = -1; cx <= 1; cx++) {
            const cpx = ((y + cy) * width + (x + cx));
            if (cpx >= 0 && cpx < grayscale.length) {
              gx += grayscale[cpx] * sobelOperatorX[(cy + 1) * 3 + (cx + 1)];
              gy += grayscale[cpx] * sobelOperatorY[(cy + 1) * 3 + (cx + 1)];
            }
          }
        }
        
        let gradient = Math.sqrt(gx * gx + gy * gy);
        sobelData[px] = gradient;
      }
    }

    for (let j = 0; j < sobelData.length; j++) {
      let pixelIndex = j * 4;
      data[pixelIndex] = sobelData[j];
      data[pixelIndex + 1] = sobelData[j];
      data[pixelIndex + 2] = sobelData[j];
      data[pixelIndex + 3] = 255;
    }

    context.putImageData(imageData, 0, 0);
  }
}
