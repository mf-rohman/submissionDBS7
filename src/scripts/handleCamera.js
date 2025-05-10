export default function stopAllCamera() {
  const videos = document.querySelectorAll("video");
  videos.forEach((video) => {
    const stream = video.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      video.srcObject = null;
      console.log("[stopAllCameras] Kamera dimatikan.");
    }
  });
}
