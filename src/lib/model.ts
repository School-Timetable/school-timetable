export interface Professor
{
    id: number
    name: string
    surname?: string
}

export interface SubjectOption
{
    amount: number
    subject: ClassSubject
}


export interface DayColumn 
{
    name: string
    professors: Professor[]
    size: number
}

// prova

export interface WeekClass
{
    name: string            // nome classe (1A)
    grid: (ClassSubject | null)[][]
    sidebar: ClassSubject[]
}



export interface ClassSubject
{
    professor: Professor
    class: string
    subject: string
    remainingHours: number  // numero di ore di questa materia da fare nella classe class
}

