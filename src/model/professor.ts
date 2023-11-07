import type { Name } from './primitives/person-name';
import type { Surname } from './primitives/person-surname';

export class Professor {
    
    constructor(name: Name, surname: Surname, email: string, cellPhone: string) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.cellPhone = cellPhone;
    }

    private readonly id: number = 0;
    name: Name;
    surname: Surname;
    email: string;
    cellPhone: string;
}