import { SchoolClass } from "$model/school-class/school-class"

test("school_class_to_csv_test", () => {
    let school_classes = [
        SchoolClass.of("abc-def", 5, "A", "Inf"),
        SchoolClass.of("cde-fbc", 1, "Z")
    ]

    let expecteds = [
        "C:abc-def;5;A;Inf",
        "C:cde-fbc;1;Z;"
    ]

    school_classes.forEach((e, idx) => {
        expect(e.toCsv()).toEqual(expecteds[idx]);
    })
})

test("csv_to_school_class_test", () => {
    let school_classes = [
        "C:abc-def;5;A;Inf",
        "C:cde-fbc;1;Z"
    ]

    let expecteds = [
        SchoolClass.of("abc-def", 5, "A", "Inf"),
        SchoolClass.of("cde-fbc", 1, "Z")
    ]

    school_classes.forEach((e, idx) => {
        expect(SchoolClass.ofCsv(e)).toEqual(expecteds[idx]);
    })
})