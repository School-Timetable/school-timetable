import { z } from 'zod';

export class Track {
    private readonly _track: string

    constructor(track: string) {
        z.string()
            .min(3, {message: "The track is too short (min 3 char)"})
            .max(50, {message: "The track is too long (max 50 char)"})
            .regex(/[a-z]+\.?/i)

        this._track = track.toUpperCase()
    }

    track(): string {
        return this._track
    }
}