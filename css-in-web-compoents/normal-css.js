class NormalCss extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({mode: 'open'})
  }

  connectedCallback() {
    this.render()
  }

  render() {
    this.shadowRoot.innerHTML = `
<style>
  p {
    color: #f00;
  }
</style>
<p>Normal CSS</p>
`
  }
}

customElements.define('normal-css', NormalCss);
