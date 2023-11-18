import { Name } from '../../../src/model/subject/name';
import { Abbreviation } from '../../../src/model/subject/abbreviation';
import { test, expect } from '@jest/globals';
import { Weight } from '../../../src/model/subject/weight';
import { HoursPerWeek } from '../../../src/model/subject/hours-per-week';

describe('Name tests', () => {
    test.each(["matematica", "Storia dell'arte"])('Name %p creates object', (value) => {
        const name = new Name(value);
        expect(name.value).toMatch(value);
    });

    test.each(["", "a", "a".repeat(31)])('Name %p throws too short error', (value) => {
        expect(() => new Name(value)).toThrowError();
    });

    test.each(["a".repeat(31)])('Name %p throws too long error', (value) => {
        expect(() => new Name(value)).toThrowError();
    });

    test.each(["matematica!", "1matematica", "scienze-motorie"])('Name %p throws invalid error', (value) => {
        expect(() => new Name(value)).toThrowError();
    });

    test.each(["matematica"])('Name toString', (value) => {
        const name = new Name(value);
        expect(name.toString()).toMatch(value);
    });
})

describe('Abbreviation tests', () => {
    test.each(["mat"])('Abbreviation %p creates object', (value) => {
        const abbreviation = new Abbreviation(value);
        expect(abbreviation.value).toMatch(value.toUpperCase());
    });

    test.each([""])('Abbreviation %p throws too short error', (value) => {
        expect(() => new Abbreviation(value)).toThrowError();
    });

    test.each(["a".repeat(6), "a".repeat(1000)])('Abbreviation %p throws too long error', (value) => {
        expect(() => new Abbreviation(value)).toThrowError();
    });


    test.each(["mat1", "mat_", "sd'a", "sd a", "sd-a", "sd1a"])('Abbreviation throws invalid characters error', (value) => {
        expect(() => new Abbreviation(value)).toThrowError();
    });

    test.each(["mat"])('Abbreviation toString', (value) => {
        const abbreviation = new Abbreviation(value);
        expect(abbreviation.toString()).toMatch(value.toUpperCase());
    });
})

describe('Weight tests', () => {
    test.each([1, 5, 10])('Weight %p creates object', (value) => {
        const weight = new Weight(value);
        expect(weight.value).toBe(value);
    });

    test.each([-1, 0, 11])('Weight throws invalid error', (value) => {
        expect(() => new Weight(value)).toThrowError();
    });

    test.each([5])('Weight toString', (value) => {
        const weight = new Weight(value);
        expect(weight.toString()).toMatch(value.toString());
    });
})

describe('HoursPerWeek tests', () => {
    test.each([10])('HoursPerWeek %p creates object', (value) => {
        const hoursPerWeek = new HoursPerWeek(value);
        expect(hoursPerWeek.value).toBe(value);
    });

    test.each([-1, 0])('HoursPerWeek %p throws too short error', (value) => {
        expect(() => new HoursPerWeek(value)).toThrowError();
    });

    test.each([31])('HoursPerWeek %p throws too long error', (value) => {
        expect(() => new HoursPerWeek(value)).toThrowError();
    });

    test.each([10])('HoursPerWeek toString', (value) => {
        const hoursPerWeek = new HoursPerWeek(value);
        expect(hoursPerWeek.toString()).toMatch(value.toString());
    });
})