import { DayOfWeek } from "$model/timetable/day-of-week";
import { ZodError, tuple } from "zod";

test("Test dayOfWeek creation invalid data fails", () => {
    let wrong_data = [
        [-1, "Bad"],
        [0, "...."],
        [-100, "b a d ;"],
        [50, ""],
        [20, "loooooooooooooooong striiiiiiiiing"],
    ]

    wrong_data.forEach((tuple) => {
        expect(() => DayOfWeek.of(tuple[0] as number, tuple[1] as string)).toThrow(ZodError);
    })
})

test("Test dayOfWeek creation valid data succeed", () => {
    let good_data = [
        [0, "M"],
        [0, "Mon"],
        [10, "Monday"],
        [23, "This is a day"],
        [30, "Last day"]
    ]

    good_data.forEach((tuple) => {
        DayOfWeek.of(tuple[0] as number, tuple[1] as string)
    })
})

test("Test csv to object parsing succeed", () => {
    let lines = [
        "D:10;Monday",
        "D:15;Tu esday"
    ]

    let tuples = [
        [10, "Monday"],
        [15, "Tu esday"]
    ]

    lines.forEach((line, idx) => {
        let dayOfWeek = DayOfWeek.ofCsv(line);

        expect(dayOfWeek.id).toEqual(tuples[idx][0]);
        expect(dayOfWeek.label).toEqual(tuples[idx][1]);
    })
})

test("Test csv to object parsing fails", () => {
    let lines = [
        "10;Monday",
        "D:-1;@day w space",
        "D:10;Loooooooooooooooong daaaaaay",
        "D:40;Mon"
    ]

    lines.forEach((line, idx) => {
        expect(() => DayOfWeek.ofCsv(line)).toThrow(Error);
    })
})

test("Test object to csv conversion succeed", () => {
    let lines = [
        "D:10;Monday",
        "D:20;Fri day"
    ]

    let tuples = [
        [10, "Monday"],
        [20, "Fri day"]
    ]

    tuples.forEach((line, idx) => {
        let csv = DayOfWeek.of(tuples[idx][0] as number, tuples[idx][1] as string).toCsv();

        expect(csv).toEqual(lines[idx]);
        expect(csv).toEqual(lines[idx]);
    })
})