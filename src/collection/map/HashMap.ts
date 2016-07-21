import {Map} from "./Map";
import {MapIterator} from "../iterator/map/MapIterator";

export class HashMap<K, V> implements Map<K, V> {
    put(key:K, value:V) {
    }

    get(key:K) {
    }

    has(key:K) {
    }

    iterator():MapIterator<K, V> {
        return undefined;
    }

    find(element:V) {
    }
}