import { test, expect } from '@jest/globals';
import { Year } from '$model/school-class/year';
import { Section } from "$model/school-class/section";
import { Track } from "$model/school-class/track";
import { SchoolClass } from "$model/school-class/school-class";

const year = 5
const section = "A"
const track = "Informatica"
const schoolClassWithTrack = SchoolClass.of(year, section, track)
const schoolClassWithoutTrack = SchoolClass.of(year, section)

test('test_school_class_fixture_test', () => {
    expect(schoolClassWithTrack.year.value).toStrictEqual(year)
    expect(schoolClassWithTrack.section.value).toStrictEqual(section)
    expect(schoolClassWithTrack.track?.value).toStrictEqual(track.toUpperCase())
})

test('test_school_class_fixture_test_without_track', () => {
    expect(schoolClassWithoutTrack.year.value).toStrictEqual(year)
    expect(schoolClassWithoutTrack.section.value).toStrictEqual(section)
    expect(schoolClassWithoutTrack.track?.value).toStrictEqual(undefined)
})

test('test_school_class_without_track_to_string', () => {
    expect(schoolClassWithoutTrack.toString()).toEqual("5A")
})

test('test_school_class_with_track_to_string', () => {
    expect(schoolClassWithTrack.toString()).toMatch("5A INFORMATICA")
})

test('test_school_class_number_change', () => {
    schoolClassWithTrack.year = new Year(3);
    expect(schoolClassWithTrack.year.value).toBe(3);
});

test('test_school_class_section_change', () => {
    schoolClassWithTrack.section = new Section("C");
    expect(schoolClassWithTrack.section.value).toBe("C");
});

// TODO: check if a "defined" track can be modified to undefined
/* test('test_school_class_with_track_change', () => {
    schoolClassWithTrack.track = undefined;
    expect(schoolClassWithTrack.track).toBe(undefined);
}); */

test('test_school_class_without_track_change', () => {
    schoolClassWithoutTrack.track = new Track("Inf.");
    expect(schoolClassWithoutTrack.track.value).toBe("INF.");
});