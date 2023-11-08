import { Professor } from "../../../src/model/professor/professor";
import { Name } from "../../../src/model/professor/name";
import { Surname } from "../../../src/model/professor/surname";
import { Cellphone } from "../../../src/model/professor/cellphone";
import { Mail } from "../../../src/model/professor/mail";
import { test, expect } from "@jest/globals";

test('professor_entity_test', () => {
    const name = new Name("John");
    const surname = new Surname("Claire");
    const cellphone = new Cellphone("123456789");
    const mail = new Mail("abcd13@gmail.com");
    const professor = new Professor(name, surname, mail, cellphone);
    expect(professor.name.value).toBe(name.value);
    expect(professor.surname.value).toBe(surname.value);
    expect(professor.cellPhone.value).toBe(cellphone.value);
    expect(professor.email.value).toBe(mail.value);
});

test('professor_entity_test_name_change', () => {
    const name = new Name("John");
    const surname = new Surname("Claire");
    const cellphone = new Cellphone("123456789");
    const mail = new Mail("abcd12@gmail.com");
    const professor = new Professor(name, surname, mail, cellphone);
    professor.name = new Name("Johnny");
    expect(professor.name.value).toBe("JOHNNY");
});

test('professor_entity_test_surname_change', () => {
    const name = new Name("John");
    const surname = new Surname("Claire");
    const cellphone = new Cellphone("123456789");
    const mail = new Mail("abcd12@gmail.com");
    const professor = new Professor(name, surname, mail, cellphone);
    professor.surname = new Surname("Hill");
    expect(professor.surname.value).toBe("HILL");
});