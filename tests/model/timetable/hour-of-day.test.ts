import { HourOfDay } from "$model/timetable/hour-of-day"
import { ZodError, tuple } from "zod";

test("Test hourOfDay creation invalid data fails", () => {
    let wrong_data = [
        [-1, "Bad"],
        [0, "...."],
        [-100, "b a d ;"],
        [50, ""],
    ]

    wrong_data.forEach((tuple) => {
        expect(() => HourOfDay.of(tuple[0] as number, tuple[1] as string)).toThrow(ZodError);
    })
})

test("Test hourOfDay creation valid data succeed", () => {
    let good_data = [
        [0, "A"],
        [0, "09:00"],
        [10, "Hour hello"],
        [23, "13:58"],
        [23, "hour"]
    ]

    good_data.forEach((tuple) => {
        HourOfDay.of(tuple[0] as number, tuple[1] as string)
    })
})

test("Test csv to object parsing succeed", () => {
    let lines = [
        "H:10;09:00",
        "H:20;H w space"
    ]

    let tuples = [
        [10, "09:00"],
        [20, "H w space"]
    ]

    lines.forEach((line, idx) => {
        let hourOfDay = HourOfDay.ofCsv(line);

        expect(hourOfDay.id).toEqual(tuples[idx][0]);
        expect(hourOfDay.label).toEqual(tuples[idx][1]);
    })
})

test("Test csv to object parsing fails", () => {
    let lines = [
        "10;09:00",
        "H:-1;H w space",
        "H:10;H w space long",
        "H:30;hour"
    ]

    lines.forEach((line, idx) => {
        expect(() => HourOfDay.ofCsv(line)).toThrow(Error);
    })
})

test("Test object to csv conversion succeed", () => {
    let lines = [
        "H:10;09:00",
        "H:20;H w space"
    ]

    let tuples = [
        [10, "09:00"],
        [20, "H w space"]
    ]

    tuples.forEach((line, idx) => {
        let csv = HourOfDay.of(tuples[idx][0] as number, tuples[idx][1] as string).toCsv();

        expect(csv).toEqual(lines[idx]);
        expect(csv).toEqual(lines[idx]);
    })
})