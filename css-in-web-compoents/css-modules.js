import styles from './sample.css'

class CssModules extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({mode: 'open'})
    // this.shadowRoot.moreStyleSheets.push(styles)
  }

  connectedCallback() {
    this.render()
  }

  render() {
    this.shadowRoot.innerHTML = `<p>Adopted CSS</p>`
  }
}

customElements.define('css-modules', CssModules);
