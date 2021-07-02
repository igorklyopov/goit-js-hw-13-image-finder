export default class Button {
  constructor(selector) {
    this.selector = selector;
    this.ref = document.querySelector(selector);
  }

  hide() {
    this.ref.classList.add('is-hidden');
  }

  show() {
    this.ref.classList.remove('is-hidden');
  }

  active(signature) {
    this.ref.textContent = signature;
    this.ref.disabled = true;
  }

  inactive(signature) {
    this.ref.textContent = signature;
    this.ref.disabled = false;
  }
}
