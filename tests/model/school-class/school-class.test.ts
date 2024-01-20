import { test, expect } from '@jest/globals';
import { Year } from '$model/school-class/year';
import { Section } from "$model/school-class/section";
import { Track } from "$model/school-class/track";
import { SchoolClass } from "$model/school-class/school-class";

const year = 5
const section = "A"
const track = "Informatica"
const schoolClassWithTrack = SchoolClass.of("abc", year, section, track)
const schoolClassWithoutTrack = SchoolClass.of("abc", year, section)

test('School class fixture object with track created', () => {
    expect(schoolClassWithTrack.year.value).toStrictEqual(year)
    expect(schoolClassWithTrack.section.value).toStrictEqual(section)
    expect(schoolClassWithTrack.track?.value).toStrictEqual(track)
})

test('School Class Match', () => {
    expect(schoolClassWithTrack.match("3455")).toBe(false)
    expect(schoolClassWithTrack.match(year.toString())).toBe(true)
    expect(schoolClassWithTrack.match(section.toString())).toBe(true)
    expect(schoolClassWithTrack.match("Info")).toBe(true)
})

test('School class fixture object without track created', () => {
    expect(schoolClassWithoutTrack.year.value).toStrictEqual(year)
    expect(schoolClassWithoutTrack.section.value).toStrictEqual(section)
    expect(schoolClassWithoutTrack.track?.value).toStrictEqual(undefined)
})

test('School class to string without track', () => {
    expect(schoolClassWithoutTrack.toString()).toEqual("5A")
})

test('School class to string with track', () => {
    expect(schoolClassWithTrack.toString()).toMatch("5A INFORMATICA")
})

test('Year changes', () => {
    schoolClassWithTrack.year = new Year(3);
    expect(schoolClassWithTrack.year.value).toBe(3);
});

test('Section changes', () => {
    schoolClassWithTrack.section = new Section("C");
    expect(schoolClassWithTrack.section.value).toBe("C");
});

test('Track changes', () => {
    schoolClassWithoutTrack.track = new Track("Inf.");
    expect(schoolClassWithoutTrack.track.value).toBe("Inf.");
});