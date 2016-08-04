import {Operator} from "./Operator";

export class ModelOperator extends Operator {
    getWorkload():any {
        let workload:any = this.getPrevious().getWorkload();

        return workload.get(this.getQualifier());
    }

    evaluate():any {
        if(this.getNext()) {
            return this.next();
        }

        return this.getWorkload();
    }
}