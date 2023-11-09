import { test, expect } from '@jest/globals';
import { ClassNumber } from '$model/school-class/class-number';
import { Section } from "$model/school-class/section";
import { Track } from "$model/school-class/track";
import { SchoolClass } from "$model/school-class/school-class";

const classNumber = new ClassNumber(5)
const section = new Section("A")
const track = new Track("Informatica")
const schoolClassWithTrack = new SchoolClass.builder(1, classNumber, section).withTrack(track).build()
const schoolClassWithoutTrack = new SchoolClass.builder(1, classNumber, section).build()

test('test_school_class_fixture_test', () => {
    expect(schoolClassWithTrack.classNumber.value).toBe(classNumber.value)
    expect(schoolClassWithTrack.section.value).toBe(section.value)
    expect(schoolClassWithTrack.track?.value).toBe(track.value)
})

test('test_school_class_fixture_test_without_track', () => {
    expect(schoolClassWithoutTrack.classNumber.value).toBe(classNumber.value)
    expect(schoolClassWithoutTrack.section.value).toBe(section.value)
    expect(schoolClassWithoutTrack.track?.value).toBe(undefined)
})

test('test_school_class_without_track_to_string', () => {
    expect(schoolClassWithoutTrack.toString()).toEqual("5A")
})

test('test_school_class_with_track_to_string', () => {
    expect(schoolClassWithTrack.toString()).toMatch("5A INFORMATICA")
})

test('test_school_class_number_change', () => {
    schoolClassWithTrack.classNumber = new ClassNumber(3);
    expect(schoolClassWithTrack.classNumber.value).toBe(3);
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