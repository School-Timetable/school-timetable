import { z } from 'zod';

const valueSchema = z.string()
    .min(5, "The mail is too short (min 5 characters)")
    .max(320, "The mail is too long (max 320 characters)")
    .email("The mail is not valid");

export const mailSchema = z.object({
    value: valueSchema,
}).strict();

export class Mail {
    public static readonly schema = mailSchema;

    public readonly value: string;

    constructor(mail: string) {
        valueSchema.parse(mail);
        this.value = mail;
    }

    public toString(): string {
        return this.value.toString();
    }

}
