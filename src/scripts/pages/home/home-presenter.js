import { SavedStories } from "../../data/indexDB/save-story.js";

export default class HomePresenter {
  constructor({ view, model }) {
    this.view = view;
    this.model = model;
    this.cachedStories = null;
  }

  async loadStories() {
    if (this.cachedStories) {
      this.updateView(this.cachedStories);
      return;
    }

    this.view.showLoading();
    try {
      const dataStory = await this.model.getStories();

      if (!dataStory.listStory || dataStory.listStory.length === 0) {
        this.view.showEmptyMessage();
        return;
      }

      const savedStories = await SavedStories.getAllStories();
      const savedStoryIds = savedStories.map((story) => story.id);

      const formattedStories = dataStory.listStory.map((story) => ({
        id: story.id,
        photoUrl: story.photoUrl,
        name: story.name,
        description: this.capitalizeEachWord(story.description),
        date: new Date(story.createdAt).toLocaleString(),
        lat: story.lat,
        lon: story.lon,
        isSaved: savedStoryIds.includes(story.id),
      }));

      this.cachedStories = formattedStories;
      this.updateView(formattedStories);
    } catch (error) {
      this.view.showError(`Can't load stories: ${error.message}`);
    }
  }

  async loadSaveStories() {
    try {
      const savedStories = await SavedStories.getAllStories();

      if (!savedStories || savedStories.length === 0) {
        this.view.showEmptyMessage();
        return;
      }

      const formattedStories = savedStories.map((story) => ({
        ...story, 
        isSaved: true, 
        date: new Date (story.date).toLocaleString()
      }));

      this.view.showStories(formattedStories);
      this.view.addMarkers(formattedStories);
    } 
    catch (error) {
      console.log("Failed to load saved stories:", error);  
    }
  }

  updateView(stories) {
    this.view.showStories(stories);
    this.view.addMarkers(stories);
  }

  async handleSaveStory(story) {
    try {
      const isAlreadySaved = await SavedStories.getStory(story.id);
      if (isAlreadySaved) {
        await SavedStories.deleteStory(story.id);
        this.showNotificationSW(
          "Story Removed",
          `${story.name} has been removed from saved stories.`
        );
      } else {
        await SavedStories.addStory(story);
        this.showNotificationSW("Story Saved", `${story.name} has been saved.`);
      }

      this.cachedStories = this.cachedStories.map((caches) =>
        caches.id === story.id
          ? { ...caches, isSaved: !isAlreadySaved }
          : caches
      );

      this.updateView(this.cachedStories);
    } catch (error) {
      console.error("❌ Gagal menyimpan story:", error);
      alert("❌ Gagal menyimpan story: " + error.message);
    }
  }

  async handleDetailStory(story) {
    try {
      localStorage.setItem("selected_story_id", story.id);
      window.location.hash = `#/detail/${story.id}`;
    } catch (error) {
      console.error("❌ Gagal membuka detail story:", error);
      alert("❌ Gagal membuka detail story: " + error.message);
    }
  }

  async showNotificationSW(title, body) {
    if ("serviceWorker" in navigator && Notification.permission === "granted") {
      try {
        const registration = await navigator.serviceWorker.ready;
        const isSubscribed = await registration.pushManager.getSubscription();
        if (isSubscribed) {
          registration.active.postMessage({
            type: "SHOW_NOTIFICATION",
            data: {
              title: title,
              body: body,
            },
          });
        } else {
          console.error("❌ Not subscribed to push notifications.");
        }
      } catch (error) {
        console.error("❌ Error showing notification:", error);
      }
    }
  }

  capitalizeEachWord(str) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }
}
