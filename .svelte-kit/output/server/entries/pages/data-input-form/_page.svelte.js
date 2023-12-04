import { c as create_ssr_component, a as compute_rest_props, b as spread, e as escape_object, d as escape_attribute_value, i as escape, f as add_attribute, k as compute_slots, v as validate_component, j as each, o as onDestroy, m as missing_component, l as createEventDispatcher, n as get_store_value, h as subscribe } from "../../../chunks/index2.js";
import { c as classnames, i as isObject, g as getColumnSizeClass, u as uuid, I as Icon, e as allClassrooms, f as allProfessors, h as editingId, d as allSubjects, n as nameSchema, s as surnameSchema, m as mailSchema, j as cellPhoneSchema, y as yearSchema, k as sectionSchema, l as trackSchema } from "../../../chunks/Offcanvas.svelte_svelte_type_style_lang.js";
import { createPopper } from "@popperjs/core";
import "papaparse";
import "fs";
import { ZodError } from "zod";
const Alert = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let showClose;
  let classes;
  let closeClassNames;
  let $$restProps = compute_rest_props($$props, [
    "class",
    "children",
    "color",
    "closeClassName",
    "closeAriaLabel",
    "dismissible",
    "heading",
    "isOpen",
    "toggle",
    "fade",
    "transition"
  ]);
  let $$slots = compute_slots(slots);
  let { class: className = "" } = $$props;
  let { children = void 0 } = $$props;
  let { color = "success" } = $$props;
  let { closeClassName = "" } = $$props;
  let { closeAriaLabel = "Close" } = $$props;
  let { dismissible = false } = $$props;
  let { heading = void 0 } = $$props;
  let { isOpen = true } = $$props;
  let { toggle = void 0 } = $$props;
  let { fade = true } = $$props;
  let { transition = { duration: fade ? 400 : 0 } } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.children === void 0 && $$bindings.children && children !== void 0)
    $$bindings.children(children);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.closeClassName === void 0 && $$bindings.closeClassName && closeClassName !== void 0)
    $$bindings.closeClassName(closeClassName);
  if ($$props.closeAriaLabel === void 0 && $$bindings.closeAriaLabel && closeAriaLabel !== void 0)
    $$bindings.closeAriaLabel(closeAriaLabel);
  if ($$props.dismissible === void 0 && $$bindings.dismissible && dismissible !== void 0)
    $$bindings.dismissible(dismissible);
  if ($$props.heading === void 0 && $$bindings.heading && heading !== void 0)
    $$bindings.heading(heading);
  if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0)
    $$bindings.isOpen(isOpen);
  if ($$props.toggle === void 0 && $$bindings.toggle && toggle !== void 0)
    $$bindings.toggle(toggle);
  if ($$props.fade === void 0 && $$bindings.fade && fade !== void 0)
    $$bindings.fade(fade);
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0)
    $$bindings.transition(transition);
  showClose = dismissible || toggle;
  classes = classnames(className, "alert", `alert-${color}`, { "alert-dismissible": showClose });
  closeClassNames = classnames("btn-close", closeClassName);
  return `${isOpen ? `<div${spread(
    [
      escape_object($$restProps),
      { class: escape_attribute_value(classes) },
      { role: "alert" }
    ],
    {}
  )}>${heading || $$slots.heading ? `<h4 class="alert-heading">${escape(heading)}${slots.heading ? slots.heading({}) : ``}</h4>` : ``}
    ${showClose ? `<button type="button"${add_attribute("class", closeClassNames, 0)}${add_attribute("aria-label", closeAriaLabel, 0)}></button>` : ``}
    ${children ? `${escape(children)}` : `${slots.default ? slots.default({}) : ``}`}</div>` : ``}`;
});
const Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let classes;
  let defaultAriaLabel;
  let $$restProps = compute_rest_props($$props, [
    "class",
    "active",
    "block",
    "children",
    "close",
    "color",
    "disabled",
    "href",
    "inner",
    "outline",
    "size",
    "value"
  ]);
  let { class: className = "" } = $$props;
  let { active = false } = $$props;
  let { block = false } = $$props;
  let { children = void 0 } = $$props;
  let { close = false } = $$props;
  let { color = "secondary" } = $$props;
  let { disabled = false } = $$props;
  let { href = "" } = $$props;
  let { inner = void 0 } = $$props;
  let { outline = false } = $$props;
  let { size = null } = $$props;
  let { value = "" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  if ($$props.block === void 0 && $$bindings.block && block !== void 0)
    $$bindings.block(block);
  if ($$props.children === void 0 && $$bindings.children && children !== void 0)
    $$bindings.children(children);
  if ($$props.close === void 0 && $$bindings.close && close !== void 0)
    $$bindings.close(close);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.inner === void 0 && $$bindings.inner && inner !== void 0)
    $$bindings.inner(inner);
  if ($$props.outline === void 0 && $$bindings.outline && outline !== void 0)
    $$bindings.outline(outline);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  ariaLabel = $$props["aria-label"];
  classes = classnames(className, close ? "btn-close" : "btn", close || `btn${outline ? "-outline" : ""}-${color}`, size ? `btn-${size}` : false, block ? "d-block w-100" : false, { active });
  defaultAriaLabel = close ? "Close" : null;
  return `${href ? `<a${spread(
    [
      escape_object($$restProps),
      { class: escape_attribute_value(classes) },
      { disabled: disabled || null },
      { href: escape_attribute_value(href) },
      {
        "aria-label": escape_attribute_value(ariaLabel || defaultAriaLabel)
      }
    ],
    {}
  )}${add_attribute("this", inner, 0)}>${children ? `${escape(children)}` : `${slots.default ? slots.default({}) : ``}`}</a>` : `<button${spread(
    [
      escape_object($$restProps),
      { class: escape_attribute_value(classes) },
      { disabled: disabled || null },
      { value: escape_attribute_value(value) },
      {
        "aria-label": escape_attribute_value(ariaLabel || defaultAriaLabel)
      }
    ],
    {}
  )}${add_attribute("this", inner, 0)}>${slots.default ? slots.default({}) : `
      ${children ? `${escape(children)}` : `${slots.default ? slots.default({}) : ``}`}
    `}</button>`}`;
});
const Col = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "xs", "sm", "md", "lg", "xl", "xxl"]);
  let { class: className = "" } = $$props;
  let { xs = void 0 } = $$props;
  let { sm = void 0 } = $$props;
  let { md = void 0 } = $$props;
  let { lg = void 0 } = $$props;
  let { xl = void 0 } = $$props;
  let { xxl = void 0 } = $$props;
  const colClasses = [];
  const lookup = { xs, sm, md, lg, xl, xxl };
  Object.keys(lookup).forEach((colWidth) => {
    const columnProp = lookup[colWidth];
    if (!columnProp && columnProp !== "") {
      return;
    }
    const isXs = colWidth === "xs";
    if (isObject(columnProp)) {
      const colSizeInterfix = isXs ? "-" : `-${colWidth}-`;
      const colClass = getColumnSizeClass(isXs, colWidth, columnProp.size);
      if (columnProp.size || columnProp.size === "") {
        colClasses.push(colClass);
      }
      if (columnProp.push) {
        colClasses.push(`push${colSizeInterfix}${columnProp.push}`);
      }
      if (columnProp.pull) {
        colClasses.push(`pull${colSizeInterfix}${columnProp.pull}`);
      }
      if (columnProp.offset) {
        colClasses.push(`offset${colSizeInterfix}${columnProp.offset}`);
      }
      if (columnProp.order) {
        colClasses.push(`order${colSizeInterfix}${columnProp.order}`);
      }
    } else {
      colClasses.push(getColumnSizeClass(isXs, colWidth, columnProp));
    }
  });
  if (!colClasses.length) {
    colClasses.push("col");
  }
  if (className) {
    colClasses.push(className);
  }
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.xs === void 0 && $$bindings.xs && xs !== void 0)
    $$bindings.xs(xs);
  if ($$props.sm === void 0 && $$bindings.sm && sm !== void 0)
    $$bindings.sm(sm);
  if ($$props.md === void 0 && $$bindings.md && md !== void 0)
    $$bindings.md(md);
  if ($$props.lg === void 0 && $$bindings.lg && lg !== void 0)
    $$bindings.lg(lg);
  if ($$props.xl === void 0 && $$bindings.xl && xl !== void 0)
    $$bindings.xl(xl);
  if ($$props.xxl === void 0 && $$bindings.xxl && xxl !== void 0)
    $$bindings.xxl(xxl);
  return `<div${spread(
    [
      escape_object($$restProps),
      {
        class: escape_attribute_value(colClasses.join(" "))
      }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const FormCheck = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classes;
  let inputClasses;
  let idFor;
  let $$restProps = compute_rest_props($$props, [
    "class",
    "checked",
    "disabled",
    "group",
    "id",
    "inline",
    "inner",
    "invalid",
    "label",
    "name",
    "reverse",
    "size",
    "type",
    "valid",
    "value"
  ]);
  let { class: className = "" } = $$props;
  let { checked = false } = $$props;
  let { disabled = false } = $$props;
  let { group = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { inline = false } = $$props;
  let { inner = void 0 } = $$props;
  let { invalid = false } = $$props;
  let { label = "" } = $$props;
  let { name = "" } = $$props;
  let { reverse = false } = $$props;
  let { size = "" } = $$props;
  let { type = "checkbox" } = $$props;
  let { valid = false } = $$props;
  let { value = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0)
    $$bindings.checked(checked);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.group === void 0 && $$bindings.group && group !== void 0)
    $$bindings.group(group);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.inline === void 0 && $$bindings.inline && inline !== void 0)
    $$bindings.inline(inline);
  if ($$props.inner === void 0 && $$bindings.inner && inner !== void 0)
    $$bindings.inner(inner);
  if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0)
    $$bindings.invalid(invalid);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.reverse === void 0 && $$bindings.reverse && reverse !== void 0)
    $$bindings.reverse(reverse);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.valid === void 0 && $$bindings.valid && valid !== void 0)
    $$bindings.valid(valid);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  classes = classnames(className, "form-check", {
    "form-check-reverse": reverse,
    "form-switch": type === "switch",
    "form-check-inline": inline,
    [`form-control-${size}`]: size
  });
  inputClasses = classnames("form-check-input", { "is-invalid": invalid, "is-valid": valid });
  idFor = id || label;
  return `<div${add_attribute("class", classes, 0)}>${type === "radio" ? `<input${spread(
    [
      escape_object($$restProps),
      {
        class: escape_attribute_value(inputClasses)
      },
      { id: escape_attribute_value(idFor) },
      { type: "radio" },
      { disabled: disabled || null },
      { name: escape_attribute_value(name) },
      { value: escape_attribute_value(value) }
    ],
    {}
  )}${value === group ? add_attribute("checked", true, 1) : ""}${add_attribute("this", inner, 0)}>` : `${type === "switch" ? `<input${spread(
    [
      escape_object($$restProps),
      {
        class: escape_attribute_value(inputClasses)
      },
      { id: escape_attribute_value(idFor) },
      { type: "checkbox" },
      { disabled: disabled || null },
      { name: escape_attribute_value(name) },
      { value: escape_attribute_value(value) }
    ],
    {}
  )}${add_attribute("checked", checked, 1)}${add_attribute("this", inner, 0)}>` : `<input${spread(
    [
      escape_object($$restProps),
      {
        class: escape_attribute_value(inputClasses)
      },
      { id: escape_attribute_value(idFor) },
      { type: "checkbox" },
      { disabled: disabled || null },
      { name: escape_attribute_value(name) },
      { value: escape_attribute_value(value) }
    ],
    {}
  )}${add_attribute("checked", checked, 1)}${add_attribute("this", inner, 0)}>`}`}
  ${label ? `<label class="form-check-label"${add_attribute("for", idFor, 0)}>${slots.label ? slots.label({}) : `${escape(label)}`}</label>` : ``}</div>`;
});
const FormFeedback = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "valid", "tooltip"]);
  let { class: className = "" } = $$props;
  let { valid = void 0 } = $$props;
  let { tooltip = false } = $$props;
  let classes;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.valid === void 0 && $$bindings.valid && valid !== void 0)
    $$bindings.valid(valid);
  if ($$props.tooltip === void 0 && $$bindings.tooltip && tooltip !== void 0)
    $$bindings.tooltip(tooltip);
  {
    {
      const validMode = tooltip ? "tooltip" : "feedback";
      classes = classnames(className, valid ? `valid-${validMode}` : `invalid-${validMode}`);
    }
  }
  return `<div${spread([escape_object($$restProps), { class: escape_attribute_value(classes) }], {})}>${slots.default ? slots.default({}) : ``}</div>`;
});
const FormGroup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classes;
  let $$restProps = compute_rest_props($$props, ["class", "check", "disabled", "floating", "inline", "label", "row", "tag"]);
  let $$slots = compute_slots(slots);
  let { class: className = "" } = $$props;
  let { check = false } = $$props;
  let { disabled = false } = $$props;
  let { floating = false } = $$props;
  let { inline = false } = $$props;
  let { label = "" } = $$props;
  let { row = false } = $$props;
  let { tag = null } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.check === void 0 && $$bindings.check && check !== void 0)
    $$bindings.check(check);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.floating === void 0 && $$bindings.floating && floating !== void 0)
    $$bindings.floating(floating);
  if ($$props.inline === void 0 && $$bindings.inline && inline !== void 0)
    $$bindings.inline(inline);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.row === void 0 && $$bindings.row && row !== void 0)
    $$bindings.row(row);
  if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0)
    $$bindings.tag(tag);
  classes = classnames(className, "mb-3", {
    row,
    "form-check": check,
    "form-check-inline": check && inline,
    "form-floating": floating,
    disabled: check && disabled
  });
  return `${tag === "fieldset" ? `<fieldset${spread([escape_object($$restProps), { class: escape_attribute_value(classes) }], {})}>${slots.default ? slots.default({}) : ``}
    ${label || $$slots.label ? `
      <label>${escape(label)}
        ${slots.label ? slots.label({}) : ``}</label>` : ``}</fieldset>` : `<div${spread([escape_object($$restProps), { class: escape_attribute_value(classes) }], {})}>${slots.default ? slots.default({}) : ``}
    ${label || $$slots.label ? `
      <label>${escape(label)}
        ${slots.label ? slots.label({}) : ``}</label>` : ``}</div>`}`;
});
const InlineContainer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div>${slots.default ? slots.default({}) : ``}</div>`;
});
const Input = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "class",
    "bsSize",
    "checked",
    "color",
    "disabled",
    "feedback",
    "files",
    "group",
    "inner",
    "invalid",
    "label",
    "multiple",
    "name",
    "placeholder",
    "plaintext",
    "readonly",
    "reverse",
    "size",
    "type",
    "valid",
    "value"
  ]);
  let { class: className = "" } = $$props;
  let { bsSize = void 0 } = $$props;
  let { checked = false } = $$props;
  let { color = void 0 } = $$props;
  let { disabled = void 0 } = $$props;
  let { feedback = void 0 } = $$props;
  let { files = void 0 } = $$props;
  let { group = void 0 } = $$props;
  let { inner = void 0 } = $$props;
  let { invalid = false } = $$props;
  let { label = void 0 } = $$props;
  let { multiple = void 0 } = $$props;
  let { name = "" } = $$props;
  let { placeholder = "" } = $$props;
  let { plaintext = false } = $$props;
  let { readonly = void 0 } = $$props;
  let { reverse = false } = $$props;
  let { size = void 0 } = $$props;
  let { type = "text" } = $$props;
  let { valid = false } = $$props;
  let { value = "" } = $$props;
  let classes;
  let tag;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.bsSize === void 0 && $$bindings.bsSize && bsSize !== void 0)
    $$bindings.bsSize(bsSize);
  if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0)
    $$bindings.checked(checked);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.feedback === void 0 && $$bindings.feedback && feedback !== void 0)
    $$bindings.feedback(feedback);
  if ($$props.files === void 0 && $$bindings.files && files !== void 0)
    $$bindings.files(files);
  if ($$props.group === void 0 && $$bindings.group && group !== void 0)
    $$bindings.group(group);
  if ($$props.inner === void 0 && $$bindings.inner && inner !== void 0)
    $$bindings.inner(inner);
  if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0)
    $$bindings.invalid(invalid);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.multiple === void 0 && $$bindings.multiple && multiple !== void 0)
    $$bindings.multiple(multiple);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.plaintext === void 0 && $$bindings.plaintext && plaintext !== void 0)
    $$bindings.plaintext(plaintext);
  if ($$props.readonly === void 0 && $$bindings.readonly && readonly !== void 0)
    $$bindings.readonly(readonly);
  if ($$props.reverse === void 0 && $$bindings.reverse && reverse !== void 0)
    $$bindings.reverse(reverse);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.valid === void 0 && $$bindings.valid && valid !== void 0)
    $$bindings.valid(valid);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      {
        const isNotaNumber = new RegExp("\\D", "g");
        let isBtn = false;
        let formControlClass = "form-control";
        tag = "input";
        switch (type) {
          case "color":
            formControlClass = `form-control form-control-color`;
            break;
          case "range":
            formControlClass = "form-range";
            break;
          case "select":
            formControlClass = `form-select`;
            tag = "select";
            break;
          case "textarea":
            tag = "textarea";
            break;
          case "button":
          case "reset":
          case "submit":
            formControlClass = `btn btn-${color || "secondary"}`;
            isBtn = true;
            break;
          case "hidden":
          case "image":
            formControlClass = void 0;
            break;
          default:
            formControlClass = "form-control";
            tag = "input";
        }
        if (plaintext) {
          formControlClass = `${formControlClass}-plaintext`;
          tag = "input";
        }
        if (size && isNotaNumber.test(size)) {
          console.warn(`Please use the prop "bsSize" instead of the "size" to bootstrap's input sizing.`);
          bsSize = size;
          size = void 0;
        }
        classes = classnames(className, formControlClass, {
          "is-invalid": invalid,
          "is-valid": valid,
          [`form-control-${bsSize}`]: bsSize && !isBtn,
          [`btn-${bsSize}`]: bsSize && isBtn
        });
      }
    }
    $$rendered = `${tag === "input" ? `${type === "text" ? `<input${spread(
      [
        escape_object($$restProps),
        { class: escape_attribute_value(classes) },
        { type: "text" },
        { disabled: disabled || null },
        { name: escape_attribute_value(name) },
        {
          placeholder: escape_attribute_value(placeholder)
        },
        { readonly: readonly || null },
        { size: escape_attribute_value(size) }
      ],
      {}
    )}${add_attribute("value", value, 0)}${add_attribute("this", inner, 0)}>` : `${type === "password" ? `<input${spread(
      [
        escape_object($$restProps),
        { class: escape_attribute_value(classes) },
        { type: "password" },
        { disabled: disabled || null },
        { name: escape_attribute_value(name) },
        {
          placeholder: escape_attribute_value(placeholder)
        },
        { readonly: readonly || null },
        { size: escape_attribute_value(size) }
      ],
      {}
    )}${add_attribute("value", value, 0)}${add_attribute("this", inner, 0)}>` : `${type === "color" ? `<input${spread(
      [
        escape_object($$restProps),
        { class: escape_attribute_value(classes) },
        { type: "color" },
        { disabled: disabled || null },
        { name: escape_attribute_value(name) },
        {
          placeholder: escape_attribute_value(placeholder)
        },
        { readonly: readonly || null }
      ],
      {}
    )}${add_attribute("value", value, 0)}${add_attribute("this", inner, 0)}>` : `${type === "email" ? `<input${spread(
      [
        escape_object($$restProps),
        { class: escape_attribute_value(classes) },
        { type: "email" },
        { disabled: disabled || null },
        { multiple: multiple || null },
        { name: escape_attribute_value(name) },
        {
          placeholder: escape_attribute_value(placeholder)
        },
        { readonly: readonly || null },
        { size: escape_attribute_value(size) }
      ],
      {}
    )}${add_attribute("value", value, 0)}${add_attribute("this", inner, 0)}>` : `${type === "file" ? `<input${spread(
      [
        escape_object($$restProps),
        { class: escape_attribute_value(classes) },
        { type: "file" },
        { disabled: disabled || null },
        { invalid: escape_attribute_value(invalid) },
        { multiple: multiple || null },
        { name: escape_attribute_value(name) },
        {
          placeholder: escape_attribute_value(placeholder)
        },
        { readonly: readonly || null },
        { valid: escape_attribute_value(valid) }
      ],
      {}
    )}>` : `${type === "checkbox" || type === "radio" || type === "switch" ? `${validate_component(FormCheck, "FormCheck").$$render(
      $$result,
      Object.assign({}, $$restProps, { class: className }, { size: bsSize }, { type }, { disabled }, { invalid }, { label }, { name }, { placeholder }, { reverse }, { readonly }, { valid }, { checked }, { inner }, { group }, { value }),
      {
        checked: ($$value) => {
          checked = $$value;
          $$settled = false;
        },
        inner: ($$value) => {
          inner = $$value;
          $$settled = false;
        },
        group: ($$value) => {
          group = $$value;
          $$settled = false;
        },
        value: ($$value) => {
          value = $$value;
          $$settled = false;
        }
      },
      {}
    )}` : `${type === "url" ? `<input${spread(
      [
        escape_object($$restProps),
        { class: escape_attribute_value(classes) },
        { type: "url" },
        { disabled: disabled || null },
        { name: escape_attribute_value(name) },
        {
          placeholder: escape_attribute_value(placeholder)
        },
        { readonly: readonly || null },
        { size: escape_attribute_value(size) }
      ],
      {}
    )}${add_attribute("value", value, 0)}${add_attribute("this", inner, 0)}>` : `${type === "number" ? `<input${spread(
      [
        escape_object($$restProps),
        { class: escape_attribute_value(classes) },
        { type: "number" },
        { readonly: readonly || null },
        { name: escape_attribute_value(name) },
        { disabled: disabled || null },
        {
          placeholder: escape_attribute_value(placeholder)
        }
      ],
      {}
    )}${add_attribute("value", value, 0)}${add_attribute("this", inner, 0)}>` : `${type === "date" ? `<input${spread(
      [
        escape_object($$restProps),
        { class: escape_attribute_value(classes) },
        { type: "date" },
        { disabled: disabled || null },
        { name: escape_attribute_value(name) },
        {
          placeholder: escape_attribute_value(placeholder)
        },
        { readonly: readonly || null }
      ],
      {}
    )}${add_attribute("value", value, 0)}${add_attribute("this", inner, 0)}>` : `${type === "time" ? `<input${spread(
      [
        escape_object($$restProps),
        { class: escape_attribute_value(classes) },
        { type: "time" },
        { disabled: disabled || null },
        { name: escape_attribute_value(name) },
        {
          placeholder: escape_attribute_value(placeholder)
        },
        { readonly: readonly || null }
      ],
      {}
    )}${add_attribute("value", value, 0)}${add_attribute("this", inner, 0)}>` : `${type === "datetime" ? `<input${spread(
      [
        escape_object($$restProps),
        { type: "datetime" },
        { readonly: readonly || null },
        { class: escape_attribute_value(classes) },
        { name: escape_attribute_value(name) },
        { disabled: disabled || null },
        {
          placeholder: escape_attribute_value(placeholder)
        }
      ],
      {}
    )}${add_attribute("value", value, 0)}${add_attribute("this", inner, 0)}>` : `${type === "datetime-local" ? `<input${spread(
      [
        escape_object($$restProps),
        { class: escape_attribute_value(classes) },
        { type: "datetime-local" },
        { disabled: disabled || null },
        { name: escape_attribute_value(name) },
        {
          placeholder: escape_attribute_value(placeholder)
        },
        { readonly: readonly || null }
      ],
      {}
    )}${add_attribute("value", value, 0)}${add_attribute("this", inner, 0)}>` : `${type === "month" ? `<input${spread(
      [
        escape_object($$restProps),
        { class: escape_attribute_value(classes) },
        { type: "month" },
        { disabled: disabled || null },
        { name: escape_attribute_value(name) },
        {
          placeholder: escape_attribute_value(placeholder)
        },
        { readonly: readonly || null }
      ],
      {}
    )}${add_attribute("value", value, 0)}${add_attribute("this", inner, 0)}>` : `${type === "color" ? `<input${spread(
      [
        escape_object($$restProps),
        { type: "color" },
        { readonly: readonly || null },
        { class: escape_attribute_value(classes) },
        { name: escape_attribute_value(name) },
        { disabled: disabled || null },
        {
          placeholder: escape_attribute_value(placeholder)
        }
      ],
      {}
    )}${add_attribute("value", value, 0)}${add_attribute("this", inner, 0)}>` : `${type === "range" ? `<input${spread(
      [
        escape_object($$restProps),
        { type: "range" },
        { readonly: readonly || null },
        { class: escape_attribute_value(classes) },
        { name: escape_attribute_value(name) },
        { disabled: disabled || null },
        {
          placeholder: escape_attribute_value(placeholder)
        }
      ],
      {}
    )}${add_attribute("value", value, 0)}${add_attribute("this", inner, 0)}>` : `${type === "search" ? `<input${spread(
      [
        escape_object($$restProps),
        { class: escape_attribute_value(classes) },
        { type: "search" },
        { disabled: disabled || null },
        { name: escape_attribute_value(name) },
        {
          placeholder: escape_attribute_value(placeholder)
        },
        { readonly: readonly || null },
        { size: escape_attribute_value(size) }
      ],
      {}
    )}${add_attribute("value", value, 0)}${add_attribute("this", inner, 0)}>` : `${type === "tel" ? `<input${spread(
      [
        escape_object($$restProps),
        { class: escape_attribute_value(classes) },
        { type: "tel" },
        { disabled: disabled || null },
        { name: escape_attribute_value(name) },
        {
          placeholder: escape_attribute_value(placeholder)
        },
        { readonly: readonly || null },
        { size: escape_attribute_value(size) }
      ],
      {}
    )}${add_attribute("value", value, 0)}${add_attribute("this", inner, 0)}>` : `${type === "week" ? `<input${spread(
      [
        escape_object($$restProps),
        { class: escape_attribute_value(classes) },
        { type: "week" },
        { disabled: disabled || null },
        { name: escape_attribute_value(name) },
        {
          placeholder: escape_attribute_value(placeholder)
        },
        { readonly: readonly || null }
      ],
      {}
    )}${add_attribute("value", value, 0)}${add_attribute("this", inner, 0)}>` : `<input${spread(
      [
        escape_object($$restProps),
        { type: escape_attribute_value(type) },
        { readonly: readonly || null },
        { class: escape_attribute_value(classes) },
        { name: escape_attribute_value(name) },
        { disabled: disabled || null },
        {
          placeholder: escape_attribute_value(placeholder)
        },
        { value: escape_attribute_value(value) }
      ],
      {}
    )}>`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}`}` : `${tag === "textarea" ? `<textarea${spread(
      [
        escape_object($$restProps),
        { class: escape_attribute_value(classes) },
        { disabled: disabled || null },
        { name: escape_attribute_value(name) },
        {
          placeholder: escape_attribute_value(placeholder)
        },
        { readonly: readonly || null }
      ],
      {}
    )}${add_attribute("this", inner, 0)}>${escape(value || "")}</textarea>` : `${tag === "select" && !multiple ? `<select${spread(
      [
        escape_object($$restProps),
        { class: escape_attribute_value(classes) },
        { name: escape_attribute_value(name) },
        { disabled: disabled || null },
        { readonly: readonly || null }
      ],
      {}
    )}${add_attribute("this", inner, 0)}>${slots.default ? slots.default({}) : ``}</select>

  ` : ``}`}`}
${feedback ? `${Array.isArray(feedback) ? `${each(feedback, (msg) => {
      return `${validate_component(FormFeedback, "FormFeedback").$$render($$result, { valid }, {}, {
        default: () => {
          return `${escape(msg)}`;
        }
      })}`;
    })}` : `${validate_component(FormFeedback, "FormFeedback").$$render($$result, { valid }, {}, {
      default: () => {
        return `${escape(feedback)}`;
      }
    })}`}` : ``}`;
  } while (!$$settled);
  return $$rendered;
});
const InputGroup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classes;
  let $$restProps = compute_rest_props($$props, ["class", "size"]);
  let { class: className = "" } = $$props;
  let { size = "" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  classes = classnames(className, "input-group", size ? `input-group-${size}` : null);
  return `<div${spread([escape_object($$restProps), { class: escape_attribute_value(classes) }], {})}>${slots.default ? slots.default({}) : ``}</div>`;
});
const InputGroupText = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classes;
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = "" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  classes = classnames(className, "input-group-text");
  return `<span${spread([escape_object($$restProps), { class: escape_attribute_value(classes) }], {})}>${slots.default ? slots.default({}) : ``}</span>`;
});
const Portal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  let ref;
  let portal;
  onDestroy(() => {
    if (typeof document !== "undefined") {
      document.body.removeChild(portal);
    }
  });
  return `<div${spread([escape_object($$restProps)], {})}${add_attribute("this", ref, 0)}>${slots.default ? slots.default({}) : ``}</div>`;
});
function getCols(cols) {
  const colsValue = parseInt(cols);
  if (!isNaN(colsValue)) {
    if (colsValue > 0) {
      return [`row-cols-${colsValue}`];
    }
  } else if (typeof cols === "object") {
    return ["xs", "sm", "md", "lg", "xl"].map((colWidth) => {
      const isXs = colWidth === "xs";
      const colSizeInterfix = isXs ? "-" : `-${colWidth}-`;
      const value = cols[colWidth];
      if (typeof value === "number" && value > 0) {
        return `row-cols${colSizeInterfix}${value}`;
      }
      return null;
    }).filter((value) => !!value);
  }
  return [];
}
const Row = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classes;
  let $$restProps = compute_rest_props($$props, ["class", "noGutters", "form", "cols", "inner"]);
  let { class: className = "" } = $$props;
  let { noGutters = false } = $$props;
  let { form = false } = $$props;
  let { cols = 0 } = $$props;
  let { inner = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.noGutters === void 0 && $$bindings.noGutters && noGutters !== void 0)
    $$bindings.noGutters(noGutters);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  if ($$props.cols === void 0 && $$bindings.cols && cols !== void 0)
    $$bindings.cols(cols);
  if ($$props.inner === void 0 && $$bindings.inner && inner !== void 0)
    $$bindings.inner(inner);
  classes = classnames(className, noGutters ? "gx-0" : null, form ? "form-row" : "row", ...getCols(cols));
  return `<div${spread([escape_object($$restProps), { class: escape_attribute_value(classes) }], {})}${add_attribute("this", inner, 0)}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Tooltip = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classes;
  let outer;
  let $$restProps = compute_rest_props($$props, ["class", "animation", "children", "container", "id", "isOpen", "placement", "target"]);
  let { class: className = "" } = $$props;
  let { animation = true } = $$props;
  let { children = void 0 } = $$props;
  let { container = void 0 } = $$props;
  let { id = `tooltip_${uuid()}` } = $$props;
  let { isOpen = false } = $$props;
  let { placement = "top" } = $$props;
  let { target = "" } = $$props;
  let bsPlacement;
  let popperInstance;
  let popperPlacement = placement;
  let targetEl;
  let tooltipEl;
  const checkPopperPlacement = {
    name: "checkPopperPlacement",
    enabled: true,
    phase: "main",
    fn({ state }) {
      popperPlacement = state.placement;
    }
  };
  const open = () => isOpen = true;
  const close = () => isOpen = false;
  onDestroy(unregisterEventListeners);
  function registerEventListeners() {
    if (target == null || target.length == 0) {
      targetEl = null;
      return;
    }
    try {
      if (target instanceof HTMLElement) {
        targetEl = target;
      }
    } catch (e) {
    }
    if (targetEl == null) {
      try {
        targetEl = document.querySelector(`#${target}`);
      } catch (e) {
      }
    }
    if (targetEl) {
      targetEl.addEventListener("mouseover", open);
      targetEl.addEventListener("mouseleave", close);
      targetEl.addEventListener("focus", open);
      targetEl.addEventListener("blur", close);
    }
  }
  function unregisterEventListeners() {
    if (targetEl) {
      targetEl.removeEventListener("mouseover", open);
      targetEl.removeEventListener("mouseleave", close);
      targetEl.removeEventListener("focus", open);
      targetEl.removeEventListener("blur", close);
      targetEl.removeAttribute("aria-describedby");
    }
  }
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.animation === void 0 && $$bindings.animation && animation !== void 0)
    $$bindings.animation(animation);
  if ($$props.children === void 0 && $$bindings.children && children !== void 0)
    $$bindings.children(children);
  if ($$props.container === void 0 && $$bindings.container && container !== void 0)
    $$bindings.container(container);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0)
    $$bindings.isOpen(isOpen);
  if ($$props.placement === void 0 && $$bindings.placement && placement !== void 0)
    $$bindings.placement(placement);
  if ($$props.target === void 0 && $$bindings.target && target !== void 0)
    $$bindings.target(target);
  {
    {
      if (isOpen && tooltipEl) {
        popperInstance = createPopper(targetEl, tooltipEl, {
          placement,
          modifiers: [checkPopperPlacement]
        });
      } else if (popperInstance) {
        popperInstance.destroy();
        popperInstance = void 0;
      }
    }
  }
  {
    if (target) {
      unregisterEventListeners();
      registerEventListeners();
    }
  }
  {
    if (targetEl) {
      if (isOpen)
        targetEl.setAttribute("aria-describedby", id);
      else
        targetEl.removeAttribute("aria-describedby");
    }
  }
  {
    {
      if (popperPlacement === "left")
        bsPlacement = "start";
      else if (popperPlacement === "right")
        bsPlacement = "end";
      else
        bsPlacement = popperPlacement;
    }
  }
  classes = classnames(className, "tooltip", animation ? "fade" : false, `bs-tooltip-${bsPlacement}`, isOpen ? "show" : false);
  outer = container === "inline" ? InlineContainer : Portal;
  return `${isOpen ? `${validate_component(outer || missing_component, "svelte:component").$$render($$result, {}, {}, {
    default: () => {
      return `<div${spread(
        [
          escape_object($$restProps),
          { class: escape_attribute_value(classes) },
          { id: escape_attribute_value(id) },
          { role: "tooltip" },
          {
            "x-placement": escape_attribute_value(popperPlacement)
          }
        ],
        {}
      )}${add_attribute("this", tooltipEl, 0)}><div class="tooltip-arrow" data-popper-arrow></div>
      <div class="tooltip-inner">${children ? `${escape(children)}` : `${slots.default ? slots.default({}) : ``}`}</div></div>`;
    }
  })}` : ``}`;
});
const Tabs_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: "ul.svelte-1i76a2h{display:flex;justify-content:center;padding:0;list-style-type:none;min-height:2rem}li.svelte-1i76a2h{padding:0 16px;font-size:18px;cursor:pointer;transition:0.2s ease}.active.svelte-1i76a2h{color:var(--bs-primary);border-bottom:2px solid var(--bs-primary);padding-bottom:0px;transition:0.2s ease;font-weight:bold}.zoom-hover-text.svelte-1i76a2h:hover{color:var(--bs-primary);padding-bottom:3px;transition:0.2s ease}.zoom-hover-text.svelte-1i76a2h:hover:not(.active){color:var(--bs-primary);border-bottom:1px solid var(--bs-primary);padding-bottom:3px;transition:0.2s ease}",
  map: null
};
const Tabs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { tabItems } = $$props;
  let { activeItem } = $$props;
  if ($$props.tabItems === void 0 && $$bindings.tabItems && tabItems !== void 0)
    $$bindings.tabItems(tabItems);
  if ($$props.activeItem === void 0 && $$bindings.activeItem && activeItem !== void 0)
    $$bindings.activeItem(activeItem);
  $$result.css.add(css$3);
  return `<div class="tabs pt-3"><ul class="svelte-1i76a2h">${each(tabItems, (item) => {
    return `
			
			<li class="svelte-1i76a2h"><div class="${["zoom-hover-text svelte-1i76a2h", item.name === activeItem ? "active" : ""].join(" ").trim()}">${escape(item.name)}
					${validate_component(Icon, "Icon").$$render($$result, { name: item.icon }, {}, {})}</div>
			</li>`;
  })}</ul>
</div>`;
});
const SubjectFormRow = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { subject = null } = $$props;
  let { cloning = false } = $$props;
  let { schoolClasses = get_store_value(allClassrooms) } = $$props;
  let { professors = get_store_value(allProfessors) } = $$props;
  let editingSubject;
  if (subject) {
    editingSubject = {
      _id: subject.id,
      _schoolClass: subject.schoolClass,
      _professor: subject.professor,
      _name: { value: subject.name.value },
      _abbreviation: { value: subject.abbreviation.value },
      _weight: { value: subject.weight.value },
      _hoursPerWeek: { value: subject.hoursPerWeek.value }
    };
    if (cloning)
      editingSubject._id = null;
  } else {
    editingSubject = {
      _id: null,
      _name: { value: "" },
      _abbreviation: { value: "" },
      _weight: { value: 5 },
      _hoursPerWeek: { value: 1 }
    };
  }
  let formValidationFeedback = new Array(4).fill({
    valid: false,
    invalid: false,
    feedback: ""
  });
  if ($$props.subject === void 0 && $$bindings.subject && subject !== void 0)
    $$bindings.subject(subject);
  if ($$props.cloning === void 0 && $$bindings.cloning && cloning !== void 0)
    $$bindings.cloning(cloning);
  if ($$props.schoolClasses === void 0 && $$bindings.schoolClasses && schoolClasses !== void 0)
    $$bindings.schoolClasses(schoolClasses);
  if ($$props.professors === void 0 && $$bindings.professors && professors !== void 0)
    $$bindings.professors(professors);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${validate_component(Row, "Row").$$render($$result, { class: "align-items-top g-1 mt-1" }, {}, {
      default: () => {
        return `${validate_component(Col, "Col").$$render($$result, { sm: { size: 2 } }, {}, {
          default: () => {
            return `${validate_component(FormGroup, "FormGroup").$$render(
              $$result,
              {
                floating: true,
                label: "Class",
                class: "text-muted"
              },
              {},
              {
                default: () => {
                  return `${validate_component(Input, "Input").$$render(
                    $$result,
                    {
                      type: "select",
                      name: "schoolClass",
                      id: "schoolClass",
                      value: editingSubject._schoolClass
                    },
                    {
                      value: ($$value) => {
                        editingSubject._schoolClass = $$value;
                        $$settled = false;
                      }
                    },
                    {
                      default: () => {
                        return `${schoolClasses.length ? each(schoolClasses, (schoolClass) => {
                          return `<option${add_attribute("value", schoolClass, 0)}>${escape(schoolClass)}</option>`;
                        }) : `<option${add_attribute("value", null, 0)}>No classes found</option>`}`;
                      }
                    }
                  )}`;
                }
              }
            )}`;
          }
        })}

	${validate_component(Col, "Col").$$render($$result, { sm: { size: 2 } }, {}, {
          default: () => {
            return `${validate_component(FormGroup, "FormGroup").$$render(
              $$result,
              {
                floating: true,
                label: "Professor",
                class: "text-muted"
              },
              {},
              {
                default: () => {
                  return `${validate_component(Input, "Input").$$render(
                    $$result,
                    {
                      type: "select",
                      label: "professor",
                      name: "professor",
                      id: "professor",
                      value: editingSubject._professor
                    },
                    {
                      value: ($$value) => {
                        editingSubject._professor = $$value;
                        $$settled = false;
                      }
                    },
                    {
                      default: () => {
                        return `${professors.length ? each(professors, (professor) => {
                          return `<option${add_attribute("value", professor, 0)}>${escape(professor)}</option>`;
                        }) : `<option value="no professors">no professors</option>`}`;
                      }
                    }
                  )}`;
                }
              }
            )}`;
          }
        })}

	${validate_component(Col, "Col").$$render($$result, { sm: { size: 2 } }, {}, {
          default: () => {
            return `${validate_component(FormGroup, "FormGroup").$$render(
              $$result,
              {
                floating: true,
                label: "Abbreviation",
                class: "text-muted"
              },
              {},
              {
                default: () => {
                  return `${validate_component(Input, "Input").$$render(
                    $$result,
                    {
                      type: "text",
                      label: "abbreviation",
                      name: "abbreviation",
                      id: "abbreviation",
                      placeholder: "Abbreviation",
                      value: editingSubject._abbreviation.value,
                      valid: formValidationFeedback[0].valid,
                      invalid: formValidationFeedback[0].invalid,
                      feedback: formValidationFeedback[0].feedback
                    },
                    {
                      value: ($$value) => {
                        editingSubject._abbreviation.value = $$value;
                        $$settled = false;
                      },
                      valid: ($$value) => {
                        formValidationFeedback[0].valid = $$value;
                        $$settled = false;
                      },
                      invalid: ($$value) => {
                        formValidationFeedback[0].invalid = $$value;
                        $$settled = false;
                      },
                      feedback: ($$value) => {
                        formValidationFeedback[0].feedback = $$value;
                        $$settled = false;
                      }
                    },
                    {}
                  )}`;
                }
              }
            )}`;
          }
        })}

	${validate_component(Col, "Col").$$render($$result, { sm: { size: 2 } }, {}, {
          default: () => {
            return `${validate_component(FormGroup, "FormGroup").$$render(
              $$result,
              {
                floating: true,
                label: "Name",
                class: "text-muted"
              },
              {},
              {
                default: () => {
                  return `${validate_component(Input, "Input").$$render(
                    $$result,
                    {
                      type: "text",
                      label: "name",
                      name: "name",
                      id: "name",
                      placeholder: "Name",
                      value: editingSubject._name.value,
                      valid: formValidationFeedback[1].valid,
                      invalid: formValidationFeedback[1].invalid,
                      feedback: formValidationFeedback[1].feedback
                    },
                    {
                      value: ($$value) => {
                        editingSubject._name.value = $$value;
                        $$settled = false;
                      },
                      valid: ($$value) => {
                        formValidationFeedback[1].valid = $$value;
                        $$settled = false;
                      },
                      invalid: ($$value) => {
                        formValidationFeedback[1].invalid = $$value;
                        $$settled = false;
                      },
                      feedback: ($$value) => {
                        formValidationFeedback[1].feedback = $$value;
                        $$settled = false;
                      }
                    },
                    {}
                  )}`;
                }
              }
            )}`;
          }
        })}

	${validate_component(Col, "Col").$$render($$result, { sm: { size: 1 } }, {}, {
          default: () => {
            return `${validate_component(FormGroup, "FormGroup").$$render(
              $$result,
              {
                floating: true,
                label: "Weight",
                class: "text-muted"
              },
              {},
              {
                default: () => {
                  return `${validate_component(Input, "Input").$$render(
                    $$result,
                    {
                      type: "number",
                      label: "weight",
                      name: "weight",
                      id: "weight",
                      placeholder: "Weight",
                      min: "1",
                      max: "10",
                      value: editingSubject._weight.value,
                      valid: formValidationFeedback[2].valid,
                      invalid: formValidationFeedback[2].invalid,
                      feedback: formValidationFeedback[2].feedback
                    },
                    {
                      value: ($$value) => {
                        editingSubject._weight.value = $$value;
                        $$settled = false;
                      },
                      valid: ($$value) => {
                        formValidationFeedback[2].valid = $$value;
                        $$settled = false;
                      },
                      invalid: ($$value) => {
                        formValidationFeedback[2].invalid = $$value;
                        $$settled = false;
                      },
                      feedback: ($$value) => {
                        formValidationFeedback[2].feedback = $$value;
                        $$settled = false;
                      }
                    },
                    {}
                  )}`;
                }
              }
            )}`;
          }
        })}

	${validate_component(Col, "Col").$$render($$result, { sm: { size: 1 } }, {}, {
          default: () => {
            return `${validate_component(FormGroup, "FormGroup").$$render(
              $$result,
              {
                floating: true,
                label: "Hrs/Week",
                class: "text-muted"
              },
              {},
              {
                default: () => {
                  return `${validate_component(Input, "Input").$$render(
                    $$result,
                    {
                      type: "number",
                      label: "hoursPerWeek",
                      name: "hoursPerWeek",
                      id: "hoursPerWeek",
                      placeholder: "Hours per week",
                      min: "1",
                      max: "30",
                      value: editingSubject._hoursPerWeek.value,
                      valid: formValidationFeedback[3].valid,
                      invalid: formValidationFeedback[3].invalid,
                      feedback: formValidationFeedback[3].feedback
                    },
                    {
                      value: ($$value) => {
                        editingSubject._hoursPerWeek.value = $$value;
                        $$settled = false;
                      },
                      valid: ($$value) => {
                        formValidationFeedback[3].valid = $$value;
                        $$settled = false;
                      },
                      invalid: ($$value) => {
                        formValidationFeedback[3].invalid = $$value;
                        $$settled = false;
                      },
                      feedback: ($$value) => {
                        formValidationFeedback[3].feedback = $$value;
                        $$settled = false;
                      }
                    },
                    {}
                  )}`;
                }
              }
            )}`;
          }
        })}

	${validate_component(Col, "Col").$$render($$result, { sm: { size: 2 }, class: "ms-auto ps-0" }, {}, {
          default: () => {
            return `${validate_component(Row, "Row").$$render($$result, { class: "g-1" }, {}, {
              default: () => {
                return `${validate_component(Col, "Col").$$render($$result, {}, {}, {
                  default: () => {
                    return `${validate_component(Button, "Button").$$render(
                      $$result,
                      {
                        color: "primary",
                        class: "w-100 text-nowrap"
                      },
                      {},
                      {
                        default: () => {
                          return `Save ${validate_component(Icon, "Icon").$$render($$result, { name: "check" }, {}, {})}`;
                        }
                      }
                    )}`;
                  }
                })}
			${validate_component(Col, "Col").$$render($$result, {}, {}, {
                  default: () => {
                    return `${validate_component(Button, "Button").$$render(
                      $$result,
                      {
                        color: "danger",
                        class: "w-100 text-nowrap"
                      },
                      {},
                      {
                        default: () => {
                          return `Cancel ${validate_component(Icon, "Icon").$$render($$result, { name: "x" }, {}, {})}`;
                        }
                      }
                    )}`;
                  }
                })}`;
              }
            })}`;
          }
        })}`;
      }
    })}`;
  } while (!$$settled);
  return $$rendered;
});
const FormSearch = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const eventDispatcher = createEventDispatcher();
  let searchPrompt = "";
  let { items = [] } = $$props;
  function doSearch() {
    let searchResults;
    if (searchPrompt == "") {
      searchResults = [...items];
    } else {
      searchResults = items.filter((item) => item.toFullString().toLowerCase().includes(searchPrompt.toLowerCase())) || [];
    }
    eventDispatcher("search", { searchResults });
  }
  if ($$props.items === void 0 && $$bindings.items && items !== void 0)
    $$bindings.items(items);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      {
        doSearch();
      }
    }
    $$rendered = `${validate_component(InputGroup, "InputGroup").$$render($$result, {}, {}, {
      default: () => {
        return `${validate_component(InputGroupText, "InputGroupText").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Icon, "Icon").$$render($$result, { name: "search" }, {}, {})}`;
          }
        })}
	${validate_component(Input, "Input").$$render(
          $$result,
          {
            type: "search",
            name: "search",
            id: "search",
            placeholder: "search",
            value: searchPrompt
          },
          {
            value: ($$value) => {
              searchPrompt = $$value;
              $$settled = false;
            }
          },
          {}
        )}`;
      }
    })}`;
  } while (!$$settled);
  return $$rendered;
});
const TableList_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: "button.svelte-3axzdk{background:none;border:none;color:inherit;padding:0;font:inherit;cursor:pointer;outline:inherit}.text-hover-underline.svelte-3axzdk:hover{text-decoration:underline}.text-hover-bold.svelte-3axzdk:hover{font-weight:bold}.text-hover-highlight.svelte-3axzdk:hover{color:var(--bs-primary)}",
  map: null
};
function backgroundForIndex(index) {
  return index % 2 ? "bg-body-tertiary" : "bg-body-secondary";
}
const TableList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $editingId, $$unsubscribe_editingId;
  $$unsubscribe_editingId = subscribe(editingId, (value) => $editingId = value);
  createEventDispatcher();
  let { items = [] } = $$props;
  let filteredItems = items;
  let viewItems = filteredItems;
  let { itemsType = "items" } = $$props;
  let { fieldsInfo = [] } = $$props;
  let sortByField = null;
  let item = null;
  let cloningItem = false;
  if ($$props.items === void 0 && $$bindings.items && items !== void 0)
    $$bindings.items(items);
  if ($$props.itemsType === void 0 && $$bindings.itemsType && itemsType !== void 0)
    $$bindings.itemsType(itemsType);
  if ($$props.fieldsInfo === void 0 && $$bindings.fieldsInfo && fieldsInfo !== void 0)
    $$bindings.fieldsInfo(fieldsInfo);
  $$result.css.add(css$2);
  {
    {
      viewItems = filteredItems;
    }
  }
  $$unsubscribe_editingId();
  return `<div class="px-3 pb-3"><div class="pb-3 mx-auto" style="max-width: 500px;">${validate_component(Row, "Row").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Col, "Col").$$render($$result, { sm: { size: 6 } }, {}, {
        default: () => {
          return `${validate_component(FormSearch, "FormSearch").$$render($$result, { items }, {}, {})}`;
        }
      })}

			${validate_component(Col, "Col").$$render($$result, { sm: { size: 6 } }, {}, {
        default: () => {
          return `${validate_component(Button, "Button").$$render($$result, { color: "danger" }, {}, {
            default: () => {
              return `${validate_component(Icon, "Icon").$$render($$result, { name: "trash-fill" }, {}, {})}Delete all
				`;
            }
          })}
				${validate_component(Button, "Button").$$render($$result, { color: "primary" }, {}, {
            default: () => {
              return `${validate_component(Icon, "Icon").$$render($$result, { name: "file-earmark-arrow-up" }, {}, {})}Import
				`;
            }
          })}`;
        }
      })}`;
    }
  })}</div>

	${validate_component(Row, "Row").$$render(
    $$result,
    {
      noGutters: true,
      class: "fw-bold mb-2 text-body h5"
    },
    {},
    {
      default: () => {
        return `${each(fieldsInfo, (headerElement) => {
          return `${validate_component(Col, "Col").$$render($$result, { sm: { size: headerElement.columns } }, {}, {
            default: () => {
              return `<button class=" svelte-3axzdk"><span class="text-hover-highlight svelte-3axzdk">${sortByField == headerElement.fieldName ? `${escape(headerElement.label)}
							${`${validate_component(Icon, "Icon").$$render($$result, { name: "sort-down" }, {}, {})}`}` : `${escape(headerElement.label)}`}
					</span></button>
			`;
            }
          })}`;
        })}
		${validate_component(Col, "Col").$$render($$result, { class: "text-end" }, {}, {
          default: () => {
            return `Actions`;
          }
        })}`;
      }
    }
  )}

	${viewItems.length ? each(viewItems, (item2, index) => {
    return `<div class="${"px-2 mb-2 rounded shadow-sm " + escape(backgroundForIndex(index), true) + " svelte-3axzdk"}">${$editingId != item2.id ? `${validate_component(Row, "Row").$$render(
      $$result,
      {
        noGutters: true,
        class: "align-items-center"
      },
      {},
      {
        default: () => {
          return `${each(fieldsInfo, (fieldInfo) => {
            return `${validate_component(Col, "Col").$$render(
              $$result,
              {
                sm: { size: fieldInfo.columns },
                class: "text-truncate pe-1",
                "aria-label": fieldInfo.label,
                title: item2[fieldInfo.fieldName]?.toString()
              },
              {},
              {
                default: () => {
                  return `${escape(item2[fieldInfo.fieldName]?.toString() || "-")}
						`;
                }
              }
            )}`;
          })}

					${validate_component(Col, "Col").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Row, "Row").$$render($$result, { class: "g-1" }, {}, {
                default: () => {
                  return `${validate_component(Col, "Col").$$render($$result, {}, {}, {
                    default: () => {
                      return `${validate_component(Button, "Button").$$render(
                        $$result,
                        {
                          color: "primary",
                          id: "btn-edit-" + item2.id,
                          class: "w-100 px-1 my-1 text-nowrap",
                          "aria-label": "Edit"
                        },
                        {},
                        {
                          default: () => {
                            return `${validate_component(Icon, "Icon").$$render($$result, { name: "pencil-square" }, {}, {})}
								`;
                          }
                        }
                      )}
								${validate_component(Tooltip, "Tooltip").$$render(
                        $$result,
                        {
                          target: "btn-edit-" + item2.id,
                          placement: "top"
                        },
                        {},
                        {
                          default: () => {
                            return `Edit`;
                          }
                        }
                      )}
							`;
                    }
                  })}
							${validate_component(Col, "Col").$$render($$result, {}, {}, {
                    default: () => {
                      return `${validate_component(Button, "Button").$$render(
                        $$result,
                        {
                          id: "btn-clone-" + item2.id,
                          color: "secondary",
                          class: "w-100 px-1 my-1 text-nowrap",
                          "aria-label": "Clone"
                        },
                        {},
                        {
                          default: () => {
                            return `${validate_component(Icon, "Icon").$$render($$result, { name: "files" }, {}, {})}
								`;
                          }
                        }
                      )}
								${validate_component(Tooltip, "Tooltip").$$render(
                        $$result,
                        {
                          target: "btn-clone-" + item2.id,
                          placement: "top"
                        },
                        {},
                        {
                          default: () => {
                            return `Clone`;
                          }
                        }
                      )}
							`;
                    }
                  })}
							${validate_component(Col, "Col").$$render($$result, {}, {}, {
                    default: () => {
                      return `${validate_component(Button, "Button").$$render(
                        $$result,
                        {
                          id: "btn-delete-" + item2.id,
                          color: "danger",
                          class: "w-100 px-1 my-1 text-nowrap",
                          "aria-label": "Delete"
                        },
                        {},
                        {
                          default: () => {
                            return `${validate_component(Icon, "Icon").$$render($$result, { name: "trash-fill" }, {}, {})}
								`;
                          }
                        }
                      )}
								${validate_component(Tooltip, "Tooltip").$$render(
                        $$result,
                        {
                          target: "btn-delete-" + item2.id,
                          placement: "top"
                        },
                        {},
                        {
                          default: () => {
                            return `Delete`;
                          }
                        }
                      )}
							`;
                    }
                  })}
						`;
                }
              })}
					`;
            }
          })}
				`;
        }
      }
    )}` : `<div>${slots.edit ? slots.edit({ item: item2 }) : ``}
				</div>`}
		</div>`;
  }) : `<div class="px-3 py-2">${slots.empty ? slots.empty({}) : `
				<div class="col-12 text-center h3 text-body">No ${escape(itemsType)} found
				</div>
			`}
		</div>`}
	${$editingId === "" ? `<div class="${"px-2 rounded shadow " + escape(backgroundForIndex(viewItems.length), true) + " svelte-3axzdk"}">${slots.create ? slots.create({ item, cloning: cloningItem }) : ``}</div>` : `<div class="px-2">${validate_component(Row, "Row").$$render($$result, { noGutters: true }, {}, {
    default: () => {
      return `<div class="col text-muted">${escape(viewItems.length)} items</div>
				<div class="col-2">${validate_component(Button, "Button").$$render($$result, { color: "primary", class: "w-100" }, {}, {
        default: () => {
          return `${validate_component(Icon, "Icon").$$render($$result, { name: "plus" }, {}, {})}New ${escape(itemsType)}`;
        }
      })}</div>`;
    }
  })}</div>`}
</div>`;
});
const MyModal_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "dialog.svelte-d5icrf.svelte-d5icrf{max-width:32em;border-radius:0.2em;border:none;padding:0}dialog.svelte-d5icrf.svelte-d5icrf::backdrop{background:rgba(0, 0, 0, 0.3)}dialog.svelte-d5icrf>div.svelte-d5icrf{padding:1em}dialog[open].svelte-d5icrf.svelte-d5icrf{animation:svelte-d5icrf-zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)}@keyframes svelte-d5icrf-zoom{from{transform:scale(0.95)}to{transform:scale(1)}}dialog[open].svelte-d5icrf.svelte-d5icrf::backdrop{animation:svelte-d5icrf-fade 0.2s ease-out}@keyframes svelte-d5icrf-fade{from{opacity:0}to{opacity:1}}",
  map: null
};
const MyModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { showModal } = $$props;
  let dialog;
  createEventDispatcher();
  if ($$props.showModal === void 0 && $$bindings.showModal && showModal !== void 0)
    $$bindings.showModal(showModal);
  $$result.css.add(css$1);
  return `
<dialog class="svelte-d5icrf"${add_attribute("this", dialog, 0)}>
	<div class="svelte-d5icrf">${slots.header ? slots.header({}) : ``}
		<hr>
		${slots.body ? slots.body({}) : ``}
		<hr>
		${validate_component(Button, "Button").$$render($$result, { color: "danger" }, {}, {
    default: () => {
      return `Cancel`;
    }
  })}
        ${validate_component(Button, "Button").$$render($$result, { color: "primary" }, {}, {
    default: () => {
      return `Confirm`;
    }
  })}</div>
</dialog>`;
});
const MyCsvModal_svelte_svelte_type_style_lang = "";
const css = {
  code: "dialog.svelte-d5icrf.svelte-d5icrf{max-width:32em;border-radius:0.2em;border:none;padding:0}dialog.svelte-d5icrf.svelte-d5icrf::backdrop{background:rgba(0, 0, 0, 0.3)}dialog.svelte-d5icrf>div.svelte-d5icrf{padding:1em}dialog[open].svelte-d5icrf.svelte-d5icrf{animation:svelte-d5icrf-zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)}@keyframes svelte-d5icrf-zoom{from{transform:scale(0.95)}to{transform:scale(1)}}dialog[open].svelte-d5icrf.svelte-d5icrf::backdrop{animation:svelte-d5icrf-fade 0.2s ease-out}@keyframes svelte-d5icrf-fade{from{opacity:0}to{opacity:1}}",
  map: null
};
const MyCsvModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { showCsvModal } = $$props;
  let dialog;
  createEventDispatcher();
  if ($$props.showCsvModal === void 0 && $$bindings.showCsvModal && showCsvModal !== void 0)
    $$bindings.showCsvModal(showCsvModal);
  $$result.css.add(css);
  return `
<dialog class="svelte-d5icrf"${add_attribute("this", dialog, 0)}>
	<div class="svelte-d5icrf">${slots.header ? slots.header({}) : ``}
		<hr>
		${slots.body ? slots.body({}) : ``}
		<input type="file" accept=".csv">
		<br>
		${validate_component(Button, "Button").$$render(
    $$result,
    {
      color: "danger",
      style: "margin-top: 10px;"
    },
    {},
    {
      default: () => {
        return `Cancel`;
      }
    }
  )}
		${``}</div>
</dialog>`;
});
const Subjects = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $allSubjects, $$unsubscribe_allSubjects;
  $$unsubscribe_allSubjects = subscribe(allSubjects, (value) => $allSubjects = value);
  let showModal = false;
  let showCsvModal = false;
  let showDuplicateAlert = false;
  let toggle = () => {
    showDuplicateAlert = !showDuplicateAlert;
  };
  let fieldsInfo = [
    {
      fieldName: "schoolClass",
      label: "Class",
      columns: 2
    },
    {
      fieldName: "professor",
      label: "Professor",
      columns: 2
    },
    {
      fieldName: "abbreviation",
      label: "Abbreviation",
      columns: 2
    },
    {
      fieldName: "name",
      label: "Name",
      columns: 2
    },
    {
      fieldName: "weight",
      label: "Weight",
      columns: 1
    },
    {
      fieldName: "hoursPerWeek",
      label: "Hours",
      columns: 1
    }
  ];
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `
${validate_component(TableList, "TableList").$$render(
      $$result,
      {
        items: $allSubjects,
        fieldsInfo,
        itemsType: "subject"
      },
      {},
      {
        create: ({ cloning, item }) => {
          return `${validate_component(SubjectFormRow, "SubjectFormRow").$$render($$result, { slot: "create", subject: item, cloning }, {}, {})}`;
        },
        edit: ({ item }) => {
          return `${validate_component(SubjectFormRow, "SubjectFormRow").$$render($$result, { slot: "edit", subject: item }, {}, {})}`;
        }
      }
    )}

${validate_component(MyModal, "MyModal").$$render(
      $$result,
      { showModal },
      {
        showModal: ($$value) => {
          showModal = $$value;
          $$settled = false;
        }
      },
      {
        body: () => {
          return `<p slot="body">Are you sure you want to delete all subjects?</p>`;
        },
        header: () => {
          return `<h2 slot="header">Delete all subjects</h2>`;
        }
      }
    )}
${validate_component(MyCsvModal, "MyCsvModal").$$render(
      $$result,
      { showCsvModal },
      {
        showCsvModal: ($$value) => {
          showCsvModal = $$value;
          $$settled = false;
        }
      },
      {
        body: () => {
          return `<p slot="body">Please select a CSV file with the following columns: <br> Year, Section, and Track of the class, Name, Surname, and Email of the professor, Abbreviation, Name, Weight, and Hours .</p>`;
        },
        header: () => {
          return `<h2 slot="header">Import subjects from CSV</h2>`;
        }
      }
    )}
${validate_component(Alert, "Alert").$$render(
      $$result,
      {
        color: "warning",
        isOpen: showDuplicateAlert,
        toggle
      },
      {},
      {
        default: () => {
          return `You are trying to add a subject that already exists! Please check whether
	the fields are unique.
