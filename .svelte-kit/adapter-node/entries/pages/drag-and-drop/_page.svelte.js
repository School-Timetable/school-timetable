import { c as create_ssr_component, s as setContext, f as add_attribute, a as compute_rest_props, b as spread, e as escape_object, v as validate_component, d as escape_attribute_value, j as each, l as createEventDispatcher, p as add_styles, q as merge_ssr_styles, i as escape } from "../../../chunks/index2.js";
import { c as classnames, e as allClassrooms, d as allSubjects, f as allProfessors } from "../../../chunks/Offcanvas.svelte_svelte_type_style_lang.js";
class Unavailable {
  id = "unavailable";
  static static_id = "unavailable";
}
const daysPerWeek = 6;
const hoursPerDay = 8;
const Colgroup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  setContext("colgroup", true);
  return `<colgroup>${slots.default ? slots.default({}) : ``}</colgroup>`;
});
const ResponsiveContainer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let responsiveClassName;
  let { class: className = "" } = $$props;
  let { responsive = false } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.responsive === void 0 && $$bindings.responsive && responsive !== void 0)
    $$bindings.responsive(responsive);
  responsiveClassName = classnames(className, {
    "table-responsive": responsive === true,
    [`table-responsive-${responsive}`]: typeof responsive === "string"
  });
  return `${responsive ? `<div${add_attribute("class", responsiveClassName, 0)}>${slots.default ? slots.default({}) : ``}</div>` : `${slots.default ? slots.default({}) : ``}`}`;
});
const TableFooter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  setContext("footer", true);
  return `<tfoot${spread([escape_object($$restProps)], {})}><tr>${slots.default ? slots.default({}) : ``}</tr></tfoot>`;
});
const TableHeader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  setContext("header", true);
  return `<thead${spread([escape_object($$restProps)], {})}><tr>${slots.default ? slots.default({}) : ``}</tr></thead>`;
});
const Table = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classes;
  let $$restProps = compute_rest_props($$props, ["class", "size", "bordered", "borderless", "striped", "hover", "responsive", "rows"]);
  let { class: className = "" } = $$props;
  let { size = "" } = $$props;
  let { bordered = false } = $$props;
  let { borderless = false } = $$props;
  let { striped = false } = $$props;
  let { hover = false } = $$props;
  let { responsive = false } = $$props;
  let { rows = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.bordered === void 0 && $$bindings.bordered && bordered !== void 0)
    $$bindings.bordered(bordered);
  if ($$props.borderless === void 0 && $$bindings.borderless && borderless !== void 0)
    $$bindings.borderless(borderless);
  if ($$props.striped === void 0 && $$bindings.striped && striped !== void 0)
    $$bindings.striped(striped);
  if ($$props.hover === void 0 && $$bindings.hover && hover !== void 0)
    $$bindings.hover(hover);
  if ($$props.responsive === void 0 && $$bindings.responsive && responsive !== void 0)
    $$bindings.responsive(responsive);
  if ($$props.rows === void 0 && $$bindings.rows && rows !== void 0)
    $$bindings.rows(rows);
  classes = classnames(className, "table", size ? "table-" + size : false, bordered ? "table-bordered" : false, borderless ? "table-borderless" : false, striped ? "table-striped" : false, hover ? "table-hover" : false);
  return `${validate_component(ResponsiveContainer, "ResponsiveContainer").$$render($$result, { responsive }, {}, {
    default: () => {
      return `<table${spread([escape_object($$restProps), { class: escape_attribute_value(classes) }], {})}>${rows ? `${validate_component(Colgroup, "Colgroup").$$render($$result, {}, {}, {
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`;
        }
      })}
      ${validate_component(TableHeader, "TableHeader").$$render($$result, {}, {}, {
        default: () => {
          return `${slots.default ? slots.default({ row }) : ``}`;
        }
      })}
      <tbody>${each(rows, (row2) => {
        return `<tr>${slots.default ? slots.default({ row: row2 }) : ``}
          </tr>`;
      })}</tbody>
      ${validate_component(TableFooter, "TableFooter").$$render($$result, {}, {}, {
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`;
        }
      })}` : `${slots.default ? slots.default({}) : ``}`}</table>`;
    }
  })}`;
});
const hour_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".highlight.svelte-184l6dg{background-color:gainsboro}.hour.svelte-184l6dg{border:transparent;min-width:50px;min-height:50px}.disabled.svelte-184l6dg{background-color:rgb(178, 177, 177) !important}.hourItem.svelte-184l6dg{background-color:rgb(239, 107, 107);position:absolute;top:0px;left:0px;width:100%;height:100%;opacity:0.8}",
  map: null
};
const Hour = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { id } = $$props;
  let { draggable = true } = $$props;
  let { droppable = true } = $$props;
  let { subject } = $$props;
  let { color = "transparent" } = $$props;
  let { isProfessorView = false } = $$props;
  let { unavailable = false } = $$props;
  function set_cell_content(subject2) {
    if (!subject2) {
      return void 0;
    }
    if (isProfessorView)
      return `${subject2.schoolClass} - ${subject2.abbreviation}`;
    else
      return `${subject2.professor.name} ${subject2.professor.surname} - ${subject2.abbreviation}`;
  }
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.draggable === void 0 && $$bindings.draggable && draggable !== void 0)
    $$bindings.draggable(draggable);
  if ($$props.droppable === void 0 && $$bindings.droppable && droppable !== void 0)
    $$bindings.droppable(droppable);
  if ($$props.subject === void 0 && $$bindings.subject && subject !== void 0)
    $$bindings.subject(subject);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.isProfessorView === void 0 && $$bindings.isProfessorView && isProfessorView !== void 0)
    $$bindings.isProfessorView(isProfessorView);
  if ($$props.unavailable === void 0 && $$bindings.unavailable && unavailable !== void 0)
    $$bindings.unavailable(unavailable);
  $$result.css.add(css$1);
  return `
<div class="container container-fluid btn text-wrap align-middle hour svelte-184l6dg" style="position: relative;">${!(subject instanceof Unavailable) ? `<section class="${[
    "hourItem svelte-184l6dg",
    " " + (!draggable ? "disabled" : "")
  ].join(" ").trim()}"${add_styles(merge_ssr_styles("user-select: none;", { "background-color": color }))}${add_attribute("id", id, 0)}${add_attribute("draggable", subject != null && draggable, 0)}>${escape(set_cell_content(subject) || "")}</section>` : ``}
    ${subject instanceof Unavailable || unavailable ? `
        <section class="hourItem svelte-184l6dg">Unavailable</section>` : ``}
