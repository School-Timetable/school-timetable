import { Name } from '../../../src/model/subject/name';
import { Abbreviation } from '../../../src/model/subject/abbreviation';
import { test, expect } from '@jest/globals';
import { Weight } from '../../../src/model/subject/weight';
import { HoursPerWeek } from '../../../src/model/subject/hours-per-week';


test('Name is created', () => {
    const name = new Name("matematica");
    expect(name.value).toMatch("matematica");
})

test('Name with spaces', () => {
    const name = new Name("Storia dell'arte");
    expect(name.value).toMatch("Storia dell'arte");
})

test('Name length', () => {
    expect(() => new Name("")).toThrowError();
    expect(() => new Name("a")).toThrowError();
    expect(() => new Name("a".repeat(21))).toThrowError();

    new Name("a".repeat(2));
    new Name("a".repeat(20));
})

test('Name throws on invalid characters', () => {
    expect(() => new Name("matematica!")).toThrowError();
    expect(() => new Name("1matematica")).toThrowError();
    expect(() => new Name("scienze-motorie")).toThrowError();

    new Name("scienze 1motorie")
    new Name("matematica ")
    new Name("mate1")
    new Name("scienze_motorie")
    new Name("scienze motorie")
});

test('Name toString', () => {
    const name = new Name("matematica");
    expect(name.toString()).toMatch("matematica");
});



test('Abbreviation is created', () => {
    const abbreviation = new Abbreviation("mat");
    expect(abbreviation.value).toMatch("MAT");
});

test('Abbreviation lenght', () => {
    expect(() => new Abbreviation("")).toThrowError();
    expect(() => new Abbreviation("a".repeat(6))).toThrowError();
    expect(() => new Abbreviation("a".repeat(1000))).toThrowError();

    new Abbreviation("a");
    new Abbreviation("a".repeat(5));
});

test('Abbreviation throws on invalid characters', () => {
    expect(() => new Abbreviation("mat1")).toThrowError();
    expect(() => new Abbreviation("mat_")).toThrowError();
    expect(() => new Abbreviation("sd'a")).toThrowError();
    expect(() => new Abbreviation("sd a")).toThrowError();
    expect(() => new Abbreviation("sd-a")).toThrowError();
    expect(() => new Abbreviation("sd1a")).toThrowError();
});

test('Abbreviation toString', () => {
    const abbreviation = new Abbreviation("mat");
    expect(abbreviation.toString()).toMatch("MAT");
});



test('Weight is created', () => {
    const weight = new Weight(5);
    expect(weight.value).toBe(5);
});

test('Weight throws on invalid value', () => {
    expect(() => new Weight(-1)).toThrowError();
    expect(() => new Weight(0)).toThrowError();
    expect(() => new Weight(11)).toThrowError();
});

test('Weight is in range', () => {
    new Weight(1);
    new Weight(10);
});

test('Weight toString', () => {
    const weight = new Weight(5);
    expect(weight.toString()).toMatch("5");
});



test('HoursPerWeek is created', () => {
    const hoursPerWeek = new HoursPerWeek(10);
    expect(hoursPerWeek.value).toBe(10);
});

test('HoursPerWeek valid range', () => {
    expect(() => new HoursPerWeek(-1)).toThrowError();
    expect(() => new HoursPerWeek(0)).toThrowError();
    expect(() => new HoursPerWeek(31)).toThrowError();

    new HoursPerWeek(1);
    new HoursPerWeek(30);
});

test('HoursPerWeek toString', () => {
    const hoursPerWeek = new HoursPerWeek(10);
    expect(hoursPerWeek.toString()).toMatch("10");
});
