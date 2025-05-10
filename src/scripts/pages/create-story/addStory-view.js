import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "../../../styles/skip-content.css";

export default class AddStoryView {
  constructor() {
    this.selectors = {};
    this.stream = null;
    this.marker = null;
  }

  render() {
    return `
      <section class="create-page container" id="create-page">
        <h2>Create New Story</h2>
        <form class="create-story-form" id="create-story-form" enctype="multipart/form-data">
          <div class="form-group">
            <label>Choose Input Method</label>
            <div class="input-method-selector">
              <label class="radio-label">
                <input type="radio" name="input-method" value="camera" checked> Camera
              </label>
              <label class="radio-label">
                <input type="radio" name="input-method" value="upload"> Upload File
              </label>
            </div>
            <div id="camera-input" class="input-method">
              <label for="photo">Camera</label>
              <video id="camera" autoplay playsinline width="320" height="240"></video>
              <div class="photo-preview" id="camera-preview" style="display: none;">
                <label>Photo Capture</label>
                <img id="photo-preview" alt="Photo preview" width="320" height="240">
              </div>
              <button type="button" id="capture-btn" class="btn">Capture Foto</button>
            </div>
            <div id="file-input" class="input-method" style="display: none;">
              <label for="photo-upload">Upload Image</label>
              <input type="file" id="photo-upload" accept="image/*" class="file-input">
              <div class="photo-preview" id="upload-preview" style="display: none;">
                <label>Photo Preview</label>
                <img id="upload-preview-img" alt="Photo preview" width="320" height="240">
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea id="description" required></textarea>
          </div>
          <div class="form-group">
            <label for="map">Choose Location</label>
            <div id="map" style="height: 300px;"></div>
            <input type="text" id="lat" placeholder="Latitude" readonly />
            <input type="text" id="lon" placeholder="Longitude" readonly />
          </div>
          <button type="submit" class="btn">Create Story</button>
        </form>
        <div class="create-story-message" id="create-story-message"></div>
      </section>
    `;
  }

  setupElementReferences() {
    this.selectors = {
      form: document.getElementById("create-story-form"),
      message: document.getElementById("create-story-message"),
      camera: document.getElementById("camera"),
      captureBtn: document.getElementById("capture-btn"),
      cameraPreview: document.getElementById("camera-preview"),
      photoPreview: document.getElementById("photo-preview"),
      photoUpload: document.getElementById("photo-upload"),
      uploadPreview: document.getElementById("upload-preview"),
      uploadPreviewImg: document.getElementById("upload-preview-img"),
      cameraInput: document.getElementById("camera-input"),
      fileInput: document.getElementById("file-input"),
      inputRadios: document.querySelectorAll('input[name="input-method"]'),
      description: document.getElementById("description"),
      lat: document.getElementById("lat"),
      lon: document.getElementById("lon"),
      mapContainer: document.getElementById("map"),
    };
  }

  startCamera() {
    return navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        this.stream = stream;
        this.selectors.camera.srcObject = stream;
        this.selectors.camera.play();
      })
      .catch((err) => {
        console.error("Kamera tidak bisa diakses:", err);
        this.showMessage(
          "Tidak bisa mengakses kamera. Pastikan izin diberikan.",
          "red"
        );
      });
  }

  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
      this.selectors.camera.srcObject = null;
    }
  }

  capturePhoto() {
    const canvas = document.createElement("canvas");
    canvas.width = this.selectors.camera.videoWidth;
    canvas.height = this.selectors.camera.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(this.selectors.camera, 0, 0);
    const dataURL = canvas.toDataURL("image/jpeg");
    this.selectors.photoPreview.src = dataURL;
    this.selectors.cameraPreview.style.display = "block";
    return new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg"));
  }

  previewUpload(file) {
    const reader = new FileReader();
    return new Promise((resolve) => {
      reader.onload = (e) => {
        this.selectors.uploadPreviewImg.src = e.target.result;
        this.selectors.uploadPreview.style.display = "block";
        resolve();
      };
      reader.readAsDataURL(file);
    });
  }

  initializeMap() {
    const map = L.map("map").setView([-6.2, 106.8], 10);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "Elite Global",
    }).addTo(map);

    const icon = L.icon({
      iconUrl: "/images/marker.svg",
      iconSize: [32, 47],
      iconAnchor: [16, 47],
      popupAnchor: [0, -47],
    });

    map.on("click", (e) => {
      const { lat, lng } = e.latlng;
      this.selectors.lat.value = lat;
      this.selectors.lon.value = lng;

      if (this.marker) {
        this.marker.setLatLng(e.latlng);
      } else {
        this.marker = L.marker(e.latlng, { icon }).addTo(map);
      }
    });
  }

  showMessage(text, color) {
    this.selectors.message.textContent = text;
    this.selectors.message.style.color = color;
  }

  resetForm() {
    this.selectors.form.reset();
    this.selectors.cameraPreview.style.display = "none";
    this.selectors.uploadPreview.style.display = "none";
  }
}
