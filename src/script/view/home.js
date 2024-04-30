import NotesApi from "../data/remote/notesApi.js";
import "../components/index.js";

const home = () => {
  const container = document.querySelector(".container-card");
  const formAdd = document.querySelector("form-add");
  const titleInput = document.querySelector("#note-title");
  const bodyInput = document.querySelector("#note-body");
  const loadingIndicator = document.createElement("loading-indicator");

  titleInput.addEventListener("invalid", handleTitleValidation);
  bodyInput.addEventListener("invalid", handleBodyValidation);
  formAdd.addEventListener("submit", handleSubmitForm);

  renderNotes();

  function handleTitleValidation(event) {
    event.target.setCustomValidity("");
    if (!event.target.validity.valid) {
      event.target.setCustomValidity("Judul wajib diisi.");
    }
  }

  function handleBodyValidation(event) {
    event.target.setCustomValidity("");
    if (!event.target.validity.valid) {
      event.target.setCustomValidity("Catatan wajib diisi.");
    }
  }

  function renderNotes() {
    container.innerHTML = "";
    container.appendChild(loadingIndicator);

    NotesApi.getBook()
      .then((data) => {
        // Remove loading indicator
        container.removeChild(loadingIndicator);

        if (typeof data === "object") {
          if (data.data.length != 0) {
            data.data.forEach(renderNote);
          } else {
            console.error("Data tidak ada.");
            container.innerHTML = `
                        <style> 
                        .container-card {
                            display: flex; 
                            justify-content: center;
                            align-items: center;
                        }
                        </style>
                        <div class="alert alert-primary" role="alert">
                            Belum ada catatan yang tersimpan 😊
                        </div>
                        `;
          }
        } else {
          console.error("Data bukan objek.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function renderNote(item) {
    const note = {
      id: item.id,
      title: item.title,
      body: item.body,
      createdAt: item.createdAt,
      archive: item.archive,
    };
    const noteElement = document.createElement("note-card");
    noteElement.note = note;

    // Button delete
    const deleteButton = noteElement.shadowRoot.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => {
      deleteClick(item.id);
    });
    container.appendChild(noteElement);
  }

  function handleSubmitForm(event) {
    event.preventDefault();
    addNote();
  }

  function addNote() {
    const title = titleInput.value;
    const body = bodyInput.value;
    const newNote = {
      title: title,
      body: body,
    };

    NotesApi.insertNote(newNote)
      .then((response) => {
        renderNotes();
        titleInput.value = "";
        bodyInput.value = "";
        window.alert(`${response.message}`);
      })
      .catch((error) => {
        window.alert(`Gagal menambahkan catatan! ${error.message}`);
      });
  }

  function deleteClick(noteId) {
    NotesApi.deleteNote(noteId)
      .then((response) => {
        renderNotes();
        window.alert(`${response.message}`);
      })
      .catch((error) => {
        window.alert(`Gagal menghapus catatan! ${error.message}`);
      });
  }
};

export default home;
