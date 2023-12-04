import { c as create_ssr_component, a as compute_rest_props, s as setContext, g as getContext, o as onDestroy, b as spread, e as escape_object, d as escape_attribute_value, f as add_attribute, v as validate_component, h as subscribe, i as escape, j as each } from "../../chunks/index2.js";
import { c as classnames, t as theme, I as Icon, a as allDaysOfWeek, b as allHoursOfDay, d as allSubjects, e as allClassrooms, f as allProfessors } from "../../chunks/Offcanvas.svelte_svelte_type_style_lang.js";
import { createPopper } from "@popperjs/core";
import { w as writable } from "../../chunks/index.js";
function createPopperActions(initOptions) {
  let contentNode;
  let options = initOptions;
  let popperInstance = null;
  let referenceNode;
  const initPopper = () => {
    if (referenceNode && contentNode) {
      popperInstance = createPopper(referenceNode, contentNode, options);
    }
  };
  const deinitPopper = () => {
    if (popperInstance) {
      popperInstance.destroy();
      popperInstance = null;
    }
  };
  const referenceAction = (node) => {
    referenceNode = node;
    initPopper();
    return {
      destroy() {
        deinitPopper();
      }
    };
  };
  const contentAction = (node, contentOptions) => {
    contentNode = node;
    options = Object.assign(Object.assign({}, initOptions), contentOptions);
    initPopper();
    return {
      update(newContentOptions) {
        options = Object.assign(
          Object.assign({}, initOptions),
          newContentOptions
        );
        if (popperInstance && options) {
          popperInstance.setOptions(options);
        }
      },
      destroy() {
        deinitPopper();
      }
    };
  };
  return [referenceAction, contentAction, () => popperInstance];
}
const createContext = () => writable({});
const Dropdown = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let subItemIsActive;
  let classes;
  let handleToggle;
  let $$restProps = compute_rest_props($$props, [
    "class",
    "active",
    "autoClose",
    "direction",
    "dropup",
    "group",
    "inNavbar",
    "isOpen",
    "nav",
    "setActiveFromChild",
    "size",
    "toggle"
  ]);
  const noop = () => void 0;
  let context = createContext();
  setContext("dropdownContext", context);
  const navbarContext = getContext("navbar");
  let { class: className = "" } = $$props;
  let { active = false } = $$props;
  let { autoClose = true } = $$props;
  let { direction = "down" } = $$props;
  let { dropup = false } = $$props;
  let { group = false } = $$props;
  let { inNavbar = navbarContext ? navbarContext.inNavbar : false } = $$props;
  let { isOpen = false } = $$props;
  let { nav = false } = $$props;
  let { setActiveFromChild = false } = $$props;
  let { size = "" } = $$props;
  let { toggle = void 0 } = $$props;
  const [popperRef, popperContent] = createPopperActions();
  const validDirections = ["up", "down", "left", "right", "start", "end"];
  if (validDirections.indexOf(direction) === -1) {
    throw new Error(`Invalid direction sent: '${direction}' is not one of 'up', 'down', 'left', 'right', 'start', 'end'`);
  }
  let component;
  let dropdownDirection;
  function handleDocumentClick(e) {
    if (e && (e.which === 3 || e.type === "keyup" && e.which !== 9))
      return;
    if (component.contains(e.target) && component !== e.target && (e.type !== "keyup" || e.which === 9)) {
      return;
    }
    if (autoClose === true || autoClose === "inside") {
      handleToggle(e);
    }
  }
  onDestroy(() => {
    if (typeof document !== "undefined") {
      ["click", "touchstart", "keyup"].forEach((event) => document.removeEventListener(event, handleDocumentClick, true));
    }
  });
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  if ($$props.autoClose === void 0 && $$bindings.autoClose && autoClose !== void 0)
    $$bindings.autoClose(autoClose);
  if ($$props.direction === void 0 && $$bindings.direction && direction !== void 0)
    $$bindings.direction(direction);
  if ($$props.dropup === void 0 && $$bindings.dropup && dropup !== void 0)
    $$bindings.dropup(dropup);
  if ($$props.group === void 0 && $$bindings.group && group !== void 0)
    $$bindings.group(group);
  if ($$props.inNavbar === void 0 && $$bindings.inNavbar && inNavbar !== void 0)
    $$bindings.inNavbar(inNavbar);
  if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0)
    $$bindings.isOpen(isOpen);
  if ($$props.nav === void 0 && $$bindings.nav && nav !== void 0)
    $$bindings.nav(nav);
  if ($$props.setActiveFromChild === void 0 && $$bindings.setActiveFromChild && setActiveFromChild !== void 0)
    $$bindings.setActiveFromChild(setActiveFromChild);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.toggle === void 0 && $$bindings.toggle && toggle !== void 0)
    $$bindings.toggle(toggle);
  subItemIsActive = !!(setActiveFromChild && component && typeof component.querySelector === "function" && component.querySelector(".active"));
  {
    {
      if (direction === "left")
        dropdownDirection = "start";
      else if (direction === "right")
        dropdownDirection = "end";
      else
        dropdownDirection = direction;
    }
  }
  handleToggle = toggle || (() => isOpen = !isOpen);
  classes = classnames(className, direction !== "down" && `drop${dropdownDirection}`, nav && active ? "active" : false, setActiveFromChild && subItemIsActive ? "active" : false, {
    "btn-group": group,
    [`btn-group-${size}`]: !!size,
    dropdown: !group,
    show: isOpen,
    "nav-item": nav
  });
  {
    {
      if (typeof document !== "undefined") {
        if (isOpen) {
          ["click", "touchstart", "keyup"].forEach((event) => document.addEventListener(event, handleDocumentClick, true));
        } else {
          ["click", "touchstart", "keyup"].forEach((event) => document.removeEventListener(event, handleDocumentClick, true));
        }
      }
    }
  }
  {
    {
      context.update(() => {
        return {
          toggle: handleToggle,
          isOpen,
          autoClose,
          direction: direction === "down" && dropup ? "up" : direction,
          inNavbar: nav || inNavbar,
          popperRef: nav ? noop : popperRef,
          popperContent: nav ? noop : popperContent
        };
      });
    }
  }
  return `${nav ? `<li${spread([escape_object($$restProps), { class: escape_attribute_value(classes) }], {})}${add_attribute("this", component, 0)}>${slots.default ? slots.default({}) : ``}</li>` : `<div${spread([escape_object($$restProps), { class: escape_attribute_value(classes) }], {})}${add_attribute("this", component, 0)}>${slots.default ? slots.default({}) : ``}</div>`}`;
});
const ButtonDropdown = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `${validate_component(Dropdown, "Dropdown").$$render($$result, Object.assign({}, $$restProps, { group: true }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Container = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classes;
  let $$restProps = compute_rest_props($$props, ["class", "sm", "md", "lg", "xl", "xxl", "fluid"]);
  let { class: className = "" } = $$props;
  let { sm = void 0 } = $$props;
  let { md = void 0 } = $$props;
  let { lg = void 0 } = $$props;
  let { xl = void 0 } = $$props;
  let { xxl = void 0 } = $$props;
  let { fluid = false } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
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
  if ($$props.fluid === void 0 && $$bindings.fluid && fluid !== void 0)
    $$bindings.fluid(fluid);
  classes = classnames(className, {
    "container-sm": sm,
    "container-md": md,
    "container-lg": lg,
    "container-xl": xl,
    "container-xxl": xxl,
    "container-fluid": fluid,
    container: !sm && !md && !lg && !xl && !xxl && !fluid
  });
  return `<div${spread([escape_object($$restProps), { class: escape_attribute_value(classes) }], {})}>${slots.default ? slots.default({}) : ``}</div>`;
});
const DropdownItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classes;
  let $$restProps = compute_rest_props($$props, ["class", "active", "disabled", "divider", "header", "toggle", "href"]);
  let $$unsubscribe_context;
  const context = getContext("dropdownContext");
  $$unsubscribe_context = subscribe(context, (value) => value);
  let { class: className = "" } = $$props;
  let { active = false } = $$props;
  let { disabled = false } = $$props;
  let { divider = false } = $$props;
  let { header = false } = $$props;
  let { toggle = true } = $$props;
  let { href = "" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.divider === void 0 && $$bindings.divider && divider !== void 0)
    $$bindings.divider(divider);
  if ($$props.header === void 0 && $$bindings.header && header !== void 0)
    $$bindings.header(header);
  if ($$props.toggle === void 0 && $$bindings.toggle && toggle !== void 0)
    $$bindings.toggle(toggle);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  classes = classnames(className, {
    disabled,
    "dropdown-item": !divider && !header,
    active,
    "dropdown-header": header,
    "dropdown-divider": divider
  });
  $$unsubscribe_context();
  return `${header ? `<h6${spread([escape_object($$restProps), { class: escape_attribute_value(classes) }], {})}>${slots.default ? slots.default({}) : ``}</h6>` : `${divider ? `
  <div${spread([escape_object($$restProps), { class: escape_attribute_value(classes) }], {})}>${slots.default ? slots.default({}) : ``}</div>` : `${href ? `<a${spread(
    [
      escape_object($$restProps),
      { click: true },
      { href: escape_attribute_value(href) },
      { class: escape_attribute_value(classes) }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</a>` : `<button${spread(
    [
      { type: "button" },
      escape_object($$restProps),
      { class: escape_attribute_value(classes) }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</button>`}`}`}`;
});
const DropdownMenu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classes;
  let $$restProps = compute_rest_props($$props, ["class", "end", "right"]);
  let $context, $$unsubscribe_context;
  const context = getContext("dropdownContext");
  $$unsubscribe_context = subscribe(context, (value) => $context = value);
  let { class: className = "" } = $$props;
  let { end = false } = $$props;
  let { right = false } = $$props;
  const popperPlacement = (direction, end2) => {
    let prefix = direction;
    if (direction === "up")
      prefix = "top";
    else if (direction === "down")
      prefix = "bottom";
    let suffix = end2 ? "end" : "start";
    return `${prefix}-${suffix}`;
  };
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.end === void 0 && $$bindings.end && end !== void 0)
    $$bindings.end(end);
  if ($$props.right === void 0 && $$bindings.right && right !== void 0)
    $$bindings.right(right);
  ({
    modifiers: [
      { name: "flip" },
      {
        name: "offset",
        options: { offset: [0, 2] }
      }
    ],
    placement: popperPlacement($context.direction, end || right)
  });
  classes = classnames(className, "dropdown-menu", {
    "dropdown-menu-end": end || right,
    show: $context.isOpen
  });
  $$unsubscribe_context();
  return `<div${spread(
    [
      escape_object($$restProps),
      { class: escape_attribute_value(classes) },
      {
        "data-bs-popper": escape_attribute_value($context.inNavbar ? "static" : void 0)
      }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const DropdownToggle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classes;
  let btnClasses;
  let $$restProps = compute_rest_props($$props, [
    "class",
    "ariaLabel",
    "active",
    "block",
    "caret",
    "color",
    "disabled",
    "inner",
    "nav",
    "outline",
    "size",
    "split",
    "tag"
  ]);
  let $context, $$unsubscribe_context;
  const context = getContext("dropdownContext");
  $$unsubscribe_context = subscribe(context, (value) => $context = value);
  let { class: className = "" } = $$props;
  let { ariaLabel = "Toggle Dropdown" } = $$props;
  let { active = false } = $$props;
  let { block = false } = $$props;
  let { caret = false } = $$props;
  let { color = "secondary" } = $$props;
  let { disabled = false } = $$props;
  let { inner = void 0 } = $$props;
  let { nav = false } = $$props;
  let { outline = false } = $$props;
  let { size = "" } = $$props;
  let { split = false } = $$props;
  let { tag = null } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
    $$bindings.ariaLabel(ariaLabel);
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  if ($$props.block === void 0 && $$bindings.block && block !== void 0)
    $$bindings.block(block);
  if ($$props.caret === void 0 && $$bindings.caret && caret !== void 0)
    $$bindings.caret(caret);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.inner === void 0 && $$bindings.inner && inner !== void 0)
    $$bindings.inner(inner);
  if ($$props.nav === void 0 && $$bindings.nav && nav !== void 0)
    $$bindings.nav(nav);
  if ($$props.outline === void 0 && $$bindings.outline && outline !== void 0)
    $$bindings.outline(outline);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.split === void 0 && $$bindings.split && split !== void 0)
    $$bindings.split(split);
  if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0)
    $$bindings.tag(tag);
  classes = classnames(className, {
    "dropdown-toggle": caret || split,
    "dropdown-toggle-split": split,
    "nav-link": nav
  });
  btnClasses = classnames(classes, "btn", `btn${outline ? "-outline" : ""}-${color}`, size ? `btn-${size}` : false, block ? "d-block w-100" : false, { active });
  $$unsubscribe_context();
  return `${nav ? `<a${spread(
    [
      escape_object($$restProps),
      { href: "#nav" },
      {
        "aria-expanded": escape_attribute_value($context.isOpen)
      },
      { class: escape_attribute_value(classes) }
    ],
    {}
  )}${add_attribute("this", inner, 0)}>${slots.default ? slots.default({}) : `
      <span class="visually-hidden">${escape(ariaLabel)}</span>
    `}</a>` : `${tag === "div" ? `
  <div${spread(
    [
      escape_object($$restProps),
      {
        "aria-expanded": escape_attribute_value($context.isOpen)
      },
      { class: escape_attribute_value(classes) }
    ],
    {}
  )}${add_attribute("this", inner, 0)}>${slots.default ? slots.default({}) : `
      <span class="visually-hidden">${escape(ariaLabel)}</span>
    `}</div>` : `${tag === "span" ? `
  <span${spread(
    [
      escape_object($$restProps),
      {
        "aria-expanded": escape_attribute_value($context.isOpen)
      },
      { class: escape_attribute_value(classes) }
    ],
    {}
  )}${add_attribute("this", inner, 0)}>${slots.default ? slots.default({}) : `
      <span class="visually-hidden">${escape(ariaLabel)}</span>
    `}</span>` : `<button${spread(
    [
      escape_object($$restProps),
      { type: "button" },
      {
        "aria-expanded": escape_attribute_value($context.isOpen)
      },
      {
        class: escape_attribute_value(btnClasses)
      }
    ],
    {}
  )}${add_attribute("this", inner, 0)}>${slots.default ? slots.default({}) : `
      <span class="visually-hidden">${escape(ariaLabel)}</span>
    `}</button>`}`}`}`;
});
function getExpandClass(expand) {
  if (expand === false) {
    return false;
  } else if (expand === true || expand === "xs") {
    return "navbar-expand";
  }
  return `navbar-expand-${expand}`;
}
const Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let theme2;
  let classes;
  let $$restProps = compute_rest_props($$props, ["class", "container", "color", "dark", "expand", "fixed", "light", "sticky"]);
  setContext("navbar", { inNavbar: true });
  let { class: className = "" } = $$props;
  let { container = "fluid" } = $$props;
  let { color = "" } = $$props;
  let { dark = false } = $$props;
  let { expand = "" } = $$props;
  let { fixed = "" } = $$props;
  let { light = false } = $$props;
  let { sticky = "" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.container === void 0 && $$bindings.container && container !== void 0)
    $$bindings.container(container);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.dark === void 0 && $$bindings.dark && dark !== void 0)
    $$bindings.dark(dark);
  if ($$props.expand === void 0 && $$bindings.expand && expand !== void 0)
    $$bindings.expand(expand);
  if ($$props.fixed === void 0 && $$bindings.fixed && fixed !== void 0)
    $$bindings.fixed(fixed);
  if ($$props.light === void 0 && $$bindings.light && light !== void 0)
    $$bindings.light(light);
  if ($$props.sticky === void 0 && $$bindings.sticky && sticky !== void 0)
    $$bindings.sticky(sticky);
  theme2 = dark ? "dark" : light ? "light" : void 0;
  classes = classnames(className, "navbar", getExpandClass(expand), {
    [`bg-${color}`]: color,
    [`fixed-${fixed}`]: fixed,
    [`sticky-${sticky}`]: sticky
  });
  return `<nav${spread(
    [
      escape_object($$restProps),
      { class: escape_attribute_value(classes) },
      {
        "data-bs-theme": escape_attribute_value(theme2)
      }
    ],
    {}
  )}>${container ? `${validate_component(Container, "Container").$$render($$result, { fluid: container === "fluid" }, {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}` : `${slots.default ? slots.default({}) : ``}`}</nav>`;
});
const NavbarBrand = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classes;
  let $$restProps = compute_rest_props($$props, ["class", "href"]);
  let { class: className = "" } = $$props;
  let { href = "/" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  classes = classnames(className, "navbar-brand");
  return `<a${spread(
    [
      escape_object($$restProps),
      { class: escape_attribute_value(classes) },
      { href: escape_attribute_value(href) }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</a>`;
});
const Styles = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { icons = true } = $$props;
  let { theme: theme2 = void 0 } = $$props;
  if ($$props.icons === void 0 && $$bindings.icons && icons !== void 0)
    $$bindings.icons(icons);
  if ($$props.theme === void 0 && $$bindings.theme && theme2 !== void 0)
    $$bindings.theme(theme2);
  {
    if (typeof document !== "undefined" && theme2 !== void 0) {
      if (theme2 === "auto" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.setAttribute("data-bs-theme", "dark");
      } else {
        document.documentElement.setAttribute("data-bs-theme", theme2);
      }
    }
  }
  return `${$$result.head += `<!-- HEAD_svelte-xjd33q_START --><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">${icons ? `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">` : ``}<!-- HEAD_svelte-xjd33q_END -->`, ""}`;
});
const ThemeSwitcher = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let currentOption;
  let $theme, $$unsubscribe_theme;
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  let options = [
    {
      theme: "auto",
      displayName: "Auto",
      icon: "circle-half"
    },
    {
      theme: "light",
      displayName: "Light",
      icon: "sun-fill"
    },
    {
      theme: "dark",
      displayName: "Dark",
      icon: "moon-fill"
    }
  ];
  currentOption = options.find((option) => option.theme === $theme) || options[0];
  $$unsubscribe_theme();
  return `${validate_component(ButtonDropdown, "ButtonDropdown").$$render($$result, { class: "text-primary" }, {}, {
    default: () => {
      return `${validate_component(DropdownToggle, "DropdownToggle").$$render(
        $$result,
        {
          caret: true,
          color: currentOption.theme != "auto" ? currentOption.theme : "dark"
        },
        {},
        {
          default: () => {
            return `${escape(currentOption.displayName)}
		${validate_component(Icon, "Icon").$$render($$result, { name: currentOption.icon }, {}, {})}`;
          }
        }
      )}
	${validate_component(DropdownMenu, "DropdownMenu").$$render($$result, {}, {}, {
        default: () => {
          return `${each(options, (option) => {
            return `${validate_component(DropdownItem, "DropdownItem").$$render(
              $$result,
              {
                class: option == currentOption ? "active" : ""
              },
              {},
              {
                default: () => {
                  return `${escape(option.displayName)}
				${validate_component(Icon, "Icon").$$render($$result, { name: option.icon }, {}, {})}
			`;
                }
              }
            )}`;
          })}`;
        }
      })}`;
    }
  })}`;
});
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: "p.svelte-1l9z2xc{font-size:23px;font-weight:bold;cursor:pointer;margin:0 0 0 30px;padding:0}.left-group.svelte-1l9z2xc{display:flex;align-items:center}.vl.svelte-1l9z2xc{border-left:1px solid;height:30px;margin-left:20px}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_allDaysOfWeek;
  let $$unsubscribe_allHoursOfDay;
  let $$unsubscribe_allSubjects;
  let $$unsubscribe_allClassrooms;
  let $$unsubscribe_allProfessors;
  let $theme, $$unsubscribe_theme;
  $$unsubscribe_allDaysOfWeek = subscribe(allDaysOfWeek, (value) => value);
  $$unsubscribe_allHoursOfDay = subscribe(allHoursOfDay, (value) => value);
  $$unsubscribe_allSubjects = subscribe(allSubjects, (value) => value);
  $$unsubscribe_allClassrooms = subscribe(allClassrooms, (value) => value);
  $$unsubscribe_allProfessors = subscribe(allProfessors, (value) => value);
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  $$result.css.add(css);
  $$unsubscribe_allDaysOfWeek();
  $$unsubscribe_allHoursOfDay();
  $$unsubscribe_allSubjects();
  $$unsubscribe_allClassrooms();
  $$unsubscribe_allProfessors();
  $$unsubscribe_theme();
  return `${validate_component(Styles, "Styles").$$render($$result, { theme: $theme }, {}, {})}

${validate_component(Navbar, "Navbar").$$render($$result, { expand: "md" }, {}, {
    default: () => {
      return `<div class="left-group svelte-1l9z2xc">
		

		<p id="title" class="zoom-hover svelte-1l9z2xc">SCHOOL TIMETABLE
		</p>
		<div class="vl svelte-1l9z2xc"></div>
		<div class="zoom-hover">${validate_component(NavbarBrand, "NavbarBrand").$$render(
        $$result,
        {
          style: "margin-left: 20px;",
          href: "/data-input-form"
        },
        {},
        {
          default: () => {
            return `Input Form
			`;
          }
        }
      )}</div></div>

	${validate_component(ThemeSwitcher, "ThemeSwitcher").$$render($$result, {}, {}, {})}`;
    }
  })}
${validate_component(Container, "Container").$$render(
    $$result,
    {
      xxl: true,
      class: "bg-body rounded shadow mt-2"
    },
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
export {
  Layout as default
};
