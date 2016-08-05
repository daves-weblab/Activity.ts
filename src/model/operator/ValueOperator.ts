import {Operator} from "./Operator";
import {isObject} from "../../util/object/Objects";

export class ValueOperator extends Operator {
    evaluate(value:Object):any {
        if(!isObject(value)) return null;

        return value[this.getQualifier()] || null;
    }

    alter(value:any):any {
        // does not alter.
        return value;
    }
}