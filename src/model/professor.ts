import type { Name } from './primitives/professor/professor-name';
import type { Surname } from './primitives/professor/professor-surname';
import type { Cellphone } from './primitives/professor/professor-cellphone';
import type { Mail } from './primitives/professor/professor-mail';

export class Professor {
    
    constructor(name: Name, surname: Surname, email: Mail, cellPhone: Cellphone) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.cellPhone = cellPhone;
    }

    private readonly id: number = 0;
    name: Name;
    surname: Surname;
    email: Mail;
    cellPhone: Cellphone;
}