import Papa from 'papaparse';
import fs from 'fs'
import { Professor } from '$model/professor/professor';
import { SchoolClass } from '$model/school-class/school-class';
import { Subject } from '$model/subject/subject';


export function readCsv(filePath: string, type: string, existing_prof?: Professor[], existing_class?: SchoolClass[]){
    
    const csvString = fs.readFileSync(filePath, 'utf8');
    const csv = Papa.parse<string>(csvString);

    if(type === 'professor'){
        return readCsvProfessor(csv.data);
    }else if(type === 'class'){
       return readCsvClass(csv.data);
    }else if(type === 'subject' && existing_prof !== undefined && existing_class !== undefined){
        return readCsvSubject(csv.data, existing_prof, existing_class);
    } 
}

function readCsvProfessor(data: any){
    const professors: Professor[] = [];
    data.forEach((row: string) => {
        professors.push(Professor.of(null,row[0], row[1], row[2], row[3]));
    });
    return professors;
}

function readCsvClass(data: any){
    const classes: SchoolClass[] = [];
    data.forEach((row: string) => {
        classes.push(SchoolClass.of(null,parseInt(row[0]), row[1], row[2]));
    });
    return classes;
}

function readCsvSubject(data: any, existing_prof: Professor[], existing_class: SchoolClass[]){
    const subjects: Subject[] = [];
    data.forEach((row: string) => {
        const schoolClass = existing_class.find(cls => cls.id === row[0]);
        const professor = existing_prof.find(prof => prof.id === row[1]);
        
        if(!professor || !schoolClass){
            throw new Error("Professor or SchoolClass not found");
        }

        subjects.push(Subject.of(null,schoolClass, professor, row[2], row[3], Number(row[4]), Number(row[5])));
    });
    return subjects;
}