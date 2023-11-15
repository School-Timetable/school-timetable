export class ProfessorService {
    getProfessors(num: number): any[] {
        let res = []
        for (let i = 0; i<num; i++) {
            res.push({
                id: i,
                nome: "profName_"+i,
                cognome: "profSurname_"+i,
                telefono: '377'+new String(i).repeat(7),
                email: "prof."+i+"@mock.it"
            });
        }
        return res;
    }
}