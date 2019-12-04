// template markup
// ===============================================================================================

const html = `
  <input type="checkbox" />
`;

// stylesheet
// ===============================================================================================

const css = `
  :host {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 20px;
    background-color: rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    transition: all 0.3s;
    box-shadow: 0 0 0 1px #313D4F;
  }
  :host::after {
    content: '';
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius:50%;
    background-color: white;
    box-shadow: 0 0 0 1px rgba(0,0,0,.07), 0 1px 3px 0 rgba(59,65,94,.1);
    top: 1px;
    left: 1px;
    transition: all 0.3s;
  }
  input[type=checkbox] {
    display:none;
  }
  :host([checked]) {
    background-color: #36AF47;
    box-shadow: 0 0 0 1px #36AF47;
    border:none;
  }
  :host([checked])::after {
    left: 20px;
  }
  :host([disabled])::after {
    opacity: .5;
  }
  :host([checked][disabled]) {
    background-color: rgba(0, 0, 0, 0.25);
    box-shadow: 0 0 0 1px #313D4F;
  }
  :host([checked][disabled])::after {
    opacity: .5;
  }
  :host-context(td) {
  }
`;

// utils
// ===============================================================================================

const fireEvent = host =>
  host.dispatchEvent(new Event("change", {
    bubbles: true,
    composed: true
  }));

customElements.define('toggle-switch', class extends HTMLElement {

  // Identify the element as a form-associated custom element
  static formAssociated = true;

  static observedAttributes = ['disabled', 'checked'];

  constructor() {
    super();
    // Get access to the internal form control APIs
    this._internals = this.attachInternals();

    this.attachShadow({mode: 'open', delegatesFocus: true});
    this.shadowRoot.innerHTML = `<style>${css}</style>${html}`;

    this.input_ = this.shadowRoot.querySelector('input');

    // Do something if <label> is clicked.
    this.addEventListener('click', () => {
      let checked = this.toggleAttribute('checked');
      this.checked = checked;
      fireEvent(this);
    });

    this.addEventListener('keypress', ({metaKey, keyCode}) => {
      if(keyCode === 32) {
        let checked = this.toggleAttribute('checked');
        this.checked = checked;
        fireEvent(this);
      }
    })

  }

  // New lifecycle callbacks for form-associated
  //  custom elements.

  // New lifecycle callback. This is called when association with
  // <form> is changed.
  formAssociatedCallback(nullableForm) {
    console.log('Form associated.');
  }

  // New lifecycle callback. This is called when ‘disabled’ attribute of
  // this element or an ancestor <fieldset> is updated.
  formDisabledCallback(disabled) {
    // Do something.  e.g. adding/removing ‘disabled’ content attributes
    // to/from form controls in this shadow tree.
    if (disabled) {
      this.input_.disabled = disabled;
    }
  }

  // New lifecycle callback. This is called when the owner form is reset.
  formResetCallback() {
    console.log('Form reset.');
  }

  // New lifecycle callback. This is called when the browser wants to
  // restore user-visible state.
  formStateRestoreCallback(state, mode) {
    console.log('Form state restore.');
  }

  // The following properties and methods aren't strictly required,
  // but native form controls provide them. Providing them helps
  // ensure consistency with native controls.
  get form() { return this._internals.form; }
  get name() { return this.getAttribute('name'); }
  get type() { return this.localName; }
  get validity() {return this.internals_.validity; }
  get validationMessage() {return this.internals_.validationMessage; }
  get willValidate() {return this.internals_.willValidate; }

  checkValidity() { return this.internals_.checkValidity(); }
  reportValidity() { return this.internals_.reportValidity(); }

  // Standard custom element callback
  // Here, we forward values like placeholder and disabled
  // to the internal input
  attributeChangedCallback(name, oldValue, newValue) {
    switch(name) {
      case 'checked':
        this.input_.checked = !this.input_.checked;
        this.setAttribute('aria-checked', this.input_.checked);
        break;
    }
  }

  connectedCallback() {

    if (!this.hasAttribute('role'))
      this.setAttribute('role', 'checkbox');
    if (!this.hasAttribute('tabindex'))
      this.setAttribute('tabindex', 0);

  }

});
