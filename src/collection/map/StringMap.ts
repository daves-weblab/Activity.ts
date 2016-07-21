import {Map} from "./Map";
import {MapIterator} from "../iterator/map/MapIterator";
import {Entry} from "./Entry";
import {List} from "../list/List";
import {ObjectHelper} from "../../util/object/ObjectHelper";
import {ArrayList} from "../list/ArrayList";

export class StringMap<T> implements Map<string, T> {
    private elements:Object;

    constructor() {
        this.elements = {};
    }

    put(key:string, value:T) {
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

    iterator():MapIterator<string, T> {
        let elements:List<Entry<string, T>> = new ArrayList<Entry<string, T>>();

        ObjectHelper.forEach(this.elements, (key:string, value:T) => {
            elements.add(new Entry<string, T>(key, value));
        });

        return new MapIterator(elements);
    }
}