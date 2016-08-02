export abstract class Operator {
    private context:any;
    private value:any;

    getContext():any {
        return this.context;
    }

    setContext(context:any) {
        this.context = context;
    }

    getValue():any {
        return this.value;
    }

    setValue(value:any) {
        this.value = value;
    }

    abstract evaluate():any;
}