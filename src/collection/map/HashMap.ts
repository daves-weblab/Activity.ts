import {Map} from "./Map";
import {Hashable} from "./Hashable";
import {MapIterator} from "../iterator/map/MapIterator";
import {List} from "../list/List";
import {Entry} from "./Entry";
import {ArrayList} from "../list/ArrayList";
import {HashEntry} from "./HashEntry";
import {ObjectHelper} from "../../util/object/ObjectHelper";
import {Iterator} from "../iterator/Iterator";

export class HashMap<K extends Hashable, V> implements Map<K, V> {
    private elements:Object = {};
    private length:number = 0;

    put(key:K, value:V) {
        if (!this.has(key)) this.length++;

        this.elements[key.hash()] = {
            source: key,
            value: value
        };
    }

    get(key:K) {
        if (this.has(key)) {
            return this.elements[key.hash()].value;
        }

        return null;
    }

    has(key:K) {
        return this.elements[key.hash()] !== undefined;
    }

    remove(key:K) {
        if (this.has(key)) {
            this.length--;
            delete this.elements[key.hash()];
        }
    }

    iterator():Iterator<Entry<K, V>> {
        return new MapIterator(this);
    }

    findKey(element:V):K {
        return this.keySet().find((key:K) => {
            return this.get(key).value == element;
        });
    }

    keySet():List<K> {
        let keys:List<K> = new ArrayList<K>();

        ObjectHelper.forEach(this.elements, (key:string, entry:HashEntry<K, V>) => {
            keys.add(entry.source);
        });

        return keys;
    }

    valueSet():List<V> {
        let values:List<V> = new ArrayList<V>();

        ObjectHelper.forEach(this.elements, (key:string, entry:HashEntry<K, V>) => {
            values.add(entry.value);
        });

        return values;
    }

    forEach(iteration:(entry:Entry<K, V>)=>void) {
        let iterator:Iterator<Entry<K, V>> = this.iterator();

        while(iterator.hasNext()) {
            iteration(iterator.next());
        }
    }

    size():number {
        return this.length;
    }
}