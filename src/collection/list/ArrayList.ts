import {Iterator} from "../iterator/Iterator";
import {ArrayIterator} from "../iterator/array/ArrayIterator";
import {IndexOutOfBoundsException} from "../../exceptions/IndexOutOfBoundsException";
import {ArrayHelper} from "../../util/array/ArrayHelper";
import {List} from "./List";
import * as Collections from "../../util/collection/Collections";
import {Comparator} from "../comparator/Comparator";

export class ArrayList<T> implements List<T> {
    private elements:Array<T> = [];
    private comparator:Comparator<T> = null;

    add(element:T) {
        ArrayHelper.add(this.elements, element);
    }

    at(index:number):T {
        if(index < 0 || this.size() <= index) throw new IndexOutOfBoundsException();

        return this.elements[index];
    }

    remove(element:T, all:boolean = false) {
        ArrayHelper.remove(this.elements, element, all);
    }

    removeAll(elements:List<T>) {
        elements.forEach((element:T) => {
            this.remove(element);
        });
    }

    removeByIndex(index:number) {
        if (index >= this.elements.length) throw new IndexOutOfBoundsException();

        this.elements = ArrayHelper.removeByIndex(this.elements, index);
    }

    size():number {
        return this.elements.length;
    }

    clear() {
        this.elements = [];
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

    map(operator:(element:T) => T) {
        for(let i = 0; i < this.elements.length; i++) {
            this.elements[i] = operator(this.elements[i]);
        }
    }
    
    swap(index1:number, index2:number) {
        let temp:T = this.elements[index1];
        
        this.elements[index1] = this.elements[index2];
        this.elements[index2] = temp;
    }

    setComparator(comparator:Comparator<T>) {
        this.comparator = comparator;
    }

    sort() {
        if(!this.comparator) return;

        Collections.sort(this, this.comparator);
    }
}