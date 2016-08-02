import {ArrayHelper} from "../../util/array/ArrayHelper";

export class Stack<T> {
    private elements:Array<T> = [];

    empty():boolean {
        return this.elements.length == 0;
    }

    size():number {
        return this.elements.length;
    }

    peek():T {
        if (this.empty()) return null;

        return this.elements[this.size() - 1];
    }

    pop():T {
        if (this.empty()) return null;

        let value:T = this.peek();
        ArrayHelper.removeByIndex(this.elements, this.size() - 1);

        return value;
    }

    push(value:T) {
        this.elements.push(value);
    }
}