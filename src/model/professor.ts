import type { Name } from './primitives/person-name';

export class Professor {
    
    constructor(name: Name, surname: string, email: string, subjects: []) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.subjects = subjects;
    }

    private readonly id: number = 0;
    name: Name;
    surname: string;
    email: string;
    subjects: [];
}