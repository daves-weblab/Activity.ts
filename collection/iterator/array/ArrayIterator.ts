import {Iterator} from "../Iterator";

export class ArrayIterator<T> implements Iterator<T> {
    private current:number = 0;

    constructor(private elements:Array<T>) {
    }

    hasNext():boolean {
        return this.current < this.elements.length;
    }

    getNext():T {
        return this.elements[this.current++];
    }

    remove() {
        if(this.current == 0) throw new Error("Cannot remove element on index -1");

        this.current--;

        this.elements = this.elements.splice(this.current, 1);
    }
}