</div>`;
});
const timetable_svelte_svelte_type_style_lang = "";
const css = {
  code: "td.svelte-4dej2c,tr.svelte-4dej2c,th.svelte-4dej2c{border:1px solid #e3e0e0;text-align:center}",
  map: null
};
const Timetable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { weekNames = ["MON", "TUE", "WED", "THU", "FRI", "SAT"] } = $$props;
  let { grid } = $$props;
  let { sidebar } = $$props;
  let { professorView } = $$props;
  let { selectedItem } = $$props;
  let unavailableTimeable = null;
  const availableColors = [
    "#fa968e",
    // red
    "#79c9f7",
    // blue
    "#88f28d",
    // green
    "#f0ce78",
    // yellow
    "#f2a477",
    // orange
    "#c57ff0"
  ];
  let { subjectColors = /* @__PURE__ */ new Map() } = $$props;
  const onSidebarChange = () => {
    let index = 0;
    subjectColors.clear();
    sidebar.forEach((subject) => subjectColors.set(subject.id, availableColors[index++ % availableColors.length]));
  };
  function getSubjectColor(item) {
    if (item == null || item instanceof Unavailable)
      return "transparent";
    return subjectColors.get(item.id);
  }
  function getRemainingHours(subject) {
    return subject.hoursPerWeek.value - grid.getCountOf(subject);
  }
  if ($$props.weekNames === void 0 && $$bindings.weekNames && weekNames !== void 0)
    $$bindings.weekNames(weekNames);
  if ($$props.grid === void 0 && $$bindings.grid && grid !== void 0)
    $$bindings.grid(grid);
  if ($$props.sidebar === void 0 && $$bindings.sidebar && sidebar !== void 0)
    $$bindings.sidebar(sidebar);
  if ($$props.professorView === void 0 && $$bindings.professorView && professorView !== void 0)
    $$bindings.professorView(professorView);
  if ($$props.selectedItem === void 0 && $$bindings.selectedItem && selectedItem !== void 0)
    $$bindings.selectedItem(selectedItem);
  if ($$props.subjectColors === void 0 && $$bindings.subjectColors && subjectColors !== void 0)
    $$bindings.subjectColors(subjectColors);
  $$result.css.add(css);
  sidebar && onSidebarChange();
  return `<head><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"></head>
            

