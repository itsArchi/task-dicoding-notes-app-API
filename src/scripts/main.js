import { showElement, hideElement } from './animations';
import gsap from 'gsap'; 

const main = () => {
  const baseUrl = 'https://notes-api.dicoding.dev/v2';

  const showLoading = () => {
    document.getElementById('loading').style.display = 'block';
  };

  const hideLoading = () => {
    document.getElementById('loading').style.display = 'none';
  };

  const getNote = () => {
    showLoading();
    fetch(`${baseUrl}/notes`)
      .then((response) => response.json())
      .then((responseJson) => {
        hideLoading();
        if (responseJson.status !== 'success') {
          showResponseMessage(responseJson.message);
        } else {
          renderAllNotes(responseJson.data);
        }
      })
      .catch((error) => {
        hideLoading();
        showResponseMessage(error.message);
      });
  };

  const insertNote = async (note) => {
    showLoading();
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
      };

      const response = await fetch(`${baseUrl}/notes`, options);
      const responseJson = await response.json();
      hideLoading();
      if (responseJson.status !== 'success') {
        throw new Error(responseJson.message);
      }
      showResponseMessage(responseJson.message);
      getNote();
    } catch (error) {
      hideLoading();
      showResponseMessage(error.message);
    }
  };

  const archiveNote = (noteId) => {
    showLoading();
    fetch(`${baseUrl}/notes/${noteId}/archive`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        hideLoading();
        if (responseJson.status !== 'success') {
          throw new Error(responseJson.message);
        }
        showResponseMessage(responseJson.message);
        getNote();
      })
      .catch((error) => {
        hideLoading();
        showResponseMessage(error.message);
      });
  };

  const removeNote = (noteId) => {
    showLoading();
    fetch(`${baseUrl}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        hideLoading();
        if (responseJson.status !== 'success') {
          throw new Error(responseJson.message);
        }
        showResponseMessage(responseJson.message);
        getNote();
      })
      .catch((error) => {
        hideLoading();
        showResponseMessage(error.message);
      });
  };

  const renderAllNotes = (notes) => {
    const listNoteElement = document.querySelector('#listNote');
    listNoteElement.innerHTML = '';

    notes.forEach((note) => {
      listNoteElement.innerHTML += `
        <div class="col-lg-4 col-md-6 col-sm-12" style="margin-top: 12px;">
          <div class="card">
            <div class="card-body">
              <h5>(${note.id}) ${note.title}</h5>
              <p>${note.body}</p>
              <button type="button" class="btn btn-danger button-delete" id="${note.id}">Delete</button>
              <button type="button" class="btn btn-warning button-archive" id="${note.id}">Archive</button>
            </div>
          </div>
        </div>
      `;
    });

    showElement(listNoteElement);

    const deleteButtons = document.querySelectorAll('.button-delete');
    deleteButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        const noteId = event.target.id;
        removeNote(noteId);
      });
    });

    const archiveButtons = document.querySelectorAll('.button-archive');
    archiveButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        const noteId = event.target.id;
        archiveNote(noteId);
      });
    });
  };

  const showResponseMessage = (message = 'Check your internet connection') => {
    alert(message);
  };

  document.addEventListener('DOMContentLoaded', () => {
    const inputNoteTitle = document.querySelector('#inputNoteTitle');
    const inputNoteBody = document.querySelector('#inputNoteBody');
    const buttonSave = document.querySelector('#buttonSave');

    buttonSave.addEventListener('click', function () {
      const note = {
        title: inputNoteTitle.value,
        body: inputNoteBody.value,
      };

      insertNote(note);
    });

    getNote();
  });
};

export default main;
