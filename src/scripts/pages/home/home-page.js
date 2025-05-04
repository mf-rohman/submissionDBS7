import { getAllDataStories } from "../../data/api";
import "../../../styles/home-page.css";

export default class HomePage {
  async render() {
    return `
      <section class="home-page">
        <div class="story-list" id="story-list"></div>
        <div class="home-page-massege" id="home-page-message"></div>
      </section>
    `;
  }

  async afterRender() {
    function capitalizeEachWord(str) {
      return str
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
    }
    const listStoryContainer = document.getElementById("story-list");
    const homePageMessage = document.getElementById("home-page-message");
    listStoryContainer.innerHTML = "<p>Loading...</p>";

    try {
      const dataStory = await getAllDataStories();
      if (!dataStory.listStory || dataStory.listStory.length === 0) {
        listStoryContainer.innerHTML = "<p>There is no story in here</p>";
        return;
      }

      listStoryContainer.innerHTML = "";
      console.log({ dataStory });
      dataStory.listStory.forEach((story) => {
        const storyElement = document.createElement("div");
        storyElement.classList.add("story-item");
        storyElement.innerHTML = `
          <div class="story-card">
            <img src="${story.photoUrl}" alt="${
          story.name
        }" class="story-img" />
            <div class="story-body">
              <h4 style="text-align: center;">${story.name.toUpperCase()}</h4> <br>
              <p class="story-desc"><span>Description : </span> ${capitalizeEachWord(
                story.description
              )}</p>
              <p class="story-date"><span>Time Stamp : </span> ${new Date(
                story.createdAt
              ).toLocaleString()}</p>
              <p class="story-coordinate"><span>Latitude : </span>${
                story.lat
              }</p>
              <p class="story-coordinate"><span>Longitude : </span>${
                story.lon
              }</p>
            </div>
          </div>
        `;
        listStoryContainer.append(storyElement);
      });
    } catch (error) {
      homePageMessage.textContent = `Can't load stories: ${error.message}`;
      homePageMessage.style.color = "red";
    }
  }
}
