import {Operator} from "./Operator";

export class ValueOperator extends Operator {
    getWorkload():any {
        let workload:any = this.getPrevious().getWorkload();

        if(workload[this.getQualifier()] !== undefined) {
            return workload[this.getQualifier()];
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