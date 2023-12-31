import Papa from 'papaparse';
import fs from 'fs'
import { Professor } from '$model/professor/professor';
import { SchoolClass } from '$model/school-class/school-class';
import { Subject } from '$model/subject/subject';
import { get } from 'svelte/store';
import { allClassrooms } from "$lib/stores/global_store";
import { allProfessors } from '$lib/stores/global_store';
import {ZodError} from "zod";

export function readCsv(file: File, type: string){
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function(event) {
            const csvString = event.target.result as string;
            const csv = Papa.parse<string>(csvString);

            if(type === 'professor'){
                resolve(readCsvProfessor(csv.data));
            }else if(type === 'class'){
                resolve(readCsvClass(csv.data));
            }else if(type === 'subject'){
                resolve(readCsvSubject(csv.data));
            } 
        };

        reader.onerror = function() {
            alert('Unable to read ' + file.fileName + ', please try again or select a different file');
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
            let failedProfessor = `Name: ${row[0]}, Surname: ${row[1]}, Email: ${row[2]}, Cell Phone: ${row[3]}`;
            if (error instanceof ZodError) {
                failedProfessor += `, ERROR: ${error.errors[0].message}`;
            }
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
            let failedClass = `Year: ${row[0]}, Section: ${row[1]}, Academic Track: ${row[2] || "-"}`;
            if (error instanceof ZodError) {
                failedClass += `, ERROR: ${error.errors[0].message}`;
            }
            errors.push(failedClass);
        }
    });
    return results;
}

function readCsvSubject(data: any){
    const results: any[] = [];
    const subjects: Subject[] = [];
    const errors: string[] = [];
    results.push(subjects);
    results.push(errors);
    data.forEach((row: string) => {
        try {

            const schoolClass = findClass(Number(row[0]),row[1],row[2]);
            const professor = findProfessor(row[3],row[4],row[5]);

            if(professor && schoolClass){
                const subject = Subject.of(null,schoolClass, professor, row[7], row[6], Number(row[8]), Number(row[9]));
                subjects.push(subject);
            }else{
                const failedSubject = `Class: ${row[0]}, ${row[1]}, ${row[2]}, Professor: ${row[3]}, ${row[4]}, ${row[5]}, Abbreviation: ${row[6]}, Subject Name: ${row[7]}, Weight: ${row[8]}, Weekly Hours: ${row[9]}, ERROR: Professor or Class not found`;
                errors.push(failedSubject);
            }

        } catch (error) {
            let failedSubject = `Class: ${row[0]}, ${row[1]}, ${row[2]}, Professor: ${row[3]}, ${row[4]}, ${row[5]}, Abbreviation: ${row[6]}, Subject Name: ${row[7]}, Weight: ${row[8]}, Weekly Hours: ${row[9]}`;
            if (error instanceof ZodError) {
                failedSubject += `, ERROR: ${error.errors[0].message}`;
            }
            errors.push(failedSubject);
        }
    });
    return results;
}

function findClass(
    year: Number,
    section: string,
    track: string
) {
    return get(allClassrooms).find((old) => {
        if(track == '' && old.track?.value === undefined){
            return (
                old.year.value === year &&
                old.section.value === section
            );
        }else{
            return (
                old.year.value === year &&
                old.section.value === section &&
                old.track.value.toLocaleUpperCase() === track.toLocaleUpperCase()
            );
        }
    });
}

function findProfessor(
    name: string,
    surname: string,
    email: string,
) {
    return get(allProfessors).find((professor) => {
        return (
            professor.name.value === name &&
            professor.surname.value === surname &&
            professor.email.value === email
        );
    });
}