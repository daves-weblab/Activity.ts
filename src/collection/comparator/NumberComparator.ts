import {Comparator} from "./Comparator";

export class NumberComparator implements Comparator<number> {
    compare(obj1:number, obj2:number):number {
        if(obj1 < obj2) return -1;

        if(obj1 > obj2) return 1;

        return 0;
    }
}