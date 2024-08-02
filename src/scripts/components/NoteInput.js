class NoteInput extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      this.render();
      this.addEventListeners();
    }
  
    render() {
      this.shadowRoot.innerHTML = `
        <style>
          .card {
            border: 1px solid #ced4da;
            border-radius: .25rem;
            box-shadow: 0 0 .125rem rgba(0,0,0,.075);
          }
          .card-header {
            background-color: #f8f9fa;
            padding: .75rem 1.25rem;
            border-bottom: 1px solid #e9ecef;
            border-radius: .25rem .25rem 0 0;
          }
          .card-body {
            padding: 1.25rem;
          }
          .form-group {
            margin-bottom: 1rem;
          }
          .form-control {
            display: block;
            width: 100%;
            padding: .375rem .75rem;
            font-size: 1rem;
            line-height: 1.5;
            color: #495057;
            background-color: #fff;
            border: 1px solid #ced4da;
            border-radius: .25rem;
          }
          .btn {
            display: inline-block;
            font-weight: 400;
            text-align: center;
            vertical-align: middle;
            cursor: pointer;
            border: 1px solid transparent;
            border-radius: .25rem;
            padding: .375rem .75rem;
            font-size: 1rem;
            line-height: 1.5;
          }
          .btn-success {
            color: #fff;
            background-color: #28a745;
            border-color: #28a745;
          }
          .btn-primary {
            color: #fff;
            background-color: #007bff;
            border-color: #007bff;
          }
        </style>
        <div class="card">
          <div class="card-header">
            <h5 class="card-title">Input Note</h5>
          </div>
          <div class="card-body">
            <div class="form-group">
              <label for="inputNoteId">Note ID</label>
              <input
                id="inputNoteId"
                type="number"
                class="form-control"
                placeholder="Note ID"
              />
            </div>
            <div class="form-group">
              <label for="inputNoteTitle">Note Title</label>
              <input
                id="inputNoteTitle"
                type="text"
                class="form-control"
                placeholder="Note Title"
              />
            </div>
            <div class="form-group">
              <label for="inputNoteBody">Note Body</label>
              <input
                id="inputNoteBody"
                type="text"
                class="form-control"
                placeholder="Note Body"
              />
            </div>
            <div class="form-group">
              <button id="buttonSave" class="btn btn-success">Save</button>
              <button id="buttonArchive" class="btn btn-primary">Archive</button>
            </div>
          </div>
        </div>
      `;
    }
  
    addEventListeners() {
      const buttonSave = this.shadowRoot.querySelector('#buttonSave');
      buttonSave.addEventListener('click', () => {
        const inputNoteTitle = this.shadowRoot.querySelector('#inputNoteTitle').value;
        const inputNoteBody = this.shadowRoot.querySelector('#inputNoteBody').value;
        this.dispatchEvent(new CustomEvent('note-save', {
          detail: { title: inputNoteTitle, body: inputNoteBody },
          bubbles: true,
          composed: true,
        }));
      });
    }
  }
  
  customElements.define('note-input', NoteInput);
  