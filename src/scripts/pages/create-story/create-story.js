import { createStory } from "../../data/api";
import "leaflet/dist/leaflet.css";
import "../../../styles/create-story-page.css";
import L from "leaflet";

export default class CreatePage {
  async render() {
    return `
            <section class="create-page container">
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
                        <input type="text" id="lat" placeholder="Field for latitude from map marker" readonly />
                        <input type="text" id="lon" placeholder="Field for longitude from map marker" readonly />
                    </div>
                    <button type="submit" class="btn">Create Story</button>
                </form>
                <div class="create-story-message" id="create-story-message"></div>
            </section>
        `;
  }

  async afterRender() {
    const createStoryForm = document.getElementById("create-story-form");
    const createStoryMessage = document.getElementById("create-story-message");
    const videoCapture = document.getElementById("camera");
    const photoPreview = document.getElementById("photo-preview");
    const cameraPreviewContainer = document.getElementById("camera-preview");
    const captureButton = document.getElementById("capture-btn");
    const photoUpload = document.getElementById("photo-upload");
    const uploadPreviewContainer = document.getElementById("upload-preview");
    const uploadPreviewImg = document.getElementById("upload-preview-img");
    const cameraInput = document.getElementById("camera-input");
    const fileInput = document.getElementById("file-input");
    const inputMethodRadios = document.querySelectorAll(
      'input[name="input-method"]'
    );

    let photoBlob = null;
    let stream = null;

    inputMethodRadios.forEach((radio) => {
      radio.addEventListener("change", (e) => {
        const method = e.target.value;

        if (method === "camera") {
          cameraInput.style.display = "block";
          fileInput.style.display = "none";
          startCamera();
        } else {
          cameraInput.style.display = "none";
          fileInput.style.display = "block";
          stopCamera();
        }
        cameraPreviewContainer.style.display = "none";
        uploadPreviewContainer.style.display = "none";
        photoBlob = null;
      });
    });

    async function startCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoCapture.srcObject = stream;
        videoCapture.play();
      } catch (error) {
        createStoryMessage.textContent = "Can't access camera";
        createStoryMessage.style.color = "red";
      }
    }

    function stopCamera() {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        stream = null;
      }
    }

    startCamera();

    captureButton.addEventListener("click", () => {
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = videoCapture.videoWidth;
      tempCanvas.height = videoCapture.videoHeight;

      const context = tempCanvas.getContext("2d");
      context.drawImage(
        videoCapture,
        0,
        0,
        tempCanvas.width,
        tempCanvas.height
      );

      const dataURL = tempCanvas.toDataURL("image/jpeg");
      photoPreview.src = dataURL;
      cameraPreviewContainer.style.display = "block";

      tempCanvas.toBlob((blob) => {
        photoBlob = blob;
        console.log("captured", blob);
      }, "image/jpeg");
    });

    photoUpload.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        photoBlob = file;
        const reader = new FileReader();
        reader.onload = (event) => {
          uploadPreviewImg.src = event.target.result;
          uploadPreviewContainer.style.display = "block";
        };
        reader.readAsDataURL(file);
      }
    });

    const map = L.map("map").setView([-6.2, 106.8], 10);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "Elite Global",
    }).addTo(map);

    const cutomMarker = L.icon({
      iconUrl: "/images/marker.svg",
      iconSize: [32, 47],
      iconAnchor: [16, 47],
      popupAnchor: [0, -47],
    });

    let marker;
    map.on("click", (e) => {
      const { lat, lng } = e.latlng;
      document.getElementById("lat").value = lat;
      document.getElementById("lon").value = lng;
      if (marker) {
        marker.setLatLng(e.latlng);
      } else {
        marker = L.marker(e.latlng, { icon: cutomMarker }).addTo(map);
      }
    });

    createStoryForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      createStoryMessage.textContent = "Create new story...";
      createStoryMessage.style.color = "yellow";

      const description = document.getElementById("description").value;
      const lat = document.getElementById("lat").value;
      const lon = document.getElementById("lon").value;

      if (!photoBlob) {
        createStoryMessage.textContent =
          "Please provide an image (capture or upload)";
        createStoryMessage.style.color = "red";
        return;
      }

      try {
        await createStory({
          description,
          photo: photoBlob,
          lat: lat ? Number.parseFloat(lat) : undefined,
          lon: lon ? Number.parseFloat(lon) : undefined,
        });
        createStoryMessage.textContent = "Story created successfully";
        createStoryMessage.style.color = "green";
        createStoryForm.reset();

        cameraPreviewContainer.style.display = "none";
        uploadPreviewContainer.style.display = "none";

        stopCamera();

        window.location.hash = "#/";
      } catch (error) {
        createStoryMessage.textContent = `Failed create story: ${error.message}`;
        createStoryMessage.style.color = "red";
      }
    });
  }
}
