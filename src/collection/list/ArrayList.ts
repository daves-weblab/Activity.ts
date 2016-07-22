import {Iterator} from "../iterator/Iterator";
import {ArrayIterator} from "../iterator/array/ArrayIterator";
import {IndexOutOfBoundsException} from "../../exceptions/IndexOutOfBoundsException";
import {ArrayHelper} from "../../util/array/ArrayHelper";
import {List} from "./List";

export class ArrayList<T> implements List<T> {
    private elements:Array<T> = [];

    add(element:T) {
        ArrayHelper.add(this.elements, element);
    }

    remove(element:T, all:boolean = false) {
        ArrayHelper.remove(this.elements, element, all);
    }

    removeByIndex(index:number) {
        if (index >= this.elements.length) throw new IndexOutOfBoundsException();

        this.elements = ArrayHelper.removeByIndex(this.elements, index);
    }

    find(predicate:(element:T) => boolean):T {
        let iterator:Iterator<T> = this.iterator();
        let element;

        while (iterator.hasNext()) {
            element = iterator.next();

            if (predicate(element)) {
                return element;
            }
        }

        return null;
    }

    where(predicate:(element:T) => boolean):List<T> {
        let elements = new ArrayList<T>();
        let iterator:Iterator<T> = this.iterator();
        let element;

        while (iterator.hasNext()) {
            element = iterator.next();

            if (predicate(element)) {
                elements.add(element);
            }
        } 

        return elements;
    }

    iterator():Iterator<T> {
        return new ArrayIterator<T>(this.elements);
    }

    forEach(iteration:(element:T) => any) {
        let iterator:Iterator<T> = this.iterator();

        while (iterator.hasNext()) {
            if (iteration(iterator.next()) === false) {
                break;
            }
        }
    }

    map(operator:(element:T) => void) {
        this.forEach((element:T) => {
            operator(element);
        });
    }
}