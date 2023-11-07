import { Name } from '../../src/model/primitives/person-name';
import { Surname } from '../../src/model/primitives/person-surname';
import { test, expect } from '@jest/globals';

test('test_name_validation', () => {
    const name = new Name("John claire");
    expect(name.name()).toBe("JOHN CLAIRE");
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
    expect(surname.name()).toBe("JOHN CLAIRE");
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
