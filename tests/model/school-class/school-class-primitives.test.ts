import { test, expect } from '@jest/globals';
import { Year } from '$model/school-class/year';
import { Section } from "$model/school-class/section";
import { Track } from "$model/school-class/track";

describe('Year tests', () => {
    test.each([1, 2, 3, 4, 5])('Year %p creates object', (value) => {
        const year = new Year(value)
        expect(year.value).toBe(value)
    })

    test.each([6, 7, 10, 1000, Number.MAX_VALUE])('Year %p throws too big error', (value) => {
        expect(() => {
            new Year(value)
        }).toThrowError("The year given is too big (max 5)")
    })

    test.each([0, -1, -2, -10, Number.MIN_VALUE])('Year %p throws too small error', (value) => {
        expect(() => {
            new Year(value)
        }).toThrowError("The year given is too small (min 1)")
    })

    test.each([undefined, null])('Year %p throws error', (value) => {
        expect(() => {
            new Year(value!)
        }).toThrowError()
    })
})

describe('Section tests', () => {
    test.each([..."ABCDEFGHIJKLMNOPQRSTUWXYZ"])('Section %p creates object', (value) => {
        const section = new Section(value)
        expect(section.value).toBe(value)
    })

    test.each(["AB", "lol", "thisistotallynotavalidsection", ""])('Section %p throws single char error', (value) => {
        expect(() => {
            new Section(value)
        }).toThrowError("The section must be a single char (A-Z)")
    })

    test.each(["a", "1", "%", "!", "-", "."])('Section %p throws invalid characters error', (value) => {
        expect(() => {
            new Section(value)
        }).toThrowError("The section must contain only uppercase letters (A-Z)")
    })
})

describe('Track tests', () => {
    test.each(["Computer", "Philosophy", "A very long track name that is under fifty chars", "Computer sc.", "tech. voc. liv.", "med"])('Track %p creates object', (value) => {
        const track = new Track(value)
        expect(track.value).toBe(value)
    })

    test.each(["cs", "a", "R", "xd", ""])('Track %p throws too short error', (value) => {
        expect(() => {
            new Track(value)
        }).toThrowError("The track is too short (min 3 char)")
    })

    test.each(["aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "Now, this is a story all about how My life got flipped-turned upside down And I'd like to take a minute Just sit right there I'll tell you how I became the prince of a town called Bel-Air In West Philadelphia born and raised On the playground was where I spent most of my days Chillin' out, maxin', relaxin', all cool And all shootin' some b-ball outside of the school When a couple of guys who were up to no good Started making trouble in my neighborhood I got in one little fight and my mom got scared She said, \"You're movin' with your auntie and uncle in Bel-Air\" I begged and pleaded with her day after day But she packed my suitcase and sent me on my way She gave me a kiss and then she gave me my ticket I put my Walkman on and said, \"I might as well kick it\" First class, yo this is bad Drinking orange juice out of a champagne glass Is this what the people of Bel-Air living like? Hmm, this might be alright But wait, I hear they're prissy, bourgeois, all that Is this the type of place that they just send this cool cat? I don't think so I'll see when I get there I hope they're prepared for the prince of Bel-Air Well, the plane landed and when I came out There was a dude who looked like a cop standing there with my name out I ain't trying to get arrested yet, I just got here I sprang with the quickness like lightning, disappeared I whistled for a cab and when it came near The license plate said, \"Fresh\" and it had dice in the mirror If anything I could say that this cab was rare But I thought \"Nah, forget it, yo, holmes to Bel Air\" I pulled up to the house about seven or eight And I yelled to the cabbie, \"Yo holmes, smell ya later\" I looked at my kingdom I was finally there To sit on my throne as the prince of Bel-Air"])// eslint-disable-next-line no-unexpected-multiline
        ('Track %p throws too long error', (value) => {
            expect(() => {
                new Track(value)
            }).toThrowError("The track is too long (max 50 char)")
        })

    test.each(["C0MPU73r 5C13NC3", "Ok until this point but ! oops now it's not", "Philosophy2", "doubledot..", "wroooong. ."])('Track %p throws invalid characters error', (value) => {
        expect(() => {
            new Track(value)
        }).toThrowError("The track must contain only letters, an optional whitespace between words and an optional dot per word")
    })

    test('Track object undefined throws error', () => {
        expect(() => {
            new Track(undefined!)
        })
    })
})
