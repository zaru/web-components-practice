class MyLoginForm extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({mode: 'open'})
  }

  connectedCallback() {
    this.render()
  }

  render() {
    this.shadowRoot.innerHTML = `
<p>Shadow DOM form</p>
<form method="post" action="./">
  Email: <input type="text" name="id" value=""><br>
  Password: <input type="password" name="password" value=""><br>
  <input type="submit">
</form>
`
  }
}

customElements.define('my-login-form', MyLoginForm)
