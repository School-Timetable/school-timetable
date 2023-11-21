import type { Class } from "$lib/model";

export class ClassService {
    getClasses(num: number): Class[] {
        let res = [];
        for (let i = 0; i<num; i++) {
            res.push({
                id: i,
                name: "className_"+i
            });
        }
        return res;
    }
}