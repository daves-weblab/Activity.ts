import {Map} from "./Map";
import {MapIterator} from "../iterator/map/MapIterator";
import {List} from "../list/List";
import {Entry} from "./Entry";
import {ArrayList} from "../list/ArrayList";
import {HashEntry} from "./HashEntry";
import {Iterator} from "../iterator/Iterator";
import {forEach} from "../../util/object/Objects";

export abstract class AbstractMap<K, V> implements Map<K, V> {
    private elements:Object = {};
    private length:number = 0;

    protected abstract getHash(key:K):string;

    put(key:K, value:V) {
        if (!this.has(key)) this.length++;

        this.elements[this.getHash(key)] = {
            source: key,
            value: value
        };
    }

    get(key:K) {
        if (this.has(key)) {
            return this.elements[this.getHash(key)].value;
        }

        return null;
    }

    has(key:K) {
        return this.elements[this.getHash(key)] !== undefined;
    }

    remove(key:K) {
        if (this.has(key)) {
            this.length--;
            delete this.elements[this.getHash(key)];
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

        forEach(this.elements, (key:string, entry:HashEntry<K, V>) => {
            keys.add(entry.source);
        });

        return keys;
    }

    valueSet():List<V> {
        let values:List<V> = new ArrayList<V>();

        forEach(this.elements, (key:string, entry:HashEntry<K, V>) => {
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
    
    clear() {
        this.elements = {};
    }
}