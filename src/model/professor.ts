export class Professor {
    
    constructor(name: string, surname: string, email: string, subjects: []) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.subjects = subjects;
    }

    id: number = 0;
    name: string;
    surname: string;
    email: string;
    subjects: [];
}