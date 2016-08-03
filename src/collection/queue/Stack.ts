import {ArrayHelper} from "../../util/array/ArrayHelper";

export class Stack<T> {
    private _elements:Array<T> = [];

    empty():boolean {
        return this._elements.length == 0;
    }

    size():number {
        return this._elements.length;
    }

    peek():T {
        if (this.empty()) return null;

        return this._elements[this.size() - 1];
    }

    pop():T {
        if (this.empty()) return null;

        let value:T = this.peek();
        ArrayHelper.removeByIndex(this._elements, this.size() - 1);

        return value;
    }

    push(value:T) {
        this._elements.push(value);
    }
}