import L from "leaflet";
import "leaflet/dist/leaflet.css";
import showNotification from "../../utils/showNotification";

export default class HomeView {
  constructor({ onSaveClick, onDetailClick, onShowSavedClick }) {
    this.onSaveClick = onSaveClick;
    this.onDetailClick = onDetailClick;
    this.handleShowSaved = onShowSavedClick;
  }



  render() {
    return `
      <section class="home-page" id="home-page">
        <div id="map" style="height: 400px; width: 100%; margin-bottom: 20px;"></div>
        <div style="text-align: right; margin-bottom: 1rem;">
          <button id="btn-show-saved" class="btn-show-saved">Show Saved Stories</button>
        </div>
        <div class="story-list" id="story-list"></div>
        <div class="home-page-message" id="home-page-message"></div>
      </section>
    `;
  }

  eventRender() {
    this.storyListContainer = document.getElementById("story-list");
    this.messageContainer = document.getElementById("home-page-message");
    this.mapContainer = document.getElementById("map");

    this.map = L.map(this.mapContainer).setView([-7.250445, 112.768845], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "Elite Global",
    }).addTo(this.map);

     const btnSaved = document.getElementById("btn-show-saved");
    if (btnSaved && this.handleShowSaved) {
      btnSaved.addEventListener("click", () => this.handleShowSaved());
    }
  }

  addMarkers(stories) {
    const icon = L.icon({
      iconUrl: "/images/marker.svg",
      iconSize: [32, 47],
      iconAnchor: [16, 47],
      popupAnchor: [0, -47],
    });

    stories.forEach((story) => {
      const { lat, lon, name, description } = story;
      if (lat && lon) {
        const storyLatLng = [lat, lon];
        L.marker(storyLatLng, { icon })
          .addTo(this.map)
          .bindPopup(`<strong>${story.name}</strong><br>${story.description}`);
      }
    });
  }

  showLoading() {
    this.storyListContainer.innerHTML = "<p>Loading...</p>";
  }

  showStories(stories) {
    this.storyListContainer.innerHTML = "";
    stories.forEach((story) => {
      const storyElement = document.createElement("div");
      storyElement.classList.add("story-item");
      storyElement.innerHTML = `
        <div class="story-card">
          <img src="${story.photoUrl}" alt="${story.name}" class="story-img" />
          <div class="story-body">
            <h4 style="text-align: center;">${story.name.toUpperCase()}</h4><br>
            <p class="story-desc"><span>Description : </span> ${
              story.description
            }</p>
            <p class="story-coordinate"><span>Created At : </span>${
              story.date
            }</p>
          </div>
          <div class="btn-story">
            <button class="btn-detail-story">Detail</button>
            <button class="btn-save-story"
              data-bookmark-button 
              data-story-id="${story.id}" 
              data-story-name="${story.name}" 
              data-story-description="${story.description}" 
              data-story-lat="${story.lat}" 
              data-story-lon="${story.lon}" 
              data-story-photo-url="${story.photoUrl}" 
              data-story-date="${story.date}">
              ${story.isSaved ? "Unsave" : "Save"}
            </button>
          </div>
        </div>
      `;
      storyElement
        .querySelector(".btn-detail-story")
        .addEventListener("click", async () => {
          event.preventDefault();
          await this.onDetailClick(story);
        });
      storyElement
        .querySelector(".btn-save-story")
        .addEventListener("click", () => {
          this.onSaveClick(story);
          showNotification(`Story ${story.name} ${story.isSaved ? "Unsaved" : "Saved"}`, `Your Story was Successfully ${story.isSaved ? "Unsaved" : "Saved"}` );
        });
      this.storyListContainer.append(storyElement);
    });
  }

  showError(message) {
    this.messageContainer.textContent = message;
    this.messageContainer.style.color = "red";
  }

  showEmptyMessage() {
    this.storyListContainer.innerHTML = "<p>There is no story in here</p>";
  }
}
