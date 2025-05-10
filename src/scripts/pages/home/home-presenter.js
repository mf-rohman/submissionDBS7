export default class HomePresenter {
  constructor({ view, model }) {
    this.view = view;
    this.model = model;
  }

  async loadStories() {
    this.view.showLoading();
    try {
      const dataStory = await this.model.getStories();

      if (!dataStory.listStory || dataStory.listStory.length === 0) {
        this.view.showEmptyMessage();
        return;
      }

      const formattedStories = dataStory.listStory.map((story) => ({
        photoUrl: story.photoUrl,
        name: story.name,
        description: this.capitalizeEachWord(story.description),
        date: new Date(story.createdAt).toLocaleString(),
        lat: story.lat,
        lon: story.lon,
      }));

      this.view.showStories(formattedStories);
      this.view.addMarkers(formattedStories);
    } catch (error) {
      this.view.showError(`Can't load stories: ${error.message}`);
    }
  }

  capitalizeEachWord(str) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }
}
