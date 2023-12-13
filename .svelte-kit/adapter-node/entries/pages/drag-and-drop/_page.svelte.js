import { c as create_ssr_component, s as setContext, f as add_attribute, a as compute_rest_props, b as spread, e as escape_object, v as validate_component, d as escape_attribute_value, j as each, l as createEventDispatcher, p as add_styles, q as merge_ssr_styles, i as escape, h as subscribe } from "../../../chunks/index2.js";
import { S as SchoolClass, P as Professor, c as classnames, I as Icon, b as allHoursOfDay, a as allDaysOfWeek, t as theme, o as Subject, D as DayOfWeek, H as HourOfDay, e as allClassrooms, d as allSubjects, f as allProfessors } from "../../../chunks/Offcanvas.svelte_svelte_type_style_lang.js";
class Unavailable {
  id = "unavailable";
  static static_id = "unavailable";
}
const _classTimetableMap = /* @__PURE__ */ new Map();
const _professorTimetableMap = /* @__PURE__ */ new Map();
let daysPerWeek = 6;
let hoursPerDay = 8;
class TimeTable {
  // first list is day of week, second is time of day
  // null means no subject
  values = [];
  daysPerWeek;
  hoursPerDay;
  subjectsMap = /* @__PURE__ */ new Map();
  constructor(daysPerWeek2, hoursPerDay2) {
    this.daysPerWeek = daysPerWeek2;
    this.hoursPerDay = hoursPerDay2;
    for (let i = 0; i < daysPerWeek2; i++) {
      this.values.push([]);
      for (let j = 0; j < hoursPerDay2; j++) {
        this.values[i].push(null);
      }
    }
  }
  /**
   * Returns the subject that has been assigned in the choosen time slot
   */
  getSubjectOn(dayOfWeek, timeOfDay) {
    if (!this.isValidTimeslot(dayOfWeek, timeOfDay)) {
      throw new Error("Invalid timeslot");
    }
    return this.values[dayOfWeek][timeOfDay];
  }
  setSubjectOn(dayOfWeek, timeOfDay, subject) {
    if (!this.isValidTimeslot(dayOfWeek, timeOfDay)) {
      throw new Error("Invalid timeslot");
    }
    const oldSubject = this.values[dayOfWeek][timeOfDay];
    this.values[dayOfWeek][timeOfDay] = subject;
    this.updateSubjectsMap(dayOfWeek, timeOfDay, subject, oldSubject);
  }
  updateSubjectsMap(dayOfWeek, timeOfDay, subject, oldSubject) {
    if (oldSubject != null) {
      const subjectList = this.subjectsMap.get(oldSubject.id);
      const index = subjectList.findIndex((value) => value.dayOfWeek == dayOfWeek && value.timeOfDay == timeOfDay);
      subjectList.splice(index, 1);
    }
    if (subject != null) {
      if (!this.subjectsMap.has(subject.id)) {
        this.subjectsMap.set(subject.id, []);
      }
      const subjectTimeslotList = this.subjectsMap.get(subject.id);
      subjectTimeslotList.push({ dayOfWeek, timeOfDay });
      this.sortTimeSlots(subjectTimeslotList);
    }
  }
  computeSubjectMap() {
    return this.subjectsMap;
  }
  sortTimeSlots(timeslots) {
    timeslots.sort((a, b) => {
      if (a.dayOfWeek != b.dayOfWeek) {
        return a.dayOfWeek - b.dayOfWeek;
      } else {
        return a.timeOfDay - b.timeOfDay;
      }
    });
  }
  /**
   * @returns true if and only if the timeslot is not marked as unavailable
   */
  isAvailableOn(dayOfWeek, timeOfDay) {
    const className = this.getSubjectOn(dayOfWeek, timeOfDay)?.constructor.name ?? "";
    return className != Unavailable.name;
  }
  /**
   * @returns true if and only if the timeslot is marked as unavailable
   */
  isUnavailableOn(dayOfWeek, timeOfDay) {
    return !this.isAvailableOn(dayOfWeek, timeOfDay);
  }
  /**
   * @returns true if and only if the timeslot is assigned to a subject (not null and not unavailable)
   */
  isAssignedOn(dayOfWeek, timeOfDay) {
    const sub = this.getSubjectOn(dayOfWeek, timeOfDay);
    return sub != null && sub.constructor.name !== Unavailable.name;
  }
  /**
   * ensures that a subject can be assigned the timeslot
   * @returns true if the timeslot is not assigned to any subject
   */
  isUnassignedOn(dayOfWeek, timeOfDay) {
    return this.getSubjectOn(dayOfWeek, timeOfDay) == null;
  }
  isValidTimeslot(dayOfWeek, timeOfDay) {
    return 0 <= dayOfWeek && dayOfWeek < this.daysPerWeek && 0 <= timeOfDay && timeOfDay < this.hoursPerDay && Number.isInteger(dayOfWeek) && Number.isInteger(timeOfDay);
  }
  clear() {
    for (let i = 0; i < this.daysPerWeek; i++) {
      for (let j = 0; j < this.hoursPerDay; j++) {
        this.values[i][j] = null;
      }
    }
    this.subjectsMap.clear();
  }
  removeAllOf(subject) {
    const subjectList = this.subjectsMap.get(subject.id);
    if (subjectList == null) {
      return;
    }
    for (const { dayOfWeek, timeOfDay } of subjectList) {
      this.values[dayOfWeek][timeOfDay] = null;
    }
    this.subjectsMap.delete(subject.id);
  }
  getTimeSlotsOf(subject) {
    return this.subjectsMap.get(subject.id) ?? [];
  }
  getCountOf(subject) {
    return this.getTimeSlotsOf(subject).length;
  }
  getUnavailableTimeslots() {
    return this.getTimeSlotsOf(new Unavailable());
  }
  getUnassignedTimeslots() {
    const unassigned = [];
    for (let i = 0; i < this.daysPerWeek; i++) {
      for (let j = 0; j < this.hoursPerDay; j++) {
        if (this.isUnassignedOn(i, j)) {
          unassigned.push({ dayOfWeek: i, timeOfDay: j });
        }
      }
    }
    return unassigned;
  }
  // add_row(): void{
  //     const new_row:(Subject | Unavailable | null) [] = [];
  //     for(let i = 0; i < this.values[0].length; i++){
  //         new_row.push(null);
  //     }
  //     this.values.push(new_row);
  //     //this.hoursPerDay = this.hoursPerDay + 1;
  // }
  // add_column(): void {
  //     // for each row append a new null value
  //     for(let row_id = 0; row_id < this.hoursPerDay; row_id++){
  //         this.values[row_id].push(null);
  //     }
  //     //this.daysPerWeek = this.daysPerWeek + 1;
  // }
}
function getClassTimetableOf(schoolClass) {
  const classID = schoolClass.id;
  if (!_classTimetableMap.has(classID)) {
    _classTimetableMap.set(classID, new TimeTable(daysPerWeek, hoursPerDay));
  }
  return _classTimetableMap.get(classID);
}
function getProfessorTimetableOf(professor) {
  const professorID = professor.id;
  if (!_professorTimetableMap.has(professorID)) {
    _professorTimetableMap.set(professorID, new TimeTable(daysPerWeek, hoursPerDay));
  }
  return _professorTimetableMap.get(professorID);
}
function getTimetableOf(entity) {
  if (entity instanceof SchoolClass) {
    return getClassTimetableOf(entity);
  } else if (entity instanceof Professor) {
    return getProfessorTimetableOf(entity);
  } else {
    throw new Error("entity is not a SchoolClass or a Professor");
  }
}
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
const css$2 = {
  code: ".highlight.svelte-xnyhct{background-color:gainsboro}.hour.svelte-xnyhct{border:transparent;min-width:120px;height:60px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.disabled.svelte-xnyhct{background-color:rgb(178, 177, 177) !important}.hourItem.svelte-xnyhct{width:100%;height:100%}",
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
  $$result.css.add(css$2);
  return `
<div class="text-wrap align-middle hour text-center svelte-xnyhct">${subject instanceof Unavailable || unavailable ? `
         ${validate_component(Icon, "Icon").$$render($$result, { style: "font-size: 30px;", name: "x" }, {}, {})}` : `<section class="${[
    "btn hourItem svelte-xnyhct",
    " " + (!draggable ? "disabled" : "")
  ].join(" ").trim()}"${add_styles(merge_ssr_styles("user-select: none;", { "background-color": color }))}${add_attribute("draggable", subject != null && draggable, 0)}${add_attribute("id", id, 0)}>${escape(set_cell_content(subject) || "")}</section>`}
