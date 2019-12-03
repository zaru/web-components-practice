class FetchTemplate extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({mode: 'open'})
    fetch('./template.html').then(response => {
      return response.text()
    }).then(text => {
      const template = document.createElement('template')
      template.innerHTML = text
      this.shadowRoot.appendChild(template.content.cloneNode(true))
    })
  }
}

customElements.define('fetch-template', FetchTemplate)
