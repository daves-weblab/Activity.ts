export abstract class Operator {
    private _data:any;
    private _qualifier:string;
    private _previous:Operator;
    private _next:Operator;

    setData(data:any) {
        this._data = data;
    }
    
    getData():any {
        return this._data;
    }

    getQualifier() {
        return this._qualifier;
    }

    setQualifier(partial:string) {
        this._qualifier = partial
    }

    setPrevious(operator:any) {
        this._previous = operator;
    }

    getPrevious():Operator {
        return this._previous;
    }

    previous():any {
        if(this._previous) {
            return this._previous.evaluate();
        }
        
        return null;
    }

    setNext(operator:Operator) {
        this._next = operator;
    }

    getNext():Operator {
        return this._next;
    }

    next():any {
        if(this._next) {
            return this._next.evaluate();
        }

        return null;
    }

    abstract getWorkload():any;
    abstract evaluate():any;
}