</div>`;
});
const WeakConstrainsWidget_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "th.svelte-1w9ejsp,td.svelte-1w9ejsp{text-align:left;padding:8px}.label.svelte-1w9ejsp{width:100%;text-align:center}.selected_label.svelte-1w9ejsp{width:100%;text-align:center;background-color:#2980b9}.container.svelte-1w9ejsp{display:flex}",
  map: null
};
const WeakConstrainsWidget = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const weak_constrains = {
    1: "Weak_1Weak_1Weak_1Weak_1Weak_1",
    2: "Weak_2",
    3: "Weak_3",
    4: "Weak_4",
    5: "Weak_5"
  };
  let { selected_weak = 1 } = $$props;
  function select_weak(key) {
    selected_weak = key;
  }
  function swap_up() {
    const upper_label = weak_constrains[selected_weak - 1];
    weak_constrains[selected_weak - 1] = weak_constrains[selected_weak];
    weak_constrains[selected_weak] = upper_label;
  }
  function swap_down() {
    const bottom_label = weak_constrains[selected_weak + 1];
    weak_constrains[selected_weak + 1] = weak_constrains[selected_weak];
    weak_constrains[selected_weak] = bottom_label;
  }
  function bring_weak_up() {
    if (selected_weak - 1 > 0) {
      swap_up();
      select_weak(selected_weak - 1);
    }
  }
  function bring_weak_down() {
    if (selected_weak + 1 <= Object.keys(weak_constrains).length) {
      swap_down();
      select_weak(selected_weak + 1);
    }
  }
  if ($$props.weak_constrains === void 0 && $$bindings.weak_constrains && weak_constrains !== void 0)
    $$bindings.weak_constrains(weak_constrains);
  if ($$props.selected_weak === void 0 && $$bindings.selected_weak && selected_weak !== void 0)
    $$bindings.selected_weak(selected_weak);
  if ($$props.swap_up === void 0 && $$bindings.swap_up && swap_up !== void 0)
    $$bindings.swap_up(swap_up);
  if ($$props.swap_down === void 0 && $$bindings.swap_down && swap_down !== void 0)
    $$bindings.swap_down(swap_down);
  if ($$props.bring_weak_up === void 0 && $$bindings.bring_weak_up && bring_weak_up !== void 0)
    $$bindings.bring_weak_up(bring_weak_up);
  if ($$props.bring_weak_down === void 0 && $$bindings.bring_weak_down && bring_weak_down !== void 0)
    $$bindings.bring_weak_down(bring_weak_down);
  $$result.css.add(css$1);
  return `${validate_component(Table, "Table").$$render($$result, { style: "margin: 0 0 300px -20px" }, {}, {
    default: () => {
      return `<thead><div class="container svelte-1w9ejsp"><tr><th class="svelte-1w9ejsp"><button class="btn btn-primary"><i class="bi bi-arrow-up"></i></button></th></tr>
            <tr><th class="svelte-1w9ejsp"><button class="btn btn-primary"><i class="bi bi-arrow-down"></i></button></th></tr></div></thead>
    <div><tbody>
        ${each(Object.entries(weak_constrains), ([key, value]) => {
        return `${parseInt(key) === selected_weak ? `<tr class="selected_label svelte-1w9ejsp"><div style="overflow: scroll;max-width: 200px;margin: 0;padding: 0;"><td style="margin: 0; padding: 0;" class="svelte-1w9ejsp"><button class="btn" id="${"label_" + escape(key, true)}">Level ${escape(key)} : ${escape(value)}</button>
                        </td></div>
                </tr>` : `<tr class="label svelte-1w9ejsp"><div style="overflow: scroll;max-width: 200px;margin: 0;padding: 0;"><td style="margin: 0; padding: 0;" class="svelte-1w9ejsp"><button class="btn" id="${"label_" + escape(key, true)}">Level ${escape(key)} : ${escape(value)}</button>
                        </td></div>
                </tr>`}`;
      })}</tbody></div>`;
    }
  })}`;
});
const lightThemeColors = [
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
  // purple
];
const darkThemeColors = [
  "#540d10",
  // red
  "#2a6587",
  // blue
  "#2e6e31",
  // green
  "#a17b1d",
  // yellow
  "#8f461d",
  // orange
  "#451c5e"
  // purple
];
const Grid_svelte_svelte_type_style_lang = "";
const css = {
  code: "td.svelte-1dzj1ao,tr.svelte-1dzj1ao,th.svelte-1dzj1ao{border:1px solid #e3e0e0;text-align:center}.input_text.svelte-1dzj1ao{border:none;width:100%;text-align:center;min-width:70px}",
  map: null
};
const Grid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $allHoursOfDay, $$unsubscribe_allHoursOfDay;
  let $allDaysOfWeek, $$unsubscribe_allDaysOfWeek;
  $$unsubscribe_allHoursOfDay = subscribe(allHoursOfDay, (value) => $allHoursOfDay = value);
  $$unsubscribe_allDaysOfWeek = subscribe(allDaysOfWeek, (value) => $allDaysOfWeek = value);
  let { timeTable } = $$props;
  let { professorView } = $$props;
  let { selectedItem } = $$props;
  let { subjectColors = /* @__PURE__ */ new Map() } = $$props;
  let { callback } = $$props;
  let unavailableTimeTable = null;
  timeTable.hoursPerDay;
  timeTable.daysPerWeek;
  theme.subscribe((value) => {
    timeTable = timeTable;
  });
  function onSubjectDrag(subject) {
    if (!(subject instanceof Subject))
      return;
    unavailableTimeTable = getTimetableOf(professorView ? subject.schoolClass : subject.professor);
    console.log("POG", unavailableTimeTable.values);
  }
  function onSubjectDragEnd() {
    unavailableTimeTable = null;
    console.log("UNPOG");
  }
  function getSubjectColor(item) {
    if (item == null || item instanceof Unavailable)
      return "transparent";
    return subjectColors.get(item.id);
  }
  function assignDefaultDay(index) {
    let defaultValue = "day " + (index + 1);
    allDaysOfWeek.update((array) => {
      array[index] = DayOfWeek.of(index, defaultValue);
      return array;
    });
    return defaultValue;
  }
  function assignDefaultHour(index) {
    let defaultValue = "hour " + (index + 1);
    allHoursOfDay.update((array) => {
      array[index] = HourOfDay.of(index, defaultValue);
      return array;
    });
    return defaultValue;
  }
  if ($$props.timeTable === void 0 && $$bindings.timeTable && timeTable !== void 0)
    $$bindings.timeTable(timeTable);
  if ($$props.professorView === void 0 && $$bindings.professorView && professorView !== void 0)
    $$bindings.professorView(professorView);
  if ($$props.selectedItem === void 0 && $$bindings.selectedItem && selectedItem !== void 0)
    $$bindings.selectedItem(selectedItem);
  if ($$props.subjectColors === void 0 && $$bindings.subjectColors && subjectColors !== void 0)
    $$bindings.subjectColors(subjectColors);
  if ($$props.callback === void 0 && $$bindings.callback && callback !== void 0)
    $$bindings.callback(callback);
  if ($$props.onSubjectDrag === void 0 && $$bindings.onSubjectDrag && onSubjectDrag !== void 0)
    $$bindings.onSubjectDrag(onSubjectDrag);
  if ($$props.onSubjectDragEnd === void 0 && $$bindings.onSubjectDragEnd && onSubjectDragEnd !== void 0)
    $$bindings.onSubjectDragEnd(onSubjectDragEnd);
  $$result.css.add(css);
  $$unsubscribe_allHoursOfDay();
  $$unsubscribe_allDaysOfWeek();
  return `<div class="w-100" style="overflow: auto"><table><thead><tr class="svelte-1dzj1ao"><th class="col-2 svelte-1dzj1ao"></th>
                
                ${each({ length: timeTable.daysPerWeek }, (_, dayIndex) => {
    return `<th class="col-2 svelte-1dzj1ao">
                        <input id="${"day_label_" + escape(dayIndex, true)}" type="text" class="input_text svelte-1dzj1ao"${add_attribute(
      "value",
      $allDaysOfWeek[dayIndex] ? $allDaysOfWeek[dayIndex].label : assignDefaultDay(dayIndex),
      0
    )}> 
                    </th>`;
  })}
                </tr></thead>
    
    
    ${each({ length: timeTable.hoursPerDay }, (_, hourIndex) => {
    return `<tr class="svelte-1dzj1ao"><input style="min-width: 70px;" id="${"hour_label_" + escape(hourIndex, true)}" type="text" class="input_text svelte-1dzj1ao"${add_attribute(
      "value",
      $allHoursOfDay[hourIndex] ? $allHoursOfDay[hourIndex].label : assignDefaultHour(hourIndex),
      0
    )}>
            ${each({ length: timeTable.daysPerWeek }, (_2, dayIndex) => {
      return `<td class="svelte-1dzj1ao">${validate_component(Hour, "Hour").$$render(
        $$result,
        {
          unavailable: unavailableTimeTable !== null && unavailableTimeTable.values[dayIndex][hourIndex] instanceof Unavailable,
          isProfessorView: professorView,
          color: getSubjectColor(timeTable.getSubjectOn(dayIndex, hourIndex)),
          id: `${hourIndex},${dayIndex}`,
          subject: timeTable.values[dayIndex][hourIndex]
        },
        {},
        {}
      )}
                </td>`;
    })}
        </tr>`;
  })}</table>