`;
        }
      }
    )}`;
  } while (!$$settled);
  $$unsubscribe_allSubjects();
  return $$rendered;
});
const correctFeedback$1 = "";
const ProfessorFormRow = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { professor = null } = $$props;
  let { cloning = false } = $$props;
  let nameValidation = {
    errorMessage: "",
    valid: false,
    invalid: false
  };
  let surnameValidation = {
    errorMessage: "",
    valid: false,
    invalid: false
  };
  let emailValidation = {
    errorMessage: "",
    valid: false,
    invalid: false
  };
  let cellPhoneValidation = {
    errorMessage: "",
    valid: false,
    invalid: false
  };
  let editingProfessor;
  if (professor) {
    editingProfessor = {
      _id: professor.id,
      _name: { value: professor.name.value },
      _surname: { value: professor.surname.value },
      _email: { value: professor.email.value },
      _cellPhone: { value: professor.cellPhone.value }
    };
    if (cloning) {
      editingProfessor._id = null;
    }
    validateName();
    validateSurname();
    validateEmail();
    validateCellPhone();
  } else {
    editingProfessor = {
      _id: null,
      _name: { value: "" },
      _surname: { value: "" },
      _email: { value: "" },
      _cellPhone: { value: "" }
    };
  }
  function validateName() {
    try {
      nameSchema.parse(editingProfessor._name);
      nameValidation.valid = true;
      nameValidation.invalid = false;
      nameValidation.errorMessage = correctFeedback$1;
    } catch (e) {
      if (e instanceof ZodError) {
        nameValidation.errorMessage = e.issues[0].message;
        nameValidation.valid = false;
        nameValidation.invalid = true;
      }
    }
  }
  function validateSurname() {
    try {
      surnameSchema.parse(editingProfessor._surname);
      surnameValidation.valid = true;
      surnameValidation.invalid = false;
      surnameValidation.errorMessage = correctFeedback$1;
    } catch (e) {
      if (e instanceof ZodError) {
        surnameValidation.errorMessage = e.issues[0].message;
        surnameValidation.valid = false;
        surnameValidation.invalid = true;
      }
    }
  }
  function validateEmail() {
    try {
      mailSchema.parse(editingProfessor._email);
      emailValidation.valid = true;
      emailValidation.invalid = false;
      emailValidation.errorMessage = correctFeedback$1;
    } catch (e) {
      if (e instanceof ZodError) {
        emailValidation.errorMessage = e.issues[0].message;
        emailValidation.valid = false;
        emailValidation.invalid = true;
      }
    }
  }
  function validateCellPhone() {
    try {
      cellPhoneSchema.parse(editingProfessor._cellPhone);
      cellPhoneValidation.valid = true;
      cellPhoneValidation.invalid = false;
      cellPhoneValidation.errorMessage = correctFeedback$1;
    } catch (e) {
      if (e instanceof ZodError) {
        cellPhoneValidation.errorMessage = e.issues[0].message;
        cellPhoneValidation.valid = false;
        cellPhoneValidation.invalid = true;
      }
    }
  }
  if ($$props.professor === void 0 && $$bindings.professor && professor !== void 0)
    $$bindings.professor(professor);
  if ($$props.cloning === void 0 && $$bindings.cloning && cloning !== void 0)
    $$bindings.cloning(cloning);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${validate_component(Row, "Row").$$render($$result, { class: "align-items-top g-1 mt-1" }, {}, {
      default: () => {
        return `${validate_component(Col, "Col").$$render($$result, { sm: { size: 2 } }, {}, {
          default: () => {
            return `${validate_component(FormGroup, "FormGroup").$$render(
              $$result,
              {
                floating: true,
                label: "Name",
                class: "text-muted"
              },
              {},
              {
                default: () => {
                  return `${validate_component(Input, "Input").$$render(
                    $$result,
                    {
                      type: "text",
                      label: "name",
                      name: "name",
                      id: "name",
                      value: editingProfessor._name.value,
                      feedback: nameValidation.errorMessage,
                      valid: nameValidation.valid,
                      invalid: nameValidation.invalid
                    },
                    {
                      value: ($$value) => {
                        editingProfessor._name.value = $$value;
                        $$settled = false;
                      },
                      feedback: ($$value) => {
                        nameValidation.errorMessage = $$value;
                        $$settled = false;
                      },
                      valid: ($$value) => {
                        nameValidation.valid = $$value;
                        $$settled = false;
                      },
                      invalid: ($$value) => {
                        nameValidation.invalid = $$value;
                        $$settled = false;
                      }
                    },
                    {}
                  )}`;
                }
              }
            )}`;
          }
        })}
	${validate_component(Col, "Col").$$render($$result, { sm: { size: 2 } }, {}, {
          default: () => {
            return `${validate_component(FormGroup, "FormGroup").$$render(
              $$result,
              {
                floating: true,
                label: "Surname",
                class: "text-muted"
              },
              {},
              {
                default: () => {
                  return `${validate_component(Input, "Input").$$render(
                    $$result,
                    {
                      type: "text",
                      label: "surname",
                      name: "surname",
                      id: "surname",
                      value: editingProfessor._surname.value,
                      feedback: surnameValidation.errorMessage,
                      valid: surnameValidation.valid,
                      invalid: surnameValidation.invalid
                    },
                    {
                      value: ($$value) => {
                        editingProfessor._surname.value = $$value;
                        $$settled = false;
                      },
                      feedback: ($$value) => {
                        surnameValidation.errorMessage = $$value;
                        $$settled = false;
                      },
                      valid: ($$value) => {
                        surnameValidation.valid = $$value;
                        $$settled = false;
                      },
                      invalid: ($$value) => {
                        surnameValidation.invalid = $$value;
                        $$settled = false;
                      }
                    },
                    {}
                  )}`;
                }
              }
            )}`;
          }
        })}
	${validate_component(Col, "Col").$$render($$result, { sm: { size: 3 } }, {}, {
          default: () => {
            return `${validate_component(FormGroup, "FormGroup").$$render(
              $$result,
              {
                floating: true,
                label: "Email",
                class: "text-muted"
              },
              {},
              {
                default: () => {
                  return `${validate_component(Input, "Input").$$render(
                    $$result,
                    {
                      type: "email",
                      label: "email",
                      name: "email",
                      id: "email",
                      value: editingProfessor._email.value,
                      feedback: emailValidation.errorMessage,
                      valid: emailValidation.valid,
                      invalid: emailValidation.invalid
                    },
                    {
                      value: ($$value) => {
                        editingProfessor._email.value = $$value;
                        $$settled = false;
                      },
                      feedback: ($$value) => {
                        emailValidation.errorMessage = $$value;
                        $$settled = false;
                      },
                      valid: ($$value) => {
                        emailValidation.valid = $$value;
                        $$settled = false;
                      },
                      invalid: ($$value) => {
                        emailValidation.invalid = $$value;
                        $$settled = false;
                      }
                    },
                    {}
                  )}`;
                }
              }
            )}`;
          }
        })}
	${validate_component(Col, "Col").$$render($$result, { sm: { size: 2 } }, {}, {
          default: () => {
            return `${validate_component(FormGroup, "FormGroup").$$render(
              $$result,
              {
                floating: true,
                label: "Phone number",
                class: "text-muted"
              },
              {},
              {
                default: () => {
                  return `${validate_component(Input, "Input").$$render(
                    $$result,
                    {
                      type: "text",
                      label: "cellPhone",
                      name: "cellPhone",
                      id: "cellPhone",
                      value: editingProfessor._cellPhone.value,
                      feedback: cellPhoneValidation.errorMessage,
                      valid: cellPhoneValidation.valid,
                      invalid: cellPhoneValidation.invalid
                    },
                    {
                      value: ($$value) => {
                        editingProfessor._cellPhone.value = $$value;
                        $$settled = false;
                      },
                      feedback: ($$value) => {
                        cellPhoneValidation.errorMessage = $$value;
                        $$settled = false;
                      },
                      valid: ($$value) => {
                        cellPhoneValidation.valid = $$value;
                        $$settled = false;
                      },
                      invalid: ($$value) => {
                        cellPhoneValidation.invalid = $$value;
                        $$settled = false;
                      }
                    },
                    {}
                  )}`;
                }
              }
            )}`;
          }
        })}
	${validate_component(Col, "Col").$$render($$result, { sm: { size: 2 }, class: "ms-auto ps-0" }, {}, {
          default: () => {
            return `${validate_component(Row, "Row").$$render($$result, { class: "g-1" }, {}, {
              default: () => {
                return `${validate_component(Col, "Col").$$render($$result, {}, {}, {
                  default: () => {
                    return `${validate_component(Button, "Button").$$render(
                      $$result,
                      {
                        color: "primary",
                        class: "w-100 text-nowrap"
                      },
                      {},
                      {
                        default: () => {
                          return `${validate_component(Icon, "Icon").$$render($$result, { name: "check" }, {}, {})} Save`;
                        }
                      }
                    )}`;
                  }
                })}
			${validate_component(Col, "Col").$$render($$result, {}, {}, {
                  default: () => {
                    return `${validate_component(Button, "Button").$$render(
                      $$result,
                      {
                        color: "danger",
                        class: "w-100 text-nowrap"
                      },
                      {},
                      {
                        default: () => {
                          return `${validate_component(Icon, "Icon").$$render($$result, { name: "x" }, {}, {})} Cancel`;
                        }
                      }
                    )}`;
                  }
                })}`;
              }
            })}`;
          }
        })}`;
      }
    })}`;
  } while (!$$settled);
  return $$rendered;
});
const Professors = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $allProfessors, $$unsubscribe_allProfessors;
  $$unsubscribe_allProfessors = subscribe(allProfessors, (value) => $allProfessors = value);
  let showModal = false;
  let showCsvModal = false;
  let showDuplicateAlert = false;
  let toggle = () => {
    showDuplicateAlert = !showDuplicateAlert;
  };
  let fieldsInfo = [
    {
      fieldName: "name",
      label: "Name",
      columns: 2
    },
    {
      fieldName: "surname",
      label: "Surname",
      columns: 2
    },
    {
      fieldName: "email",
      label: "Email",
      columns: 3
    },
    {
      fieldName: "cellPhone",
      label: "Cell Phone",
      columns: 3
    }
  ];
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${validate_component(TableList, "TableList").$$render(
      $$result,
      {
        items: $allProfessors,
        fieldsInfo,
        itemsType: "professor"
      },
      {},
      {
        create: ({ cloning, item }) => {
          return `${validate_component(ProfessorFormRow, "ProfessorFormRow").$$render($$result, { slot: "create", professor: item, cloning }, {}, {})}`;
        },
        edit: ({ index, item }) => {
          return `${validate_component(ProfessorFormRow, "ProfessorFormRow").$$render($$result, { slot: "edit", professor: item }, {}, {})}`;
        }
      }
    )}

${validate_component(MyModal, "MyModal").$$render(
      $$result,
      { showModal },
      {
        showModal: ($$value) => {
          showModal = $$value;
          $$settled = false;
        }
      },
      {
        body: () => {
          return `<p slot="body">Are you sure you want to delete all professors? All subjects will be
		deleted too!
	</p>`;
        },
        header: () => {
          return `<h2 slot="header">Delete all professors</h2>`;
        }
      }
    )}
${validate_component(MyCsvModal, "MyCsvModal").$$render(
      $$result,
      { showCsvModal },
      {
        showCsvModal: ($$value) => {
          showCsvModal = $$value;
          $$settled = false;
        }
      },
      {
        body: () => {
          return `<p slot="body">Please select a CSV file with the following columns: <br> Name, Surname, Email, and Cellphone.</p>`;
        },
        header: () => {
          return `<h2 slot="header">Import professors from CSV</h2>`;
        }
      }
    )}
${validate_component(Alert, "Alert").$$render(
      $$result,
      {
        color: "warning",
        isOpen: showDuplicateAlert,
        toggle
      },
      {},
      {
        default: () => {
          return `You are trying to add a professor that already exists! Please check the
	name, surname and email.
