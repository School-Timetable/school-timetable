import Papa from 'papaparse';
import fs from 'fs'
import { Professor } from '$model/professor/professor';
import { SchoolClass } from '$model/school-class/school-class';
import { Subject } from '$model/subject/subject';


export function readCsv(file: File, type: string, existing_prof?: Professor[], existing_class?: SchoolClass[]){
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function(event) {
            const csvString = event.target.result as string;
            const csv = Papa.parse<string>(csvString);

            if(type === 'professor'){
                resolve(readCsvProfessor(csv.data));
            }else if(type === 'class'){
                resolve(readCsvClass(csv.data));
            }else if(type === 'subject' && existing_prof !== undefined && existing_class !== undefined){
                resolve(readCsvSubject(csv.data, existing_prof, existing_class));
            } 
        };

        reader.onerror = function() {
            reject(new Error("Error reading file"));
        };

        reader.readAsText(file);
    });
}

export function readCsvProfessor(data: any){
    const results: any[] = [];
    const professors: Professor[] = [];
    const errors: string[] = [];
    results.push(professors);
    results.push(errors);
    data.forEach((row: string) => {
        try {
            const professor = Professor.of(null,row[0], row[1], row[2], row[3]);
            professors.push(professor);
        } catch (error) {
            const failedProfessor = `Name: ${row[0]}, Surname: ${row[1]}, Email: ${row[2]}, Cell Phone: ${row[3]}`;
            errors.push(failedProfessor);
        }
    });
    return results;
}

function readCsvClass(data: any){
    const results: any[] = [];
    const classes: SchoolClass[] = [];
    const errors: string[] = [];
    results.push(classes);
    results.push(errors);
    data.forEach((row: string) => {
        try{
            const schoolClass = SchoolClass.of(null,parseInt(row[0]), row[1], row[2]);
            classes.push(schoolClass);
        } catch (error) {
            const failedClass = `Year: ${row[0]}, Section: ${row[1]}, Name: ${row[2]}`;
            errors.push(failedClass);
        }
    });
    return results;
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