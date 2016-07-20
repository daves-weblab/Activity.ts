import {Map} from "./Map";
import {MapIterator} from "../iterator/map/MapIterator";

export class StringMap<T> extends Map<string, T> {
    private elements:Object;

    constructor() {
        this.elements = {};
    }

    put(key:string, value:T) {
        this.elements[key] = value;
    }

    get(key:string):T {
        if(this.has(key)) {
            return this.elements[key];
        }

        return null;
    }

    has(key:string) {
        // null is a valid value!
        return this.elements[key] !== undefined;
    }
    
    iterator() {
        

        return new MapIterator(this.elements);
    }
}