`;
        }
      }
    )}`;
  } while (!$$settled);
  $$unsubscribe_allProfessors();
  return $$rendered;
});
const correctFeedback = "";
const ClassFormRow = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  const sections = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
  const years = [1, 2, 3, 4, 5];
  let { schoolClass = null } = $$props;
  let { cloning = false } = $$props;
  let yearValidation = {
    errorMessage: "",
    valid: false,
    invalid: false
  };
  let sectionValidation = {
    errorMessage: "",
    valid: false,
    invalid: false
  };
  let trackValidation = {
    errorMessage: "",
    valid: false,
    invalid: false
  };
  let tmpSchoolClass;
  {
    if (schoolClass) {
      tmpSchoolClass = {
        _id: schoolClass.id,
        _year: { value: schoolClass.year.value },
        _section: { value: schoolClass.section.value },
        _track: { value: schoolClass.track?.value || "" }
      };
      if (cloning) {
        tmpSchoolClass._id = null;
      }
      validateYear();
      validateSection();
      validateTrack();
    } else {
      tmpSchoolClass = {
        _id: null,
        _year: { value: 1 },
        _section: { value: "A" },
        _track: { value: "" }
      };
    }
  }
  function validateYear() {
    try {
      yearSchema.parse(tmpSchoolClass._year);
      yearValidation.valid = true;
      yearValidation.invalid = false;
      yearValidation.errorMessage = correctFeedback;
    } catch (e) {
      if (e instanceof ZodError) {
        yearValidation.errorMessage = e.issues[0].message;
        yearValidation.valid = false;
        yearValidation.invalid = true;
      }
    }
  }
  function validateSection() {
    try {
      sectionSchema.parse(tmpSchoolClass._section);
      sectionValidation.valid = true;
      sectionValidation.invalid = false;
      sectionValidation.errorMessage = correctFeedback;
    } catch (e) {
      if (e instanceof ZodError) {
        sectionValidation.errorMessage = e.issues[0].message;
        sectionValidation.valid = false;
        sectionValidation.invalid = true;
      }
    }
  }
  function validateTrack() {
    if (tmpSchoolClass._track.value === "") {
      trackValidation.valid = true;
      trackValidation.invalid = false;
    } else {
      try {
        trackSchema.parse(tmpSchoolClass._track);
        trackValidation.valid = true;
        trackValidation.invalid = false;
      } catch (e) {
        if (e instanceof ZodError) {
          trackValidation.errorMessage = e.issues[0].message;
          trackValidation.valid = false;
          trackValidation.invalid = true;
        }
      }
    }
    if (trackValidation.valid) {
      trackValidation.errorMessage = correctFeedback;
    }
  }
  if ($$props.schoolClass === void 0 && $$bindings.schoolClass && schoolClass !== void 0)
    $$bindings.schoolClass(schoolClass);
  if ($$props.cloning === void 0 && $$bindings.cloning && cloning !== void 0)
    $$bindings.cloning(cloning);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${validate_component(Row, "Row").$$render($$result, { class: "align-items-top g-1 mt-1" }, {}, {
      default: () => {
        return `${validate_component(Col, "Col").$$render($$result, { sm: { size: 3 } }, {}, {
          default: () => {
            return `${validate_component(FormGroup, "FormGroup").$$render(
              $$result,
              {
                floating: true,
                label: "Year",
                class: "text-muted"
              },
              {},
              {
                default: () => {
                  return `${validate_component(Input, "Input").$$render(
                    $$result,
                    {
                      type: "select",
                      name: "year",
                      id: "year",
                      value: tmpSchoolClass._year.value,
                      feedback: yearValidation.errorMessage,
                      valid: yearValidation.valid,
                      invalid: yearValidation.invalid
                    },
                    {
                      value: ($$value) => {
                        tmpSchoolClass._year.value = $$value;
                        $$settled = false;
                      },
                      feedback: ($$value) => {
                        yearValidation.errorMessage = $$value;
                        $$settled = false;
                      },
                      valid: ($$value) => {
                        yearValidation.valid = $$value;
                        $$settled = false;
                      },
                      invalid: ($$value) => {
                        yearValidation.invalid = $$value;
                        $$settled = false;
                      }
                    },
                    {
                      default: () => {
                        return `${each(years, (year) => {
                          return `<option${add_attribute("value", year, 0)}>${escape(year)}</option>`;
                        })}`;
                      }
                    }
                  )}`;
                }
              }
            )}`;
          }
        })}
	${validate_component(Col, "Col").$$render($$result, { sm: { size: 3 } }, {}, {
          default: () => {
            return `${validate_component(FormGroup, "FormGroup").$$render(
              $$result,
              {
                floating: true,
                inline: true,
                label: "Section",
                class: "text-muted"
              },
              {},
              {
                default: () => {
                  return `${validate_component(Input, "Input").$$render(
                    $$result,
                    {
                      type: "select",
                      name: "section",
                      id: "section",
                      value: tmpSchoolClass._section.value,
                      feedback: sectionValidation.errorMessage,
                      valid: sectionValidation.valid,
                      invalid: sectionValidation.invalid
                    },
                    {
                      value: ($$value) => {
                        tmpSchoolClass._section.value = $$value;
                        $$settled = false;
                      },
                      feedback: ($$value) => {
                        sectionValidation.errorMessage = $$value;
                        $$settled = false;
                      },
                      valid: ($$value) => {
                        sectionValidation.valid = $$value;
                        $$settled = false;
                      },
                      invalid: ($$value) => {
                        sectionValidation.invalid = $$value;
                        $$settled = false;
                      }
                    },
                    {
                      default: () => {
                        return `${each(sections, (section) => {
                          return `<option${add_attribute("value", section, 0)}>${escape(section)}</option>`;
                        })}`;
                      }
                    }
                  )}`;
                }
              }
            )}`;
          }
        })}
	${validate_component(Col, "Col").$$render($$result, { sm: { size: 3 } }, {}, {
          default: () => {
            return `${validate_component(FormGroup, "FormGroup").$$render(
              $$result,
              {
                floating: true,
                label: "Track",
                class: "text-muted"
              },
              {},
              {
                default: () => {
                  return `${validate_component(Input, "Input").$$render(
                    $$result,
                    {
                      type: "text",
                      label: "track",
                      placeholder: "Enter a value",
                      name: "track",
                      id: "track",
                      value: tmpSchoolClass._track.value,
                      feedback: trackValidation.errorMessage,
                      valid: trackValidation.valid,
                      invalid: trackValidation.invalid
                    },
                    {
                      value: ($$value) => {
                        tmpSchoolClass._track.value = $$value;
                        $$settled = false;
                      },
                      feedback: ($$value) => {
                        trackValidation.errorMessage = $$value;
                        $$settled = false;
                      },
                      valid: ($$value) => {
                        trackValidation.valid = $$value;
                        $$settled = false;
                      },
                      invalid: ($$value) => {
                        trackValidation.invalid = $$value;
                        $$settled = false;
                      }
                    },
                    {}
                  )}`;
                }
              }
            )}`;
          }
        })}
	${validate_component(Col, "Col").$$render($$result, { sm: { size: 2 }, class: "ms-auto ps-0" }, {}, {
          default: () => {
            return `${validate_component(Row, "Row").$$render($$result, { class: "g-1" }, {}, {
              default: () => {
                return `${validate_component(Col, "Col").$$render($$result, {}, {}, {
                  default: () => {
                    return `${validate_component(Button, "Button").$$render(
                      $$result,
                      {
                        color: "primary",
                        class: "w-100 text-nowrap"
                      },
                      {},
                      {
                        default: () => {
                          return `${validate_component(Icon, "Icon").$$render($$result, { name: "check" }, {}, {})} Save`;
                        }
                      }
                    )}`;
                  }
                })}
			${validate_component(Col, "Col").$$render($$result, {}, {}, {
                  default: () => {
                    return `${validate_component(Button, "Button").$$render(
                      $$result,
                      {
                        color: "danger",
                        class: "w-100 text-nowrap"
                      },
                      {},
                      {
                        default: () => {
                          return `${validate_component(Icon, "Icon").$$render($$result, { name: "x" }, {}, {})} Cancel`;
                        }
                      }
                    )}`;
                  }
                })}`;
              }
            })}`;
          }
        })}`;
      }
    })}`;
  } while (!$$settled);
  return $$rendered;
});
const Classes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $allClassrooms, $$unsubscribe_allClassrooms;
  $$unsubscribe_allClassrooms = subscribe(allClassrooms, (value) => $allClassrooms = value);
  let showModal = false;
  let showCsvModal = false;
  let showDuplicateAlert = false;
  let toggle = () => {
    showDuplicateAlert = !showDuplicateAlert;
  };
  let fieldsInfo = [
    {
      fieldName: "year",
      label: "Year",
      columns: 3
    },
    {
      fieldName: "section",
      label: "Section",
      columns: 3
    },
    {
      fieldName: "track",
      label: "Track",
      columns: 4
    }
  ];
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${validate_component(TableList, "TableList").$$render(
      $$result,
      {
        items: $allClassrooms,
        fieldsInfo,
        itemsType: "class"
      },
      {},
      {
        create: ({ cloning, item }) => {
          return `${validate_component(ClassFormRow, "ClassFormRow").$$render(
            $$result,
            {
              slot: "create",
              schoolClass: item,
              cloning
            },
            {},
            {}
          )}`;
        },
        edit: ({ item }) => {
          return `${validate_component(ClassFormRow, "ClassFormRow").$$render($$result, { slot: "edit", schoolClass: item }, {}, {})}`;
        }
      }
    )}

${validate_component(MyModal, "MyModal").$$render(
      $$result,
      { showModal },
      {
        showModal: ($$value) => {
          showModal = $$value;
          $$settled = false;
        }
      },
      {
        body: () => {
          return `<p slot="body">Are you sure you want to delete all classes? All subjects will be
		deleted too!
	</p>`;
        },
        header: () => {
          return `<h2 slot="header">Delete all classes</h2>`;
        }
      }
    )}
${validate_component(MyCsvModal, "MyCsvModal").$$render(
      $$result,
      { showCsvModal },
      {
        showCsvModal: ($$value) => {
          showCsvModal = $$value;
          $$settled = false;
        }
      },
      {
        body: () => {
          return `<p slot="body">Please select a CSV file with the following columns: <br> Year, Section, and Track.</p>`;
        },
        header: () => {
          return `<h2 slot="header">Import class from CSV</h2>`;
        }
      }
    )}
${validate_component(Alert, "Alert").$$render(
      $$result,
      {
        color: "warning",
        isOpen: showDuplicateAlert,
        toggle
      },
      {},
      {
        default: () => {
          return `You are trying to add a class that already exists! Please check whether the
	fields are unique.
