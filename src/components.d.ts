/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface WeAccordion {
        "open": boolean;
    }
    interface WeAccordionGroup {
        "multiple": boolean;
    }
    interface WeCard {
    }
    interface WeCheckbox {
        "checked": boolean;
        "disabled": boolean;
        "value": string;
    }
    interface WeCheckboxGroup {
        "changeCallback": any;
        "name": any;
    }
    interface WeChips {
        "isSelectable": boolean;
        "label": string;
        "removeLeft": boolean;
        "removeRight": boolean;
        "srcImgLeft": string;
        "srcImgRight": string;
    }
    interface WeDivider {
    }
    interface WeDropdownGroup {
        "orientation": string;
    }
    interface WeDropdownItem {
        "arrowType": string;
        "arrowTypeChecked": string;
        "bottomChildren": string;
        "heightChildren": string;
        "heightChildrenOpen": string;
        "label": string;
        "leftChildren": string;
        "rightChildren": string;
        "topChildren": string;
        "widthChildren": string;
        "widthChildrenOpen": string;
    }
    interface WeModal {
        "isVisible": boolean;
    }
    interface WeRadio {
        "checked": boolean;
        "disabled": boolean;
        "value": string;
    }
    interface WeRadioGroup {
        "changeCallback": any;
        "name": string;
    }
    interface WeSlider {
        "changeCallback": any;
        "disabled": boolean;
        "max": number;
        "min": number;
        "name": string;
        "value": number;
    }
    interface WeSwitch {
        "changeCallback": any;
        "enabled": boolean;
        "labelLeft": string;
        "labelRight": string;
        "name": any;
    }
    interface WeTab {
        "enabled": boolean;
    }
    interface WeTabGroup {
    }
    interface WeTextarea {
        "autofocus": boolean;
        "cols": any;
        "disabled": boolean;
        "maxlength": number;
        "name": string;
        "placeholder": string;
        "readonly": boolean;
        "required": boolean;
        "row": any;
        "text": string;
    }
}
declare global {
    interface HTMLWeAccordionElement extends Components.WeAccordion, HTMLStencilElement {
    }
    var HTMLWeAccordionElement: {
        prototype: HTMLWeAccordionElement;
        new (): HTMLWeAccordionElement;
    };
    interface HTMLWeAccordionGroupElement extends Components.WeAccordionGroup, HTMLStencilElement {
    }
    var HTMLWeAccordionGroupElement: {
        prototype: HTMLWeAccordionGroupElement;
        new (): HTMLWeAccordionGroupElement;
    };
    interface HTMLWeCardElement extends Components.WeCard, HTMLStencilElement {
    }
    var HTMLWeCardElement: {
        prototype: HTMLWeCardElement;
        new (): HTMLWeCardElement;
    };
    interface HTMLWeCheckboxElement extends Components.WeCheckbox, HTMLStencilElement {
    }
    var HTMLWeCheckboxElement: {
        prototype: HTMLWeCheckboxElement;
        new (): HTMLWeCheckboxElement;
    };
    interface HTMLWeCheckboxGroupElement extends Components.WeCheckboxGroup, HTMLStencilElement {
    }
    var HTMLWeCheckboxGroupElement: {
        prototype: HTMLWeCheckboxGroupElement;
        new (): HTMLWeCheckboxGroupElement;
    };
    interface HTMLWeChipsElement extends Components.WeChips, HTMLStencilElement {
    }
    var HTMLWeChipsElement: {
        prototype: HTMLWeChipsElement;
        new (): HTMLWeChipsElement;
    };
    interface HTMLWeDividerElement extends Components.WeDivider, HTMLStencilElement {
    }
    var HTMLWeDividerElement: {
        prototype: HTMLWeDividerElement;
        new (): HTMLWeDividerElement;
    };
    interface HTMLWeDropdownGroupElement extends Components.WeDropdownGroup, HTMLStencilElement {
    }
    var HTMLWeDropdownGroupElement: {
        prototype: HTMLWeDropdownGroupElement;
        new (): HTMLWeDropdownGroupElement;
    };
    interface HTMLWeDropdownItemElement extends Components.WeDropdownItem, HTMLStencilElement {
    }
    var HTMLWeDropdownItemElement: {
        prototype: HTMLWeDropdownItemElement;
        new (): HTMLWeDropdownItemElement;
    };
    interface HTMLWeModalElement extends Components.WeModal, HTMLStencilElement {
    }
    var HTMLWeModalElement: {
        prototype: HTMLWeModalElement;
        new (): HTMLWeModalElement;
    };
    interface HTMLWeRadioElement extends Components.WeRadio, HTMLStencilElement {
    }
    var HTMLWeRadioElement: {
        prototype: HTMLWeRadioElement;
        new (): HTMLWeRadioElement;
    };
    interface HTMLWeRadioGroupElement extends Components.WeRadioGroup, HTMLStencilElement {
    }
    var HTMLWeRadioGroupElement: {
        prototype: HTMLWeRadioGroupElement;
        new (): HTMLWeRadioGroupElement;
    };
    interface HTMLWeSliderElement extends Components.WeSlider, HTMLStencilElement {
    }
    var HTMLWeSliderElement: {
        prototype: HTMLWeSliderElement;
        new (): HTMLWeSliderElement;
    };
    interface HTMLWeSwitchElement extends Components.WeSwitch, HTMLStencilElement {
    }
    var HTMLWeSwitchElement: {
        prototype: HTMLWeSwitchElement;
        new (): HTMLWeSwitchElement;
    };
    interface HTMLWeTabElement extends Components.WeTab, HTMLStencilElement {
    }
    var HTMLWeTabElement: {
        prototype: HTMLWeTabElement;
        new (): HTMLWeTabElement;
    };
    interface HTMLWeTabGroupElement extends Components.WeTabGroup, HTMLStencilElement {
    }
    var HTMLWeTabGroupElement: {
        prototype: HTMLWeTabGroupElement;
        new (): HTMLWeTabGroupElement;
    };
    interface HTMLWeTextareaElement extends Components.WeTextarea, HTMLStencilElement {
    }
    var HTMLWeTextareaElement: {
        prototype: HTMLWeTextareaElement;
        new (): HTMLWeTextareaElement;
    };
    interface HTMLElementTagNameMap {
        "we-accordion": HTMLWeAccordionElement;
        "we-accordion-group": HTMLWeAccordionGroupElement;
        "we-card": HTMLWeCardElement;
        "we-checkbox": HTMLWeCheckboxElement;
        "we-checkbox-group": HTMLWeCheckboxGroupElement;
        "we-chips": HTMLWeChipsElement;
        "we-divider": HTMLWeDividerElement;
        "we-dropdown-group": HTMLWeDropdownGroupElement;
        "we-dropdown-item": HTMLWeDropdownItemElement;
        "we-modal": HTMLWeModalElement;
        "we-radio": HTMLWeRadioElement;
        "we-radio-group": HTMLWeRadioGroupElement;
        "we-slider": HTMLWeSliderElement;
        "we-switch": HTMLWeSwitchElement;
        "we-tab": HTMLWeTabElement;
        "we-tab-group": HTMLWeTabGroupElement;
        "we-textarea": HTMLWeTextareaElement;
    }
}
declare namespace LocalJSX {
    interface WeAccordion {
        "onAccordionCallback"?: (event: CustomEvent<any>) => void;
        "open"?: boolean;
    }
    interface WeAccordionGroup {
        "multiple"?: boolean;
    }
    interface WeCard {
    }
    interface WeCheckbox {
        "checked"?: boolean;
        "disabled"?: boolean;
        "onCheckboxCallback"?: (event: CustomEvent<any>) => void;
        "value": string;
    }
    interface WeCheckboxGroup {
        "changeCallback"?: any;
        "name": any;
    }
    interface WeChips {
        "isSelectable"?: boolean;
        "label"?: string;
        "onRemoveCallback"?: (event: CustomEvent<any>) => void;
        "onSelectCallback"?: (event: CustomEvent<any>) => void;
        "removeLeft"?: boolean;
        "removeRight"?: boolean;
        "srcImgLeft"?: string;
        "srcImgRight"?: string;
    }
    interface WeDivider {
    }
    interface WeDropdownGroup {
        "orientation"?: string;
    }
    interface WeDropdownItem {
        "arrowType"?: string;
        "arrowTypeChecked"?: string;
        "bottomChildren"?: string;
        "heightChildren"?: string;
        "heightChildrenOpen"?: string;
        "label"?: string;
        "leftChildren"?: string;
        "onClickCallback"?: (event: CustomEvent<any>) => void;
        "rightChildren"?: string;
        "topChildren"?: string;
        "widthChildren"?: string;
        "widthChildrenOpen"?: string;
    }
    interface WeModal {
        "isVisible"?: boolean;
        "onModalCallback"?: (event: CustomEvent<any>) => void;
    }
    interface WeRadio {
        "checked"?: boolean;
        "disabled"?: boolean;
        "onRadioCallback"?: (event: CustomEvent<any>) => void;
        "value": string;
    }
    interface WeRadioGroup {
        "changeCallback"?: any;
        "name": string;
    }
    interface WeSlider {
        "changeCallback"?: any;
        "disabled"?: boolean;
        "max"?: number;
        "min"?: number;
        "name": string;
        "value"?: number;
    }
    interface WeSwitch {
        "changeCallback"?: any;
        "enabled"?: boolean;
        "labelLeft"?: string;
        "labelRight"?: string;
        "name": any;
    }
    interface WeTab {
        "enabled"?: boolean;
        "onTabCallback"?: (event: CustomEvent<any>) => void;
    }
    interface WeTabGroup {
    }
    interface WeTextarea {
        "autofocus"?: boolean;
        "cols"?: any;
        "disabled"?: boolean;
        "maxlength"?: number;
        "name"?: string;
        "placeholder"?: string;
        "readonly"?: boolean;
        "required"?: boolean;
        "row"?: any;
        "text"?: string;
    }
    interface IntrinsicElements {
        "we-accordion": WeAccordion;
        "we-accordion-group": WeAccordionGroup;
        "we-card": WeCard;
        "we-checkbox": WeCheckbox;
        "we-checkbox-group": WeCheckboxGroup;
        "we-chips": WeChips;
        "we-divider": WeDivider;
        "we-dropdown-group": WeDropdownGroup;
        "we-dropdown-item": WeDropdownItem;
        "we-modal": WeModal;
        "we-radio": WeRadio;
        "we-radio-group": WeRadioGroup;
        "we-slider": WeSlider;
        "we-switch": WeSwitch;
        "we-tab": WeTab;
        "we-tab-group": WeTabGroup;
        "we-textarea": WeTextarea;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "we-accordion": LocalJSX.WeAccordion & JSXBase.HTMLAttributes<HTMLWeAccordionElement>;
            "we-accordion-group": LocalJSX.WeAccordionGroup & JSXBase.HTMLAttributes<HTMLWeAccordionGroupElement>;
            "we-card": LocalJSX.WeCard & JSXBase.HTMLAttributes<HTMLWeCardElement>;
            "we-checkbox": LocalJSX.WeCheckbox & JSXBase.HTMLAttributes<HTMLWeCheckboxElement>;
            "we-checkbox-group": LocalJSX.WeCheckboxGroup & JSXBase.HTMLAttributes<HTMLWeCheckboxGroupElement>;
            "we-chips": LocalJSX.WeChips & JSXBase.HTMLAttributes<HTMLWeChipsElement>;
            "we-divider": LocalJSX.WeDivider & JSXBase.HTMLAttributes<HTMLWeDividerElement>;
            "we-dropdown-group": LocalJSX.WeDropdownGroup & JSXBase.HTMLAttributes<HTMLWeDropdownGroupElement>;
            "we-dropdown-item": LocalJSX.WeDropdownItem & JSXBase.HTMLAttributes<HTMLWeDropdownItemElement>;
            "we-modal": LocalJSX.WeModal & JSXBase.HTMLAttributes<HTMLWeModalElement>;
            "we-radio": LocalJSX.WeRadio & JSXBase.HTMLAttributes<HTMLWeRadioElement>;
            "we-radio-group": LocalJSX.WeRadioGroup & JSXBase.HTMLAttributes<HTMLWeRadioGroupElement>;
            "we-slider": LocalJSX.WeSlider & JSXBase.HTMLAttributes<HTMLWeSliderElement>;
            "we-switch": LocalJSX.WeSwitch & JSXBase.HTMLAttributes<HTMLWeSwitchElement>;
            "we-tab": LocalJSX.WeTab & JSXBase.HTMLAttributes<HTMLWeTabElement>;
            "we-tab-group": LocalJSX.WeTabGroup & JSXBase.HTMLAttributes<HTMLWeTabGroupElement>;
            "we-textarea": LocalJSX.WeTextarea & JSXBase.HTMLAttributes<HTMLWeTextareaElement>;
        }
    }
}
