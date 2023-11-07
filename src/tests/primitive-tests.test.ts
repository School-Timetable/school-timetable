import { Name } from '../model/primitives/name';
import { test, expect } from '@jest/globals';

test('Name is valid', () => {
    const name = new Name("John");
    expect(name.name()).toBe("John");
});