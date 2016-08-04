import {Iterator} from "../Iterator";
import {removeByIndex} from "../../../util/array/Arrays";

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
        removeByIndex(this.elements, --this.current);
    }
}