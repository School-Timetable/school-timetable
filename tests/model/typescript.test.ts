import { Professor } from "$model/professor/professor";
import { SchoolClass } from "$model/school-class/school-class";
import { Subject } from "$model/subject/subject";

describe("instanceof", () => {


    it("instanceof si può utilizzare", () => {
        const prof = Professor.of("1", "sahskd", "sadkjhas", "apso@ijd.ooo", "8881288882");
        
        expect(prof instanceof Professor).toBe(true);
        expect(prof instanceof SchoolClass).toBe(false);
        expect(prof instanceof Subject).toBe(false);

        const classroom = SchoolClass.of("class-1", 1, "A");

        expect(classroom instanceof Professor).toBe(false);
        expect(classroom instanceof SchoolClass).toBe(true);
        expect(classroom instanceof Subject).toBe(false);

        const subject = Subject.of("subject-1", classroom, prof, "Subject", "sub", 3, 4);

        expect(subject instanceof Professor).toBe(false);
        expect(subject instanceof SchoolClass).toBe(false);
        expect(subject instanceof Subject).toBe(true);
    });
});
