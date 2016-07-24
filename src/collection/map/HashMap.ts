import {Map} from "./Map";
import {Hashable} from "./Hashable";
import {MapIterator} from "../iterator/map/MapIterator";

export class HashMap<K extends Hashable, V> implements Map<K, V> {
    private elements:Object = {};
    private length:number = 0;
    
    put(key:K, value:V) {
        if(!this.has(key)) this.length++;
        
        this.elements[key.hash()] = {
            source: key,
            value: value
        };
    }

    get(key:K) {
        if(this.has(key)) {
            return this.elements[key.hash()].value;
        }

        return null;
    }

    has(key:K) {
        return this.elements[key.hash()] !== undefined;
    }

    remove(key:K) {
        if(this.has(key)) {
            this.length--;
            delete this.elements[key.hash()];
        }
    }

    iterator():MapIterator<K, V> {
        return new MapIterator(this);
    }

    findKey(elements:V):K {
        return undefined;
    }

    keySet():List<K> {
        return undefined;
    }

    valueSet():List<V> {
        return undefined;
    }

    forEach(iteration:(entry:Entry<K, V>)=>void) {
    }

    size():number {
        return this.length;
    }
   
}