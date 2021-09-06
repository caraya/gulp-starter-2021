template.innerHTML = `
<style>
  .card {
    background-color: var(--background-color);
    height: var(--card-height);
    width: var(--card-width);
    border: 2px solid var(--border-color);
    margin-top: 2em;
    margin-left: 2em;
    margin-bottom: 2em;
  }

  h1 {
    text-align: center;
    font-size: var(--title-size);
    color: var(--font-color);
  }

  p {
    padding: 1em;
    color: var(--font-color);
  }
</style>
<div class="card">
  <h1><slot name="my-title">Default Title</slot></h1>
  <p><slot name="my-content">Default Content</slot></p>
</div>
`;

class DemoElement extends HTMLElement {
  static get observedAttributes() {
    return ['height', 'width'];
  }

  get height() {
    return this.getAttribute('height');
  }

  set height(newValue) {
    this.setAttribute('height', newValue);
  }

  get width() {
    return this.getAttribute('width');
  }

  set width(newValue) {
    this.setAttribute('width', newValue);
  }

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    const newStyle = document.createElement('style');
    this.shadowRoot.appendChild(newStyle);
    console.log(newStyle);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // console.log('Custom demo-element attributes changed.');
    console.log(`${name} changed from ${oldValue} to ${newValue}`);
    updateStyle(this);
  }
}

function updateStyle(elem) {
  console.log(elem)
  const myStyle = elem.shadowRoot.querySelector('style');
  myStyle.textContent = `
    .card {
      width: ${elem.getAttribute('width')}px;
      height: ${elem.getAttribute('height')}px;
    }
  `;
  console.log(myStyle)
}

window.customElements.define('demo-element', DemoElement);
