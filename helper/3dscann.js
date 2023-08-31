document.addEventListener("DOMContentLoaded", function() {
  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  const webcam = new Webcam(video, canvas);

  document.addEventListener("DOMContentLoaded", function() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const webcam = new Webcam(video, canvas);
    
    webcam.init().then(() => {
      video.addEventListener('loadedmetadata', () => {
        webcam.adjustVideoSize();
      });
    setInterval(() => {
      let imageData = webcam.captureFrame();
      
      GrayFilter.applyFilter(webcam.context, imageData);
      imageData = webcam.captureFrame();
      
      BinaryFilter.applyFilter(webcam.context, imageData);
      imageData = webcam.captureFrame();
      
      SobelFilter.applyFilter(webcam.context, imageData);
    }, 50);
  }).catch(error => {
    console.error("Webcam initialization failed:", error);
  });
});
