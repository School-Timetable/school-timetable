//Test the readCsv function
import { readCsv } from '$lib/utils/read_csv_from_file';
import { Professor } from '$model/professor/professor';
import { SchoolClass } from '$model/school-class/school-class';
import { Subject } from '$model/subject/subject';

test('readCsvProfessor', () => {

    const professors = readCsv('./tests/readCsv/professor.csv', 'professor');

    const expecteds = [
        Professor.of(null, "John", "Doe", "john@gmail.com", "123456789"),
        Professor.of(null, "Jane", "Doe", "jane@gmail.it", "987654321")
    ];

    expect(professors).toEqual(expecteds);
});

test('readCsvClass', () => {
    
        const classes = readCsv('./tests/readCsv/class.csv', 'class');
    
        const expecteds = [
            SchoolClass.of(null, 1, "A", "BOH"),
            SchoolClass.of(null, 2, "B", "BOH")
        ];
    
        expect(classes).toEqual(expecteds);
    });

test('readCsvSubject', () => {
    
    const professors = [
        Professor.of("abc", "John", "Doe", "john@gmail.com", "123456789"),
        Professor.of("efg", "Jane", "Doe", "jane@gmail.it", "987654321")
    ];

    const classes = [
        SchoolClass.of("xyz", 1, "A", "BOH"),
        SchoolClass.of("xed", 2, "B", "BOH")
    ];

    const subjects = readCsv('./tests/readCsv/subject.csv', 'subject', professors, classes);

    const expecteds3 = [
        Subject.of(null, classes[0], professors[0], "Matematica", "mat", 1, 1),
        Subject.of(null, classes[1], professors[1], "Italiano", "ita", 2, 2)
    ];

    expect(subjects).toEqual(expecteds3);
});
