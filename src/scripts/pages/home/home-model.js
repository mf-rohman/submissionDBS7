import { getAllDataStories } from "../../data/api";

export default class HomeModel {
    async getStories() {
        return await getAllDataStories();
    }
}