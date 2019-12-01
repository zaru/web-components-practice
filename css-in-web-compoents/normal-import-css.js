class NormalImportCss extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({mode: 'open'})
  }

  connectedCallback() {
    this.render()
  }

  render() {
    this.shadowRoot.innerHTML = `
<link rel="stylesheet" href="sample.css">
<p>Normal Import CSS</p>
`
  }
}

customElements.define('normal-import-css', NormalImportCss);
