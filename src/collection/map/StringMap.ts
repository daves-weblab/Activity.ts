import {Map} from "./Map";
import {MapIterator} from "../iterator/map/MapIterator";
import {Entry} from "./Entry";
import {List} from "../list/List";
import {ObjectHelper} from "../../util/object/ObjectHelper";
import {ArrayList} from "../list/ArrayList";

export class StringMap<T> implements Map<string, T> {
    private elements:Object = {};
    private length:number = 0;

    constructor() {
    }

    put(key:string, value:T) {
        if(!this.has(key)) this.length++;

        this.elements[key] = value;
    }

    get(key:string):T {
        if (this.has(key)) {
            return this.elements[key];
        }

        return null;
    }

    has(key:string) {
        // null is a valid value!
        return this.elements[key] !== undefined;
    }

    remove(key:string) {
        if(this.has(key)) {
            this.length--;
            delete this.elements[key];
        }
    }

    size():number {
        return this.length;
    }

    iterator():MapIterator<string, T> {
        return new MapIterator(this);
    }

    findKey(elements:T):string {
        return undefined;
    }

    keySet():List<string> {
        let keys:List<string> = new ArrayList<string>();

        ObjectHelper.forEach(this.elements, (key:string) => {
            keys.add(key);
        });

        return keys;
    }

    valueSet():List<T> {
        let values:List<T> = new ArrayList<T>();

        ObjectHelper.forEach(this.elements, (key:string, value:T) => {
            values.add(value);
        });

        return values;
    }

    forEach(iteration:(entry:Entry<string, T>)=>void) {
        ObjectHelper.forEach(this.elements, (key:string, value:T) => {
            iteration(new Entry<K, V>(key, value));
        });
    }
}