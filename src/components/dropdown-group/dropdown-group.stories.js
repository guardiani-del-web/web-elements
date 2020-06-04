import { html } from "lit-html";
import { withKnobs, text, color } from "@storybook/addon-knobs";
import readme from "./readme.md";
import { getCssVariables } from "../../utils/getCssVariables";

export default {
  title: "Components|DropdownGroup",
  parameters: {
    notes: readme,
  },
  decorators: [withKnobs],
};

export const Basic = () => {
  const cssVariables = getCssVariables("we-dropdown-group", color, text);

  return html`
    <we-dropdown-group>
      <we-dropdown-item label="option 1" top-children="0" left-children="100%" height-children="0" height-children-open="170px" arrow-type="right" arrow-type-checked="left">
        <we-dropdown-group>
          <we-dropdown-item label="suboption 1"></we-dropdown-item>
          <we-dropdown-item label="suboption 2"></we-dropdown-item>
          <we-dropdown-item label="suboption 3"></we-dropdown-item>
        </we-dropdown-group>
      </we-dropdown-item>
      <we-dropdown-item label="option 2">
      </we-dropdown-item>
      <we-dropdown-item label="option 3">
      </we-dropdown-item>
    </we-dropdown-group>
    
    </br>
    
    <we-dropdown-group>
      <we-dropdown-item label="option 1" top-children="0" left-children="100%" height-children="0" height-children-open="170px" arrow-type="right" arrow-type-checked="left">
        <we-dropdown-group>
          <we-dropdown-item label="suboption 1"></we-dropdown-item>
          <we-dropdown-item label="suboption 2"></we-dropdown-item>
          <we-dropdown-item label="suboption 3"></we-dropdown-item>
        </we-dropdown-group>
      </we-dropdown-item>
      <we-dropdown-item label="option 2">
      </we-dropdown-item>
      <we-dropdown-item label="option 3">
      </we-dropdown-item>
    </we-dropdown-group>
    <style>
      html {
        ${cssVariables}
      }
    </style>
  `;
};
