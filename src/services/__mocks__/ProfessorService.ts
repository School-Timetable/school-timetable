import { Professor } from "../../model/professor/professor";

export class ProfessorService {
    getProfessors(num: number): Professor[] {
        let res: Professor[] = [];
        for (let i = 0; i<num; i++) {
            let professor: Professor = Professor.of(
                (i+1).toString(),
                "profName"+String.fromCharCode("A".charCodeAt(0)+i),
                "profSurname"+String.fromCharCode("A".charCodeAt(0)+i),
                "prof."+i+"@mock.it",
                "377"+new String(i).repeat(7)
            )
            res.push(professor);
        }
        return res;
    }
}