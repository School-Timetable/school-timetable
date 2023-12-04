import { z } from "zod";
import { v4 } from "uuid";
import { w as writable } from "./index.js";
import { c as create_ssr_component, a as compute_rest_props, b as spread, e as escape_object, d as escape_attribute_value } from "./index2.js";
const valueSchema$a = z.string().min(2, "The name is too short (min 2 characters)").max(50, "The name is too long (max 50 characters)").regex(/^[a-z]+( [a-z]+)*$/i, "The name is not valid");
const nameSchema$1 = z.object({
  value: valueSchema$a
}).strict();
let Name$1 = class Name {
  static schema = nameSchema$1;
  value;
  get valueUppercase() {
    return this.value.toUpperCase();
  }
  constructor(name) {
    valueSchema$a.parse(name);
    this.value = name;
  }
  toString() {
    return this.value.toUpperCase();
  }
};
const valueSchema$9 = z.string().min(2, "The surname is too short (min 2 characters)").max(50, "The surname is too long (max 50 characters)").regex(/^[a-z]+( [a-z]+)*$/i, "The surname is not valid");
const surnameSchema = z.object({
  value: valueSchema$9
}).strict();
class Surname {
  static schema = surnameSchema;
  value;
  get valueUppercase() {
    return this.value.toUpperCase();
  }
  constructor(surname) {
    valueSchema$9.parse(surname);
    this.value = surname;
  }
  toString() {
    return this.value.toUpperCase();
  }
}
const valueSchema$8 = z.string().min(6, "The cellphone is too short (min 8 characters)").max(15, "The cellphone is too long (max 15 characters)").regex(/^\+?[0-9]+$/, "The cellphone is not valid");
const cellPhoneSchema = z.object({
  value: valueSchema$8
}).strict();
class Cellphone {
  static schema = cellPhoneSchema;
  value;
  constructor(cellphone) {
    valueSchema$8.parse(cellphone);
    this.value = cellphone;
  }
  toString() {
    return this.value.toString();
  }
}
const valueSchema$7 = z.string().min(5, "The mail is too short (min 5 characters)").max(320, "The mail is too long (max 320 characters)").email("The mail is not valid");
const mailSchema = z.object({
  value: valueSchema$7
}).strict();
class Mail {
  static schema = mailSchema;
  value;
  constructor(mail) {
    valueSchema$7.parse(mail);
    this.value = mail;
  }
  toString() {
    return this.value.toString();
  }
}
const professorSchema = z.object({
  _id: z.string(),
  _name: nameSchema$1,
  _surname: surnameSchema,
  _email: mailSchema,
  _cellPhone: cellPhoneSchema
}).strict();
class Professor {
  static schema = professorSchema;
  _id;
  _name;
  _surname;
  _email;
  _cellPhone;
  constructor(id, name, surname, email, cellPhone) {
    if (!id || id === null) {
      id = v4();
    }
    professorSchema.parse({
      _id: id,
      _name: name,
      _surname: surname,
      _email: email,
      _cellPhone: cellPhone
    });
    this._id = id;
    this._name = name;
    this._surname = surname;
    this._email = email;
    this._cellPhone = cellPhone;
  }
  static of(id, name, surname, email, cellPhone) {
    return new Professor(
      id,
      new Name$1(name),
      new Surname(surname),
      new Mail(email),
      new Cellphone(cellPhone)
    );
  }
  static ofCsv(csv) {
    if (csv.substring(0, 2) !== "P:") {
      throw new Error(`${csv} is not a professor string`);
    }
    let match = csv.match(/^P:([^;]+);([^;]+);([^;]+);([^;]+);([^;]+)$/);
    return Professor.of(match[1], match[2], match[3], match[4], match[5]);
  }
  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }
  get surname() {
    return this._surname;
  }
  get email() {
    return this._email;
  }
  get cellPhone() {
    return this._cellPhone;
  }
  set name(name) {
    nameSchema$1.parse(name);
    this._name = name;
  }
  set surname(surname) {
    surnameSchema.parse(surname);
    this._surname = surname;
  }
  set email(email) {
    mailSchema.parse(email);
    this._email = email;
  }
  set cellPhone(cellPhone) {
    cellPhoneSchema.parse(cellPhone);
    this._cellPhone = cellPhone;
  }
  toString() {
    return this._name.toString() + " " + this._surname.toString();
  }
  toFullString() {
    return this._name.toString() + " " + this._surname.toString() + " " + this._email.toString() + " " + this._cellPhone.toString();
  }
  toCsv() {
    return `P:${this._id};${this._name.value};${this._surname.value};${this._email.value};${this._cellPhone.value}`;
  }
}
const valueSchema$6 = z.number().int().min(1, { message: "The year given is too small (min 1)" }).max(5, { message: "The year given is too big (max 5)" });
const yearSchema = z.object({
  value: valueSchema$6
}).strict();
class Year {
  static schema = yearSchema;
  value;
  constructor(value) {
    valueSchema$6.parse(value);
    this.value = value;
  }
  toString() {
    return this.value.toString();
  }
}
const valueSchema$5 = z.string().length(1, { message: "The section must be a single char (A-Z)" }).regex(/[A-Z]/, "The section must contain only uppercase letters (A-Z)");
const sectionSchema = z.object({
  value: valueSchema$5
}).strict();
class Section {
  static schema = sectionSchema;
  value;
  constructor(value) {
    valueSchema$5.parse(value);
    this.value = value;
  }
  toString() {
    return this.value;
  }
}
const valueSchema$4 = z.string().min(3, { message: "The track is too short (min 3 char)" }).max(50, { message: "The track is too long (max 50 char)" }).regex(/^[a-z]+\.?( [a-z]+\.?)*$/i, "The track must contain only letters, an optional whitespace between words and an optional dot per word");
const trackSchema = z.object({
  value: valueSchema$4
}).strict();
class Track {
  static schema = trackSchema;
  value;
  constructor(value) {
    valueSchema$4.parse(value);
    this.value = value;
  }
  toString() {
    return this.value.toUpperCase();
  }
}
const schoolClassSchema = z.object({
  id: z.string(),
  year: yearSchema,
  section: sectionSchema,
  track: trackSchema.optional()
});
class SchoolClass {
  static schema = schoolClassSchema;
  _id;
  _year;
  _section;
  _track;
  constructor(id, year, section) {
    if (!id) {
      id = v4();
    }
    schoolClassSchema.parse({
      id,
      year,
      section
    });
    this._id = id;
    this._year = year;
    this._section = section;
  }
  static of(id, year, section, track) {
    const instance = new SchoolClass(
      id,
      new Year(year),
      new Section(section)
    );
    if (track)
      instance.track = new Track(track);
    return instance;
  }
  static ofCsv(csv) {
    if (csv.substring(0, 2) !== "C:") {
      throw new Error(`${csv} is not a school class string`);
    }
    let match = csv.match(/^C:([^;]+);([^;]+);([^;]+);?([^;]+)?$/);
    return SchoolClass.of(match[1], Number(match[2]), match[3], match[4]);
  }
  get id() {
    return this._id;
  }
  get year() {
    return this._year;
  }
  set year(year) {
    yearSchema.parse(year);
    this._year = year;
  }
  get section() {
    return this._section;
  }
  set section(section) {
    sectionSchema.parse(section);
    this._section = section;
  }
  get track() {
    return this._track;
  }
  set track(track) {
    trackSchema.parse(track);
    this._track = track;
  }
  toString() {
    let res = `${this._year.value}${this._section.value}`;
    if (this._track)
      res += ` ${this._track}`;
    return res;
  }
  toCsv() {
    return `C:${this._id};${this._year};${this._section};${this._track ? this._track.value : ""}`;
  }
  toFullString() {
    return this.toString();
  }
}
const MAX_LENGTH$1 = 60;
const valueSchema$3 = z.string().min(2, "The name is too short (min 2 characters)").max(MAX_LENGTH$1, `The name is too long (max ${MAX_LENGTH$1} characters)`).regex(/^[a-z][\w' ]+[a-z]$/i, "The name contains invalid characters");
const nameSchema = z.object({
  value: valueSchema$3
}).strict();
class Name2 {
  static schema = nameSchema;
  value;
  constructor(value) {
    valueSchema$3.parse(value);
    this.value = value;
  }
  toString() {
    return this.value;
  }
}
const MAX_LENGTH = 5;
const valueSchema$2 = z.string().min(1, "abbreviation must be at least 1 character").max(MAX_LENGTH, `abbreviation must be at most ${MAX_LENGTH} characters`).regex(/^[a-z]+$/i, "abbreviation contains invalid characters");
const abbreviationSchema = z.object({
  value: valueSchema$2
}).strict();
class Abbreviation {
  static schema = abbreviationSchema;
  value;
  constructor(value) {
    valueSchema$2.parse(value);
    this.value = value.toUpperCase();
  }
  toString() {
    return this.value;
  }
}
const valueSchema$1 = z.number().int().gte(1, "weight must be between 1 and 10").lte(10, "weight must be between 1 and 10");
const weightSchema = z.object({
  value: valueSchema$1
}).strict();
class Weight {
  static schema = weightSchema;
  value;
  constructor(value) {
    valueSchema$1.parse(value);
    this.value = value;
  }
  toString() {
    return this.value.toString();
  }
}
const MAX_HOURS_PER_WEEK = 30;
const valueSchema = z.number().int().gte(1, "hours per week must be at least 1").lte(MAX_HOURS_PER_WEEK, `hours per week must be at most ${MAX_HOURS_PER_WEEK}`);
const hoursPerWeekSchema = z.object({
  value: valueSchema
}).strict();
class HoursPerWeek {
  static schema = hoursPerWeekSchema;
  value;
  constructor(value) {
    valueSchema.parse(value);
    this.value = value;
  }
  toString() {
    return this.value.toString();
  }
}
const subjectSchema = z.object({
  _id: z.string(),
  _schoolClass: schoolClassSchema,
  _professor: professorSchema,
  _name: nameSchema,
  _abbreviation: abbreviationSchema,
  _weight: weightSchema,
  _hoursPerWeek: hoursPerWeekSchema
}).strict();
class Subject {
  static schema = subjectSchema;
  _id;
  _schoolClass;
  _professor;
  _name;
  _abbreviation;
  _weight;
  _hoursPerWeek;
  constructor(id, schoolClass, professor, name, abbreviation, weight, hoursPerWeek) {
    if (!id || id === null) {
      id = v4();
    }
    subjectSchema.parse({
      _id: id,
      _schoolClass: schoolClass,
      _professor: professor,
      _name: name,
      _abbreviation: abbreviation,
      _weight: weight,
      _hoursPerWeek: hoursPerWeek
    });
    this._id = id;
    this._schoolClass = schoolClass;
    this._professor = professor;
    this._name = name;
    this._abbreviation = abbreviation;
    this._weight = weight;
    this._hoursPerWeek = hoursPerWeek;
  }
  static of(id, schoolClass, professor, name, abbreviation, weight, hoursPerWeek) {
    return new Subject(
      id,
      schoolClass,
      professor,
      new Name2(name),
      new Abbreviation(abbreviation),
      new Weight(weight),
      new HoursPerWeek(hoursPerWeek)
    );
  }
  static ofCsv(csv, professors, classes) {
    if (csv.substring(0, 2) !== "S:") {
      throw new Error(`${csv} is not a subject string`);
    }
    let match = csv.match(/^S:([a-z0-9\- ]+);([a-z0-9\- ]+);([a-z0-9\- ]+);([^;]+);([^;]+);([^;]+);([^;]+)$/);
    let classId = match[2];
    let profId = match[3];
    let classIdx = classes.findIndex((e) => e.id === classId);
    let profIdx = professors.findIndex((e) => e.id === profId);
    if (classIdx === -1 || profIdx === -1) {
      throw new Error("The class or prof id are not valid");
    }
    return Subject.of(match[1], classes[classIdx], professors[profIdx], match[4], match[5], Number(match[6]), Number(match[7]));
  }
  toCsv() {
    return `S:${this.id};${this.schoolClass.id};${this.professor.id};${this.name};${this.abbreviation};${this.weight};${this.hoursPerWeek}`;
  }
  toFullString() {
    return `${this.schoolClass} ${this.professor} ${this.name} ${this.abbreviation} ${this.weight} ${this.hoursPerWeek}}`;
  }
  get id() {
    return this._id;
  }
  get schoolClass() {
    return this._schoolClass;
  }
  get professor() {
    return this._professor;
  }
  get name() {
    return this._name;
  }
  get abbreviation() {
    return this._abbreviation;
  }
  get weight() {
    return this._weight;
  }
  get hoursPerWeek() {
    return this._hoursPerWeek;
  }
  set schoolClass(value) {
    schoolClassSchema.parse(value);
    this._schoolClass = value;
  }
  set professor(value) {
    professorSchema.parse(value);
    this._professor = value;
  }
  set name(value) {
    nameSchema.parse(value);
    this._name = value;
  }
  set abbreviation(value) {
    abbreviationSchema.parse(value);
    this._abbreviation = value;
  }
  set weight(value) {
    weightSchema.parse(value);
    this._weight = value;
  }
  set hoursPerWeek(value) {
    hoursPerWeekSchema.parse(value);
    this._hoursPerWeek = value;
  }
}
const dayOfWeekSchema = z.object({
  _id: z.number().int("Only integer numbers are allowed for the day of the week").min(0, "The day of week must be at least 0").max(30, "The day of week must be at most 30"),
  _label: z.string().min(1, "The day of week label must be at least 1 character long").max(20, "The day of week label must be at most 20 characters long").regex(/^[a-zA-Z0-9 ]+$/)
});
class DayOfWeek {
  _id;
  _label;
  constructor(id, label) {
    dayOfWeekSchema.parse({
      _id: id,
      _label: label
    });
    this._id = id;
    this._label = label;
  }
  static of(id, label) {
    return new DayOfWeek(id, label);
  }
  static ofCsv(csv) {
    if (csv.substring(0, 2) !== "D:") {
      throw new Error(`${csv} is not a dayOfWeek string`);
    }
    let match = csv.match(/^D:([^;]+);([^;]+)$/);
    return DayOfWeek.of(Number(match[1]), match[2]);
  }
  toCsv() {
    return `D:${this._id};${this._label}`;
  }
  get id() {
    return this._id;
  }
  get label() {
    return this._label;
  }
}
const hourOfDaySchema = z.object({
  _id: z.number().int("Only integer numbers are allowed for the hour of day").min(0, "The hour of day must be at least 0").max(23, "The hour of day must be at most 23"),
  _label: z.string().min(1, "The hour label must be at least 1 character long").max(10, "The hour label must be at most 10 characters long").regex(/^[a-zA-Z0-9: ]+$/)
});
class HourOfDay {
  _id;
  _label;
  constructor(id, label) {
    hourOfDaySchema.parse({
      _id: id,
      _label: label
    });
    this._id = id;
    this._label = label;
  }
  static of(id, label) {
    return new HourOfDay(id, label);
  }
  static ofCsv(csv) {
    if (csv.substring(0, 2) !== "H:") {
      throw new Error(`${csv} is not a hourOfDay string`);
    }
    let match = csv.match(/^H:([^;]+);([^;]+)$/);
    return HourOfDay.of(Number(match[1]), match[2]);
  }
  toCsv() {
    return `H:${this._id};${this._label}`;
  }
  get id() {
    return this._id;
  }
  get label() {
    return this._label;
  }
}
function getExistingProfessorFromFile(file_data2) {
  let professors = [];
  file_data2.forEach((line) => {
    if (line.substring(0, 2) === "P:") {
      professors.push(Professor.ofCsv(line));
    }
  });
  return professors;
}
function getExistingClassroomsFromFile(file_data2) {
  let classes = [];
  file_data2.forEach((line) => {
    if (line.substring(0, 2) === "C:") {
      classes.push(SchoolClass.ofCsv(line));
    }
  });
  return classes;
}
function getExistingSubjectsFromFile(file_data2, existing_prof, existing_class) {
  let subjects = [];
  file_data2.forEach((line) => {
    if (line.substring(0, 2) === "S:") {
      subjects.push(Subject.ofCsv(line, existing_prof, existing_class));
    }
  });
  return subjects;
}
function getExistingHoursOfDayFromFile(file_data2) {
  let hoursOfDay = [];
  file_data2.forEach((line) => {
    if (line.substring(0, 2) === "H:") {
      hoursOfDay.push(HourOfDay.ofCsv(line));
    }
  });
  return hoursOfDay;
}
function getExistingDaysOfWeekFromFile(file_data2) {
  let daysOfWeek = [];
  file_data2.forEach((line) => {
    if (line.substring(0, 2) === "D:") {
      daysOfWeek.push(DayOfWeek.ofCsv(line));
    }
  });
  return daysOfWeek;
}
function readCookieFile() {
  {
    return [];
  }
}
const file_data = readCookieFile();
const prof_data = getExistingProfessorFromFile(file_data);
const class_data = getExistingClassroomsFromFile(file_data);
const allProfessors = writable(prof_data);
const allClassrooms = writable(class_data);
const allSubjects = writable(getExistingSubjectsFromFile(file_data, prof_data, class_data));
const allHoursOfDay = writable(getExistingHoursOfDayFromFile(file_data));
const allDaysOfWeek = writable(getExistingDaysOfWeekFromFile(file_data));
allDaysOfWeek.set;
const theme = writable("auto");
const editingId = writable(null);
function isObject(value) {
  const type = typeof value;
  return value != null && (type == "object" || type == "function");
}
function getColumnSizeClass(isXs, colWidth, colSize) {
  if (colSize === true || colSize === "") {
    return isXs ? "col" : `col-${colWidth}`;
  } else if (colSize === "auto") {
    return isXs ? "col-auto" : `col-${colWidth}-auto`;
  }
  return isXs ? `col-${colSize}` : `col-${colWidth}-${colSize}`;
}
function toClassName(value) {
  let result = "";
  if (typeof value === "string" || typeof value === "number") {
    result += value;
  } else if (typeof value === "object") {
    if (Array.isArray(value)) {
      result = value.map(toClassName).filter(Boolean).join(" ");
    } else {
      for (let key in value) {
        if (value[key]) {
          result && (result += " ");
          result += key;
        }
      }
    }
  }
  return result;
}
function classnames(...args) {
  return args.map(toClassName).filter(Boolean).join(" ");
}
function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c == "x" ? r : r & 3 | 8;
    return v.toString(16);
  });
}
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
const Modal_svelte_svelte_type_style_lang = "";
const Offcanvas_svelte_svelte_type_style_lang = "";
export {
  Icon as I,
  Professor as P,
  SchoolClass as S,
  allDaysOfWeek as a,
  allHoursOfDay as b,
  classnames as c,
  allSubjects as d,
  allClassrooms as e,
  allProfessors as f,
  getColumnSizeClass as g,
  editingId as h,
  isObject as i,
  cellPhoneSchema as j,
  sectionSchema as k,
  trackSchema as l,
  mailSchema as m,
  nameSchema$1 as n,
  Subject as o,
  surnameSchema as s,
  theme as t,
  uuid as u,
  yearSchema as y
};
