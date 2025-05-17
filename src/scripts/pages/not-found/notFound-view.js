export default class NotFoundView {
  render(message) {
    return `
      <section class="not-found animate-fade-in">
        <iframe src="https://lottie.host/embed/d3530321-2edc-4389-b699-9b6fbecd04b0/hmykPIv5hm.lottie" frameborder="0" style="width: 100%; height: 400px;"></iframe>
        <div class="not-found-code animate-slide-up-delay">404</div>
        <p class="animate-slide-up">${message}</p>
        <a href="#/" class="btn-home-animated">
            <span class="home-icon">🏠</span>
            <span class="home-text">Back to Home</span>
        </a>
      </section>
    `;
  }
}
