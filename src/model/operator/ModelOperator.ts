import {Operator} from "./Operator";
import {AbstractModel} from "../AbstractModel";

export class ModelOperator extends Operator {
    evaluate(value:AbstractModel):any {
        if(!(value instanceof AbstractModel)) return null;

        // check attribute
        let val:any = value.getAttributes()[this.getQualifier()];

        // check proto and other availabilities
        if(val === undefined) {
            val = value[this.getQualifier()];
        }

        return val || null;
    }

    alter(value:any):any {
        // does not alter.
        return value;
    }
}