`;
        }
      }
    )}`;
  } while (!$$settled);
  $$unsubscribe_allClassrooms();
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { tabItems = [
    { name: "Professor", icon: "person-video2" },
    { name: "Class", icon: "door-closed" },
    {
      name: "Subject",
      icon: "file-earmark-ruled"
    }
  ] } = $$props;
  let { activeTab = "Professor" } = $$props;
  if ($$props.tabItems === void 0 && $$bindings.tabItems && tabItems !== void 0)
    $$bindings.tabItems(tabItems);
  if ($$props.activeTab === void 0 && $$bindings.activeTab && activeTab !== void 0)
    $$bindings.activeTab(activeTab);
  return `${validate_component(Row, "Row").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Tabs, "Tabs").$$render($$result, { tabItems, activeItem: activeTab }, {}, {})}`;
    }
  })}

${activeTab === "Professor" ? `<div>${validate_component(Professors, "Professors").$$render($$result, {}, {}, {})}</div>` : `${activeTab === "Class" ? `<div>${validate_component(Classes, "Classes").$$render($$result, {}, {}, {})}</div>` : `${activeTab === "Subject" ? `<div>${validate_component(Subjects, "Subjects").$$render($$result, {}, {}, {})}</div>` : ``}`}`}`;
});
export {
  Page as default
};
