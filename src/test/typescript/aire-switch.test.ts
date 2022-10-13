import "./harness";

import {
  fixture,
  expect, nextFrame,
} from "@open-wc/testing";

import {
  beforeEach,
  describe,
  it,
  vi
} from "vitest";
import {
  Switch
} from "@aire-ux/aire-switch/aire-switch"


import {html} from "lit";


describe('a aire-switch', async () => {
  let element: Switch;
  beforeEach(async () => {
    element = await fixture(html`
      <aire-switch></aire-switch>
    `);

    await nextFrame();
  });

  it('should mount the component', () => {
    let elements = document.querySelectorAll('aire-switch');
    expect(elements.length).to.equal(1);
  });

});