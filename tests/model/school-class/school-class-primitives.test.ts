import { test, expect } from '@jest/globals';
import { Year } from '$model/school-class/year';
import { Section } from "$model/school-class/section";
import { Track } from "$model/school-class/track";

test('test_class_number_validation_in_range', () => {
    const classNumber = new Year(1)
    expect(classNumber.value).toBe(1)
})

test('test_class_number_validation_over_maximum_size', () => {
    expect(() => {
        new Year(6)
    }).toThrowError("The class number is too big (max 5)")
})

test('test_class_number_validation_under_minimum_size', () => {
    expect(() => {
        new Year(0)
    }).toThrowError("The class number is too small (min 1)")
})

test('test_class_number_validation_undefined', () => {
    expect(() => {
        new Year(undefined!)
    }).toThrowError()
})

test('test_section_validation', () => {
    const section = new Section("C")
    expect(section.value).toBe("C")
})

test('test_section_validation_not_a_literal', () => {
    expect(() => {
        new Section("2")
    }).toThrowError()
})

test('test_section_validation_length', () => {
    expect(() => {
        new Section("ABC")
    }).toThrowError("The section must be a single char (A-Z)")
})

test('test_section_validation_undefined', () => {
    expect(() => {
        new Section(undefined!)
    }).toThrowError()
})

test('test_track_validation', () => {
    const track = new Track("Informatica")
    expect(track.valueUppercase).toBe("INFORMATICA")
})

test('test_track_validation_with_final_dot', () => {
    const track = new Track("Inf.")
    expect(track.valueUppercase).toBe("INF.")
})

test('test_track_validation_too_short', () => {
    expect(() => {
        new Track("I.")
    }).toThrowError("The track is too short (min 3 char)")
})

test('test_track_validation_too_long', () => {
    expect(() => {
        new Track("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    }).toThrowError("The track is too long (max 50 char)")
})

test('test_track_validation_invalid_char', () => {
    expect(() => {
        new Track("Informatica2")
    }).toThrowError("The track must contain only letters and an optional final dot")
})

test('test_track_validation_undefined', () => {
    expect(() => {
        new Track(undefined!)
    }).toThrowError()
})