import {
  Switch
} from "@aire-ux/aire-switch/aire-switch";

export default function setup() {


  window.customElements.define(
      'aire-switch',
      Switch
  );
  Object.defineProperty(window.location, 'href', {
    writable: true,
    value: 'https://localhost'
  });
  // (window as any).chai.use(chaiDomDiff);
}
setup();