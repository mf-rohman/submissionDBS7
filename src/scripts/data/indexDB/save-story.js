import { openDB } from "idb";

const DATABASE_NAME = "eliteglobal";
const DATABASE_VERSION = 1;
const OBJECT_STORE_NAME = "saved-stories";

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade: (db) => {
    db.createObjectStore(OBJECT_STORE_NAME, {
      keyPath: "id",
    });
  },
});

const SavedStories = {
  async getStory(id) {
    const db = await dbPromise;
    const story = await db.get(OBJECT_STORE_NAME, id);
    if (story) {
      return story;
    }
    return null;
  },
  async getAllStories() {
    const db = await dbPromise;
    const stories = await db.getAll(OBJECT_STORE_NAME);
    return stories;
  },
  async addStory(story) {
    const db = await dbPromise;
    await db.add(OBJECT_STORE_NAME, story);
  },
  async deleteStory(id) {
    const db = await dbPromise;
    await db.delete(OBJECT_STORE_NAME, id);
  },
};

export { SavedStories };
