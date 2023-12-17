export class WeakConstraint {
    public name: string;
    public active: boolean;
    public displayName: string;

    constructor(obj: {name: string, active: boolean, displayName: string}) {
        this.name = obj.name;
        this.active = obj.active;
        this.displayName = obj.displayName;
    }

    public toAsp(priority: number) {
        return `weak_constraint("${this.name}", ${priority})`
    }
}
