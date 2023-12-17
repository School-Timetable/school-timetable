export class WeakConstraint {
    public name: string;
    public active: boolean;
    public displayName: string;
    public tooltip: string;

    constructor(obj: {name: string, active: boolean, displayName: string, tooltip: string}) {
        this.name = obj.name;
        this.active = obj.active;
        this.displayName = obj.displayName;
        this.tooltip = obj.tooltip;
    }

    public toAsp(priority: number) {
        return `weak_constraint("${this.name}", ${priority})`
    }
}
