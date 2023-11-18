export class ClassService {
    getClasses(num: number): any[] {
        let res = [];
        for (let i = 0; i<num; i++) {
            res.push({
                id: i,
                nome: "className_"+i
            });
        }
        return res;
    }
}