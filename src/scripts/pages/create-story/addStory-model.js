import { createStory } from "../../data/api.js";


export default class AddStoryModel {
  async addStoryAPI(story) {
    return await createStory(story);
  }
}
