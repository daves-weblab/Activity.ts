import {Iterator} from "../iterator/Iterator";
import {ArrayIterator} from "../iterator/array/ArrayIterator";
import {IndexOutOfBoundsException} from "../../exceptions/IndexOutOfBoundsException";
import {ArrayHelper} from "../../util/array/ArrayHelper";
import {Collection} from "../Collection";

export class ArrayList<T> implements Collection<T> {
    private elements:Array<T> = [];

    add(element:T) {
        ArrayHelper.add(this.elements, element);
    }

    remove(element:T, all:boolean = false) {
        this.elements = ArrayHelper.remove(this.elements, element, all);
    }

    removeByIndex(index:number) {
        if(index >= this.elements.length) throw new IndexOutOfBoundsException();
        
        this.elements = ArrayHelper.removeByIndex(this.elements, index);
    }

    iterator():Iterator<T> {
        return new ArrayIterator<T>(this.elements);
    }
}