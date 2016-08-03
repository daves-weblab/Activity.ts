import {Operator} from "./Operator";

export class RootOperator extends Operator {
    getWorkload():any {
        return this.getData();
    }

    evaluate():any {
        if(this.getNext()) {
            return this.next();
        } 
        
        return this.getData();
    }
}