export abstract class Operator {
    private qualifier:string;
    private previousOperator:Operator;
    private nextOperator:Operator;
    
    getQualifier() {
        return this.qualifier;
    }

    setQualifier(partial:string) {
        this.qualifier = partial
    }

    setPrevious(operator:any) {
        this.previousOperator = operator;
    }

    previous():any {
        if(this.previousOperator) {
            return this.previousOperator.evaluate();
        }
        
        return null;
    }

    setNext(operator:Operator) {
        this.nextOperator = operator;
    }

    next():any {
        if(this.nextOperator) {
            this.nextOperator.evaluate();
        }

        return null;
    }

    abstract evaluate():any;
}