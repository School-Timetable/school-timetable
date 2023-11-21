import type { ClassSubject } from "$lib/model";
import { ClassService } from "./ClassService";
import { ProfessorService } from "./ProfessorService";


export class SubjectService {
    getSubjects(numProfessori: number, numClassi: number): ClassSubject[] {
        let res: ClassSubject[] = []
        const professori = new ProfessorService().getProfessors(numProfessori);
        const classi = new ClassService().getClasses(numClassi);
        for (let i = 0; i<numProfessori; i++) {
            let classInd = Math.floor(Math.random() * numClassi);
            res.push({
                id: i,
                class: classi[classInd],
                professor: professori[i],
                subject: "materia_"+i,
                abbreviation: "mat_"+i,
                weight: i,
                remainingHours: i+classInd
            });
        }
        return res;
    }
}