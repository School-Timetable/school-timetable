export interface Professor
{
    id?: number
    name: string
    surname?: string
    subject: string  // questa non c'è nel modello reale, è stata inserita per rappresentarla graficamente
}

export interface ProfessorOption
{
    amount: number
    prof: Professor
}


export interface DayColumn 
{
    name: string
    professors: Professor[]
    size: number
}

export interface WeekClass
{
    name: string
    days: DayColumn[]
}

