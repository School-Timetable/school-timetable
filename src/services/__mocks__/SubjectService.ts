import { Subject } from "../../model/subject/subject";
import { ClassService } from "./ClassService";
import { ProfessorService } from "./ProfessorService";


export class SubjectService {
    getSubjects(numProfessori: number, numClassi: number): Subject[] {
        let res: Subject[] = []
        const professors = new ProfessorService().getProfessors(numProfessori);
        const classes = new ClassService().getClasses(numClassi);
        for (let i = 0; i<numProfessori; i++) {
            let classInd = Math.floor(Math.random() * numClassi);
            let subject = Subject.of(
                (i+1).toString(),
                classes[classInd],
                professors[i],
                "materia"+String.fromCharCode("A".charCodeAt(0)+i),
                "mat"+String.fromCharCode("A".charCodeAt(0)+i),
                (i+1),
                i+classInd+1
            )
            res.push(subject);
        }
        return res;
    }
}