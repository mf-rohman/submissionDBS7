import { getDetailStory } from "../../data/api";

export default class DetailModel {
  async getStoryDetail(id) {
    return await getDetailStory(id);
  }
}
