import {Iterator} from "../Iterator";
import {ArrayHelper} from "../../../util/array/ArrayHelper";

export class ArrayIterator<T> implements Iterator<T> {
    private current:number = 0;

    constructor(private elements:Array<T>) {
    }

    hasNext():boolean {
        return this.current < this.elements.length;
    }

    next():T {
        return this.elements[this.current++];
    }

    remove() {
        ArrayHelper.removeByIndex(this.elements, --this.current);
    }
}