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

test('test_school_class_without_track_to_string', () => {
    expect(schoolClassWithoutTrack.toString()).toEqual("5A")
})

test('test_school_class_with_track_to_string', () => {
    expect(schoolClassWithTrack.toString()).toMatch("5A INFORMATICA")
})