class MyForm extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({mode: 'open'})
  }

  connectedCallback() {
    this.render()
  }

  render() {
    this.shadowRoot.innerHTML = `
<form method="post" action="./">
  Email: <input type="text" name="id" value=""><br>
  Password: <input type="password" name="password" value=""><br>
  <input type="submit">
</form>
`
  }
}

customElements.define('my-form', MyForm)

class MyInputText extends HTMLElement {
  static get formAssociated() { return true; }
  constructor() {
    super()
    this._internals = this.attachInternals()
    this.attachShadow({mode: 'open'})

  }

  get value() {
    return this._input.value
  }
  //
  // set value(val) {
  //   this._input.value = val
  //   this._internals.setFormValue(val)
  // }

  connectedCallback() {
    this.render()
    this._input = this.shadowRoot.querySelector('input')
    this._input.addEventListener('change', this._onChange.bind(this))
  }

  _onChange(e) {
    if(this.hasAttribute('required')){
      if(this.value == '') this._internals.setValidity({customError: true}, 'Submissions require at least one tag.')
      else this._internals.setValidity({})
    }
    this._internals.setFormValue(this.value)
  }

  render() {
    this.shadowRoot.innerHTML = `
<input type="text" name="my-input-text" value="">
`
  }
}

customElements.define('my-input-text', MyInputText)

class MyFormTemplate extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({mode: 'open'})
  }

  connectedCallback() {
    this.render()
  }

  render() {
    this.shadowRoot.innerHTML = `
<form method="post" action="./">
  Email: <input type="text" name="id" value=""><br>
  <my-input-text></my-input-text>
  <input type="submit">
</form>
`
  }
}

customElements.define('my-form-template', MyFormTemplate)


class MyControl extends HTMLElement {
  static formAssociated = true;

  constructor() {
    super();
    this.internals_ = this.attachInternals();
    this.disabled_ = false;
    // Do something if <label> is clicked.
    this.addEventListener('click', () => { });
    // Don't need to register 'formdata' event handler.

    // this.attachShadow({mode: 'open'})
    // this.shadowRoot.innerHTML = '<input type="text" name="aaaa">'
  }

  // New lifecycle callback. This is called when association with
  // <form> is changed.
  formAssociatedCallback(nullableForm) {
    // ...
  }

  get form() { return this.internals_.form; }

  checkValidity() {
    return this.internals_.checkValidity();
  }

  // Suppose that this is called whenever the value is updated.
  onInput() {
    if (!this.matches(':disabled') && hasAttribute('required') &&
    this.value.length <= 0)
    this.internals_.setValidity({customError:true}, 'Please fill in this field.');
  else
    this.internals_.setValidity({});
  }

  // New lifecycle callback. This is called when 'disabled' attribute of
  // this element or an ancestor <fieldset> is updated.
  formDisabledCallback(disabled) {
    // Do something.  e.g. adding/removing 'disabled' content attributes
    // to/from form controls in this shadow tree.
  }

  get value() { }
  set value(v) { }

  // New lifecycle callback. This is called when the owner form is reset.
  formResetCallback() {
    this.value = '';
    this.internals_.setFormValue('');
  }

  // New lifecycle callback. This is called when the browser wants to
  // restore user-visible state.
  formStateRestoreCallback(state, mode) {
    console.log(state)
    onInput();
    // Should inform the value to the User-Agent.
    // this.internals_.setFormValue(state)
  }
}

customElements.define('my-control', MyControl);
