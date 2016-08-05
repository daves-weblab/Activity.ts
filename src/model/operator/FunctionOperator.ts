import {Operator, Consumes} from "./Operator";
import {isFunction} from "../../util/general/General";

@Consumes(false)
export class FunctionOperator extends Operator {
    evaluate(value:Function):any {
        if(!isFunction(value)) return null;

        return value.call(this.getPrevious().getContext());
    }

    alter(value:any):any {
        // does not alter.
        return value;
    }
}