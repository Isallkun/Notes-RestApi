class AppBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
          <div class="app-bar">
              <div class="app-bar-content">
                  <h1 class="app-bar-title">Simple Notes App</h1>
              </div>
          </div>
          `;
  }
}

customElements.define("app-bar", AppBar);
