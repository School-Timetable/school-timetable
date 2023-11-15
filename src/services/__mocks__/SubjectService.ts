import { ClassService } from "./ClassService";
import { ProfessorService } from "./ProfessorService";


export class SubjectService {
    getSubjects(numProfessori: number, numClassi: number) {
        let res = []
        const professori = new ProfessorService().getProfessors(numProfessori);
        const classi = new ClassService().getClasses(numClassi);
        for (let i = 0; i<numProfessori; i++) {
            let classInd = Math.floor(Math.random() * numClassi);
            res.push({
                id: i,
                classe: classi[classInd],
                professore: professori[i],
                nome: "materia_"+i,
                abbreviazione: "mat_"+i,
                peso: i,
                ore_sett: i+classInd
            });
        }
        return res;
    }
}