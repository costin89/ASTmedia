(function() {
    var videoElement = document.getElementById('videoElement');

    var constraints = {
        video: {
            facingMode: "user", // "user" für Frontkamera, "environment" für Rückkamera bei Smartphones
            width: { ideal: 1280 },
            height: { ideal: 720 }
        }
    };

    function handleSuccess(stream) {
        videoElement.srcObject = stream;
    }

    function handleError(error) {
        console.error('Error accessing the camera: ', error);
    }

    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);
    } else {
        alert('Ihr Browser unterstützt keinen Kamerazugriff.');
    }
})();
