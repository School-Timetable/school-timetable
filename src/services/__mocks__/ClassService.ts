import { SchoolClass } from "../../model/school-class/school-class";

export class ClassService {
    getClasses(num: number): SchoolClass[] {
        let res: SchoolClass[] = [];
        for (let i = 0; i<num; i++) {
            let schoolClass: SchoolClass = SchoolClass.of(
                (i+1).toString(),
                Math.floor(Math.random()*i)+1,
                String.fromCharCode("A".charCodeAt(0)+i)
            )
            res.push(schoolClass);
        }
        return res;
    }
}