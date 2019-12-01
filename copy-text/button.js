class CopyTextButton extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({mode: 'open'})
    this.addEventListener('click', () => { this.copyText() })
  }

  connectedCallback() {
    this.render()
  }

  get text() {
    return this.getAttribute('text')
  }

  copyText() {
    navigator.clipboard.writeText(this.text)
    this.shadowRoot.querySelector('button').innerText = 'copied!'
  }

  render() {
    this.shadowRoot.innerHTML = `<button part="button">copy</button>`

  }
}

customElements.define('copy-text-button', CopyTextButton);
