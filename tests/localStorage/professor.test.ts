import { Professor } from "$model/professor/professor";

test('professor_to_csv_test', () => {
    let professors = [
        Professor.of("abc-def", "Mario oiram", "Rossi", "test@mail.com", "+393331122444"),
        Professor.of("xyz-aab-ccd", "Mario oiram ross", "De Rossi", "test.mail@mail.com", "3331122444"),
    ]

    let expecteds = [
        "P:abc-def;Mario oiram;Rossi;test@mail.com;+393331122444",
        "P:xyz-aab-ccd;Mario oiram ross;De Rossi;test.mail@mail.com;3331122444"
    ]

    professors.forEach((e, idx) => {
        expect(e.toCsv()).toEqual(expecteds[idx]);
    })
});

test('csv_to_professor_test', () => {
    let professors = [
        "P:abc-def;Mario oiram;Rossi;test@mail.com;+393331122444",
        "P:xyz-aab-ccd;Mario oiram ross;De Rossi;test.mail@mail.com;3331122444"
    ]

    let expecteds = [
        Professor.of("abc-def", "Mario oiram", "Rossi", "test@mail.com", "+393331122444"),
        Professor.of("xyz-aab-ccd", "Mario oiram ross", "De Rossi", "test.mail@mail.com", "3331122444"),
    ]

    professors.forEach((e, idx) => {
        expect(Professor.ofCsv(professors[idx])).toEqual(expecteds[idx]);
    })
});