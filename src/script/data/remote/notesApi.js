const BASE_URL = "https://notes-api.dicoding.dev/v2";

class NotesApi {
  static getBook() {
    return fetch(`${BASE_URL}/notes`)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          throw new Error(`Failed to fetch notes: ${response.statusText}`);
        }
      })
      .catch((error) => {
        throw new Error(`Error fetching notes: ${error.message}`);
      });
  }

  static insertNote = (note) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    };

    return fetch(`${BASE_URL}/notes`, options)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          throw new Error(`Failed to insert note: ${response.status}`);
        }
      })
      .catch((error) => {
        throw new Error(`Error inserting note: ${error.message}`);
      });
  };

  static deleteNote = (id) => {
    const options = {
      method: "DELETE",
    };

    return fetch(`${BASE_URL}/notes/${id}`, options)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          throw new Error(`Failed to delete note: ${response.statusText}`);
        }
      })
      .catch((error) => {
        throw new Error(`Error deleting note: ${error.message}`);
      });
  };
}

export default NotesApi;
