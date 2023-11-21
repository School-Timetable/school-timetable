export interface Professor
{
    id: number
    name: string
    surname?: string
    telephone: string
    email: string
}

export interface Class 
{
    id: number
    name: string
}

// prova

export interface WeekClass
{
    className: string            // nome classe (1A)
    grid: (ClassSubject | null)[][]
    sidebar: ClassSubject[]
}



export interface ClassSubject
{
    id: number
    professor: Professor
    class: Class
    subject: string
    abbreviation: string
    weight: number
    remainingHours: number  // numero di ore di questa materia da fare nella classe class
}

