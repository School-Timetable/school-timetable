import { ProfessorService } from "../../src/services/ProfessorService";
import { ClassService } from "../../src/services/ClassService";
import { SubjectService } from "../../src/services/SubjectService";


jest.mock('../../src/services/ProfessorService')

describe('professors mock:', () => {
    it('test mock', () => {
        const professoreService = new ProfessorService()
        //console.log(professoreService.getProfessors(5));   // uncomment this to see the results
        const result = professoreService.getProfessors(5);
        expect(result).toHaveLength(5);
    })
})


jest.mock('../../src/services/ClassService')

describe('classes mock: ', () => {
    it('test mock', () => {
        const classeService = new ClassService();
        //console.log(classeService.getClasses(5));  // uncomment this to see the results
        const result = classeService.getClasses(5);
        expect(result).toHaveLength(5);
    })
})

jest.mock('../../src/services/SubjectService')

describe('subject mock', () => {
    it('test mock', () => {
        const materiaService = new SubjectService();
        //console.log(materiaService.getSubjects(5, 2));    // uncomment this to see the results
        const result = materiaService.getSubjects(5, 2);
        expect(result).toHaveLength(5);
    })
})
