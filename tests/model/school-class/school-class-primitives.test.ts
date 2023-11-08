import { test, expect } from '@jest/globals';
import { ClassNumber } from '$model/school-class/class-number';
import { Section } from "$model/school-class/section";
import { Track } from "$model/school-class/track";

test('test_class_number_validation_in_range', () => {
    const classNumber = new ClassNumber(1)
    expect(classNumber.value).toBe(1)
})

test('test_class_number_validation_over_maximum_size', () => {
    expect(() => {
        new ClassNumber(6)
    }).toThrowError("The class number is too big (max 5)")
})

test('test_class_number_validation_under_minimum_size', () => {
    expect(() => {
        new ClassNumber(0)
    }).toThrowError("The class number is too small (min 1)")
})