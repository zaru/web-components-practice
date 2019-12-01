import './button.js'

class CopyText extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({mode: 'open'})
    console.log(this.buttonLabel)
  }

  connectedCallback() {
    this.render()
  }

  get text() {
    return this.getAttribute('text')
  }

  render() {
    this.shadowRoot.innerHTML = `
<style>
  div {
    font-size: 62.5%;
    display: flex;
    justify-content: flex-start;
  }
  input, copy-text-button::part(button) {
    border: 1px solid #cccccc;
    padding: 10px 10px;
    font-size: 1.0rem;
  }
  input {
    border-right: none;
    border-radius: 5px 0 0 5px;
  }
  copy-text-button::part(button) {
    border-radius: 0 5px 5px 0;
    background: #f0f0f0;
  }
</style>
<div part="component">
  <input part="text" type="text" value="${this.text}" readonly>
  <copy-text-button exportparts="button: button" text="${this.text}">
</div>
      `
  }
}

customElements.define('copy-text', CopyText);