</div>`;
});
const Timetable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { grid } = $$props;
  let { sidebar } = $$props;
  let { professorView } = $$props;
  let { selectedItem } = $$props;
  let realGrid;
  let currentColors = lightThemeColors;
  let { subjectColors = /* @__PURE__ */ new Map() } = $$props;
  const onSidebarChange = () => {
    let index = 0;
    subjectColors.clear();
    sidebar.forEach((subject) => subjectColors.set(subject.id, currentColors[index++ % currentColors.length]));
  };
  theme.subscribe((value) => {
    if (value == "light") {
      currentColors = lightThemeColors;
    } else if (value == "dark") {
      currentColors = darkThemeColors;
    } else {
      currentColors = darkThemeColors;
    }
    let index = 0;
    subjectColors.clear();
    sidebar.forEach((subject) => subjectColors.set(subject.id, currentColors[index++ % currentColors.length]));
    refresh();
  });
  function getSubjectColor(item) {
    if (item == null || item instanceof Unavailable)
      return "transparent";
    return subjectColors.get(item.id);
  }
  function getRemainingHours(subject) {
    return subject.hoursPerWeek.value - grid.getCountOf(subject);
  }
  function refresh() {
    sidebar = sidebar;
  }
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
  if ($$props.refresh === void 0 && $$bindings.refresh && refresh !== void 0)
    $$bindings.refresh(refresh);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    sidebar && onSidebarChange();
    $$rendered = `<head><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"></head>
         

