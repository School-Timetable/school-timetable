import { test, expect } from '@jest/globals';
import { ClassNumber } from '../../src/model/primitives/class-number';

test('test_class_number_validation_in_range', () => {
    const classNumber = new ClassNumber(1)
    expect(classNumber.classNumber()).toBe(1)
})

test('test_class_number_validation_over_maximum_size', () => {
    expect(() => {
        new ClassNumber(7)
    }).toThrowError("The class number is too big (max 5)")
})

test('test_class_number_validation_under_minimum_size', () => {
    expect(() => {
        new ClassNumber(0)
    }).toThrowError("The class number is too small (min 1)")
})