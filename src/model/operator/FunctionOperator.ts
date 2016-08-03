import {Operator} from "./Operator";
import * as General from "../../util/general/General";

export class FunctionOperator extends Operator {
    getWorkload():any {
        return this.evaluate();
    }
    
    evaluate():any {
        let workload:any = this.getPrevious().getWorkload();

        let toCall = workload[this.getQualifier()];
        if(toCall && General.isFunction(toCall)) {
            return toCall.call(workload);
        }

        return null;
    }    
}