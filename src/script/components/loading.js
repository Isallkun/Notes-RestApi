class LoadingIndicator extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
          <style> 
              .container-card {
                  display: flex; 
                  justify-content: center;
                  align-items: center;
              }
                          </style>
          <div class="alert alert-primary" role="alert">
              Loading...
          </div>
          `;
  }
}

customElements.define("loading-indicator", LoadingIndicator);
