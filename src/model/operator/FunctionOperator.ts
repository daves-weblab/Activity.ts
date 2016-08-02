import {Operator} from "./Operator";
import * as General from "../../util/general/General";

export class FunctionOperator extends Operator {

    evaluate():any {
        if(!General.isFunction(this.getValue())) return null;

        if(this.getContext()) {
            return this.getValue().call(this.getContext());
        }

        return this.getValue().call(null);
    }    
}