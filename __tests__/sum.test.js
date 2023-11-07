const calc = require('../src/example_function');


test('sum 1 + 2 = 3', () => {
    expect(calc.sum(1, 2)).toBe(3);
});

test('sub 1 - 2 = -1', () => {
    expect(calc.sub(1, 2)).toBe(-1);
});

