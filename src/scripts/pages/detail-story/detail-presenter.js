export default class DetailPresenter {
  constructor({ view, model, storyId }) {
    this.view = view;
    this.model = model;
    this.storyId = storyId;
  }

  async loadStoryDetail() {
    try {
      const story = await this.model.getStoryDetail(this.storyId);

      if (story && story.story) {
        this.view.showStoryDetail(story.story);
      } else {
        this.view.showError("Story not found.");
      }
    } catch (error) {
      this.view.showError("Failed to load story detail.");
      console.error(error);
    }
  }
}
