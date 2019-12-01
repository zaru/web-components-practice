class AdoptedImportCss extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({mode: 'open'})
  }

  connectedCallback() {
    this.loadCss()
  }

  loadCss() {
    const css = new CSSStyleSheet()
    css.replace(`@import 'sample.css';`).then(() => {
      this.render()
    })
    this.shadowRoot.adoptedStyleSheets = [css]
  }

  render() {
    this.shadowRoot.innerHTML = `<p>Adopted import CSS</p>`
  }
}

customElements.define('adopted-import-css', AdoptedImportCss);
