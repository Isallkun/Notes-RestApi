class FormAdd extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
          <style>
              textarea {
                  resize: vertical;
              }
          </style>
          <div class="container-form">
              <form id="add-note-form">
                  <div>
                      <label for="note-title">Judul:</label>
                      <input type="text" id="note-title" name="note-title" autocomplete="off" required>
                  </div>
                  <div>
                      <label for="note-body">Catatan:</label>
                      <textarea id="note-body" name="note-body" rows="4" required></textarea>
                  </div>
                  <button type="submit">Tambah Catatan</button>
              </form>
          </div>
          `;
  }
}

customElements.define("form-add", FormAdd);
