import { findClass } from './classroomUtils';
import { findProfessor } from './professorUtils';
import { Subject } from './Subject';

jest.mock('./classroomUtils');
jest.mock('./professorUtils');
jest.mock('./Subject');

test('readCsvSubject', () => {
    const mockFindClass = findClass as jest.MockedFunction<typeof findClass>;
    const mockFindProfessor = findProfessor as jest.MockedFunction<typeof findProfessor>;
    const mockSubjectOf = Subject.of as jest.MockedFunction<typeof Subject.of>;

    mockFindClass.mockReturnValueOnce(null);
    mockFindProfessor.mockReturnValueOnce(null);
    mockSubjectOf.mockReturnValueOnce('mockSubject');

    const data = [
        [2022, 'A', 'Science', 'John', 'Doe', 'john.doe@example.com', 'Math', 'MTH', 1, 2],
    ];

    const results = readCsvSubject(data);

    expect(results[0]).toEqual([]); // subjects
    expect(results[1]).toEqual([
        'Class: 2022, A, Science, Professor: John, Doe, john.doe@example.com, Name: Math, Abbreviation: MTH, Weight: 1, Weekly Hours: 2',
    ]); // errors
});