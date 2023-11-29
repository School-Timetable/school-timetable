import { c as create_ssr_component, a as compute_rest_props, b as spread, e as escape_object, d as escape_attribute_value } from "./index2.js";
import { c as classnames } from "./Offcanvas.svelte_svelte_type_style_lang.js";
const Icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classes;
  let $$restProps = compute_rest_props($$props, ["class", "name"]);
  let { class: className = "" } = $$props;
  let { name = "" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  classes = classnames(className, `bi-${name}`);
  return `<i${spread([escape_object($$restProps), { class: escape_attribute_value(classes) }], {})}></i>`;
});
export {
  Icon as I
};
