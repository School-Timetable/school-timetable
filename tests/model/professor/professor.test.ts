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


test('Professor fixture object created', () => {
    expect(professor.name.value).toBe(name.value);
    expect(professor.surname.value).toBe(surname.value);
    expect(professor.cellPhone.value).toBe(cellphone.value);
    expect(professor.email.value).toBe(mail.value);
});

test('Professor Match', () => {
    expect(professor.match("joh")).toBe(true)
    expect(professor.match("trter")).toBe(false)
    expect(professor.match("cl")).toBe(true)
    expect(professor.match("4567")).toBe(true)
    expect(professor.match("gmail")).toBe(true)
})

test('Name changes', () => {
    professor.name = new Name("Johnny");
    expect(professor.name.valueUppercase).toBe("JOHNNY");
});

test('Surname changes', () => {
    professor.surname = new Surname("Hill");
    expect(professor.surname.valueUppercase).toBe("HILL");
});

test('Cellphone changes', () => {
    professor.cellPhone = new Cellphone("987654321");
    expect(professor.cellPhone.value).toBe("987654321");
});

test('Mail changes', () => {
    professor.email = new Mail("asdfg@hotmail.com");
    expect(professor.email.value).toBe("asdfg@hotmail.com");
});

