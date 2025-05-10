import AddStoryView from "./addStory-view";

export default class AddStoryPresenter {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  async init() {
    this.view.render();
    this.view.setupElementReferences();
    this.view.initializeMap();
    this.view.startCamera();
    this.setupFormListener();
  }

  setupFormListener() {
    this.view.selectors.form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const description = this.view.selectors.description.value;
      const lat = parseFloat(this.view.selectors.lat.value);
      const lon = parseFloat(this.view.selectors.lon.value);
      const fileInput = this.view.selectors.photoUpload;
      const photoBlob =
        fileInput.files.length > 0
          ? fileInput.files[0]
          : await this.view.capturePhoto();

      try {
        const createNewStoryResult = await this.model.addStoryAPI({
          photo: photoBlob,
          description,
          lat,
          lon,
        });
        if (createNewStoryResult) {
          this.view.showMessage("Story added successfully!", "green");
          this.view.resetForm();
          window.location.href = "#/";
        }
      } catch (error) {
        console.error(error);
        this.view.showMessage("Failed to add story.", "red");
      }
    });

    this.view.selectors.captureBtn.addEventListener("click", async () => {
      const blob = await this.view.capturePhoto();
      console.log("Photo captured", blob);
    });

    this.view.selectors.photoUpload.addEventListener("change", async (e) => {
      const file = e.target.files[0];
      if (file) {
        await this.view.previewUpload(file);
      }
    });

    this.view.selectors.inputRadios.forEach((radio) => {
      radio.addEventListener("change", () => {
        const method = document.querySelector(
          'input[name="input-method"]:checked'
        ).value;
        if (method === "camera") {
          this.view.selectors.cameraInput.style.display = "block";
          this.view.selectors.fileInput.style.display = "none";
          this.view.startCamera();
        } else {
          this.view.selectors.cameraInput.style.display = "none";
          this.view.selectors.fileInput.style.display = "block";
          this.view.stopCamera();
        }
      });
    });
  }
}
