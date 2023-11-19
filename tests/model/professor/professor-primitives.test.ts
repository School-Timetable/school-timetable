import { Name } from '$model/professor/name';
import { Surname } from '$model/professor/surname';
import { Cellphone } from '$model/professor/cellphone';
import { Mail } from '$model/professor/mail';
import { test, expect } from '@jest/globals';

describe('Name tests', () => {
    test.each(["John Claire", "Mario Giuseppe", "Jayson"])('Name %p creates object', (value) => {
        const name = new Name(value);
        expect(name.valueUppercase).toBe(value.toUpperCase());
    });

    test.each([undefined, null])('Name %p throws error', (value) => {
        expect(() => {
            new Name(value!);
        }).toThrowError();
    });

    test.each(["J", "C", ""])('Name %p throws too short error', (value) => {
        expect(() => {
            new Name(value);
        }).toThrowError("The name is too short (min 2 characters)");
    });
    
    test.each(["John claire john claire john claire john claire john claire", "ThisNameIsTooLongggggg"])('Name %p throws too long error', (value) => {
        expect(() => {
            new Name(value);
        }).toThrowError("The name is too long (max 20 characters)");
    });

    test.each(["John 123", "Inv4l1d", "Tyler!!"])('Name %p throws invalid error', (value) => {
        expect(() => {
            new Name(value);
        }).toThrowError("The name is not valid");
    });
});


describe('Surname tests', () => {
    test.each(["John claire", "Rossi", "Verdi Bianchi"])('Surname %p creates object', (value) => {
        const surname = new Surname(value);
        expect(surname.valueUppercase).toBe(value.toUpperCase());
    });
    
    test.each(["J", ""])('Surname %p throws too short error', (value) => {
        expect(() => {
            new Surname(value);
        }).toThrowError("The surname is too short (min 2 characters)");
    });
    
    test.each(["John claire john claire john claire john claire john claire", "ThisSurnameIsTooLongggg"])('Surname %p throws too long error', (value) => {
        expect(() => {
            new Surname(value);
        }).toThrowError("The surname is too long (max 20 characters)");
    });
    
    test.each(["John 123"])('Surname %p throws invalid error', (value) => {
        expect(() => {
            new Surname(value);
        }).toThrowError("The surname is not valid");
    });

    test.each([undefined, null])('Surname %p throws undefined error', (value) => {
        expect(() => {
            new Surname(value!);
        }).toThrowError();
    });
});


describe('Cellphone tests', () => {
    test.each(["123456789", "98765432199"])('Cellphone %p creates object', (value) => {
        const cellphone = new Cellphone(value);
        expect(cellphone.value).toBe(value);
    });

    test.each(["123", ""])('Cellphone %p throws too short error', (value) => {
        expect(() => {
            new Cellphone(value);
        }).toThrowError("The cellphone is too short (min 8 characters)");
    });

    test.each(["123456789012345678901234567890"])('Cellphone %p throws too long error', (value) => {
        expect(() => {
            new Cellphone(value);
        }).toThrowError("The cellphone is too long (max 15 characters)");
    });

    test.each(["123456789a"])('Cellphone %p throws invalid error', (value) => {
        expect(() => {
            new Cellphone(value);
        }).toThrowError("The cellphone is not valid");
    });

    test.each([undefined, null])('Cellphone %p throws undefined error', (value) => {
        expect(() => {
            new Cellphone(value!);
        }).toThrowError();
    });
});


describe('Mail tests', () => {
    test.each(["scrumdamn@gmail.com", "schoolTimeTable@yahoo.it", "scrummdamnscrumdamnscrumdamnscrumdamnscrumdamnscrumdamnscrummdamnscrumdamnscrumdamnscrumdamnscrumdamnscrumdamnscrummdamnscrumdamnscrumdamnscrumdamnscrumdamnscrumdamnscrummdamnscrumdamnscrumdamnscrumdamnscrumdamnscrumdamnscrumdamnscrumdamnscrumdamnscrumdamnscrumdamnscrumdamnscrumdamnscrumdamnscrumdamnscrumdamn@gmail.it"])('Mail %p creates object', (value) => {
        const mail = new Mail(value);
        expect(mail.value).toBe(value);
    });
    
    test.each(["scrumdamn@gmail", "scrumdamn@gmail.", "scrumdamn@gmail.c"])('Mail %p throws invalid error', (value) => {
        expect(() => {
            new Mail(value);
        }).toThrowError("The mail is not valid");
    });
    
    test.each([undefined, null])('Mail %p throws undefined error', (value) => {
        expect(() => {
            new Mail(value!);
        }).toThrowError();
    });
    
    test.each(["s@g"])('Mail %p throws too short error', (value) => {
        expect(() => {
            new Mail(value);
        }).toThrowError("The mail is too short (min 5 characters)");
    });
    
    test.each(["scrummdamnscrumdamnscrumdamnscrumdamnscrumdamnscrumdamnscrummdamnscrumdamnscrumdamnscrumdamnscrumdamnscrumdamnscrummdamnscrumdamnscrumdamnscrumdamnscrumdamnscrumdamnscrummdamnscrumdamnscrumdamnscrumdamnscrumdamnscrumdamnscrumdamnscrumdamnscrumdamnscrumdamnscrumdamnscrumdamnscrumdamnscrumdamnscrumdamnscrumdamnsc@gmail.it"])('Mail %p throws too long error', (value) => {
        expect(() => {
            new Mail(value);
        }).toThrowError("The mail is too long (max 320 characters)");
    });
});