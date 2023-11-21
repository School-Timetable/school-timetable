import type { Professor } from "$lib/model";

export class ProfessorService {
    getProfessors(num: number): Professor[] {
        let res = []
        for (let i = 0; i<num; i++) {
            res.push({
                id: i,
                name: "profName_"+i,
                surname: "profSurname_"+i,
                telephone: '377'+new String(i).repeat(7),
                email: "prof."+i+"@mock.it"
            });
        }
        return res;
    }
}