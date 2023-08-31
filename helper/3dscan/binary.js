class BinaryFilter {
  static applyFilter(context, imageData, threshold = 128) {
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      const binary = avg > threshold ? 255 : 0;
      data[i] = binary;
      data[i + 1] = binary;
      data[i + 2] = binary;
    }
    context.putImageData(imageData, 0, 0);
  }
}
