import {prototype} from "../../util/annotations/Class";
import {OperatorNotEvaluatedException} from "./OperatorNotEvaluatedException";

const CONSUMES_FIELD = "__consumes__";

export function Consumes(consumes:boolean) {
    return function(target:Function) {
        target.prototype[CONSUMES_FIELD] = consumes;
    }
}

export abstract class Operator {
    @prototype(true)
    __consumes__;

    private _qualifier:string;
    private _previous:Operator;
    private _next:Operator;

    private _context:any;
    private _evaluated:boolean;
    private _value:any;

    consumes():boolean {
        return this[CONSUMES_FIELD];
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

    setNext(operator:Operator) {
        this._next = operator;
    }

    getNext():Operator {
        return this._next;
    }

    getValue():any {
        return this._value;
    }

    getContext():any {
        return this._context;
    }

    eval(value:any):any {
        this._context = value;
        this._value = this.evaluate(value);
        this._evaluated = true;
        
        return this._value;
    }

    retrieve():any {
        if(!this._evaluated) throw new OperatorNotEvaluatedException();

        if(this.getNext()) {
            return this.alter(this.getNext().retrieve());
        }

        return this.alter(this._value);
    }

    abstract evaluate(value:any):any;
    abstract alter(value:any):any;
}