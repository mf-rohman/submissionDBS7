export default class DetailView {
  render() {
    return `
      <section class="detail-page">
        <div id="story-detail"><p>Loading...</p></div>
      </section>
    `;
  }

  showStoryDetail(story) {
    const detailEl = document.getElementById("story-detail");
    detailEl.innerHTML = `
      <h2>${story.name}</h2>
      <img src="${story.photoUrl}" alt="${story.name}" />
      <p>${story.description}</p>
      <p><strong>Created At:</strong> ${new Date(
        story.createdAt
      ).toLocaleString()}</p>
    `;
  }

  showError(message) {
    document.getElementById(
      "story-detail"
    ).innerHTML = `<p class="error">${message}</p>`;
  }
}
