import { Name } from '../../../src/model/professor/name';
import { Surname } from '../../../src/model/professor/surname';
import { Cellphone } from '../../../src/model/professor/cellphone';
import { Mail } from '../../../src/model/professor/mail';
import { Professor } from '../../../src/model/professor/professor';
import { test, expect } from '@jest/globals';

test('test_name_validation', () => {
    const name = new Name("John claire");
    expect(name.value).toBe("JOHN CLAIRE");
});

test('test_name_validation_undefined', () => {
    expect(() => {
        new Name(undefined!);
    }).toThrowError("Required");
});

test('test_name_validation_too_short', () => {
    expect(() => {
        new Name("J");
    }).toThrowError("The name is too short (min 2 characters)");
});

test('test_name_validation_too_long', () => {
    expect(() => {
        new Name("John claire john claire john claire john claire john claire");
    }).toThrowError("The name is too long (max 20 characters)");
});

test('test_name_validation_invalid', () => {
    expect(() => {
        new Name("John 123");
    }).toThrowError("The name is not valid");
});

test('test_surname_validation', () => {
    const surname = new Surname("John claire");
    expect(surname.value).toBe("JOHN CLAIRE");
});

test('test_surname_validation_too_short', () => {
    expect(() => {
        new Surname("J");
    }).toThrowError("The surname is too short (min 2 characters)");
});

test('test_surname_validation_too_long', () => {
    expect(() => {
        new Surname("John claire john claire john claire john claire john claire");
    }).toThrowError("The surname is too long (max 20 characters)");
});

test('test_surname_validation_invalid', () => {
    expect(() => {
        new Surname("John 123");
    }).toThrowError("The surname is not valid");
});

test('test_cellphone_validation', () => {
    const cellphone = new Cellphone("123456789");
    expect(cellphone.value).toBe("123456789");
}
);

test('test_cellphone_validation_too_short', () => {
    expect(() => {
        new Cellphone("123");
    }).toThrowError("The cellphone is too short (min 8 characters)");
}
);

test('test_cellphone_validation_too_long', () => {
    expect(() => {
        new Cellphone("123456789012345678901234567890");
    }).toThrowError("The cellphone is too long (max 15 characters)");
});

test('test_cellphone_validation_invalid', () => {
    expect(() => {
        new Cellphone("123456789a");
    }).toThrowError("The cellphone is not valid");
});

test('test_mail_validation', () => {
    const mail = new Mail("scrumdamn@gmail.it");
    expect(mail.value).toBe("scrumdamn@gmail.it");
});

test('test_mail_validation_invalid', () => {
    expect(() => {
        new Mail("scrumdamn@gmail");
    }).toThrowError("The mail is not valid");
});

test('test_mail_validation_invalid_2', () => {
    expect(() => {
        new Mail("scrumdamn@gmail.");
    }).toThrowError("The mail is not valid");
});

test('test_mail_validation_invalid_3', () => {
    expect(() => {
        new Mail("scrumdamn@gmail.c");
    }).toThrowError("The mail is not valid");
});

test('test_mail_validation_undefined', () => {
    expect(() => {
        new Mail(undefined!);
    }).toThrowError("Required");
});

test('test_mail_validation_too_short', () => {
    expect(() => {
        new Mail("s@g");
    }).toThrowError("The mail is too short (min 5 characters)");
});

test('test_mail_validation_too_long', () => {
    expect(() => {
        new Mail("scrummdamnscrumdamnscrumdamnscrumdamnscrumdamnscrumdamn@gmail.it");
    }).toThrowError("The mail is too long (max 30 characters)");
});

test('professor_entity_test', () => {
    const name = new Name("John");
    const surname = new Surname("Claire");
    const cellphone = new Cellphone("123456789");
    const mail = new Mail("abcd13@gmail.com");
    const professor = new Professor(name, surname, mail, cellphone);
    expect(professor.Name.value).toBe(name.value);
    expect(professor.Surname.value).toBe(surname.value);
    expect(professor.CellPhone.value).toBe(cellphone.value);
    expect(professor.Email.value).toBe(mail.value);
});
