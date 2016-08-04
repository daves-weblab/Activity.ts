import {Operator} from "./Operator";
import {isFunction} from "../../util/general/General";

export class FunctionOperator extends Operator {
    getWorkload():any {
        let workload:any = this.getPrevious().getWorkload();

        if(workload && isFunction(workload)) {
            return workload.call(workload);
        }

        return null;
    }
    
    evaluate():any {
        if(this.getNext()) {
            return this.next();
        }

        return this.getWorkload();
    }    
}