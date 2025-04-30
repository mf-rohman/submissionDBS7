import { createStory } from "../../data/api";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
export default class CreatePage {
  async render() {
    return `
            <section class="create-page container">
                <h2>Create New Story</h2>
                <form class="create-story-form" id="create-story-form" enctype="multipart/form-data">
                    <div class="form-group">
                        <label for="photo">Camera</label>
                        <video  id="camera" autoplay playsinline width="320" height="240" style="border:1px solid #ccc"></video>
                        <br>
                        <button type="button" id="capture-btn" class="btn">Capture Foto</button>
                        <canvas id="snapshot" width="320" height="240" style="display: none;"></canvas>
                    </div>
                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea id="description" required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="map">Choose Location</label>
                        <div id="map" style="height: 300px;"></div>
                        <input type="hidden" id="lat" />
                        <input type="hidden" id="lon" />
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
    const canvas = document.getElementById("snapshot");
    const captureButton = document.getElementById("capture-btn");
    let photoBlob = null;

    let stream = null;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoCapture.srcObject = stream;
      videoCapture.play();
    } catch (error) {
      createStoryMessage.textContent = "Can't access camera";
      createStoryMessage.style.color = "red";
    }

    captureButton.addEventListener("click", () => {
      const context = canvas.getContext("2d");
      canvas.style.display = "block";
      context.drawImage(videoCapture, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        photoBlob = blob;
        console.log("captured", blob);
      }, "image/jpeg");
    });

    const map = L.map("map").setView([-6.2, 106.8], 10);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "Elite Global",
    }).addTo(map);

    let marker;
    map.on("click", function (e) {
      const { lat, lng } = e.latlng;
      document.getElementById("lat").value = lat;
      document.getElementById("lon").value = lng;
    //   const location = {lat, lon};
    //   console.log({location});
      if (marker) {
        marker.setLatLng(e.latlng);
      } else {
        marker = L.marker(e.latlng).addTo(map);
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
        createStoryMessage.textContent = "Take picture frist";
        createStoryMessage.style.color = "red";
        return;
      }

      try {
        await createStory({
          description,
          photo: photoBlob,
          lat: lat ? parseFloat(lat) : undefined,
          lon: lon ? parseFloat(lon) : undefined,
        });
        createStoryMessage.textContent = "Story created successfully";
        createStoryMessage.style.color = "green";
        createStoryForm.reset();
        canvas.style.display = "none";

        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
        }
        window.location.hash = "#/";
      } catch (error) {
        createStoryMessage.textContent = `Failed create story: ${error.message}`;
        createStoryMessage.style.color = "red";
      }
    });
  }
}
