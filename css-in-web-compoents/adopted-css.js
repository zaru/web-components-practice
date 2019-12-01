const css = new CSSStyleSheet()
css.replaceSync(`
p {
  color: #00f;
}
`)

class AdoptedCss extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({mode: 'open'})
    this.shadowRoot.adoptedStyleSheets = [css]
  }

  connectedCallback() {
    this.render()
  }

  render() {
    this.shadowRoot.innerHTML = `<p>Adopted CSS</p>`
  }
}

customElements.define('adopted-css', AdoptedCss);
