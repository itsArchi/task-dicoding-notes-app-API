class Footer extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
      <style>
        .footer {
          background-color: #f8f9fa;
          padding: 0.5rem 0;
          text-align: center;
          color: #fff;
          font-weight: bold;
          font-size: 18px;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
        }
      </style>
        <footer class="footer bg-primary">
          <div class="container">
            <span class=>Noer Rohim</span>
          </div>
        </footer>
      `;
    }
  }
  
  customElements.define('app-footer', Footer);
  