<div class="container-fluid"><div class="row ">
        
        <div class="overflow-auto vh-100 row col-2"><ul class="list-group">${each(sidebar, (item, itemIndex) => {
    return `<li class="list-group-item d-flex justify-content-between align-items-center"><div class="w-75">${validate_component(Hour, "Hour").$$render(
      $$result,
      {
        isProfessorView: professorView,
        color: getSubjectColor(item),
        droppable: false,
        draggable: getRemainingHours(item) > 0,
        id: "prova",
        subject: item
      },
      {},
      {}
    )}</div>
                        <span class="badge bg-primary rounded-pill">${escape(getRemainingHours(item))}</span>
                    </li>`;
  })}</ul></div>
        
        
        <div class="col-10">${validate_component(Table, "Table").$$render($$result, {}, {}, {
    default: () => {
      return `
                <thead><tr class="svelte-4dej2c">${each({ length: daysPerWeek }, (_, dayIndex) => {
        return `<th class="col-2 svelte-4dej2c">${escape(weekNames[dayIndex])}</th>`;
      })}</tr></thead>
                
                
                ${each({ length: hoursPerDay }, (_, hourIndex) => {
        return `<tr class="svelte-4dej2c">${each({ length: daysPerWeek }, (_2, dayIndex) => {
          return `<td class="svelte-4dej2c">${validate_component(Hour, "Hour").$$render(
            $$result,
            {
              unavailable: unavailableTimeable !== null,
              isProfessorView: professorView,
              color: getSubjectColor(grid.getSubjectOn(dayIndex, hourIndex)),
              id: `${hourIndex},${dayIndex}`,
              subject: grid.values[dayIndex][hourIndex]
            },
            {},
            {}
          )}
                            </td>`;
        })}
                    </tr>`;
      })}`;
    }
  })}

            
            <div class="d-flex justify-content-center"><button type="button" class="btn btn-primary btn-lg w-100">valida orario</button></div></div></div>
</div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classes = [];
  let professors = [];
  let currentSidebar = [];
  allClassrooms.subscribe((c) => classes = c);
  allSubjects.subscribe((s) => {
  });
  let { professorView = false } = $$props;
  let { selectedItem = null } = $$props;
  let { currentTimeTable = null } = $$props;
  allProfessors.subscribe((profs) => {
    professors = profs;
  });
  if ($$props.professorView === void 0 && $$bindings.professorView && professorView !== void 0)
    $$bindings.professorView(professorView);
  if ($$props.selectedItem === void 0 && $$bindings.selectedItem && selectedItem !== void 0)
    $$bindings.selectedItem(selectedItem);
  if ($$props.currentTimeTable === void 0 && $$bindings.currentTimeTable && currentTimeTable !== void 0)
    $$bindings.currentTimeTable(currentTimeTable);
  return `<div class="m-3">
    <div class="form-check form-switch"><input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" ${professorView ? "checked" : ""}>
        <label class="form-check-label" for="flexSwitchCheckChecked">Professor View</label></div>

    <ul class="nav nav-tabs">${each(professorView ? professors : classes, (item) => {
    return `<li class="nav-item"><a class="${["nav-link", item == selectedItem ? "active" : ""].join(" ").trim()}" href="#">${escape(item.toString())}</a>
            </li>`;
  })}</ul>
    
    ${currentTimeTable && selectedItem ? `${validate_component(Timetable, "Timetable").$$render(
    $$result,
    {
      selectedItem,
      professorView,
      grid: currentTimeTable,
      sidebar: currentSidebar
    },
    {},
    {}
  )}` : ``}</div>`;
});
export {
  Page as default
};