<div class="container-fluid"><div class="d-flex">
        
        <div class="overflow-auto vh-100 row col-2"><ul class="list-group me-1">${each(sidebar, (item, itemIndex) => {
      return `<li class="list-group-item d-flex justify-content-between align-items-center"><div class="w-100">${validate_component(Hour, "Hour").$$render(
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
                        <span class="badge bg-primary rounded-pill ms-2">${escape(item.hoursPerWeek.value - grid.getCountOf(item))}</span>
                    </li>`;
    })}</ul>

            <div style="overflow: scroll;">${validate_component(WeakConstrainsWidget, "WeakConstrainsWidget").$$render($$result, {}, {}, {})}</div></div>
        
        
        <div class="col-10">${validate_component(Grid, "Grid").$$render(
      $$result,
      {
        professorView,
        selectedItem,
        subjectColors,
        callback: refresh,
        timeTable: grid,
        this: realGrid
      },
      {
        timeTable: ($$value) => {
          grid = $$value;
          $$settled = false;
        },
        this: ($$value) => {
          realGrid = $$value;
          $$settled = false;
        }
      },
      {}
    )}
            
            <div class="d-flex justify-content-center my-4"><button type="button" class="btn btn-primary btn-lg w-100">valida orario</button></div></div></div>
</div>`;
  } while (!$$settled);
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classes = [];
  let professors = [];
  let currentSidebar = [];
  let { inputDays = daysPerWeek.toString() } = $$props;
  let { inputHours = hoursPerDay.toString() } = $$props;
  allClassrooms.subscribe((c) => classes = c);
  allSubjects.subscribe((s) => {
  });
  let { professorView = false } = $$props;
  let { selectedItem = null } = $$props;
  let { currentTimeTable = null } = $$props;
  allProfessors.subscribe((profs) => {
    professors = profs;
  });
  if ($$props.inputDays === void 0 && $$bindings.inputDays && inputDays !== void 0)
    $$bindings.inputDays(inputDays);
  if ($$props.inputHours === void 0 && $$bindings.inputHours && inputHours !== void 0)
    $$bindings.inputHours(inputHours);
  if ($$props.professorView === void 0 && $$bindings.professorView && professorView !== void 0)
    $$bindings.professorView(professorView);
  if ($$props.selectedItem === void 0 && $$bindings.selectedItem && selectedItem !== void 0)
    $$bindings.selectedItem(selectedItem);
  if ($$props.currentTimeTable === void 0 && $$bindings.currentTimeTable && currentTimeTable !== void 0)
    $$bindings.currentTimeTable(currentTimeTable);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<input placeholder="days"${add_attribute("value", inputDays, 0)}>
<input placeholder="hours"${add_attribute("value", inputHours, 0)}>
<button class="btn">Update Size</button>
<div class="m-3">
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
        sidebar: currentSidebar,
        grid: currentTimeTable
      },
      {
        grid: ($$value) => {
          currentTimeTable = $$value;
          $$settled = false;
        }
      },
      {}
    )}` : ``}</div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
