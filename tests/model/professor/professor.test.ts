import { Professor } from "$model/professor/professor";
import { Name } from "$model/professor/name";
import { Surname } from "$model/professor/surname";
import { Cellphone } from "$model/professor/cellphone";
import { Mail } from "$model/professor/mail";
import { test, expect } from "@jest/globals";

const name = new Name("John");
const surname = new Surname("Claire");
const cellphone = new Cellphone("123456789");
const mail = new Mail("abcd13@gmail.com");
const professor = new Professor("abc", name, surname, mail, cellphone);


test('professor_entity_fixture_test', () => {
    expect(professor.name.value).toBe(name.value);
    expect(professor.surname.value).toBe(surname.value);
    expect(professor.cellPhone.value).toBe(cellphone.value);
    expect(professor.email.value).toBe(mail.value);
});

test('professor_entity_test_name_change', () => {
    professor.name = new Name("Johnny");
    expect(professor.name.valueUppercase).toBe("JOHNNY");
});

test('professor_entity_test_surname_change', () => {
    professor.surname = new Surname("Hill");
    expect(professor.surname.valueUppercase).toBe("HILL");
});

test('professor_entity_test_cellphone_change', () => {
    professor.cellPhone = new Cellphone("987654321");
    expect(professor.cellPhone.value).toBe("987654321");
});

test('professor_entity_test_mail_change', () => {
    professor.email = new Mail("asdfg@hotmail.com");
    expect(professor.email.value).toBe("asdfg@hotmail.com");
});
